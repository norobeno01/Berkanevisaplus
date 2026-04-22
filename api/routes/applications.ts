import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const applications = await prisma.application.findMany({
      include: {
        client: { select: { name: true, email: true, phone: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return c.json({ success: true, data: applications })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load applications' }, 500)
  }
})

router.get('/my-applications', authenticate, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const user = c.get('user')
    const applications = await prisma.application.findMany({
      where: { clientId: user.id },
      orderBy: { createdAt: 'desc' }
    })
    return c.json({ success: true, data: applications })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load applications' }, 500)
  }
})

router.post('/', authenticate, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const user = c.get('user')
    const { destination, type } = await c.req.json()

    const application = await prisma.application.create({
      data: {
        clientId: user.id,
        appNumber: 'APP-' + Math.floor(100000 + Math.random() * 900000),
        destination,
        type,
        status: 'PENDING'
      }
    })

    return c.json({ success: true, data: application })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to submit application' }, 500)
  }
})

router.put('/:id/status', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')
    const { status } = await c.req.json()

    const application = await prisma.application.update({
      where: { id },
      data: { status }
    })

    return c.json({ success: true, data: application })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update status' }, 500)
  }
})

export default router