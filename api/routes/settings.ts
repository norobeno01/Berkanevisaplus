import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin } from './auth'

const router = new Hono<{ Bindings: { DB: D1Database } }>()

router.get('/', async (c) => {
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
        facebook: config.facebook || '',
        instagram: config.instagram || '',
        linkedin: config.linkedin || '',
        x: config.x || '',
        tiktok: config.tiktok || '',
        address: config.address || '',
        phone: config.phone || '',
        email: config.email || '',
        whatsapp: config.whatsapp || '',
        workingHours: config.workingHours || ''
      }
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch settings' }, 500)
  }
})

router.post('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const body = await c.req.json()

    // Using sequential raw updates or find/update to avoid D1 upsert/transaction locks
    for (const [key, value] of Object.entries(body)) {
      const existing = await prisma.settings.findUnique({ where: { key } })
      if (existing) {
        await prisma.settings.update({
          where: { key },
          data: { value: String(value || '') }
        })
      } else {
        await prisma.settings.create({
          data: { key, value: String(value || '') }
        })
      }
    }

    return c.json({ success: true })
  } catch (error) {
    console.error('Settings save error:', error)
    return c.json({ success: false, error: 'Failed to save settings' }, 500)
  }
})

export default router
