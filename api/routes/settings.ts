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
      } catch (err) { void err }

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
      
      await c.env.DB.exec(`
        UPDATE "Settings" SET "value" = '' WHERE "key" IN ('address', 'phone', 'whatsapp', 'workingHours');
        UPDATE "Settings" SET "value" = 'evisaschengen@gmail.com' WHERE "key" = 'email';
      `)
    } catch (err) { void err }

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
        address: '',
        phone: '',
        email: config.email || '',
        whatsapp: '',
        workingHours: '',
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
    const body = await c.req.json()

    for (const [key, value] of Object.entries(body)) {
      const existing = await c.env.DB.prepare('SELECT key FROM Settings WHERE key = ?').bind(key).first()
      if (existing) {
        await c.env.DB.prepare(`
          UPDATE Settings SET value = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE key = ?
        `).bind(String(value || ''), key).run()
      } else {
        await c.env.DB.prepare(`
          INSERT INTO Settings (id, key, value, updatedAt)
          VALUES (?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
        `).bind(crypto.randomUUID(), key, String(value || '')).run()
      }
    }

    return c.json({ success: true })
  } catch (error: any) {
    console.error('Settings save error:', error)
    return c.json({ success: false, error: error.message || 'Failed to save settings' }, 500)
  }
})

export default router
