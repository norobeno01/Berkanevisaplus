import { Hono } from 'hono'
import { authenticate, requireAdmin } from './auth'

type Bindings = {
  DB: D1Database
}

const router = new Hono<{ Bindings: Bindings }>()

const TOP_ORIGINS_SEED = ['MA', 'DZ', 'TN', 'LY', 'MR', 'EG', 'TR', 'AE', 'SA', 'QA']

async function ensureOriginsTable(db: D1Database) {
  await db
  .prepare(
    'CREATE TABLE IF NOT EXISTS "OriginCountries" ("code" TEXT NOT NULL PRIMARY KEY, "isTop" INTEGER NOT NULL DEFAULT 0, "active" INTEGER NOT NULL DEFAULT 1, "updatedAt" TEXT NOT NULL)'
  )
  .run()

  const row = await db.prepare('SELECT COUNT(1) as c FROM "OriginCountries"').first<{ c: number }>()
  if ((row?.c ?? 0) === 0) {
    const now = new Date().toISOString()
    const queries = TOP_ORIGINS_SEED.map(code =>
      db
        .prepare(`INSERT INTO "OriginCountries" ("code","isTop","active","updatedAt") VALUES (?,?,?,?)`)
        .bind(code, 1, 1, now)
    )
    if (queries.length) {
      await db.batch(queries)
    }
  }
}

router.get('/', async c => {
  try {
    await ensureOriginsTable(c.env.DB)
    const topRows = await c.env.DB
      .prepare(`SELECT "code" FROM "OriginCountries" WHERE "active"=1 AND "isTop"=1 ORDER BY "code" ASC`)
      .all<{ code: string }>()

    return c.json({
      success: true,
      data: {
        top: (topRows.results ?? []).map(r => r.code),
      },
    })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to load origins' }, 500)
  }
})

router.get('/all', authenticate, requireAdmin, async c => {
  try {
    await ensureOriginsTable(c.env.DB)
    const rows = await c.env.DB
      .prepare(`SELECT "code","isTop","active","updatedAt" FROM "OriginCountries" ORDER BY "code" ASC`)
      .all<{ code: string; isTop: number; active: number; updatedAt: string }>()

    return c.json({ success: true, data: rows.results ?? [] })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to load origins' }, 500)
  }
})

router.put('/', authenticate, requireAdmin, async c => {
  try {
    await ensureOriginsTable(c.env.DB)
    const body = (await c.req.json()) as {
      topCodes?: string[]
      activeCodes?: string[]
    }

    const topCodes = (body.topCodes ?? []).map(s => String(s).toUpperCase())
    const activeCodes = (body.activeCodes ?? []).map(s => String(s).toUpperCase())
    const now = new Date().toISOString()

    await c.env.DB.prepare(`UPDATE "OriginCountries" SET "isTop"=0, "updatedAt"=?`).bind(now).run()

    for (const code of topCodes) {
      const existing = await c.env.DB.prepare(`SELECT "code" FROM "OriginCountries" WHERE "code"=?`).bind(code).first()
      if (existing) {
        await c.env.DB
          .prepare(`UPDATE "OriginCountries" SET "isTop"=1, "active"=1, "updatedAt"=? WHERE "code"=?`)
          .bind(now, code)
          .run()
      } else {
        await c.env.DB
          .prepare(`INSERT INTO "OriginCountries" ("code","isTop","active","updatedAt") VALUES (?,?,?,?)`)
          .bind(code, 1, 1, now)
          .run()
      }
    }

    if (activeCodes.length) {
      for (const code of activeCodes) {
        const existing = await c.env.DB.prepare(`SELECT "code" FROM "OriginCountries" WHERE "code"=?`).bind(code).first()
        if (existing) {
          await c.env.DB.prepare(`UPDATE "OriginCountries" SET "active"=1, "updatedAt"=? WHERE "code"=?`).bind(now, code).run()
        } else {
          await c.env.DB
            .prepare(`INSERT INTO "OriginCountries" ("code","isTop","active","updatedAt") VALUES (?,?,?,?)`)
            .bind(code, 0, 1, now)
            .run()
        }
      }
    }

    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to update origins' }, 500)
  }
})

export default router

