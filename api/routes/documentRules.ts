import { Hono } from 'hono'
import { authenticate, requireAdmin } from './auth'

type Bindings = {
  DB: D1Database
}

type SourceLink = {
  title: string
  url: string
}

type RuleRow = {
  id: string
  destinationId: string
  visaTypeId: string
  originCountryCode: string
  documents: string
  sources: string
  lastVerifiedAt: string
  active: number
  updatedAt: string
}

const router = new Hono<{ Bindings: Bindings }>()

async function ensureRulesTable(db: D1Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS "DocumentRules" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "destinationId" TEXT NOT NULL,
      "visaTypeId" TEXT NOT NULL,
      "originCountryCode" TEXT NOT NULL,
      "documents" TEXT NOT NULL,
      "sources" TEXT NOT NULL,
      "lastVerifiedAt" TEXT NOT NULL,
      "active" INTEGER NOT NULL DEFAULT 1,
      "updatedAt" TEXT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "DocumentRules_key" ON "DocumentRules"("destinationId","visaTypeId","originCountryCode");
  `)

  const row = await db.prepare('SELECT COUNT(1) as c FROM "DocumentRules"').first<{ c: number }>()
  if ((row?.c ?? 0) === 0) {
    await seedDefaultSources(db)
  }
}

function jsonArray(value: any) {
  return JSON.stringify(Array.isArray(value) ? value : [])
}

function safeParseJsonArray(value: string): any[] {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function upsertRule(db: D1Database, input: Omit<RuleRow, 'updatedAt'>) {
  const existing = await db
    .prepare(
      `SELECT "id" FROM "DocumentRules" WHERE "destinationId"=? AND "visaTypeId"=? AND "originCountryCode"=?`
    )
    .bind(input.destinationId, input.visaTypeId, input.originCountryCode)
    .first<{ id: string }>()

  const now = new Date().toISOString()
  if (existing?.id) {
    await db
      .prepare(
        `UPDATE "DocumentRules" SET "documents"=?, "sources"=?, "lastVerifiedAt"=?, "active"=?, "updatedAt"=? WHERE "id"=?`
      )
      .bind(input.documents, input.sources, input.lastVerifiedAt, input.active, now, existing.id)
      .run()
    return existing.id
  }

  await db
    .prepare(
      `INSERT INTO "DocumentRules" ("id","destinationId","visaTypeId","originCountryCode","documents","sources","lastVerifiedAt","active","updatedAt")
       VALUES (?,?,?,?,?,?,?,?,?)`
    )
    .bind(input.id, input.destinationId, input.visaTypeId, input.originCountryCode, input.documents, input.sources, input.lastVerifiedAt, input.active, now)
    .run()
  return input.id
}

async function seedDefaultSources(db: D1Database) {
  const now = new Date().toISOString()

  const franceBase: SourceLink[] = [
    { title: 'France-Visas (official portal)', url: 'https://france-visas.gouv.fr/' },
    { title: 'France-Visas (Student)', url: 'https://www.france-visas.gouv.fr/en/web/france-visas/etudiant' },
  ]

  const spainBase: SourceLink[] = [
    { title: 'Spain consular services (official)', url: 'https://www.exteriores.gob.es/Embajadas/elcairo/en/ServiciosConsulares/Paginas/inicio.aspx' },
  ]

  const ukTourist: SourceLink[] = [
    { title: 'UK Standard Visitor visa (official)', url: 'https://www.gov.uk/standard-visitor' },
  ]
  const ukStudy: SourceLink[] = [
    { title: 'UK Student visa (official)', url: 'https://www.gov.uk/student-visa' },
  ]
  const ukWork: SourceLink[] = [
    { title: 'UK Skilled Worker visa (official)', url: 'https://www.gov.uk/skilled-worker-visa' },
  ]

  const usaTourist: SourceLink[] = [
    { title: 'U.S. Visitor Visa (official)', url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html' },
  ]
  const usaStudy: SourceLink[] = [
    { title: 'U.S. Student Visa (official)', url: 'https://www.travel.state.gov/content/travel/en/us-visas/study/student-visa.html' },
  ]
  const usaWork: SourceLink[] = [
    { title: 'U.S. Temporary Worker Visas (official)', url: 'https://travel.state.gov/content/travel/en/us-visas/employment/temporary-worker-visas.html' },
  ]

  const canadaTourist: SourceLink[] = [
    { title: 'Canada: Visit (official)', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html' },
  ]
  const canadaStudy: SourceLink[] = [
    { title: 'Canada: Study permits (official)', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html' },
  ]
  const canadaWork: SourceLink[] = [
    { title: 'Canada: Work permits (official)', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html' },
  ]

  const globalSources: SourceLink[] = [
    { title: 'EU visa policy (official)', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en' },
  ]

  const seeds: Array<{
    destinationId: string
    visaTypeId: string
    sources: SourceLink[]
  }> = [
    { destinationId: '*', visaTypeId: '*', sources: globalSources },
    { destinationId: 'france', visaTypeId: '*', sources: franceBase },
    { destinationId: 'spain', visaTypeId: '*', sources: spainBase },
    { destinationId: 'uk', visaTypeId: 'tourist', sources: ukTourist },
    { destinationId: 'uk', visaTypeId: 'study', sources: ukStudy },
    { destinationId: 'uk', visaTypeId: 'work', sources: ukWork },
    { destinationId: 'usa', visaTypeId: 'tourist', sources: usaTourist },
    { destinationId: 'usa', visaTypeId: 'study', sources: usaStudy },
    { destinationId: 'usa', visaTypeId: 'work', sources: usaWork },
    { destinationId: 'canada', visaTypeId: 'tourist', sources: canadaTourist },
    { destinationId: 'canada', visaTypeId: 'study', sources: canadaStudy },
    { destinationId: 'canada', visaTypeId: 'work', sources: canadaWork },
  ]

  for (const seed of seeds) {
    await upsertRule(db, {
      id: crypto.randomUUID(),
      destinationId: seed.destinationId,
      visaTypeId: seed.visaTypeId,
      originCountryCode: '*',
      documents: jsonArray([]),
      sources: jsonArray(seed.sources),
      lastVerifiedAt: now,
      active: 1,
    })
  }
}

function pickSources(rule: RuleRow | null, fallback: RuleRow | null): SourceLink[] {
  const primary = rule ? safeParseJsonArray(rule.sources) : []
  if (primary.length) return primary as SourceLink[]
  const fb = fallback ? safeParseJsonArray(fallback.sources) : []
  return fb as SourceLink[]
}

async function findFallbackRule(db: D1Database, destinationId: string, visaTypeId: string) {
  const exact = await db
    .prepare(
      `SELECT * FROM "DocumentRules" WHERE "active"=1 AND "destinationId"=? AND "visaTypeId"=? AND "originCountryCode"='*' LIMIT 1`
    )
    .bind(destinationId, visaTypeId)
    .first<RuleRow>()
  if (exact) return exact

  const destAnyVisa = await db
    .prepare(
      `SELECT * FROM "DocumentRules" WHERE "active"=1 AND "destinationId"=? AND "visaTypeId"='*' AND "originCountryCode"='*' LIMIT 1`
    )
    .bind(destinationId)
    .first<RuleRow>()
  if (destAnyVisa) return destAnyVisa

  return db
    .prepare(
      `SELECT * FROM "DocumentRules" WHERE "active"=1 AND "destinationId"='*' AND "visaTypeId"='*' AND "originCountryCode"='*' LIMIT 1`
    )
    .first<RuleRow>()
}

router.get('/', async c => {
  try {
    await ensureRulesTable(c.env.DB)
    const destinationId = c.req.query('destinationId') || ''
    const visaTypeId = c.req.query('visaTypeId') || ''
    const origin = (c.req.query('origin') || '').toUpperCase()

    if (!destinationId || !visaTypeId || !origin) {
      return c.json({ success: false, error: 'Missing destinationId, visaTypeId, or origin' }, 400)
    }

    const rule = await c.env.DB
      .prepare(
        `SELECT * FROM "DocumentRules" WHERE "active"=1 AND "destinationId"=? AND "visaTypeId"=? AND "originCountryCode"=? LIMIT 1`
      )
      .bind(destinationId, visaTypeId, origin)
      .first<RuleRow>()

    const fallback = await findFallbackRule(c.env.DB, destinationId, visaTypeId)

    const documents = rule ? (safeParseJsonArray(rule.documents) as string[]) : null
    const sources = pickSources(rule, fallback)

    return c.json({
      success: true,
      data: {
        matched: Boolean(rule),
        documents,
        sources,
      },
    })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to load rules' }, 500)
  }
})

router.get('/all', authenticate, requireAdmin, async c => {
  try {
    await ensureRulesTable(c.env.DB)
    const rows = await c.env.DB
      .prepare(`SELECT * FROM "DocumentRules" ORDER BY "destinationId" ASC, "visaTypeId" ASC, "originCountryCode" ASC`)
      .all<RuleRow>()
    return c.json({ success: true, data: rows.results ?? [] })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to list rules' }, 500)
  }
})

router.post('/', authenticate, requireAdmin, async c => {
  try {
    await ensureRulesTable(c.env.DB)
    const body = (await c.req.json()) as {
      destinationId: string
      visaTypeId: string
      originCountryCode: string
      documents?: string[]
      sources?: SourceLink[]
      lastVerifiedAt?: string
      active?: boolean
    }

    const destinationId = String(body.destinationId || '')
    const visaTypeId = String(body.visaTypeId || '')
    const originCountryCode = String(body.originCountryCode || '').toUpperCase()

    if (!destinationId || !visaTypeId || !originCountryCode) {
      return c.json({ success: false, error: 'Missing destinationId, visaTypeId, or originCountryCode' }, 400)
    }

    const now = new Date().toISOString()
    const id = await upsertRule(c.env.DB, {
      id: crypto.randomUUID(),
      destinationId,
      visaTypeId,
      originCountryCode,
      documents: jsonArray(body.documents ?? []),
      sources: jsonArray(body.sources ?? []),
      lastVerifiedAt: body.lastVerifiedAt ? String(body.lastVerifiedAt) : now,
      active: body.active === false ? 0 : 1,
    })

    return c.json({ success: true, data: { id } })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to create rule' }, 500)
  }
})

router.put('/:id', authenticate, requireAdmin, async c => {
  try {
    await ensureRulesTable(c.env.DB)
    const id = c.req.param('id')
    const body = (await c.req.json()) as Partial<{
      documents: string[]
      sources: SourceLink[]
      lastVerifiedAt: string
      active: boolean
    }>

    const existing = await c.env.DB.prepare(`SELECT * FROM "DocumentRules" WHERE "id"=?`).bind(id).first<RuleRow>()
    if (!existing) {
      return c.json({ success: false, error: 'Rule not found' }, 404)
    }

    const now = new Date().toISOString()
    await c.env.DB
      .prepare(
        `UPDATE "DocumentRules" SET "documents"=?, "sources"=?, "lastVerifiedAt"=?, "active"=?, "updatedAt"=? WHERE "id"=?`
      )
      .bind(
        body.documents ? jsonArray(body.documents) : existing.documents,
        body.sources ? jsonArray(body.sources) : existing.sources,
        body.lastVerifiedAt ? String(body.lastVerifiedAt) : existing.lastVerifiedAt,
        body.active === false ? 0 : 1,
        now,
        id
      )
      .run()

    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to update rule' }, 500)
  }
})

router.delete('/:id', authenticate, requireAdmin, async c => {
  try {
    await ensureRulesTable(c.env.DB)
    const id = c.req.param('id')
    await c.env.DB.prepare(`DELETE FROM "DocumentRules" WHERE "id"=?`).bind(id).run()
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to delete rule' }, 500)
  }
})

export default router

