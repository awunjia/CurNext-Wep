# CurNext

Marketing website for [curnext.app](https://curnext.app) - Next.js, React, [shadcn/ui](https://ui.shadcn.com/), Docker, Dokploy, and Cloudflare Turnstile.

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

**Builder: Dockerfile** (not Nixpacks). Path: `Dockerfile`. Context: `.`. Published port: `3000`.

1. Create an Application from this Git repo (branch you deploy, e.g. `prod`).
2. Build type → **Dockerfile**. Leave Dockerfile path as `Dockerfile`.
3. **Build Arguments** (required for client-side values baked into the image):
   - `NEXT_PUBLIC_SITE_URL=https://curnext.app`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY=...`
4. **Environment** (runtime secrets / server config - see `.env.example`):
   - `DATABASE_URL`, `DIRECT_URL` (Supabase Postgres)
   - `TURNSTILE_SECRET_KEY`
   - SMTP, R2/S3, `GROQ_API_KEY`, etc. as needed
5. Domains → attach `curnext.app` (and `www` if used). Cloudflare orange-cloud in front is fine.
6. Deploy. On start the container runs `prisma migrate deploy`, then Next.js on port 3000.
7. Configure Turnstile for `curnext.app` (and `localhost` for local testing).

Do not set `SITE_URL` / `NEXT_PUBLIC_SITE_URL` to `0.0.0.0` - that is only the container listen address (`HOSTNAME`).

## Turnstile

- Client widget: `src/components/turnstile-widget.tsx`
- Server verification: `src/lib/turnstile.ts`
- Example API: `POST /api/turnstile/verify`

Use the widget on Contact / Request Demo forms when those pages are implemented.

## Pages (scaffolded, not implemented)

Home, Solutions, Case Studies, API, Technologies, Contact Us, Privacy Policy, Terms and Conditions, GDPR Policies, Careers, Terms of Service, Cookie Policy, Security Policy, DPA, Documentation, Blog, How It Works, Pricing, Request Demo, Integrations, Data Centers, Security, Compliance, Partners.

Each route exists as a placeholder under `src/app/*/page.tsx`.
