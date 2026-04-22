import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const applications = await prisma.application.findMany({
      include: {
        user: { select: { name: true, email: true, phone: true } },
        service: { select: { title: true } },
        destination: { select: { name: true } }
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
      where: { userId: user.id },
      include: {
        service: { select: { title: true } },
        destination: { select: { name: true } }
      },
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
    const { serviceId, destinationId, passportNumber, nationality, departureDate, returnDate } = await c.req.json()

    const application = await prisma.application.create({
      data: {
        userId: user.id,
        serviceId,
        destinationId,
        passportNumber,
        nationality,
        departureDate: new Date(departureDate),
        returnDate: returnDate ? new Date(returnDate) : null,
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