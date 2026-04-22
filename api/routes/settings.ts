import { Hono } from 'hono'
import { getPrisma } from '../db'
import { authenticate, requireAdmin } from './auth'

const router = new Hono<{ Bindings: { DB: D1Database } }>()

router.get('/', async (c) => {
  try {
    // Auto-Migrate the Settings table if the user hasn't run the SQL manually
    try {
      await c.env.DB.prepare('SELECT key FROM Settings LIMIT 1').first()
    } catch (e) {
      console.log('Running automatic Settings migration...')
      // Backup old SEO settings if they exist
      let oldSeo = { siteName: 'E-Visa Schengen', siteDesc: 'Expert Visa & Immigration Services', keywords: 'visa, immigration, travel, schengen' }
      try {
        const old = await c.env.DB.prepare('SELECT siteName, siteDesc, keywords FROM Settings LIMIT 1').first()
        if (old) oldSeo = old as any
      } catch (err) {}

      // Execute migration
      await c.env.DB.exec(`
        CREATE TABLE IF NOT EXISTS "Settings_new" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "key" TEXT NOT NULL,
            "value" TEXT NOT NULL,
            "updatedAt" DATETIME NOT NULL
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Settings_key_key" ON "Settings_new"("key");
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('facebook', 'facebook', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('instagram', 'instagram', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('linkedin', 'linkedin', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('x', 'x', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('tiktok', 'tiktok', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('siteName', 'siteName', '${oldSeo.siteName.replace(/'/g, "''")}', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('siteDesc', 'siteDesc', '${oldSeo.siteDesc.replace(/'/g, "''")}', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('keywords', 'keywords', '${oldSeo.keywords.replace(/'/g, "''")}', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('metaPixel', 'metaPixel', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('googleAnalytics', 'googleAnalytics', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('googleTagManager', 'googleTagManager', '', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
        DROP TABLE IF EXISTS "Settings";
        ALTER TABLE "Settings_new" RENAME TO "Settings";
      `)
    }

    // Fix any broken dates from previous raw SQL inserts
    try {
      await c.env.DB.exec(`UPDATE "Settings" SET "updatedAt" = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE "updatedAt" NOT LIKE '%T%'`)
    } catch (err) {}

    const prisma = getPrisma(c.env.DB)
    const settings = await prisma.settings.findMany()
    const config = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value
      return acc
    }, {})

    return c.json({
      success: true,
      data: {
        facebook: config.facebook || '',
        instagram: config.instagram || '',
        linkedin: config.linkedin || '',
        x: config.x || '',
        tiktok: config.tiktok || '',
        address: config.address || '',
        phone: config.phone || '',
        email: config.email || '',
        whatsapp: config.whatsapp || '',
        workingHours: config.workingHours || '',
        metaPixel: config.metaPixel || '',
        googleAnalytics: config.googleAnalytics || '',
        googleTagManager: config.googleTagManager || ''
      }
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch settings' }, 500)
  }
})

router.post('/', authenticate, requireAdmin, async (c) => {
  try {
    const prisma = getPrisma(c.env.DB)
    const body = await c.req.json()

    // Use Prisma sequentially to avoid raw SQL type mismatch (DateTime) and batch locks
    for (const [key, value] of Object.entries(body)) {
      const existing = await prisma.settings.findUnique({ where: { key } })
      if (existing) {
        await prisma.settings.update({
          where: { key },
          data: { value: String(value || '') }
        })
      } else {
        await prisma.settings.create({
          data: { 
            key, 
            value: String(value || '') 
          }
        })
      }
    }

    return c.json({ success: true })
  } catch (error: any) {
    console.error('Settings save error:', error)
    return c.json({ success: false, error: error.message || 'Failed to save settings' }, 500)
  }
})

export default router
