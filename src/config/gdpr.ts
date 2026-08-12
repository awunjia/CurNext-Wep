export const gdprPage = {
  title: "GDPR Policies",
  description:
    "How CurNext applies the EU General Data Protection Regulation (GDPR) to personal data processed through curnext.app, the CurNext dashboard, APIs, and related services - including roles, legal bases, data subject rights, retention, transfers, and how to contact us.",
  metaDescription:
    "CurNext GDPR policies: controller identity, roles, legal bases, data subject rights, retention, EU hosting, transfers, breach handling, and how to reach gdpr@curnext.app.",
  leadNote:
    "This page explains CurNext's GDPR-oriented policies for transparency under Articles 12-14 and related obligations. It is not a substitute for a signed Data Processing Agreement, the Privacy Policy, or legal advice. Where this page and a signed contract conflict, the signed contract controls for that relationship.",
  supportLine:
    "Controller for CurNext account, marketing, and website data: CurNext (Finland). Processor for Client Data instructed through the platform: CurNext under a DPA. Core production hosting: Germany / Frankfurt. Privacy requests: gdpr@curnext.app.",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "11 August 2026",
  legalEyebrow: "Legal",
} as const;

export const gdprOverview = {
  title: "Purpose of this policy",
  lead: "CurNext builds construction site intelligence - sensors, gateways, cloud dashboards, and readiness evidence. That stack inevitably involves personal data: invitees, admins, support contacts, website visitors, and job applicants. GDPR is the primary privacy regime for our EU-anchored platform processing.",
  bullets: [
    "Explain who is responsible for which processing (controller vs processor).",
    "Describe categories of personal data, purposes, and legal bases at a policy level.",
    "Set out data subject rights and a clear channel to exercise them.",
    "Summarise retention themes, international transfers, security posture, and breach handling.",
    "Point to related documents (DPA, Security, Compliance, Audit Trail, Cookie Policy) without duplicating every clause.",
  ],
  honesty:
    "We do not claim ISO 27001 or SOC 2 certification for CurNext on public pages. Standards named elsewhere are design alignment unless separately confirmed in writing.",
} as const;

export const gdprController = {
  title: "Controller identity and contact",
  lead: "For personal data where CurNext determines the purposes and means of processing (for example website analytics with consent, marketing subscriptions, career applications, and CurNext's own B2B account administration), the controller is:",
  // Identity lines are rendered from siteConfig in gdpr-page.tsx
  lines: [] as string[],
  privacyEmail: "gdpr@curnext.app",
  privacyEmailLabel: "GDPR / privacy inbox",
  legalEmail: "legal@curnext.app",
  legalEmailLabel: "Legal / DPA",
  securityEmail: "security@curnext.app",
  securityEmailLabel: "Security incidents and vulnerability disclosure",
  note: "Use gdpr@curnext.app for access, rectification, erasure, restriction, portability, objection, and other data subject requests. Use legal@curnext.app for Data Processing Agreements. Use security@curnext.app for vulnerability disclosure and confirmed security incidents - not for routine DSRs.",
} as const;

export const gdprRoles = {
  title: "Roles under GDPR",
  lead: "Clarity on roles avoids wrong expectations about who answers a request.",
  items: [
    {
      title: "CurNext as controller",
      body: "CurNext is typically the controller for: the public marketing website; newsletter and product update subscriptions; contact and quote forms when you write to CurNext directly; careers and recruitment; CurNext's own CRM and sales records; invite-only account identities CurNext maintains as part of providing access to the Services; and telemetry needed to operate, secure, and improve CurNext's own products (subject to contracts and product settings).",
    },
    {
      title: "CurNext as processor",
      body: "When a customer (the Client) uses CurNext to monitor sites and manage project users, CurNext generally acts as processor for Client Data - personal data the Client uploads, invites, or generates through the Services under the Client's instructions. The Client remains the controller for that Client Data. Processor terms are set out in the Data Processing Agreement.",
    },
    {
      title: "Joint or mixed situations",
      body: "Some operational logs and security events may contain identifiers that serve both Client accountability and CurNext's legitimate interest in securing the platform. We design for accountability (RBAC, audit events, invite-only access) and document the split in the DPA and Security materials. If you are unsure who should answer your request, write to gdpr@curnext.app and we will route it.",
    },
  ],
} as const;

export const gdprScope = {
  title: "Scope of processing covered",
  lead: "These policies apply to personal data processed in connection with:",
  bullets: [
    "curnext.app and localized marketing pages",
    "dash.curnext.app and related dashboard experiences",
    "CurNext APIs, SDKs, and developer portals where personal data appears (for example API keys tied to accounts)",
    "Mobile applications published under CurNext branding, when linked to the same identity plane",
    "Support, Docs, Knowledge Base interactions that identify a person",
    "Email, forms, and CRM systems used to respond to commercial and support requests",
  ],
  note: "Field sensors primarily measure environmental and structural conditions. Personal data risk usually arises at the cloud, identity, and collaboration layer (who can see which project), not from temperature or humidity readings alone. BIM maps and uploaded plans may contain personal data depending on what the Client includes.",
} as const;

export const gdprLegalBases = {
  title: "Legal bases (Article 6)",
  lead: "Depending on the processing, CurNext relies on one or more of the following bases. Exact mapping for a specific product feature may be refined in the Privacy Policy and customer contracts.",
  rows: [
    {
      basis: "Contract (Art. 6(1)(b))",
      use: "Creating and administering accounts, delivering the Services a customer ordered, authenticating invitees, providing contracted support, and processing information needed to perform a quote or order workflow.",
    },
    {
      basis: "Legitimate interests (Art. 6(1)(f))",
      use: "Securing the platform (fraud, abuse, intrusion detection), improving reliability, B2B relationship management with existing and prospective customers, limited product analytics that do not override rights and freedoms, and defending legal claims. We balance interests and offer objection where required.",
    },
    {
      basis: "Consent (Art. 6(1)(a))",
      use: "Non-essential cookies and similar technologies where consent is required; optional marketing emails where consent is the chosen basis; Knowledge Base AI chat where product flows require explicit GDPR consent before sending a question; other optional features that we mark as consent-based.",
    },
    {
      basis: "Legal obligation (Art. 6(1)(c))",
      use: "Tax, accounting, and regulatory record-keeping; responding to lawful requests from competent authorities; breach notification duties where CurNext is the controller.",
    },
  ],
  special:
    "We do not seek to process special categories of personal data (Art. 9) as part of core site monitoring. Please do not submit health, biometric, or other special-category data through general contact forms. If a customer project requires such data, it must be scoped in writing with appropriate safeguards.",
} as const;

export const gdprCategories = {
  title: "Categories of personal data",
  lead: "Categories vary by product surface. Typical examples:",
  items: [
    {
      title: "Identity and contact",
      body: "Name, work email, phone, company, role, locale preference, and similar business contact details.",
    },
    {
      title: "Account and access",
      body: "Invite status, organisation / project membership, roles and permissions, authentication metadata, session and device signals used for security, and MFA status for privileged roles.",
    },
    {
      title: "Commercial and support",
      body: "Messages sent via contact, quote, demo, or support channels; ticket history; contract and billing references needed to serve the account.",
    },
    {
      title: "Usage and technical",
      body: "IP addresses, approximate location derived from network data, browser/user-agent, diagnostic logs, rate-limit and WAF events, and product usage metrics needed to operate the Services.",
    },
    {
      title: "Recruitment",
      body: "CV / résumé content, application answers, interview notes, and related communications for open roles.",
    },
    {
      title: "Client-controlled project content",
      body: "User-generated content inside projects (notes, uploads, BIM-linked annotations, collaborator lists) that the Client controls as controller. CurNext processes this as processor under documented instructions.",
    },
  ],
} as const;

export const gdprRights = {
  title: "Your rights under GDPR",
  lead: "Where GDPR applies and CurNext is the controller (or must assist as processor), you may have the following rights, subject to statutory limits and exemptions:",
  rows: [
    {
      right: "Access (Art. 15)",
      detail:
        "Obtain confirmation of whether we process your personal data and receive a copy together with relevant information about the processing.",
    },
    {
      right: "Rectification (Art. 16)",
      detail:
        "Have inaccurate personal data corrected and incomplete data completed.",
    },
    {
      right: "Erasure (Art. 17)",
      detail:
        "Request deletion where a ground applies (for example withdrawal of consent or data no longer needed). Retention and audit requirements may limit full deletion of certain security or financial records; we explain when that is the case.",
    },
    {
      right: "Restriction (Art. 18)",
      detail:
        "Request that processing be limited in specific circumstances (for example while accuracy is contested).",
    },
    {
      right: "Portability (Art. 20)",
      detail:
        "Receive personal data you provided to us in a structured, commonly used, machine-readable format, and transmit it where the processing is based on consent or contract and carried out by automated means.",
    },
    {
      right: "Objection (Art. 21)",
      detail:
        "Object to processing based on legitimate interests, including profiling related to such processing, and object to direct marketing at any time.",
    },
    {
      right: "Withdraw consent",
      detail:
        "Where processing is based on consent, withdraw it at any time without affecting the lawfulness of processing before withdrawal.",
    },
    {
      right: "Complaint",
      detail:
        "Lodge a complaint with a supervisory authority, in particular in the EEA state of your habitual residence, place of work, or place of the alleged infringement.",
    },
  ],
  clientNote:
    "If your request concerns data inside a customer's CurNext project (for example a collaborator invited by a Client admin), the Client is usually the right first contact. CurNext will assist the Client under the DPA and can help route requests received at gdpr@curnext.app.",
} as const;

export const gdprExercise = {
  title: "How to exercise your rights",
  lead: "We prefer written requests so we can authenticate the requester and keep an accountable record.",
  steps: [
    "Email gdpr@curnext.app from the address associated with your account or with enough detail for us to identify you.",
    "State which right you wish to exercise and the context (website, newsletter, dashboard account, job application, or customer project).",
    "Include your full name, company (if any), and any project or organisation name shown in the dashboard.",
    "For Client Data inside a customer tenant, tell us the customer organisation if known - we may need to involve the Client controller.",
  ],
  timing:
    "We aim to respond without undue delay and within one month of receipt, extendable by two further months for complex or numerous requests as permitted by Art. 12(3). If we need more time or cannot fulfil a request, we will explain why.",
  identity:
    "We may ask for reasonable additional information to confirm identity and authority (for example that you act for a company admin). We will not fulfil a request that would unjustifiably disclose another person's data.",
  email: "gdpr@curnext.app",
  formHint: "You may also select \"GDPR / privacy\" on the contact form at /contact - that topic routes to the same inbox.",
} as const;

export const gdprRetention = {
  title: "Retention",
  lead: "We keep personal data only as long as needed for the purposes described, including legal, accounting, and security needs.",
  items: [
    {
      title: "Account and service data",
      body: "Retained for the life of the customer relationship and a wind-down period needed for offboarding, dispute handling, and contractual close-out, then deleted or anonymised according to product and DPA schedules.",
    },
    {
      title: "Marketing contacts",
      body: "Kept until you unsubscribe or object, or until the list is cleaned under routine hygiene, unless a longer retention is required for suppression (so we remember not to email you again).",
    },
    {
      title: "Support and sales correspondence",
      body: "Retained as needed to complete the request and maintain a reasonable business record, then reduced or deleted under internal schedules.",
    },
    {
      title: "Recruitment",
      body: "Application materials are retained for the hiring process and a limited post-process period (or longer with your consent for future roles), then deleted or archived with restricted access.",
    },
    {
      title: "Security and GDPR audit events",
      body: "Security logs and GDPR-oriented audit events may be retained longer, sometimes in append-only or pseudonymised form, to investigate incidents and demonstrate accountability. See Audit Trail.",
    },
    {
      title: "Backups",
      body: "Encrypted backups follow rolling retention. Deletion from live systems may take effect in backups only after the backup cycle expires.",
    },
  ],
} as const;

export const gdprTransfers = {
  title: "International transfers",
  lead: "Core application and database hosting for the platform is designed around Germany / Frankfurt (EU). Commercial markets today include Finland, Canada, and Cameroon - selling into a market is not the same as hosting a local production region there.",
  bullets: [
    "EEA / EU processing is the default for Client Data on the production stack unless a written enterprise residency addendum says otherwise.",
    "Access by authorised CurNext personnel or subprocessors outside the EEA, if any, is governed by transfer tools such as the European Commission Standard Contractual Clauses (SCCs), adequacy decisions where applicable, and contractual / technical safeguards described in the DPA.",
    "Canadian and Cameroon customers access EU-hosted Client Data as instructed; the Client remains controller for that Client Data.",
    "Some support, email, or AI assistance vendors may process limited personal data outside the EEA - see the public subprocessor list on the DPA page.",
  ],
  note: "Details of subprocessors, locations, and transfer mechanisms are maintained on the Data Processing Agreement page and may change with notice as described there.",
} as const;

export const gdprSubprocessors = {
  title: "Processors and subprocessors",
  lead: "When CurNext acts as processor, we engage subprocessors under written terms that impose data-protection obligations consistent with Art. 28. When CurNext acts as controller, we use processors under appropriate contracts.",
  bullets: [
    "Hosting and database infrastructure in the EU (Germany / Frankfurt orientation).",
    "Optional object storage with EU jurisdiction options where enabled.",
    "Email delivery, error monitoring, and observability vendors as listed publicly.",
    "Assisted AI features (for example Gemini or Groq when enabled) under product and contractual controls - concrete curing prediction uses maturity computations plus an in-house XGBoost model and is not the same as chat assistance.",
  ],
  cta: "Review the current public subprocessor summary",
  href: "/data/data-processing-agreement",
} as const;

export const gdprSecurity = {
  title: "Security measures",
  lead: "Security is part of GDPR accountability (Art. 32). CurNext's publicly described posture includes:",
  bullets: [
    "Invite-only access to the product plane",
    "Role-based access control (RBAC) and privileged MFA",
    "Encryption in transit; encryption at rest for core data stores",
    "Edge protections such as WAF and rate limiting",
    "Field and building connectivity controls (including LoRaWAN AES-128 themes, WireGuard / MQTT mTLS for CN-BC as documented on Security)",
    "Signed OTA practices for firmware where applicable",
    "GDPR-oriented audit, export, and erasure paths in product design",
  ],
  note: "Architecture detail lives on the Security page. Report vulnerabilities to security@curnext.app using coordinated disclosure - do not send exploit details to support@ or gdpr@.",
  href: "/security",
  cta: "Read security architecture",
} as const;

export const gdprBreach = {
  title: "Personal data breaches",
  lead: "CurNext maintains processes aimed at detecting, assessing, and responding to personal data breaches.",
  items: [
    {
      title: "When CurNext is controller",
      body: "We assess risk to rights and freedoms and notify the competent supervisory authority without undue delay and, where feasible, within 72 hours of becoming aware of a breach that requires notification under Art. 33. We communicate to affected individuals when Art. 34 requires it.",
    },
    {
      title: "When CurNext is processor",
      body: "We notify the Client without undue delay after becoming aware of a personal data breach affecting Client Data, and assist with information the Client needs for its own obligations. Enterprise contracts may set a tighter target (for example 24 hours to the Client security contact).",
    },
    {
      title: "What to include if you report an incident",
      body: "Time observed, systems affected, whether personal data is involved, and how to reach you. Use security@curnext.app for suspected breaches and vulnerability reports.",
    },
  ],
} as const;

export const gdprCookies = {
  title: "Cookies, marketing, and AI assistants",
  lead: "Non-essential cookies and similar technologies are handled under our Cookie Policy and consent tools where required. Marketing emails include unsubscribe controls.",
  bullets: [
    "Essential cookies support security, load balancing, and preference storage needed to deliver the site.",
    "Analytics or marketing tags, if used, run only with a valid legal basis (often consent in the EEA).",
    "Knowledge Base AI chat requires explicit GDPR consent in the product flow before your question is processed.",
    "You can withdraw consent for optional tools without losing access to core informational pages, though some features may be unavailable.",
  ],
  cookieHref: "/data/cookie-policy",
  cookieCta: "Cookie Policy",
  privacyHref: "/data/privacy-policy",
  privacyCta: "Privacy Policy",
} as const;

export const gdprChildren = {
  title: "Children and age eligibility",
  lead: "CurNext Services are designed for professional construction and B2B use. They are not directed at children. Under CurNext internal policies, we do not onboard, invite, or register product users under 18 years of age. We also do not knowingly collect personal data from children under 16 for CurNext products. If you believe someone under 18 has been onboarded, or that a child has provided personal data, contact gdpr@curnext.app and we will take appropriate steps.",
} as const;

export const gdprAutomated = {
  title: "Automated decision-making and profiling",
  lead: "CurNext provides readiness predictions and assisted insights for construction surfaces (for example concrete curing timelines). Those outputs support professional judgement; they are not intended as solely automated decisions that produce legal or similarly significant effects about an individual under Art. 22.",
  bullets: [
    "Site readiness signals concern materials and environments, not creditworthiness or employment of a natural person.",
    "Account security may use automated risk signals (for example rate limits or anomaly detection) to protect the service.",
    "If we introduce features that make solely automated decisions with legal or similarly significant effects about you, we will provide meaningful information and a way to obtain human review where required.",
  ],
} as const;

export const gdprAuthority = {
  title: "Supervisory authority",
  lead: "Without prejudice to any other administrative or judicial remedy, you may lodge a complaint with a supervisory authority. For CurNext as a Finnish controller, the lead supervisory authority context is typically:",
  name: "Office of the Data Protection Ombudsman (Tietosuojavaltuutetun toimisto)",
  url: "https://tietosuoja.fi/en",
  urlLabel: "tietosuoja.fi",
  note: "You may also contact the authority in your country of residence or work if you are in the EEA. We encourage you to contact gdpr@curnext.app first so we can try to resolve concerns directly.",
} as const;

export const gdprUpdates = {
  title: "Changes to these policies",
  lead: "We may update this page to reflect product, legal, or organisational changes. The \"Last updated\" date at the top will change when we publish material revisions. For processor relationships, material subprocessor or transfer changes follow the notice process in the DPA. Continued use of the marketing site after an update constitutes awareness of the revised public policy text; contractual customers are governed by their agreements.",
} as const;

export const gdprRelated = [
  { title: "Data Processing Agreement", href: "/data/data-processing-agreement" },
  { title: "Privacy Policy", href: "/data/privacy-policy" },
  { title: "Cookie Policy", href: "/data/cookie-policy" },
  { title: "Security", href: "/security" },
  { title: "Compliance", href: "/compliance" },
  { title: "Audit Trail", href: "/audit-trail" },
  { title: "Contact", href: "/contact" },
] as const;
