# CurNext

Marketing website for [curnext.app](https://curnext.app) — Next.js, React, [shadcn/ui](https://ui.shadcn.com/), Docker, Dokploy, and Cloudflare Turnstile.

## Stack

- **Next.js** (App Router) + React for SEO-friendly marketing pages
- **shadcn/ui** (neutral / base-nova) for the design system
- **Cloudflare** at the edge; **Turnstile** for bot protection on forms
- **Docker** image for production; deploy with [Dokploy](https://dokploy.com)

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

App URL locally: `http://localhost:3003`

## Environment

| Variable | Local | Production |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3003` | `https://curnext.app` |
| `DATABASE_URL` | Postgres connection string | Postgres connection string |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key | Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Turnstile secret | Turnstile secret (Dokploy secrets) |

## Make commands

```bash
make help           # list commands
make fresh          # install, prisma generate, migrate deploy, start app
make migrate        # create/apply migrations (dev)
make migrate-deploy # apply pending migrations
make generate       # prisma generate
make studio         # Prisma Studio
make dev            # next dev (hot reload - always latest source)
make start          # rebuild production bundle, then serve latest on :3003
make start-only     # serve existing production build without rebuilding
```

## Prisma models

- `Contact` → `contacts` table (for Contact Us form)
- `DemoRequest` → `demo_requests` table (Request Demo form)

Schema: `prisma/schema.prisma`  
Initial migration: `prisma/migrations/20260807120000_init_contacts_and_demo_requests`

## Request Demo

1. Set `DATABASE_URL` and Turnstile keys in `.env`
2. Run `make fresh` (or `make migrate-deploy && make dev`)
3. Submit from `/request-demo` — Turnstile is verified, then Prisma saves the row

## Docker

```bash
docker compose up --build
```

Or build the image directly:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://curnext.app \
  --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key \
  -t curnext-web .
```

## Dokploy

1. Create an application from this repo.
2. Use the included `Dockerfile` (or Compose).
3. Set build args / env:
   - `NEXT_PUBLIC_SITE_URL=https://curnext.app`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY=...`
   - `TURNSTILE_SECRET_KEY=...`
4. Point the domain `curnext.app` at Dokploy, then put **Cloudflare** in front (proxy/orange-cloud).
5. Configure Turnstile for `curnext.app` (and `localhost` for local testing).

## Turnstile

- Client widget: `src/components/turnstile-widget.tsx`
- Server verification: `src/lib/turnstile.ts`
- Example API: `POST /api/turnstile/verify`

Use the widget on Contact / Request Demo forms when those pages are implemented.

## Pages (scaffolded, not implemented)

Home, Solutions, Case Studies, API, Technologies, Contact Us, Privacy Policy, Terms and Conditions, GDPR Policies, Careers, Terms of Service, Cookie Policy, Security Policy, DPA, Documentation, Blog, How It Works, Pricing, Request Demo, Integrations, Data Centers, Security, Compliance, Partners.

Each route exists as a placeholder under `src/app/*/page.tsx`.
