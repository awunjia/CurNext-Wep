export const datacentersPage = {
  title: "EU cloud, anchored in Germany",
  description:
    "Application hosting on Hetzner in Germany. Database and authentication on Supabase in Frankfurt. Public traffic protected at the Cloudflare edge and distributed across load-balanced replicas.",
  leadNote:
    "This page explains where CurNext runs for EU buyers, IT, and procurement. It is not a status dashboard or a public inventory of machines.",
} as const;

export const datacentersRegions = [
  {
    provider: "Hetzner",
    region: "Germany",
    layer: "Application origins",
    body: "CurNext application containers for EU users run on Hetzner infrastructure in Germany.",
    runs: "Docker images for marketing, web SaaS, API, and related app containers as deployed",
    logo: "Hetzner",
  },
  {
    provider: "Supabase",
    region: "Frankfurt, Germany",
    layer: "Database + Auth",
    body: "PostgreSQL and Auth for the product run on Supabase in Frankfurt, Germany.",
    runs: "PostgreSQL, Supabase Auth",
    logo: "Supabase",
  },
  {
    provider: "Cloudflare",
    region: "Global edge",
    layer: "Edge / CDN / WAF",
    body: "DNS, TLS, WAF, and CDN sit in front of origins so only healthy, load-balanced replicas serve traffic.",
    runs: "DNS, TLS, WAF, CDN, Turnstile on public forms",
    logo: "Cloudflare",
  },
] as const;

export const datacentersObjectStorage = {
  provider: "Cloudflare R2",
  region: "EU jurisdiction option",
  body: "When object storage is used, uploads and BIM/plan files can use Cloudflare R2 with an EU jurisdiction option, including optional GDPR audit archive.",
} as const;

export const datacentersTraffic = {
  title: "How traffic flows",
  lead: "Public HTTPS terminates and is filtered at Cloudflare. App tiers scale as stateless Docker replicas behind load balancers in Germany.",
  steps: [
    "Internet",
    "Cloudflare (DNS, TLS, WAF, CDN)",
    "Load balancer(s)",
    "Docker replicas on Hetzner (Germany)",
    "Supabase Postgres + Auth (Frankfurt, Germany)",
  ],
  hosts: [
    { host: "www.curnext.app", role: "Marketing" },
    { host: "curnext.app", role: "Product SaaS" },
    { host: "api.curnext.app", role: "API" },
  ],
  healthNote:
    "Health checks use GET /api/health (marketing) and API health routes so load balancers only send traffic to healthy replicas.",
} as const;

export const datacentersStorage = {
  title: "What we store where",
  lead: "Core application and database for EU users are hosted in Germany. Some third-party services (for example email SMTP, Stripe billing, or Cloudflare edge caches) sit outside that residency boundary - see the privacy policy for details.",
  rows: [
    {
      layer: "App compute",
      where: "Hetzner, Germany",
      note: "Stateless Docker replicas for marketing, SaaS web, and API",
    },
    {
      layer: "Database + Auth",
      where: "Supabase, Frankfurt",
      note: "PostgreSQL and product authentication",
    },
    {
      layer: "Object storage",
      where: "Cloudflare R2, EU option",
      note: "Uploads and BIM/plan files when configured",
    },
    {
      layer: "Edge cache / WAF",
      where: "Cloudflare global edge",
      note: "TLS termination, WAF, CDN in front of origins",
    },
    {
      layer: "Field devices",
      where: "Site edge (L1-L4)",
      note: "Telemetry processed on site; cloud is L5. Sensors do not store customer PII in Hetzner",
    },
  ],
} as const;

export const datacentersScale = {
  title: "Scale and reliability posture",
  lead: "The stack is production-shaped: load balancers, health probes, and stateless replicas. We do not publish replica counts, RPS, or uptime percentages here.",
  rows: [
    {
      component: "Web / marketing",
      note: "Stateless containers; N replicas behind a load balancer",
    },
    {
      component: "API",
      note: "Stateless API replicas; health probes for the load balancer",
    },
    {
      component: "Worker",
      note: "Queue workers can add replicas as load grows",
    },
    {
      component: "Database",
      note: "Managed Supabase; the app uses a pooler for many replicas",
    },
    {
      component: "Sessions",
      note: "Supabase cookies - no sticky session requirement on the load balancer",
    },
  ],
} as const;

export const datacentersTrust = {
  title: "Privacy and contact",
  lead: "CurNext Oy is registered in Helsinki, Finland. The platform is designed for EU operation with GDPR-oriented controls such as audit logging, RBAC, and invite-only access.",
  bullets: [
    "Legal entity: CurNext Oy, Helsinki, Finland",
    "Core application and database for EU users: Germany / Frankfurt",
    "Customers inherit provider controls from Hetzner, Supabase, and Cloudflare at the infrastructure layer - review those vendors' public trust pages for their certifications",
    "CurNext does not claim ISO 27001 or SOC 2 for itself on this page",
  ],
  securityEmail: "security@curnext.app",
} as const;
