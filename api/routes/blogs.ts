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

router.post('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const body = await c.req.json()
    const { title, titleAr, titleFr, content, contentAr, contentFr, excerpt, excerptAr, excerptFr, image, category } = body

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)

    const blog = await prisma.blog.create({
      data: {
        title, titleAr, titleFr,
        slug,
        content, contentAr, contentFr,
        excerpt: excerpt || content.substring(0, 150),
        excerptAr: excerptAr || (contentAr ? contentAr.substring(0, 150) : null),
        excerptFr: excerptFr || (contentFr ? contentFr.substring(0, 150) : null),
        image: image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
        category: category || 'General',
        author: 'Admin',
        published: true
      }
    })

    return c.json({ success: true, data: blog })
  } catch (error) {
    console.error(error)
    return c.json({ success: false, error: 'Failed to create blog' }, 500)
  }
})

router.put('/:id', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')
    const body = await c.req.json()

    const blog = await prisma.blog.update({
      where: { id },
      data: body
    })

    return c.json({ success: true, data: blog })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update blog' }, 500)
  }
})

router.delete('/:id', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const id = c.req.param('id')

    await prisma.blog.delete({
      where: { id }
    })

    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete blog' }, 500)
  }
})

export default router