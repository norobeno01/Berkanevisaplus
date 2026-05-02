import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin, type Bindings, type Variables } from './auth'
import { BLOG_SEED_VERSION, blogSeedV1 } from '../seed/blogSeedV1'

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

async function ensureSettingsSchema(db: D1Database) {
  try {
    await db.prepare('SELECT key FROM Settings LIMIT 1').first()
    return
  } catch (e) {
    void e
  }

  let oldSeo = { siteName: 'E-Visa Schengen', siteDesc: 'Visa & Immigration Blog', keywords: 'visa, immigration, blog, schengen, canada, usa' }
  try {
    const old = await db.prepare('SELECT siteName, siteDesc, keywords FROM Settings LIMIT 1').first()
    if (old) oldSeo = old as any
  } catch (e) {
    void e
  }

  await db.exec(`
    CREATE TABLE IF NOT EXISTS "Settings_new" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "key" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "updatedAt" DATETIME NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "Settings_key_key" ON "Settings_new"("key");
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('siteName', 'siteName', '${oldSeo.siteName.replace(/'/g, "''")}', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('siteDesc', 'siteDesc', '${oldSeo.siteDesc.replace(/'/g, "''")}', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('keywords', 'keywords', '${oldSeo.keywords.replace(/'/g, "''")}', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('facebook', 'facebook', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('instagram', 'instagram', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('linkedin', 'linkedin', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('x', 'x', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('tiktok', 'tiktok', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('metaPixel', 'metaPixel', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('googleAnalytics', 'googleAnalytics', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('googleTagManager', 'googleTagManager', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    INSERT OR IGNORE INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('email', 'email', 'evisaschengen@gmail.com', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
    DROP TABLE IF EXISTS "Settings";
    ALTER TABLE "Settings_new" RENAME TO "Settings";
  `)
}

async function ensureBlogSchema(db: D1Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS "Blog" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "titleAr" TEXT,
        "titleFr" TEXT,
        "slug" TEXT NOT NULL,
        "excerpt" TEXT NOT NULL,
        "excerptAr" TEXT,
        "excerptFr" TEXT,
        "image" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "contentAr" TEXT,
        "contentFr" TEXT,
        "category" TEXT NOT NULL,
        "author" TEXT NOT NULL,
        "published" BOOLEAN NOT NULL DEFAULT true,
        "metaTitle" TEXT,
        "metaDesc" TEXT,
        "keywords" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "Blog_slug_key" ON "Blog"("slug");
  `)

  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "titleAr" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "titleFr" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "excerptAr" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "excerptFr" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "contentAr" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "contentFr" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "metaTitle" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "metaDesc" TEXT;') } catch (e) { void e }
  try { await db.exec('ALTER TABLE "Blog" ADD COLUMN "keywords" TEXT;') } catch (e) { void e }
}

async function seedBlogsIfEmpty(prisma: any) {
  const existingVersion = await prisma.settings.findUnique({ where: { key: 'blogSeedVersion' } }).catch(() => null)
  if (existingVersion?.value === BLOG_SEED_VERSION) return

  const count = await prisma.blog.count()
  if (count > 0) {
    await prisma.settings.upsert({
      where: { key: 'blogSeedVersion' },
      update: { value: BLOG_SEED_VERSION },
      create: { key: 'blogSeedVersion', value: BLOG_SEED_VERSION }
    })
    return
  }

  await prisma.blog.createMany({
    data: blogSeedV1.map(p => ({
      title: p.title,
      titleAr: p.titleAr,
      titleFr: p.titleFr,
      slug: p.slug,
      excerpt: p.excerpt,
      excerptAr: p.excerptAr,
      excerptFr: p.excerptFr,
      image: p.image,
      content: p.content,
      contentAr: p.contentAr,
      contentFr: p.contentFr,
      category: p.category,
      author: p.author,
      published: p.published
    }))
  })

  await prisma.settings.upsert({
    where: { key: 'blogSeedVersion' },
    update: { value: BLOG_SEED_VERSION },
    create: { key: 'blogSeedVersion', value: BLOG_SEED_VERSION }
  })
}

router.get('/', async (c) => {
  try {
    await ensureSettingsSchema(c.env.DB)
    await ensureBlogSchema(c.env.DB)
    const prisma = getPrisma(c.env.DB)
    await seedBlogsIfEmpty(prisma)
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
