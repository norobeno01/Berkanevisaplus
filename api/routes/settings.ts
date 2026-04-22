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

    const queries = Object.entries(body).map(([key, value]) => 
      prisma.settings.upsert({
        where: { key },
        update: { value: String(value || '') },
        create: { key, value: String(value || '') }
      })
    )

    await prisma.$transaction(queries)

    return c.json({ success: true })
  } catch (error) {
    console.error(error)
    return c.json({ success: false, error: 'Failed to save settings' }, 500)
  }
})

export default router
