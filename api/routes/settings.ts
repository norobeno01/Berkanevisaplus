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
    
    // Add defaults if missing
    return c.json({ 
      success: true, 
      data: {
        facebook: config.facebook || '',
        instagram: config.instagram || '',
        linkedin: config.linkedin || '',
        x: config.x || '',
        tiktok: config.tiktok || '',
        address: config.address || '123 Boulevard Mohammed V, Berkane 60300, Morocco',
        phone: config.phone || '+212 536 61 23 45',
        email: config.email || 'contact@visaplus-berkane.ma',
        whatsapp: config.whatsapp || '+212 600 11 22 33',
        workingHours: config.workingHours || 'Mon-Fri: 09:00 - 18:00\nSat: 09:00 - 13:00'
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

    for (const [key, value] of Object.entries(body)) {
      await prisma.settings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      })
    }

    return c.json({ success: true })
  } catch (error) {
    console.error(error)
    return c.json({ success: false, error: 'Failed to save settings' }, 500)
  }
})

export default router
