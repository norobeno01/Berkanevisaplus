# Blog-First Home + Blog Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Home to be blog-first (visa & immigration blog) while keeping Visas fully featured and visible in nav; enhance Blog listing with category filtering + search; align About/Contact copy with blog/editorial profile.

**Architecture:** Keep existing routes and backend APIs. Build blog-first Home by fetching `/api/blogs` (same source as `/blog`) and rendering featured/latest/categories sections. Implement Blog filtering/search fully client-side. Add i18n keys for new blog-home UI in EN/FR/ES/AR. Keep `/visas` behavior unchanged.

**Tech Stack:** React 18, TypeScript, React Router, i18next, TailwindCSS, Vite

---

## File Map

**Modify**
- `/workspace/src/pages/Home.tsx` — replace marketing landing sections with blog-first sections + strong Visas CTA
- `/workspace/src/pages/blog/BlogList.tsx` — add search + category filter UI and client-side filtering
- `/workspace/src/pages/company/About.tsx` — update copy to editorial/blog profile (translation-driven)
- `/workspace/src/locales/en/translation.json` — add `homeBlog.*` keys; adjust `about.*` to editorial tone
- `/workspace/src/locales/fr/translation.json` — add `homeBlog.*` keys; adjust `about.*`
- `/workspace/src/locales/es/translation.json` — add `homeBlog.*` keys; adjust `about.*`
- `/workspace/src/locales/ar/translation.json` — add `homeBlog.*` keys; adjust `about.*`

**Validate**
- `npm run check`
- `npm run lint`
- `npm run build`

---

### Task 1: Add i18n Keys for Blog-First Home + Blog Filters

**Files:**
- Modify: `/workspace/src/locales/en/translation.json`
- Modify: `/workspace/src/locales/fr/translation.json`
- Modify: `/workspace/src/locales/es/translation.json`
- Modify: `/workspace/src/locales/ar/translation.json`

- [ ] **Step 1: Add `homeBlog` keys to EN**

Add at top-level (next to `blogPage`):
```json
{
  "homeBlog": {
    "heroTag": "Visa & Immigration Blog",
    "heroTitle": "Visa & Immigration Blog",
    "heroSubtitle": "Guides, updates, and checklists to help you understand visa procedures and immigration pathways.",
    "ctaReadLatest": "Read Latest Articles",
    "ctaExploreVisas": "Explore Visa Requirements",
    "featuredTitle": "Featured Article",
    "latestTitle": "Latest Articles",
    "viewAll": "View All Articles",
    "categoriesTitle": "Browse by Category"
  },
  "blogFilters": {
    "searchPlaceholder": "Search articles...",
    "allCategories": "All categories"
  }
}
```

- [ ] **Step 2: Add `homeBlog` + `blogFilters` keys to FR/ES/AR**

Use natural translations; keep meaning. If unsure, use English values (but keep the keys identical).

- [ ] **Step 3: Update About translations toward editorial tone**

Update `about.subtitle`, `about.p1`, `about.p2` in all locales to describe an editorial blog mission (no location/branch).

---

### Task 2: Blog Listing Filters (Category + Search)

**Files:**
- Modify: `/workspace/src/pages/blog/BlogList.tsx`

- [ ] **Step 1: Add state for search + category**

Add:
```tsx
const [searchQuery, setSearchQuery] = useState('')
const [activeCategory, setActiveCategory] = useState<string>('all')
```

- [ ] **Step 2: Derive categories from loaded posts**

Add:
```tsx
const categories = Array.from(new Set(blogs.map(b => b.category).filter(Boolean))).sort((a, b) => a.localeCompare(b))
```

- [ ] **Step 3: Filter posts client-side**

Add memo:
```tsx
const filteredBlogs = useMemo(() => {
  const q = searchQuery.trim().toLowerCase()
  return blogs.filter(post => {
    const title = i18n.language === 'ar' && post.titleAr ? post.titleAr : i18n.language === 'fr' && post.titleFr ? post.titleFr : post.title
    const excerpt = i18n.language === 'ar' && post.excerptAr ? post.excerptAr : i18n.language === 'fr' && post.excerptFr ? post.excerptFr : post.excerpt

    const matchesCategory = activeCategory === 'all' ? true : post.category === activeCategory
    const matchesQuery = !q ? true : `${title} ${excerpt}`.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
}, [blogs, searchQuery, activeCategory, i18n.language])
```

- [ ] **Step 4: Add filter UI above the grid**

Use the existing `Input` component and simple buttons/chips for categories:
```tsx
<div className="flex flex-col gap-4 mb-10">
  <div className="max-w-xl">
    <Input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder={t('blogFilters.searchPlaceholder', 'Search articles...')}
      className="bg-card border-border text-foreground"
    />
  </div>
  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      onClick={() => setActiveCategory('all')}
      className={`px-3 py-1.5 rounded-full text-sm border ${activeCategory === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:text-foreground'}`}
    >
      {t('blogFilters.allCategories', 'All categories')}
    </button>
    {categories.map(cat => (
      <button
        key={cat}
        type="button"
        onClick={() => setActiveCategory(cat)}
        className={`px-3 py-1.5 rounded-full text-sm border ${activeCategory === cat ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:text-foreground'}`}
      >
        {cat}
      </button>
    ))}
  </div>
</div>
```

- [ ] **Step 5: Render `filteredBlogs` instead of `blogs`**

Replace `blogs.map(...)` with `filteredBlogs.map(...)`.

---

### Task 3: Blog-First Home (Featured + Latest + Categories + Visas CTA)

**Files:**
- Modify: `/workspace/src/pages/Home.tsx`

- [ ] **Step 1: Replace Home SEO title/description**

Update:
```tsx
<SEO
  title="Visa & Immigration Blog | E-Visa Schengen"
  description="Guides, updates, and checklists on visa procedures and immigration pathways."
/>
```

- [ ] **Step 2: Fetch blog posts for Home**

Add types and fetch:
```tsx
type Blog = {
  id: string
  title: string
  titleAr?: string
  titleFr?: string
  slug: string
  excerpt: string
  excerptAr?: string
  excerptFr?: string
  image: string
  category: string
  createdAt: string
}

const [blogs, setBlogs] = useState<Blog[]>([])
const [blogsLoading, setBlogsLoading] = useState(true)

useEffect(() => {
  fetch('/api/blogs')
    .then(res => res.json() as any)
    .then(data => {
      if (data?.success && Array.isArray(data.data)) setBlogs(data.data)
      setBlogsLoading(false)
    })
    .catch(() => setBlogsLoading(false))
}, [])
```

- [ ] **Step 3: Derive featured/latest/categories**

Add memo helpers:
```tsx
const featured = blogs[0]
const latest = blogs.slice(0, 9)
const categories = Array.from(new Set(blogs.map(b => b.category).filter(Boolean))).sort((a, b) => a.localeCompare(b))

const getTitle = (p: Blog) => i18n.language === 'ar' && p.titleAr ? p.titleAr : i18n.language === 'fr' && p.titleFr ? p.titleFr : p.title
const getExcerpt = (p: Blog) => i18n.language === 'ar' && p.excerptAr ? p.excerptAr : i18n.language === 'fr' && p.excerptFr ? p.excerptFr : p.excerpt
```

- [ ] **Step 4: Replace current Home sections with new layout**

Implement:
- Hero section using `t('homeBlog.*')` keys
- Featured card linking to `/blog/${featured.slug}`
- Latest grid linking to `/blog/${slug}`
- Categories chips linking to `/blog?category=${encodeURIComponent(cat)}`
- Visas CTA block linking to `/visas`

Remove non-blog sections that conflict with the blog-first positioning (testimonials/team/process/brands/destinations grid). Keep the overall visual style (glass, gradients).

- [ ] **Step 5: Ensure Visas remains reachable**

Add a prominent CTA button in hero and a dedicated Visas CTA section.

---

### Task 4: About Page Copy (Editorial)

**Files:**
- Modify: `/workspace/src/pages/company/About.tsx`

- [ ] **Step 1: Adjust headings to blog/editorial voice**

Update `about.tag/title/subtitle/whoWeAre/p1/p2` usage only via translations (do not hardcode).

- [ ] **Step 2: Keep stats cards but make them editorial-safe**

If stats numbers feel “agency-like”, update the labels via translations (keep layout).

---

### Task 5: Verification

- [ ] **Step 1: Typecheck**

Run:
```bash
npm run check
```
Expected: exits 0.

- [ ] **Step 2: Lint**

Run:
```bash
npm run lint
```
Expected: exits 0 (warnings acceptable if existing).

- [ ] **Step 3: Production build**

Run:
```bash
npm run build
```
Expected: exits 0.

