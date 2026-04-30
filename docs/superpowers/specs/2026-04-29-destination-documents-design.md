# Destination Documents by Origin (Design Spec)

## Summary
Add an “Origin country” selector to each destination on the Visas page. Based on (Destination, Visa type, Origin), show a tailored document checklist and official source links. If no exact match exists, fall back to the current general checklist for that visa type while still showing official sources. Add an Admin interface to manage rules later. Hide appointment and services pages (redirect to Home).

## Goals
- Let users pick:
  - Destination country (existing)
  - Visa type (existing tabs)
  - Origin country (new)
- Display:
  - Required documents for the selected combination
  - Official sources links (always shown)
- Provide a scalable data model and admin UI to create/edit/delete rules.
- Hide “Appointment” (/apply) and “Services” (/services) from the public site and redirect direct access to Home.

## Non-goals (V1)
- Full automated synchronization of official sources.
- Complex “closest match” inference beyond the chosen fallback behavior.
- User accounts / saving user selections.
- PDF generation for checklists (existing button can remain non-functional or be handled later).

## Current Code Touchpoints
- Visas UI is a single route with internal state: [Visas.tsx](file:///workspace/src/pages/visas/Visas.tsx)
- Country + visa types + current general requirements come from: [countries.ts](file:///workspace/src/data/countries.ts)
- Admin is a single large view with multiple tabs: [Admin.tsx](file:///workspace/src/pages/Admin.tsx)
- Backend destinations exist via Prisma model “Destination”: [destinations.ts](file:///workspace/api/routes/destinations.ts)

## User Experience
### Visas Page (Public)
1. User selects a Destination (existing grid).
2. User selects a Visa Type (existing tabs).
3. User selects Origin Country (new):
   - Show “Top origins” quick list.
   - “Other…” opens a searchable full list.
4. The page shows:
   - “Document Checklist”:
     - If rule exists: show rule documents list.
     - Else: show fallback `visa.requirements` from `countries.ts`.
   - “Official sources” section:
     - Show links from the matched rule if present.
     - If no rule exists, show “general official sources” links for that destination/visa type (seeded defaults) and/or global sources.

### Fallback Behavior (Approved)
If no exact match for (destinationId, visaTypeId, originCode):
- Use the existing `visa.requirements` (current behavior).
- Still show official sources links.

## Data Model (Rules)
### Identifiers
Reuse current IDs:
- Destination: `destinationId` must match `countriesData[].id` (e.g. `france`)
- Visa type: `visaTypeId` must match `countriesData[].visaTypes[].id` (e.g. `tourist`, `study`, `work`)
- Origin: `originCountryCode` as ISO 3166-1 alpha-2 (e.g. `MA`, `DZ`)

### Rule Entity
`DocumentRule`
- `id: string`
- `destinationId: string`
- `visaTypeId: string`
- `originCountryCode: string`
- `documents: string[]`
- `sources: { title: string; url: string }[]`
- `lastVerifiedAt: string` (ISO timestamp string)
- `active: boolean`

### Supporting Entities
`OriginCountry`
- `code: string` (ISO alpha-2)
- `name: string` (English canonical)
- `isTop: boolean` (for “Top origins”)
- `active: boolean`

`GeneralSource`
- `id: string`
- `destinationId?: string` (optional scope)
- `visaTypeId?: string` (optional scope)
- `title: string`
- `url: string`
- `active: boolean`

## API Design
### Public endpoints
- `GET /api/document-rules?destinationId=...&visaTypeId=...&origin=...`
  - Returns `rule` if exists, else `null`, plus `sources` (rule sources if rule exists, else fallback sources).
- `GET /api/origins`
  - Returns `{ top: OriginCountry[], all: OriginCountry[] }` (active only).

### Admin endpoints (protected)
- `GET /api/document-rules/all` (admin list, filterable)
- `POST /api/document-rules` (create rule)
- `PUT /api/document-rules/:id` (update rule)
- `DELETE /api/document-rules/:id`
- `GET /api/origins/all`
- `PUT /api/origins` (bulk update top flags / active flags)
- `GET /api/document-sources/all`
- `POST /api/document-sources`
- `PUT /api/document-sources/:id`
- `DELETE /api/document-sources/:id`

## Admin UI (Manage Rules Later)
Add a new admin tab (alongside existing tabs) in [Admin.tsx](file:///workspace/src/pages/Admin.tsx):
- “Documents Rules”
  - Filters:
    - Destination (dropdown from `countriesData`)
    - Visa type (dropdown based on selected destination’s visaTypes)
    - Origin (dropdown/search)
  - Rules table:
    - Destination / Visa type / Origin / Active / Last verified
    - Edit / Delete actions
  - Rule editor:
    - Multi-line documents list editor
    - Sources list editor (title + URL)
    - “Last verified” date picker / quick set to “now”
- “Origins”
  - Toggle `isTop` and `active`
  - Search + bulk edit

## Seeding “Real Info” + Official Sources Links
### Approach
- Seed a baseline set of rules:
  - For each destination + visaType in your current `countriesData`, create:
    - A default “general” set of official sources (EU/consulate/VFS/TLS/BLS/IRCC/US travel state dept where applicable).
    - For top origin countries (e.g., MA/DZ/TN/…): create rules where official sources explicitly specify additional documents (if verifiable).
- Every rule includes `sources[]`.
- Store sources links with titles (e.g., “France-Visas official checklist”, “VFS Global Spain requirements”, etc.).

### Verification policy
- Always include at least 1 official source per destination + visa type (even when rule is missing).
- Include `lastVerifiedAt` for transparency.

## Hiding Appointment + Services (Informational Mode)
### Public site behavior (approved)
- Remove navigation links:
  - `/apply`
  - `/services`
- Redirect direct access:
  - Visiting `/apply` redirects to `/`
  - Visiting `/services` redirects to `/`
- Remove/replace CTAs linking to `/apply`:
  - Current CTA in [Visas.tsx](file:///workspace/src/pages/visas/Visas.tsx) should change to a contact CTA (e.g., “Contact Us”).
  - Services page can remain in codebase but becomes inaccessible via nav and redirects on direct route.

## UX/SEO Notes
- Origin/visa selections should update the visible checklist without changing the URL (V1).
- Optional later enhancement: add query params `?dest=france&visa=tourist&origin=MA` for shareable links.

## Error Handling
- If API fails to load rules/origins:
  - Show current general requirements (already available locally via `countriesData`)
  - Show a minimal “official sources” fallback (hardcoded global sources list).

## Testing / Validation
- Visas page:
  - Selecting a destination + visa type + origin updates checklist.
  - No rule available → checklist falls back to current `visa.requirements`.
  - Sources always show.
- Admin:
  - Create/update/delete rule works and reflects on Visas page.
- Hiding pages:
  - `/apply` and `/services` are not in nav and redirect to `/`.

