import { Hono } from 'hono'
import jwt from '@tsndr/cloudflare-worker-jwt'
import { getPrisma } from '../db'

export type Bindings = {
  DB: any
  JWT_SECRET: string
}

export type Variables = {
  user: { id: string; role: string }
}

const authRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

const JWT_SECRET = 'super-secret-visa-key-2026'

// Custom crypto hash function for edge since bcrypt is heavy
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + JWT_SECRET) // simple salt
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export const authenticate = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ success: false, error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]
  try {
    const isValid = await jwt.verify(token, c.env.JWT_SECRET || JWT_SECRET)
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

    const token = await jwt.sign({ id: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + (7 * 24 * (60 * 60)) }, c.env.JWT_SECRET || JWT_SECRET)

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

    const hashedPassword = await hashPassword(password)
    // Accept old unhashed passwords too for smooth transition (since previously we used bcrypt but didn't actually run it if we had no DB entries yet, or if it failed)
    if (user.password !== hashedPassword && user.password !== password) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }

    const token = await jwt.sign({ id: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + (7 * 24 * (60 * 60)) }, c.env.JWT_SECRET || JWT_SECRET)

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

export default authRoutes