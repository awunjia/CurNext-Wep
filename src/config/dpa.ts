export const dpaPage = {
  title: "Data Processing Agreement",
  description:
    "CurNext Oy provides a Data Processing Agreement for customers who need processor terms when CurNext processes personal data for the Client's use of the platform - including customers in Finland (EU), Canada, and Cameroon.",
  leadNote:
    "This page is a procurement-oriented summary aligned with GDPR Art. 28 practice (roles, scope, TOMs, public subprocessors, transfer and notice language). A signed DPA is a legal instrument - final clause language should be reviewed by counsel. Do not treat this page as the executed agreement body.",
  supportLine:
    "CurNext Oy acts as processor for Client Data instructed through the Services. Core application and database hosting for the platform is in Germany / Frankfurt. Commercial markets today: Finland, Canada, and Cameroon. Enterprise programs execute the DPA within 30 days of schedule signature.",
} as const;

export const dpaAudience = {
  title: "Who this is for",
  lead: "B2B customers, procurement, and legal / security reviewers who need processor terms for CurNext SaaS and site monitoring.",
  bullets: [
    "EU customers needing GDPR Art. 28 terms (Finland and other EEA Clients)",
    "Canadian customers needing transparency for PIPEDA / Quebec Law 25 vendor reviews",
    "Cameroon customers needing a clear controller / processor split and subprocessor map",
    "IT and security reviewers mapping subprocessors, AI vendors, and hosting regions",
  ],
} as const;

export const dpaMarkets = {
  title: "Markets we sell into vs where data is hosted",
  lead: "CurNext sells into Finland, Canada, and Cameroon. Platform Client Data for those markets is processed on the same EU-anchored production stack unless a written enterprise residency addendum says otherwise. Selling into a country is not the same as hosting a local production region there.",
  rows: [
    {
      market: "Finland (EU)",
      commercial: "Operating market",
      hosting:
        "Core app + database in Germany / Frankfurt; GDPR applies as EU processing",
      frameworks: "GDPR; Finnish supervisory authority as applicable",
    },
    {
      market: "Canada",
      commercial: "Operating market",
      hosting:
        "Same EU production stack - Client Data is hosted in the EU and accessed by Canadian users/admins as instructed",
      frameworks:
        "PIPEDA and provincial rules (including Quebec Law 25 where applicable) - Client remains controller for Client Data; transfers documented below",
    },
    {
      market: "Cameroon",
      commercial: "Operating market",
      hosting:
        "Same EU production stack - Client Data is hosted in the EU and accessed by Cameroon users/admins as instructed",
      frameworks:
        "Local data-protection obligations as applicable - Client remains controller for Client Data; transfers documented below",
    },
  ],
  honesty:
    "CurNext does not currently advertise separate production regions in Canada or Cameroon. Edge CDN, email delivery, payments, AI APIs, and observability may process limited data outside Germany - see subprocessors.",
} as const;

export const dpaRoles = {
  title: "Parties and roles",
  lead: "Where CurNext processes personal data on behalf of Client, CurNext is processor and Client remains controller for that Client Data.",
  rows: [
    {
      role: "Provider / Processor",
      party: "CurNext Oy, Helsinki, Finland",
      note: "Processes personal data on Client instructions to deliver the Services",
    },
    {
      role: "Client / Controller",
      party: "Customer organization (Finland, Canada, Cameroon, or other contracted Client)",
      note: "Determines purposes and means for personal data it instructs CurNext to process",
    },
    {
      role: "Data subjects",
      party: "Typically Client's employees, contractors, invitees, and site contacts",
      note: "Invite-only B2B platform users - not a B2C consumer app audience",
    },
  ],
  honesty: [
    "CurNext may also be controller for its own account, billing, HR, security logs of its systems, and marketing leads - see the Privacy Policy.",
    "Do not read this page as \"CurNext is always only a processor.\"",
  ],
} as const;

export const dpaScope = {
  title: "What we process",
  lead: "Nature and purpose: construction and facilities site monitoring and readiness - device telemetry, BIM/site configuration, dashboards, alerts, compliance evidence, team access, APIs/webhooks, AI-assisted features where enabled, and support.",
  categories: [
    {
      category: "Account / identity",
      examples: "Name, work email, role, org membership, invite status",
    },
    {
      category: "Authentication context",
      examples: "Session and MFA status (not passwords - managed auth)",
    },
    {
      category: "Project / site metadata",
      examples:
        "Project names, building addresses Client enters, floor and room labels",
    },
    {
      category: "Operational content",
      examples: "Alert recipients, tickets, uploaded plans/BIM files, notes",
    },
    {
      category: "Device / telemetry",
      examples:
        "Sensor readings, device IDs, readiness scores (generally not installer PII unless Client adds it)",
    },
    {
      category: "AI feature context",
      examples:
        "Prompts and context Client or the Services send to AI features (for example readiness assistance) - minimized and not used to train CurNext models outside product needs",
    },
    {
      category: "Audit / security",
      examples:
        "Access logs, permission denials, GDPR audit events (IDs preferred; emails masked in logs)",
    },
  ],
  specialCategory:
    "CurNext is not designed to process special-category data (for example health or biometrics for identification) as a core feature. If Client uploads such data, explicit written instructions are required.",
  duration:
    "Processing continues for the term of the Services / subscription, then return or deletion follows the DPA and termination clauses.",
  minimization: [
    "Device telemetry should exclude installer PII unless required",
    "Logs must not contain passwords, JWTs, API keys, or full email bodies",
    "AI features should receive the minimum context needed for the task",
    "Provider will not process Client Data for unrelated purposes (for example selling personal data)",
  ],
} as const;

export const dpaInstructions = {
  title: "Instructions and Client responsibilities",
  bullets: [
    "Client instructs processing via the platform UI, APIs, contracts, and written support requests",
    "Client is responsible for lawful basis, notices to data subjects, and responding to DSRs for data Client controls in their market (EU, Canada, Cameroon, or other)",
    "Client manages user invites and RBAC within their tenant",
    "Platform supports personal data export for the signed-in user (profile, memberships, preferences). A full self-serve erasure portal is not claimed here until shipped - erasure follows support and contractual process",
  ],
} as const;

export const dpaHosting = {
  title: "Where processing happens",
  lead: "Core application compute runs on Hetzner in Germany. Managed PostgreSQL and Auth run on Supabase in Frankfurt, Germany. Customers in Canada and Cameroon use that same EU production stack for Client Data unless an enterprise addendum provides otherwise.",
} as const;

export type DpaSubprocessor = {
  name: string;
  purpose: string;
  dataCategories: string;
  location: string;
  privacyUrl: string;
  group: "Infrastructure" | "Email" | "Payments" | "AI" | "Identity" | "Observability" | "Data";
};

export const dpaSubprocessors = {
  title: "Subprocessors",
  lastUpdated: "9 August 2026",
  lead: "Public list of third parties that may process Client personal data to deliver the Services. Industry practice is a table with purpose, data categories, and location. Enterprise terms: material new subprocessors receive at least thirty (30) days notice; Client may object on reasonable data-protection grounds. Subscribe to changes via legal@curnext.app.",
  rows: [
    {
      name: "Hetzner Online GmbH",
      purpose: "Application hosting (Docker origins behind load balancers)",
      dataCategories: "Application data, account identifiers in app workloads",
      location: "Germany",
      privacyUrl: "https://www.hetzner.com/legal/privacy-policy",
      group: "Infrastructure",
    },
    {
      name: "Supabase, Inc.",
      purpose: "Managed PostgreSQL database and authentication",
      dataCategories: "Account, project, telemetry metadata, auth context",
      location: "Frankfurt, Germany (eu-central)",
      privacyUrl: "https://supabase.com/privacy",
      group: "Infrastructure",
    },
    {
      name: "Cloudflare, Inc.",
      purpose: "DNS, TLS, WAF, CDN, Turnstile; optional R2 object storage",
      dataCategories:
        "Connection metadata, form protection signals; objects/uploads when R2 is used",
      location:
        "Global edge; R2 EU jurisdiction option for objects / audit archive",
      privacyUrl: "https://www.cloudflare.com/privacypolicy/",
      group: "Infrastructure",
    },
    {
      name: "SMTP2GO",
      purpose: "Transactional email (invites, password flows, notifications)",
      dataCategories: "Email address, name, message content required to deliver mail",
      location:
        "EU data center (Amsterdam) when the CurNext account is EU-hosted; recipient delivery may reach MTAs worldwide",
      privacyUrl: "https://www.smtp2go.com/privacy/",
      group: "Email",
    },
    {
      name: "Stripe, Inc.",
      purpose: "Payments and billing when used",
      dataCategories: "Billing contact and payment metadata per Stripe terms",
      location: "Per Stripe's terms (often US/EEA processing)",
      privacyUrl: "https://stripe.com/privacy",
      group: "Payments",
    },
    {
      name: "OpenAI, L.L.C.",
      purpose: "AI features in the product (for example readiness assistance) when enabled",
      dataCategories: "Prompts and context required for the AI feature",
      location: "United States and regions per OpenAI's DPA / data controls",
      privacyUrl: "https://openai.com/policies/privacy-policy",
      group: "AI",
    },
    {
      name: "Google LLC (Gemini / Google AI)",
      purpose: "AI features in the product when Gemini is enabled",
      dataCategories: "Prompts and context required for the AI feature",
      location: "Per Google Cloud / Gemini data processing terms",
      privacyUrl: "https://policies.google.com/privacy",
      group: "AI",
    },
    {
      name: "Groq, Inc.",
      purpose:
        "Inference for the public Knowledge Base assistant on curnext.app (after user consent)",
      dataCategories: "Chat questions and short conversation context",
      location: "Per provider data processing / privacy terms",
      privacyUrl: "https://groq.com/privacy-policy/",
      group: "AI",
    },
    {
      name: "Signicat AS",
      purpose: "Electronic identity / eID flows when used for strong authentication",
      dataCategories: "Identity attributes required for the eID transaction",
      location: "EEA (Norway / EU processing per Signicat)",
      privacyUrl: "https://www.signicat.com/privacy",
      group: "Identity",
    },
    {
      name: "Datadog, Inc.",
      purpose: "Application and infrastructure observability",
      dataCategories: "Operational logs and metrics (secrets excluded by design)",
      location: "Per Datadog site / region configured for CurNext",
      privacyUrl: "https://www.datadoghq.com/legal/privacy/",
      group: "Observability",
    },
    {
      name: "Grafana Labs",
      purpose: "Metrics / dashboard observability when used",
      dataCategories: "Operational metrics and related metadata",
      location: "Per Grafana Cloud region configured for CurNext",
      privacyUrl: "https://grafana.com/legal/privacy-policy/",
      group: "Observability",
    },
    {
      name: "OpenWeather Ltd.",
      purpose: "Weather context for site / surface readiness features when used",
      dataCategories: "Location or site coordinates Client configures; weather responses",
      location: "Per OpenWeather terms",
      privacyUrl: "https://openweather.co.uk/privacy-policy",
      group: "Data",
    },
  ] satisfies DpaSubprocessor[],
  honesty:
    "Core app + database for platform Client Data: Germany / Frankfurt. AI, email delivery, payments, edge CDN, and observability may process limited personal data outside Germany. Hardware / manufacturing partners (for example Semtech, Sensirion, JLCPCB) are not listed as personal-data subprocessors unless they receive Client personal data.",
} as const;

export const dpaTransfers = {
  title: "International transfers",
  bullets: [
    "Primary storage and application processing for Client Data is designed around EU hosting (Germany / Frankfurt), including for Clients in Canada and Cameroon",
    "Access by Client users in Canada or Cameroon is an international transfer / remote access pattern - Client remains controller for how it invites users in those markets",
    "Where a subprocessor transfers or accesses data outside the EEA/UK (for example OpenAI, Stripe, or Cloudflare edge), Provider will use an appropriate transfer mechanism (for example EU SCCs or an adequacy decision) as required by law",
    "Canadian Clients: Provider supports PIPEDA / Law 25 vendor diligence with this list, TOMs, and counsel-approved DPA exhibits - local hosting in Canada is not claimed here",
    "Cameroon Clients: Provider supports local diligence with this list and DPA - local hosting in Cameroon is not claimed here",
    "SCC exhibits and transfer assessments are attached in counsel-approved DPA packages",
  ],
} as const;

export const dpaToms = {
  title: "Technical and organizational measures",
  lead: "High-level summary only. See Security Policy and the Security page for architecture detail. CurNext does not claim ISO 27001 or SOC 2 certification for itself on this page.",
  rows: [
    {
      control: "Access control",
      summary: "Invite-only access; RBAC; MFA for privileged / OWNER roles",
    },
    {
      control: "Transport",
      summary:
        "HTTPS / TLS; field uplink WireGuard + MQTT mTLS (broker not public)",
    },
    {
      control: "At rest",
      summary: "Managed DB encryption; object storage encryption when used",
    },
    {
      control: "Tenant isolation",
      summary: "Organization / project scoping; RLS where applicable",
    },
    {
      control: "Logging / audit",
      summary: "Structured GDPR-oriented audit events; secrets not logged",
    },
    {
      control: "Backups",
      summary: "Encrypted backups with restore testing in the security program",
    },
    {
      control: "Edge protection",
      summary: "Cloudflare WAF / TLS in front of origins",
    },
    {
      control: "AI controls",
      summary:
        "AI vendors used only for enabled product features; minimize prompt context; no sale of Client Data",
    },
    {
      control: "Incident path",
      summary:
        "GDPR Art. 33-oriented notification; enterprise 24 h target to Client security contact",
    },
    {
      control: "Vulnerability / CRA themes",
      summary: "Signed OTA, SBOM cadence, disclosure via security@curnext.app",
    },
  ],
} as const;

export const dpaBreach = {
  title: "Breach notification and assistance",
  rows: [
    {
      context: "Standard agreement",
      target:
        "Without undue delay after confirmed personal data breach affecting Client Data",
    },
    {
      context: "Enterprise",
      target:
        "Within 24 hours to Client's designated security contact after confirming a personal data breach or enterprise-impacting security incident affecting Client Data",
    },
    {
      context: "Regulatory",
      target:
        "GDPR Art. 33 path (72 h to authority where applicable) - Client/Controller obligations may differ by market (EU, Canada, Cameroon)",
    },
  ],
  assistance: [
    "Access / export (platform export tools + support channel)",
    "Rectification (account / admin tools)",
    "Erasure / restriction (support + contractual process; audit logs may be append-only or pseudonymized per design)",
    "Portability (machine-readable export where available)",
  ],
  note: "Client remains the front door for most DSRs about Client-controlled data in every operating market.",
  securityEmail: "security@curnext.app",
} as const;

export const dpaExecute = {
  title: "How to execute the DPA",
  lead: "Standard service terms: parties execute a DPA upon request where Provider processes personal data on behalf of Client. Enterprise schedule: execute Provider's DPA within thirty (30) days of Schedule signature (unless an existing DPA already governs).",
  bullets: [
    "Request the executable DPA from legal@curnext.app or via Contact (Finland, Canada, and Cameroon Clients welcome)",
    "Security overview and current subprocessor list available upon request; material changes: 30-day enterprise notice",
    "Governing law for commercial agreements: laws of Finland; courts in Helsinki, Finland (subject to mandatory protections) - align final DPA governing-law clause with counsel",
  ],
  legalEmail: "legal@curnext.app",
  supportEmail: "support@curnext.app",
} as const;

export const dpaRelated = [
  { title: "Privacy Policy", href: "/data/privacy-policy" },
  { title: "GDPR Policies", href: "/data/gdpr" },
  { title: "Security Policy", href: "/data/security-policy" },
  { title: "Terms of Service", href: "/data/terms-of-service" },
  { title: "Security architecture", href: "/security" },
  { title: "Datacenters", href: "/datacenters" },
  { title: "Pricing markets", href: "/pricing" },
] as const;
