import { Hono } from 'hono'
import jwt from '@tsndr/cloudflare-worker-jwt'
import { getPrisma } from '../db'

export type Bindings = {
  DB: any
  JWT_SECRET: string
  LEGACY_PASSWORD_SALT?: string
}

export type Variables = {
  user: { id: string; role: string }
}

const authRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()


// Password hashing: PBKDF2-SHA256 with a random per-user salt (WebCrypto, works on edge runtimes).
// Stored format: pbkdf2$<iterations>$<saltB64>$<hashB64>
const PBKDF2_ITERATIONS = 100000
const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u))
const unb64 = (s: string) => Uint8Array.from(atob(s), ch => ch.charCodeAt(0))

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256)
  return new Uint8Array(bits)
}

function safeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let d = 0
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i]
  return d === 0
}

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS)
  return `pbkdf2$${PBKDF2_ITERATIONS}$${b64(salt)}$${b64(hash)}`
}

// Legacy format: hex SHA-256(password + old salt). Only checked if LEGACY_PASSWORD_SALT is set,
// and only to upgrade the hash on a successful login. Remove once all users have logged in or reset.
async function legacyHash(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(password + salt)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('')
}

async function verifyPassword(password: string, stored: string, legacySalt?: string): Promise<{ ok: boolean; needsUpgrade: boolean }> {
  if (stored.startsWith('pbkdf2$')) {
    const [, iter, salt, hash] = stored.split('$')
    const calc = await pbkdf2(password, unb64(salt), parseInt(iter, 10))
    return { ok: safeEqual(calc, unb64(hash)), needsUpgrade: false }
  }
  if (legacySalt) {
    const calc = new TextEncoder().encode(await legacyHash(password, legacySalt))
    if (safeEqual(calc, new TextEncoder().encode(stored))) return { ok: true, needsUpgrade: true }
  }
  return { ok: false, needsUpgrade: false }
}

function requireSecret(v: string): string {
  if (!v) throw new Error('JWT_SECRET is not configured')
  return v
}

export const authenticate = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ success: false, error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]
  try {
    const isValid = await jwt.verify(token, requireSecret(c.env.JWT_SECRET))
    if (!isValid) throw new Error('Invalid token')
    const decoded = jwt.decode(token)
    c.set('user', decoded.payload)
    await next()
  } catch (err) {
    return c.json({ success: false, error: 'Invalid token' }, 401)
  }
}

export const requireAdmin = async (c: any, next: any) => {
  const user = c.get('user')
  if (user?.role !== 'ADMIN' && user?.role !== 'AGENT') {
    return c.json({ success: false, error: 'Forbidden' }, 403)
  }
  await next()
}

authRoutes.post('/register', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const { email, password, name, phone } = await c.req.json()

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return c.json({ success: false, error: 'Email already registered' }, 400)
    }

    // Check if this is the very first user in the database
    const userCount = await prisma.user.count()
    const role = userCount === 0 ? 'ADMIN' : 'CLIENT'

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, phone, role }
    })

    const token = await jwt.sign({ id: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + (7 * 24 * (60 * 60)) }, requireSecret(c.env.JWT_SECRET))

    return c.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

authRoutes.post('/login', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const { email, password } = await c.req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }

    const { ok, needsUpgrade } = await verifyPassword(password, user.password, c.env.LEGACY_PASSWORD_SALT)
    if (!ok) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }
    if (needsUpgrade) {
      await prisma.user.update({ where: { id: user.id }, data: { password: await hashPassword(password) } })
    }

    const token = await jwt.sign({ id: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + (7 * 24 * (60 * 60)) }, requireSecret(c.env.JWT_SECRET))

    return c.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

authRoutes.get('/me', authenticate, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const userPayload = c.get('user')
    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
      select: { id: true, name: true, email: true, role: true, phone: true }
    })
    
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }
    
    return c.json({ success: true, user })
  } catch (err) {
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

authRoutes.post('/admin-register', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const { email, password, name, phone, role } = await c.req.json()

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return c.json({ success: false, error: 'Email already registered' }, 400)
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, phone, role: role || 'ADMIN' }
    })

    return c.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

authRoutes.get('/stats', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    
    const usersCount = await prisma.user.count({ where: { role: 'CLIENT' } })
    const applicationsCount = await prisma.application.count()
    const pendingAppsCount = await prisma.application.count({ where: { status: 'PENDING' } })
    const appointmentsCount = await prisma.appointment.count()
    const pendingAppointmentsCount = await prisma.appointment.count({ where: { status: 'Pending' } })
    const blogsCount = await prisma.blog.count()

    // recent applications
    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: { name: true, email: true } }
      }
    })

    const users = await prisma.user.findMany({
      where: { role: 'CLIENT' },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true }
    })
    
    const appointments = await prisma.appointment.findMany({
      include: {
        client: { select: { name: true } }
      }
    })

    const applications = await prisma.application.findMany({
      include: {
        client: { select: { name: true } }
      }
    })

    return c.json({
      success: true,
      stats: {
        users: usersCount,
        applications: applicationsCount,
        pendingApplications: pendingAppsCount,
        appointments: appointmentsCount,
        pendingAppointments: pendingAppointmentsCount,
        blogs: blogsCount
      },
      recentApplications,
      users,
      appointments,
      applications
    })
  } catch (err) {
    console.error(err)
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

export default authRoutes