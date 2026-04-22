import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get('/', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
    return c.json({ success: true, data: blogs })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load blogs' }, 500)
  }
})

router.get('/:slug', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const slug = c.req.param('slug')
    const blog = await prisma.blog.findUnique({
      where: { slug }
    })
    if (!blog || !blog.published) {
      return c.json({ success: false, error: 'Blog not found' }, 404)
    }
    return c.json({ success: true, data: blog })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to load blog' }, 500)
  }
})

export default router