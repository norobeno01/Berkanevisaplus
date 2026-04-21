import express, { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import rateLimit from 'express-rate-limit'

const router = express.Router()
const prisma = new PrismaClient()

// Strict rate limiter for auth routes to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: { success: false, error: 'Too many authentication attempts, please try again later.' }
})

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-visa-key-2026'

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string }
    }
  }
}

// Middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid token' })
  }
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'AGENT') {
    res.status(403).json({ success: false, error: 'Forbidden' })
    return
  }
  next()
}

// Routes
router.post('/register', authLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      res.status(400).json({ success: false, error: 'Email already registered' })
      return
    }

    // In a real app, hash password with bcrypt!
    // Since we had issues importing bcryptjs types in esm, let's use it dynamically or just hash it.
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: 'CLIENT'
      }
    })

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

router.post('/login', authLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }

    const bcrypt = await import('bcryptjs')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, name: true, email: true, role: true, phone: true }
    })
    
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }
    
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

export default router
