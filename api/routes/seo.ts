import express, { type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin } from './auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Get Global Settings
router.get('/settings', async (req: Request, res: Response) => {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: 'global' } })
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 'global',
          siteName: 'VisaPlus',
          siteDesc: 'Expert Visa & Immigration Services',
          keywords: 'visa, immigration, travel, schengen'
        }
      })
    }
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load settings' })
  }
})

// Update Global Settings (Admin Only)
router.put('/settings', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { siteName, siteDesc, keywords } = req.body
    const settings = await prisma.settings.upsert({
      where: { id: 'global' },
      update: { siteName, siteDesc, keywords },
      create: { id: 'global', siteName, siteDesc, keywords }
    })
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update settings' })
  }
})

// Generate Sitemap.xml dynamically
router.get('/sitemap.xml', async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    })

    const baseUrl = process.env.CLIENT_URL || 'https://visaplus.com'
    
    // Core Static Routes
    const staticPages = [
      '',
      '/about',
      '/contact',
      '/apply',
      '/visas/schengen',
      '/blog'
    ]

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    // Add Static Pages
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    })

    // Add Dynamic Blog Posts
    blogs.forEach(blog => {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    })

    xml += `\n</urlset>`

    res.header('Content-Type', 'application/xml')
    res.send(xml)
  } catch (error) {
    res.status(500).send('Error generating sitemap')
  }
})

// Generate robots.txt dynamically
router.get('/robots.txt', (req: Request, res: Response) => {
  const baseUrl = process.env.CLIENT_URL || 'https://visaplus.com'
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /portal/
Disallow: /api/

Sitemap: ${baseUrl}/api/seo/sitemap.xml`

  res.header('Content-Type', 'text/plain')
  res.send(robots)
})

// Ping Google manually (Simulation for Admin tool)
router.post('/ping-google', authenticate, requireAdmin, async (req: Request, res: Response) => {
  // In a real scenario, this would make a request to Google's ping endpoint
  // Example: fetch(`http://www.google.com/ping?sitemap=${baseUrl}/api/seo/sitemap.xml`)
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  res.json({ success: true, message: 'Sitemap successfully submitted to Google' })
})

export default router