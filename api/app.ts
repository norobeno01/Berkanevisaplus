import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'

import authRoutes from './routes/auth'
import applicationsRoutes from './routes/applications'
import seoRoutes from './routes/seo'
import servicesRoutes from './routes/services'
import destinationsRoutes from './routes/destinations'
import appointmentsRoutes from './routes/appointments'
import blogsRoutes from './routes/blogs'
import chatRoutes from './routes/chat'

const app = new Hono()

// Security & Performance Middlewares
app.use('*', secureHeaders())
app.use('*', cors())

/**
 * API Routes
 */
app.route('/api/auth', authRoutes)
app.route('/api/applications', applicationsRoutes)
app.route('/api/seo', seoRoutes)
app.route('/api/services', servicesRoutes)
app.route('/api/destinations', destinationsRoutes)
app.route('/api/appointments', appointmentsRoutes)
app.route('/api/blogs', blogsRoutes)
app.route('/api/chat', chatRoutes)

/**
 * health
 */
app.get('/api/health', (c) => c.json({ success: true, message: 'ok' }))

/**
 * error handler middleware
 */
app.onError((err, c) => {
  console.error(err)
  return c.json({ success: false, error: 'Server internal error' }, 500)
})

/**
 * 404 handler
 */
app.notFound((c) => c.json({ success: false, error: 'API not found' }, 404))

export default app