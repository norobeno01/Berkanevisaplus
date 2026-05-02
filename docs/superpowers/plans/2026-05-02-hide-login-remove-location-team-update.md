# Hide Login Button + Remove Location + Update Team Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide the Login button from the public UI, remove all address/location and other contact details except email, and replace the Home page team names + images with generic titles and AI-generated portraits.

**Architecture:** Make UI-only changes in the React app (Vite + React Router). Keep the `/login` route working (Approach A) but remove any header/menu entry points. Reduce contact details in Footer and Contact page to email-only, removing map/location references and related translations.

**Tech Stack:** React 18, TypeScript, React Router, i18next, TailwindCSS, Vite

---

## File Map

**Modify**
- `/workspace/src/App.tsx` — remove header/menu Login button (desktop + mobile)
- `/workspace/src/components/layout/Footer.tsx` — show email only; remove address/phone/hours + map link
- `/workspace/src/pages/company/Contact.tsx` — keep contact form + email card; remove other cards, map iframe, directions link, floating WhatsApp button
- `/workspace/src/pages/Home.tsx` — replace team member hardcoded names with generic titles; replace team images with AI portraits (required image URL format)
- `/workspace/src/locales/en/translation.json` — remove location wording; add team title keys
- `/workspace/src/locales/fr/translation.json` — remove location wording; add team title keys
- `/workspace/src/locales/es/translation.json` — remove location wording; add team title keys
- `/workspace/src/locales/ar/translation.json` — remove location wording; add team title keys

**Validate**
- `npm run check`
- `npm run lint`
- `npm run build`

---

### Task 1: Hide Login Button in Header (UI Only)

**Files:**
- Modify: `/workspace/src/App.tsx`

- [ ] **Step 1: Remove desktop Login button**

Update the header action area so the unauthenticated branch no longer renders the Login button.

Replace:
```tsx
{isAuthenticated ? (
  <Button variant="ghost" onClick={logout} className="hidden md:flex text-red-400 hover:text-red-300 hover:bg-red-400/10">
    <LogOut className="h-4 w-4 mr-2" /> Logout
  </Button>
) : (
  <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground">
    <Link to="/login"><User className="h-4 w-4 mr-2" /> Login</Link>
  </Button>
)}
```

With:
```tsx
{isAuthenticated ? (
  <Button variant="ghost" onClick={logout} className="hidden md:flex text-red-400 hover:text-red-300 hover:bg-red-400/10">
    <LogOut className="h-4 w-4 mr-2" /> Logout
  </Button>
) : null}
```

Then remove the now-unused `User` import if nothing else uses it:
```tsx
import { Globe, Menu, X, LogOut } from 'lucide-react'
```

- [ ] **Step 2: Remove mobile menu Login button**

Update the mobile menu section so the unauthenticated branch no longer renders the Login button.

Replace:
```tsx
{isAuthenticated ? (
  <Button variant="outline" onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-400/10">
    <LogOut className="h-4 w-4 mr-2" /> Logout
  </Button>
) : (
  <Button asChild variant="outline" className="w-full glass text-foreground hover:bg-foreground/5">
    <Link to="/login" onClick={() => setIsMenuOpen(false)}><User className="h-4 w-4 mr-2" /> Login</Link>
  </Button>
)}
```

With:
```tsx
{isAuthenticated ? (
  <Button variant="outline" onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-400/10">
    <LogOut className="h-4 w-4 mr-2" /> Logout
  </Button>
) : null}
```

- [ ] **Step 3: Verify `/login` still works by route**

Confirm `Route path="/login"` remains unchanged.

---

### Task 2: Footer Email-Only (Remove Address/Location/Phone/Hours)

**Files:**
- Modify: `/workspace/src/components/layout/Footer.tsx`
- Modify: `/workspace/src/locales/*/translation.json`

- [ ] **Step 1: Remove address, phone, and working hours UI rows**

In the “Contact Info” list, keep only the email item and remove:
- the MapPin item (address + maps link)
- the Phone item
- the Clock item (working hours)

- [ ] **Step 1.1: Update Footer icon imports**

Replace:
```tsx
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, Linkedin } from 'lucide-react'
```

With:
```tsx
import { Mail, Facebook, Instagram, Linkedin } from 'lucide-react'
```

- [ ] **Step 2: Remove default address/phone/hours values from local state**

Keep `email` defaults, and ensure the settings merge logic won’t reintroduce removed fields into the UI.

- [ ] **Step 2.1: Update Footer state shape + merge logic**

Replace the state initializer with email-only contact fields:
```tsx
const [socialLinks, setSocialLinks] = useState({
  facebook: "https://facebook.com/e-visaschengen",
  instagram: "https://instagram.com/e-visaschengen",
  linkedin: "https://linkedin.com/company/e-visaschengen",
  x: "https://x.com/e-visaschengen",
  tiktok: "https://tiktok.com/@e-visaschengen",
  email: "evisaschengen@gmail.com"
})
```

Update merge logic so only social URLs (allow empty) + email (non-empty) are applied:
```tsx
for (const key in data.data) {
  if (['facebook', 'instagram', 'linkedin', 'x', 'tiktok'].includes(key)) {
    merged[key as keyof typeof merged] = data.data[key] || ''
  } else if (key === 'email' && data.data[key] && data.data[key].trim() !== '') {
    merged.email = data.data[key]
  }
}
```

- [ ] **Step 2.2: Replace Contact Info list with email-only**

Replace the whole Contact Info list body with just the email row:
```tsx
<ul className="space-y-4 text-sm text-muted-foreground">
  <li className="flex items-center space-x-3">
    <Mail className="h-5 w-5 text-gold-400 shrink-0" />
    <span>{socialLinks.email}</span>
  </li>
</ul>
```

- [ ] **Step 3: Update footer description translations to remove location wording**

Update the `footer.description` strings to remove any city/country mention.

Use these values (adjust only the string values, not the keys):
```json
{
  "footer": {
    "description": "Your trusted partner for Schengen and North American visas. We turn complex immigration procedures into a seamless journey."
  }
}
```

---

### Task 3: Contact Page Email-Only (Remove Map + WhatsApp + Phone + Hours)

**Files:**
- Modify: `/workspace/src/pages/company/Contact.tsx`
- Modify: `/workspace/src/locales/*/translation.json`

- [ ] **Step 1: Reduce contact cards grid to email-only**

Remove the Phone, WhatsApp, and Working Hours cards. Keep the Email card.

- [ ] **Step 1.1: Update Contact icon imports**

Replace:
```tsx
import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react'
```

With:
```tsx
import { Mail } from 'lucide-react'
```

- [ ] **Step 1.2: Update Contact settings state to email-only**

Replace:
```tsx
const [settings, setSettings] = useState({
  phone: "+2126600490490",
  email: "evisaschengen@gmail.com",
  whatsapp: "+2126600490490",
  workingHours: "Mon-Fri: 09:00 - 18:00\nSat: 09:00 - 13:00"
})
```

With:
```tsx
const [settings, setSettings] = useState({
  email: "evisaschengen@gmail.com"
})
```

Update merge logic to apply email only:
```tsx
for (const key in data.data) {
  if (key === 'email' && data.data[key] && data.data[key].trim() !== '') {
    merged.email = data.data[key]
  }
}
```

- [ ] **Step 1.3: Keep only the email card**

Replace the cards section with:
```tsx
<div className="grid gap-6">
  <Card className="glass-card border-border">
    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
      <div className="h-12 w-12 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500">
        <Mail className="h-6 w-6" />
      </div>
      <h3 className="font-display font-bold text-lg text-foreground">{t('contact.emailUs')}</h3>
      <p className="text-muted-foreground">{settings.email}</p>
    </CardContent>
  </Card>
</div>
```

- [ ] **Step 2: Remove map iframe + Get Directions button**

Delete the map container (iframe block) and any links pointing to maps.

- [ ] **Step 3: Remove floating WhatsApp button**

Delete the fixed-position WhatsApp anchor.

- [ ] **Step 4: Update contact subtitle translations to remove “visit our office” / location wording**

Update `contact.subtitle` strings to avoid referencing visiting an office.

Use these values:
```json
{
  "contact": {
    "subtitle": "Our experts are ready to assist you with your visa application. Contact us online."
  }
}
```

---

### Task 4: Home Team Section — Generic Titles + AI Portraits

**Files:**
- Modify: `/workspace/src/pages/Home.tsx`
- Modify: `/workspace/src/locales/*/translation.json`

- [ ] **Step 1: Replace personal names with generic titles**

Replace the `name` field for each member with translation-backed generic titles (3 roles). Example keys:
- `home.team.members.leadConsultant`
- `home.team.members.visaSpecialist`
- `home.team.members.caseCoordinator`

- [ ] **Step 2: Replace team images with AI portrait URLs (required format)**

Use:
`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt={prompt}&image_size={image_size}`

Choose 3 distinct prompts for professional studio portraits (non-real people) aligned to each role, with `image_size=portrait_4_3` or `square_hd`.

- [ ] **Step 3: Update member descriptions to be non-identifying**

Ensure `desc` strings are generic (no years/locations that imply a real individual or specific office location).

Implement the team array as:
```tsx
{[
  {
    name: t('home.team.members.leadConsultant', 'Lead Consultant'),
    role: t('home.team.roles.leadConsultant', 'Schengen & Canada Guidance'),
    img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20studio%20portrait%2C%20male%20immigration%20consultant%2C%20business%20attire%2C%20neutral%20background%2C%20soft%20lighting%2C%20photorealistic%2C%20high%20detail%2C%20clean%20composition%2C%20no%20text%2C%20no%20watermark&image_size=portrait_4_3",
    desc: t('home.team.descriptions.leadConsultant', 'Guides your case strategy and eligibility from start to finish.')
  },
  {
    name: t('home.team.members.visaSpecialist', 'Visa Specialist'),
    role: t('home.team.roles.visaSpecialist', 'Document Preparation'),
    img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20studio%20portrait%2C%20female%20visa%20specialist%2C%20business%20casual%2C%20neutral%20background%2C%20soft%20lighting%2C%20photorealistic%2C%20high%20detail%2C%20clean%20composition%2C%20no%20text%2C%20no%20watermark&image_size=portrait_4_3",
    desc: t('home.team.descriptions.visaSpecialist', 'Prepares your documents to match official requirements and formats.')
  },
  {
    name: t('home.team.members.caseCoordinator', 'Case Coordinator'),
    role: t('home.team.roles.caseCoordinator', 'Follow-up & Scheduling'),
    img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20studio%20portrait%2C%20male%20case%20coordinator%2C%20smart%20casual%2C%20neutral%20background%2C%20soft%20lighting%2C%20photorealistic%2C%20high%20detail%2C%20clean%20composition%2C%20no%20text%2C%20no%20watermark&image_size=portrait_4_3",
    desc: t('home.team.descriptions.caseCoordinator', 'Keeps your application on track with clear updates and next steps.')
  }
].map((member, idx) => (
```

Add these translation keys (example for English; repeat in FR/ES/AR with appropriate translations or English fallbacks):
```json
{
  "home": {
    "team": {
      "teamTitle": "Our Expert Team",
      "teamSubtitle": "Meet the specialists dedicated to your success.",
      "members": {
        "leadConsultant": "Lead Consultant",
        "visaSpecialist": "Visa Specialist",
        "caseCoordinator": "Case Coordinator"
      },
      "roles": {
        "leadConsultant": "Schengen & Canada Guidance",
        "visaSpecialist": "Document Preparation",
        "caseCoordinator": "Follow-up & Scheduling"
      },
      "descriptions": {
        "leadConsultant": "Guides your case strategy and eligibility from start to finish.",
        "visaSpecialist": "Prepares your documents to match official requirements and formats.",
        "caseCoordinator": "Keeps your application on track with clear updates and next steps."
      }
    }
  }
}
```

---

### Task 5: Verification

**Files:**
- N/A (commands only)

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
Expected: exits 0.

- [ ] **Step 3: Production build**

Run:
```bash
npm run build
```
Expected: exits 0.
