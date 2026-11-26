# Berkanevisaplus

Website for a Schengen visa assistance service in Berkane, Morocco. A React single page app with an API running on a Cloudflare Worker and a D1 database.

![Home page](docs/screenshots/home.png)

## Features
- Pages: home, visas, blog, about, contact, login and register
- Client portal and admin area, with role based access
- Languages: English, French, Spanish, Arabic (RTL)
- A keyword based help chatbot (rules, not AI)

## Stack
React, Vite, TypeScript, Hono-style API routes on Cloudflare Workers, Cloudflare D1.

## Setup
```bash
pnpm install
cp .env.example .env   # fill in your own values
pnpm dev
```

Required secrets (never commit them): `JWT_SECRET` (long random string), `ADMIN_EMAIL` (the address that becomes admin on registration). Optional: `LEGACY_PASSWORD_SALT` to upgrade old password hashes on login.

Set them on the Worker with `wrangler secret put JWT_SECRET`.

## Tests
```bash
pnpm test
pnpm build
```

## Security notes
Passwords are hashed with PBKDF2. The first registered user is not made admin automatically. Do not commit `.env` or database files.

## License
No license has been chosen yet, so all rights are reserved. Business content (text, contact details, branding) belongs to the site owner.
