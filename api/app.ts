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
import settingsRoutes from './routes/settings'

const app = new Hono<{ Bindings: { DB: D1Database, ASSETS: any } }>()

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
app.route('/api/settings', settingsRoutes)

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
 * SPA Fallback & Static Assets
 */
app.get('*', async (c) => {
  // Ignore API routes
  if (c.req.path.startsWith('/api/')) {
    return c.json({ success: false, error: 'API not found' }, 404)
  }

  if (c.env?.ASSETS) {
    try {
      // 1. Try to serve the exact asset (e.g. /assets/index.js)
      const assetResponse = await c.env.ASSETS.fetch(c.req.raw)
      if (assetResponse.status < 400) {
        return assetResponse
      }
      
      // 2. If asset not found (like /admin), serve index.html for SPA routing
      const url = new URL(c.req.url)
      url.pathname = '/index.html'
      const response = await c.env.ASSETS.fetch(new Request(url.toString(), c.req.raw))
      
      // Ensure we return 200 OK for SPA fallback
      return new Response(response.body, {
        status: 200,
        headers: response.headers
      })
    } catch (e) {
      console.error('SPA Fallback error:', e)
    }
  }

  return c.json({ success: false, error: 'Page not found' }, 404)
})

/**
 * 404 handler for unknown methods or unmatched APIs
 */
app.notFound((c) => {
  return c.json({ success: false, error: 'Not found' }, 404)
})

export default app