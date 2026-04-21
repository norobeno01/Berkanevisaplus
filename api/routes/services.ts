import express, { type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin } from './auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// GET all active services (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({ where: { active: true } })
    res.json({ success: true, data: services })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load services' })
  }
})

// GET all services including inactive (Admin)
router.get('/all', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany()
    res.json({ success: true, data: services })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load services' })
  }
})

// POST create service (Admin)
router.post('/', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, description, icon, active } = req.body
    const service = await prisma.service.create({
      data: { title, description, icon, active }
    })
    res.json({ success: true, data: service })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create service' })
  }
})

// PUT update service (Admin)
router.put('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, description, icon, active } = req.body
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: { title, description, icon, active }
    })
    res.json({ success: true, data: service })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update service' })
  }
})

// DELETE service (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete service' })
  }
})

export default router