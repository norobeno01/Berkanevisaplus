# Blog Seeding + Animated Hero (Blog-First) — Design Spec

## Goal

1. Add **more blog content** by auto-seeding a set of starter articles when the Blog database is empty, while keeping the Admin Blog Editor as the primary tool to add/edit posts.
2. Update the Home page hero to reintroduce the **old-style floating image collage + motion**, but with **new blog-themed visuals** and blog-first CTAs.

## Non-Goals

- Building a full CMS, roles system, or publishing workflow
- Implementing newsletter subscription backend
- Hiding or removing admin/auth routes (we only provide the login link)

## Admin Access

- Admin login route: `/login`
- Admin dashboard route: `/admin` (Blog Editor is available inside the dashboard UI)

## Current State

- Blog API routes exist in `/workspace/api/routes/blogs.ts`
  - Public: `GET /api/blogs` (published-only)
  - Admin: `POST /api/blogs` (requires admin auth)
- Blog data includes multilingual fields: `title/titleFr/titleAr`, `excerpt/excerptFr/excerptAr`, `content/contentFr/contentAr`
- Home hero is currently simplified (blog-first text + CTAs), without the old floating image collage.

## Requirements

### A) Auto-Seeding Blog Content (EN + FR + AR)

**Trigger:**
- Seeding runs on server-side request path(s) where the DB is available, and only if:
  - The blog table has **0** published posts (or 0 total posts; choose one and document it in code), AND
  - A deterministic “seed already applied” guard is false (idempotency).

**Idempotency / Safety:**
- Seeding must be safe to run multiple times without duplicating posts.
- Preferred guard:
  - Store a Settings flag like `blogSeedVersion = "2026-05-02-v1"` (or similar) in the Settings table, OR
  - Check for a known seed slug prefix and skip if found.

**Seed Content:**
- Insert 15–20 ready-to-publish articles.
- Each post includes:
  - `title`, `excerpt`, `content` in **English**
  - `titleFr`, `excerptFr`, `contentFr` in **French**
  - `titleAr`, `excerptAr`, `contentAr` in **Arabic**
  - `category` (examples: Schengen, Canada, USA, Documents, Refusals, Tips)
  - `image` (blog cover) using safe non-identifying visuals.

**Formatting:**
- Blog content will remain compatible with the existing renderer in `BlogPost`:
  - Use the existing HTML/markdown expectations (match current implementation).
  - No external embeds that require iframes.

**Editing:**
- Seeded posts must be editable from the existing Admin Blog Editor UI (no extra tooling required).

### B) Home Hero — Floating Image Collage + Motion (New Blog Visuals)

**Behavior:**
- Restore the old hero’s “floating image collage” feeling:
  - Main background image + 2–3 floating cards/images
  - Smooth motion transitions and subtle looping float animation
  - Scroll-based parallax (optional) if it already exists in the codebase and doesn’t hurt performance

**Visuals:**
- Replace old destination images with blog-themed visuals:
  - Passport close-up, airport signage, document checklist, visa stamp motif, travel planning desk
- Images must follow the project rule for generated images:
  - `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt={prompt}&image_size={image_size}`

**Content:**
- Hero title/subtitle remain blog-first and use i18n keys (`homeBlog.*`).
- CTAs:
  - “Read Latest Articles” → scroll to latest section
  - “Explore Visa Requirements” → `/visas`

**Performance:**
- Use `loading="lazy"` where appropriate.
- Avoid oversized images; prefer `image_size=landscape_16_9` or `portrait_4_3` depending on placement.

## SEO

- No local address/location fields are reintroduced.
- Keep Home SEO title and description aligned to the blog-first positioning.

## Success Criteria

- A fresh deployment with an empty DB shows a populated Blog + Home content without manual entry.
- Admin can log in via `/login` and edit seeded posts in `/admin` → Blog Editor.
- Home hero includes the floating collage + motion and feels similar to the old hero, but visually aligned to a blog.
- `npm run check`, `npm run lint`, `npm run build` all pass.

