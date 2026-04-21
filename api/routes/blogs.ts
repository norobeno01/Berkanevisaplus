import express, { type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET all published blogs
router.get('/', async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: blogs })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load blogs' })
  }
})

// GET single blog by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug }
    })
    if (!blog || !blog.published) {
      return res.status(404).json({ success: false, error: 'Blog not found' })
    }
    res.json({ success: true, data: blog })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load blog' })
  }
})

export default router