import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const appointments = await prisma.appointment.findMany({
      include: {
        client: { select: { name: true, email: true, phone: true } }
      },
      orderBy: { date: 'asc' }
    })
    return c.json({ success: true, data: appointments })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load appointments' }, 500)
  }
})

router.get('/my-appointments', authenticate, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const user = c.get('user')
    const appointments = await prisma.appointment.findMany({
      where: { clientId: user.id },
      orderBy: { date: 'asc' }
    })
    return c.json({ success: true, data: appointments })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load appointments' }, 500)
  }
})

router.post('/', authenticate, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const user = c.get('user')
    const { firstName, lastName, email, phone, visaType, serviceType, date, time, notes } = await c.req.json()

    const appointment = await prisma.appointment.create({
      data: {
        clientId: user.id,
        firstName,
        lastName,
        email,
        phone,
        visaType,
        serviceType,
        date: new Date(date),
        time,
        notes,
        status: 'Pending'
      }
    })

    return c.json({ success: true, data: appointment })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to book appointment' }, 500)
  }
})

router.put('/:id/status', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')
    const { status } = await c.req.json()

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    })

    return c.json({ success: true, data: appointment })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update status' }, 500)
  }
})

export default router