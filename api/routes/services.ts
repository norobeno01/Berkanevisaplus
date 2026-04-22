import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get('/', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const services = await prisma.service.findMany({ where: { active: true } })
    return c.json({ success: true, data: services })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load services' }, 500)
  }
})

router.get('/all', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const services = await prisma.service.findMany()
    return c.json({ success: true, data: services })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load services' }, 500)
  }
})

router.post('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const { title, description, icon, active } = await c.req.json()
    const service = await prisma.service.create({
      data: { title, description, icon, active }
    })
    return c.json({ success: true, data: service })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create service' }, 500)
  }
})

router.put('/:id', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')
    const { title, description, icon, active } = await c.req.json()
    const service = await prisma.service.update({
      where: { id },
      data: { title, description, icon, active }
    })
    return c.json({ success: true, data: service })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update service' }, 500)
  }
})

router.delete('/:id', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')
    await prisma.service.delete({ where: { id } })
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete service' }, 500)
  }
})

export default router