/**
 * This is a API server
 */

import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import applicationsRoutes from './routes/applications.js'
import seoRoutes from './routes/seo.js'
import servicesRoutes from './routes/services.js'
import destinationsRoutes from './routes/destinations.js'
import appointmentsRoutes from './routes/appointments.js'
import blogsRoutes from './routes/blogs.js'
import chatRoutes from './routes/chat.js'

// for esm mode
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// load env
dotenv.config()

const app: express.Application = express()

// Security & Performance Middlewares
app.use(helmet()) // Sets secure HTTP headers
app.use(compression()) // Compresses response bodies
app.use(cors({ origin: process.env.CLIENT_URL || '*' })) // Restrict CORS in production

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests from this IP, please try again later.' }
})
app.use('/api/', globalLimiter)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

/**
 * API Routes
 */
app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationsRoutes)
app.use('/api/seo', seoRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/destinations', destinationsRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/blogs', blogsRoutes)
app.use('/api/chat', chatRoutes)

/**
 * health
 */
app.use(
  '/api/health',
  (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json({
      success: true,
      message: 'ok',
    })
  },
)

/**
 * error handler middleware
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    error: 'Server internal error',
  })
})

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'API not found',
  })
})

export default app
