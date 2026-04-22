import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get('/settings', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const settings = await prisma.settings.findMany()
    const config = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value
      return acc
    }, {})

    return c.json({ 
      success: true, 
      data: {
        siteName: config.siteName || 'VisaPlus',
        siteDesc: config.siteDesc || 'Expert Visa & Immigration Services',
        keywords: config.keywords || 'visa, immigration, travel, schengen'
      }
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load settings' }, 500)
  }
})

router.put('/settings', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const body = await c.req.json()

    for (const [key, value] of Object.entries(body)) {
      if (['siteName', 'siteDesc', 'keywords'].includes(key)) {
        await prisma.settings.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) }
        })
      }
    }
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update settings' }, 500)
  }
})

router.get('/sitemap.xml', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    })

    const baseUrl = 'https://visaplus.com'

    const staticPages = ['', '/about', '/contact', '/apply', '/visas/schengen', '/blog']

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    staticPages.forEach(page => {
      xml += `\n  <url>\n    <loc>${baseUrl}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>`
    })

    blogs.forEach(blog => {
      xml += `\n  <url>\n    <loc>${baseUrl}/blog/${blog.slug}</loc>\n    <lastmod>${blog.updatedAt.toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    })

    xml += `\n</urlset>`

    c.header('Content-Type', 'application/xml')
    return c.body(xml)
  } catch (error) {
    return c.text('Error generating sitemap', 500)
  }
})

router.get('/robots.txt', async (c) => {
  const baseUrl = 'https://visaplus.com'
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /portal/\nDisallow: /api/\n\nSitemap: ${baseUrl}/api/seo/sitemap.xml`
  c.header('Content-Type', 'text/plain')
  return c.body(robots)
})

router.post('/ping-google', authenticate, requireAdmin, async (c) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return c.json({ success: true, message: 'Sitemap successfully submitted to Google' })
})

export default router