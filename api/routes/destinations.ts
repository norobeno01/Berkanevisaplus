import express, { type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin } from './auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// GET all active destinations (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const destinations = await prisma.destination.findMany({ where: { active: true } })
    res.json({ success: true, data: destinations })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load destinations' })
  }
})

// GET all destinations including inactive (Admin)
router.get('/all', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const destinations = await prisma.destination.findMany()
    res.json({ success: true, data: destinations })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load destinations' })
  }
})

// POST create destination (Admin)
router.post('/', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, type, processingTime, fee, description, image, requirements, active } = req.body
    const destination = await prisma.destination.create({
      data: { name, type, processingTime, fee, description, image, requirements, active }
    })
    res.json({ success: true, data: destination })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create destination' })
  }
})

// PUT update destination (Admin)
router.put('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, type, processingTime, fee, description, image, requirements, active } = req.body
    const destination = await prisma.destination.update({
      where: { id: req.params.id },
      data: { name, type, processingTime, fee, description, image, requirements, active }
    })
    res.json({ success: true, data: destination })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update destination' })
  }
})

// DELETE destination (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    await prisma.destination.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete destination' })
  }
})

export default router