import { Hono } from 'hono'

const app = new Hono<{ Bindings: { ASSETS: any } }>()

app.notFound(async (c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ success: false, error: 'API not found' }, 404)
  }
  const url = new URL(c.req.url)
  url.pathname = '/'
  return c.env.ASSETS.fetch(new Request(url.toString(), c.req.raw))
})
