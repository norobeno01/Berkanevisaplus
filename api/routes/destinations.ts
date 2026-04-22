import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get('/', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const destinations = await prisma.destination.findMany({ where: { active: true } })
    return c.json({ success: true, data: destinations })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load destinations' }, 500)
  }
})

router.get('/all', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const destinations = await prisma.destination.findMany()
    return c.json({ success: true, data: destinations })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load destinations' }, 500)
  }
})

router.post('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const { name, type, processingTime, fee, description, image, requirements, active } = await c.req.json()
    const destination = await prisma.destination.create({
      data: { name, type, processingTime, fee, description, image, requirements, active }
    })
    return c.json({ success: true, data: destination })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create destination' }, 500)
  }
})

router.put('/:id', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')
    const { name, type, processingTime, fee, description, image, requirements, active } = await c.req.json()
    const destination = await prisma.destination.update({
      where: { id },
      data: { name, type, processingTime, fee, description, image, requirements, active }
    })
    return c.json({ success: true, data: destination })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update destination' }, 500)
  }
})

router.delete('/:id', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')
    await prisma.destination.delete({ where: { id } })
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete destination' }, 500)
  }
})

export default router