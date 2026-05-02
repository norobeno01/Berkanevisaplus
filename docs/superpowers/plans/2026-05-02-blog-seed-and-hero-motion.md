# Blog Seeding + Animated Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auto-seed EN/FR/AR starter blog articles on empty DB, and restore the old-style floating-image animated hero on the blog-first Home page with new blog-themed visuals.

**Architecture:** Add an idempotent seed function invoked by `GET /api/blogs` (so Home/Blog pages naturally trigger seeding). Store a `blogSeedVersion` flag in `Settings` to prevent duplicates. Rework Home hero to use framer-motion scroll transforms and floating image collage, keeping blog-first text/CTAs.

**Tech Stack:** Hono API + Prisma (SQLite/D1 adapter), React 18, TypeScript, framer-motion, i18next

---

## File Map

**Create**
- `/workspace/api/seed/blogSeedV1.ts` — seed version constant + seed blog post array (EN/FR/AR)

**Modify**
- `/workspace/api/routes/blogs.ts` — call seed function before returning published blogs
- `/workspace/src/pages/Home.tsx` — restore floating-image hero + motion with blog visuals; keep blog-first sections

**Validate**
- `npm run check`
- `npm run lint`
- `npm run build`

---

### Task 1: Add Seed Dataset (EN + FR + AR)

**Files:**
- Create: `/workspace/api/seed/blogSeedV1.ts`

- [ ] **Step 1: Create seed module**

Create `/workspace/api/seed/blogSeedV1.ts` with:
```ts
export const BLOG_SEED_VERSION = '2026-05-02-v1'

export type SeedBlogPost = {
  title: string
  titleFr: string
  titleAr: string
  slug: string
  excerpt: string
  excerptFr: string
  excerptAr: string
  content: string
  contentFr: string
  contentAr: string
  image: string
  category: string
  author: string
  published: boolean
}

export const blogSeedV1: SeedBlogPost[] = [
  {
    title: 'Schengen Visa Checklist: Documents You Actually Need',
    titleFr: 'Checklist Visa Schengen : les documents vraiment nécessaires',
    titleAr: 'قائمة تأشيرة شنغن: الوثائق التي تحتاجها فعلاً',
    slug: 'schengen-visa-checklist-documents',
    excerpt: 'A practical checklist to prepare your Schengen visa file (tourism/visit) and avoid common refusal reasons.',
    excerptFr: 'Une checklist pratique pour préparer votre dossier Schengen (tourisme/visite) et éviter les refus.',
    excerptAr: 'قائمة عملية لتحضير ملف تأشيرة شنغن (سياحة/زيارة) وتجنب أسباب الرفض الشائعة.',
    category: 'Schengen',
    author: 'Editorial Team',
    published: true,
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=close-up%20passport%20and%20travel%20documents%20on%20a%20desk%2C%20checklist%20paper%2C%20soft%20natural%20light%2C%20photorealistic%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=landscape_16_9',
    content: `<h2>What this checklist covers</h2><p>This guide focuses on a standard Schengen short-stay visa (Type C) for tourism or visiting family/friends. Requirements vary by consulate, but the structure is similar.</p><h2>Core documents</h2><ul><li>Valid passport (with blank pages)</li><li>Completed application form</li><li>Recent compliant photos</li><li>Travel medical insurance meeting Schengen rules</li><li>Flight reservation (or itinerary)</li><li>Hotel booking (or invitation letter)</li><li>Proof of financial means</li><li>Employment/student status proof</li></ul><h2>Strong supporting documents</h2><ul><li>Bank statements (consistent deposits)</li><li>Salary slips or business registration</li><li>Family ties / return reasons</li><li>Previous visas and travel history</li></ul><h2>Common mistakes that trigger refusal</h2><ul><li>Unclear trip purpose</li><li>Weak financial proof</li><li>Inconsistent dates and bookings</li><li>Missing insurance details</li></ul><p><strong>Tip:</strong> Keep your story consistent across form, cover letter, bookings, and supporting documents.</p>`,
    contentFr: `<h2>Ce que couvre cette checklist</h2><p>Ce guide concerne le visa Schengen court séjour (type C) pour tourisme/visite. Les exigences varient selon le consulat, mais la structure reste similaire.</p><h2>Documents de base</h2><ul><li>Passeport valide (pages libres)</li><li>Formulaire rempli</li><li>Photos conformes récentes</li><li>Assurance médicale voyage conforme</li><li>Réservation vol (ou itinéraire)</li><li>Réservation hôtel (ou invitation)</li><li>Justificatifs financiers</li><li>Preuve de statut (emploi/études)</li></ul><h2>Pièces de soutien fortes</h2><ul><li>Relevés bancaires cohérents</li><li>Bulletins de salaire / registre commerce</li><li>Attaches familiales / raisons de retour</li><li>Historique de visas/voyages</li></ul><h2>Erreurs fréquentes</h2><ul><li>Objet du voyage flou</li><li>Finances faibles</li><li>Incohérences dates/réservations</li><li>Assurance non conforme</li></ul><p><strong>Conseil :</strong> Gardez une histoire cohérente entre formulaire, lettre, réservations et justificatifs.</p>`,
    contentAr: `<h2>ماذا تغطي هذه القائمة؟</h2><p>هذا الدليل يخص تأشيرة شنغن قصيرة الإقامة (نوع C) للسياحة أو الزيارة. قد تختلف المتطلبات حسب القنصلية لكن الهيكل غالباً متشابه.</p><h2>الوثائق الأساسية</h2><ul><li>جواز سفر صالح (صفحات فارغة)</li><li>استمارة طلب مكتملة</li><li>صور حديثة مطابقة للمعايير</li><li>تأمين طبي للسفر مطابق لشروط شنغن</li><li>حجز طيران (أو برنامج رحلة)</li><li>حجز فندق (أو دعوة)</li><li>إثبات القدرة المالية</li><li>إثبات الوضعية (عمل/دراسة)</li></ul><h2>وثائق داعمة قوية</h2><ul><li>كشوفات بنكية بإيداعات منطقية</li><li>كشوف أجور/سجل تجاري</li><li>روابط عائلية وأسباب العودة</li><li>تاريخ السفر والتأشيرات السابقة</li></ul><h2>أخطاء تسبب الرفض</h2><ul><li>هدف سفر غير واضح</li><li>إثبات مالي ضعيف</li><li>عدم تطابق التواريخ والحجوزات</li><li>تأمين غير مطابق</li></ul><p><strong>نصيحة:</strong> اجعل القصة متناسقة بين الاستمارة، الرسالة، الحجوزات والوثائق.</p>`
  }
]
```

- [ ] **Step 2: Expand the seed list to 15–20 posts**

Append 14–19 more posts following the same structure (unique `slug` for each). Use categories:
`Schengen`, `Canada`, `USA`, `Documents`, `Refusals`, `Tips`.

Each new post must include EN/FR/AR `title/excerpt/content`, and `image` must use the required generated-image URL format.

---

### Task 2: Implement Idempotent Seeding in `GET /api/blogs`

**Files:**
- Modify: `/workspace/api/routes/blogs.ts`

- [ ] **Step 1: Import seed dataset**

Add:
```ts
import { BLOG_SEED_VERSION, blogSeedV1 } from '../seed/blogSeedV1'
```

- [ ] **Step 2: Add seed function**

Add inside the module:
```ts
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
```

- [ ] **Step 3: Call seeding before returning blogs**

In `router.get('/')`, before `findMany`, call:
```ts
await seedBlogsIfEmpty(prisma)
```

---

### Task 3: Restore Animated Floating-Image Hero on Home (Blog Visuals)

**Files:**
- Modify: `/workspace/src/pages/Home.tsx`

- [ ] **Step 1: Reintroduce scroll transforms**

Update imports to include:
```tsx
import { motion, useScroll, useTransform } from 'framer-motion'
```

Add:
```tsx
const { scrollYProgress } = useScroll()
const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100])
const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
```

- [ ] **Step 2: Implement floating image collage**

Replace the current hero section with:
- Background gradient blobs
- 3-image collage (main + two floating)
- Subtle infinite y-translation loops

Use blog-themed generated images, e.g.:
```tsx
const heroImages = {
  main: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=airport%20departure%20board%20and%20traveler%20desk%20with%20passport%2C%20soft%20light%2C%20photorealistic%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=landscape_16_9",
  front: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=hands%20holding%20passport%20with%20visa%20documents%2C%20clean%20background%2C%20studio%20lighting%2C%20photorealistic%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=portrait_4_3",
  top: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=neat%20document%20checklist%20with%20paperclips%20and%20stamp%20concept%2C%20minimal%20desk%2C%20photorealistic%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=square_hd"
}
```

- [ ] **Step 3: Keep blog-first copy + CTAs**

Keep i18n keys:
- `homeBlog.heroTitle`, `homeBlog.heroSubtitle`
- CTA 1: scroll to `#latest`
- CTA 2: link to `/visas`

---

### Task 4: Verification

- [ ] **Step 1: Typecheck**
```bash
npm run check
```

- [ ] **Step 2: Lint**
```bash
npm run lint
```

- [ ] **Step 3: Build**
```bash
npm run build
```

- [ ] **Step 4: Commit + push**
```bash
git add api/seed/blogSeedV1.ts api/routes/blogs.ts src/pages/Home.tsx
git commit -m "feat: seed starter blogs and restore animated home hero"
git push origin main
```

