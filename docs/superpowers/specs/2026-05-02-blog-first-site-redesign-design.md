# Blog-First Site Redesign (Hybrid) — Design Spec

## Goal

Reposition the website as a **visa & immigration blog** while keeping the existing **Visas** section fully featured and visible in top navigation.

## Non-Goals

- Removing or simplifying the Visas page features
- Building an email newsletter backend (subscription storage, email sending)
- Reworking authentication / admin portal behavior (kept as-is, but can be hidden later)
- Rewriting the backend blog API (use existing `/api/blogs` routes)

## Current State (Summary)

- Navigation currently includes: Home, Visas, Blog, Contact, About
- Blog pages exist:
  - `/blog` (listing) fetches `/api/blogs`
  - `/blog/:slug` (post) fetches `/api/blogs/:slug`
- Home page is currently a marketing-style landing page with multiple non-blog sections
- i18n is used across the app (`src/locales/*/translation.json`)

## Target Information Architecture

### Navigation (Top)

- Home (`/`) — blog-first landing
- Visas (`/visas`) — informative, feature-rich visa requirements/tools
- Blog (`/blog`) — full archive + search/filter
- About (`/about`) — editorial/about-us style
- Contact (`/contact`) — minimal contact page (email only + form)

### Routes (No new routes required)

- Keep existing routes; update content/layout:
  - `/` redesigned to blog-first
  - `/blog` enhanced with filtering/search
  - `/about` / `/contact` copy updated to match blog/editorial profile
  - `/visas` unchanged functionally

## Homepage (Blog-First) Layout

### Section 1 — Blog Hero

**Purpose:** Immediately communicate “this is a blog”, not a service/agency homepage.

**Content:**
- Title: “Visa & Immigration Blog”
- Subtitle: short promise (guides, updates, checklists, embassy process)
- Primary CTA: “Read Latest Articles” (scrolls to latest section or links to `/blog`)
- Secondary CTA: “Explore Visa Requirements” (links to `/visas`)

### Section 2 — Featured Post

**Purpose:** Promote one flagship article.

**Behavior:**
- Uses the newest post (or first post in the fetched list) as default featured post
- Visual: large card with image, category, title, excerpt, date

### Section 3 — Latest Posts Grid

**Purpose:** Encourage browsing and improve time-on-site.

**Behavior:**
- Shows a grid (6–9 posts)
- Each card links to `/blog/:slug`
- “View All Articles” CTA links to `/blog`

### Section 4 — Categories

**Purpose:** Let users quickly explore topics.

**Behavior:**
- Categories derived from post `category`
- Clicking category navigates to `/blog?category=<category>` (query param) or sets internal filter state then navigates

### Section 5 — Visas Entry Point (Strong)

**Purpose:** Keep Visas section prominent while remaining blog-first.

**Content:**
- Short description: “Find requirements by destination…”
- Primary CTA button: “Explore Visa Requirements” → `/visas`

## Blog Page Enhancements

### Blog Listing (`/blog`)

Add:
- Category filter (chips/select) driven from loaded posts
- Search input (client-side, filters by title/excerpt)
- Optional “Recent posts” sorting (already ordered server-side; keep)

### Blog Post (`/blog/:slug`)

Keep:
- Current hero, metadata, markdown rendering

Optional enhancements (safe, incremental):
- Next/Previous links (based on loaded list if available)
- “Related posts” section by same category (optional)

## About + Contact Copy Alignment

### About (`/about`)

Shift copy toward:
- Editorial mission: publish guides and updates
- Credibility without personal identities

### Contact (`/contact`)

Keep as:
- Form + email-only info (already implemented)
- Ensure subtitle is blog/editorial friendly (no office/location language)

## i18n / Content Keys

Add translation keys (EN/FR/ES/AR) for:
- Home blog hero title/subtitle + CTAs
- Home section labels: featured/latest/categories/visas CTA
- Blog filter/search labels

## SEO

- Ensure Home and Blog SEO titles/descriptions reflect blog positioning
- Keep Organization JSON-LD schema (already updated)

## Success Criteria

- Home clearly looks like a blog (featured/latest/categories)
- Visas remains accessible and visible in nav, with no feature regression
- Blog listing supports category + search filtering
- About/Contact text matches blog/editorial profile and stays anonymous
- `npm run check`, `npm run lint`, `npm run build` pass

