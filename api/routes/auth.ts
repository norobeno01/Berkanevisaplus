import { Hono } from 'hono'
import jwt from '@tsndr/cloudflare-worker-jwt'
import { getPrisma } from '../db'
import { hashPassword, verifyPassword } from '../lib/password'

export type Bindings = {
  DB: any
  JWT_SECRET: string
  LEGACY_PASSWORD_SALT?: string
  ADMIN_BOOTSTRAP_TOKEN?: string
}

export type Variables = {
  user: { id: string; role: string }
}

function timingSafeEqual(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a)
  const y = new TextEncoder().encode(b)
  let diff = x.length ^ y.length
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

const authRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()


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
    const { email, password, name, phone, adminToken } = await c.req.json()

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return c.json({ success: false, error: 'Email already registered' }, 400)
    }

    // Public registration always creates a CLIENT. An ADMIN can only be created while no admin exists yet,
    // and only by presenting ADMIN_BOOTSTRAP_TOKEN (a secret set on the Worker, shared out of band).
    // An email address alone never grants admin, because anyone can type any email.
    let role = 'CLIENT'
    const bootstrap = c.env.ADMIN_BOOTSTRAP_TOKEN || ''
    if (bootstrap.length >= 16 && typeof adminToken === 'string' && timingSafeEqual(adminToken, bootstrap)) {
      const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } })
      if (adminCount === 0) role = 'ADMIN'
    }

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