export type KnowledgeChunk = {
  id: string;
  title: string;
  source: string;
  href?: string;
  text: string;
  tags: string[];
};

/**
 * Curated public website knowledge for the AI Knowledge Base.
 * Keep this aligned with published marketing pages - do not add private runbooks.
 */
export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "product-overview",
    title: "What CurNext is",
    source: "Overview",
    href: "/docs",
    tags: ["product", "overview", "readiness"],
    text: "CurNext provides build-ready site intelligence for construction surfaces and spaces. Field nodes measure conditions; the platform answers whether work can proceed with readiness, alerts, and an audit trail mapped to the project. CurNext is sold as construction intelligence, not a radio bill of materials. Operating markets: Finland, Canada, and Cameroon.",
  },
  {
    id: "site-path",
    title: "Site path L1-L5",
    source: "How it works",
    href: "/how-it-works",
    tags: ["layers", "hardware", "lorawan", "cn-bc", "cn-fg"],
    text: "L1 field nodes sense surfaces (CN-CC, CN-WD, CN-IAQ, CN-LEAK, CN-SHM, CN-MEP). L2 CN-FG aggregates floor LoRaWAN traffic. L3 CN-UPS supplies power only with no data plane. L4 CN-BC is the building uplink with WireGuard, MQTT, and signed OTA. L5 CurNext cloud provides readiness, dashboards, API, SDKs, and Market Place.",
  },
  {
    id: "solutions",
    title: "Solution SKUs",
    source: "Solutions",
    href: "/solutions",
    tags: [
      "cn-cc",
      "cn-wd",
      "cn-iaq",
      "cn-leak",
      "cn-shm",
      "cn-mep",
      "mold",
      "mould",
      "moisture",
      "humidity",
      "drying",
      "indoor air",
      "leak",
    ],
    text: "CN-CC concrete curing with air, surface, and core probes. CN-WD wall drying for gypsum, wet rooms, and moisture risk before finishes. CN-IAQ indoor air for CO2, PM, VOC and indoor climate context. CN-LEAK leak detection for plant rooms, bathrooms, and risers when moisture events matter. CN-SHM structural health for tilt, crack, vibration. CN-MEP flow, pressure, energy including PoE panel paths. For mold or moisture concerns in a building, point people toward CN-WD, CN-IAQ, and CN-LEAK depending on whether the job is drying finishes, indoor air quality, or leak watch - then size nodes and duration on Pricing.",
  },
  {
    id: "api",
    title: "REST API",
    source: "API",
    href: "/api",
    tags: ["api", "rest", "webhooks", "auth"],
    text: "Production API host is https://api.curnext.app with paths under /api/v1. Authenticate with a project API key as Bearer token created under Integration in the product. Domains include health, projects, devices, alerts, measurements, webhooks, and BIM hierarchy. OpenAPI playground: https://api.curnext.app/docs. Access follows site subscription node count and duration.",
  },
  {
    id: "sdks",
    title: "SDKs",
    source: "SDKs",
    href: "/sdks",
    tags: ["sdk", "javascript", "python", "go", "php", "java", "flutter"],
    text: "Official SDKs wrap the REST API: JavaScript/TypeScript @curnext/sdk on npm, PHP curnext/sdk on Packagist, Go github.com/awunjia/curnext-go, Python curnext on PyPI, Java app.curnext:curnext-sdk on Maven Central. Flutter is coming soon on pub.dev. Pass CURNEXT_API_KEY and optional baseUrl host https://api.curnext.app.",
  },
  {
    id: "firmware",
    title: "Firmware and OTA",
    source: "Firmware",
    href: "/firmware",
    tags: ["firmware", "ota", "cn-bc"],
    text: "CurNext tracks a firmware catalog, reported device versions, and install history (FACTORY, OTA, USB, MANUAL). Field OTA is signed and orchestrated on CN-BC - not a public browser flasher. Targets include bc, fg, cc via FUOTA/LoRaWAN, and ups UART updates.",
  },
  {
    id: "integrations",
    title: "Market Place integrations",
    source: "Integrations",
    href: "/integrations",
    tags: ["integrations", "oauth", "slack", "procore"],
    text: "Market Place connects messaging (WhatsApp, Slack, Teams), scheduling, monitoring (Datadog with API keys), productivity, storage, BIM (Revit), construction (Procore), enterprise, IoT, maps, CRM, and accounting tools. Most apps use OAuth in the dashboard; project owners manage connections.",
  },
  {
    id: "pricing",
    title: "Pricing and quotes",
    source: "Pricing",
    href: "/pricing",
    tags: [
      "pricing",
      "price",
      "cost",
      "costs",
      "quote",
      "install",
      "installation",
      "fee",
      "subscription",
      "duration",
      "months",
      "nodes",
      "finland",
      "canada",
      "cameroon",
      "sales",
    ],
    text: "CurNext prices by node count and contract duration (1-36 months), not legacy plan tiers. Markets: Finland (EUR), Canada (CAD), Cameroon (XAF). There is an installation fee by node band plus a monthly subscription per node for the chosen duration. For any cost, install, or how-much question: send the visitor to the Pricing page at /pricing to run the estimator (pick market, nodes, and duration such as 5 months) and request a quote there. If the estimator is not enough or they want a human, they can email sales@curnext.app. Do not invent a total price for a building when node count and market are unknown - explain the model and send them to Pricing first.",
  },
  {
    id: "hosting",
    title: "Datacenters and residency",
    source: "Datacenters",
    href: "/datacenters",
    tags: ["hosting", "germany", "frankfurt", "hetzner", "supabase", "gdpr"],
    text: "Application hosting is on Hetzner in Germany. Database and Auth are on Supabase in Frankfurt. Cloudflare provides DNS, TLS, WAF, CDN, and Turnstile. Customers in Finland, Canada, and Cameroon use this EU-anchored stack unless an enterprise addendum says otherwise. Selling into Canada or Cameroon is not the same as hosting a local production region there.",
  },
  {
    id: "security",
    title: "Security architecture summary",
    source: "Security",
    href: "/security",
    tags: ["security", "wireguard", "mtls", "ota", "tamper"],
    text: "Objectives: confidentiality, integrity, authenticity, availability, accountability, privacy. Field nodes use unique secure-element keys, LoRaWAN AES-128, signed OTA, tamper-proof design, and displacement detection. CN-BC uses WireGuard and MQTT mTLS. Cloud uses invite-only access, RBAC, privileged MFA, WAF, and GDPR-oriented audit. Report issues to security@curnext.app. Do not claim CurNext ISO 27001 or SOC 2 from public pages alone.",
  },
  {
    id: "dpa",
    title: "Data Processing Agreement",
    source: "DPA",
    href: "/data/data-processing-agreement",
    tags: ["dpa", "processor", "privacy", "subprocessors"],
    text: "CurNext Oy (Helsinki, Finland) acts as processor for Client Data instructed through the Services; Client remains controller. DPA available upon request; enterprise within 30 days of schedule signature. Contact legal@curnext.app. See the DPA page for the current subprocessor list.",
  },
  {
    id: "contact",
    title: "Contact and sales",
    source: "Contact",
    href: "/contact",
    tags: ["contact", "support", "sales", "email", "quote"],
    text: "sales@curnext.app for commercial questions, volume, and quotes when Pricing is not enough. info@curnext.app for general inquiries. support@curnext.app for product support. security@curnext.app for security. legal@curnext.app for DPA. Typical response within one business day on weekdays. Contact form: /contact. Pricing estimator and quote request: /pricing.",
  },
];

export const knowledgeBasePage = {
  title: "Knowledge Base",
  description:
    "Chat with CurNext about products, the site path, API, SDKs, firmware, hosting, and pricing.",
  assistantName: "CurNext",
  assistantLabel: "CurNext assistant",
  welcome:
    "Hi - I am here to help with CurNext. Ask me about our products, how the platform works, API and SDKs, firmware, hosting, or pricing. If it is outside CurNext, I will point you to the right place on our team.",
  thinkingLabel: "CurNext is thinking",
  consentVersion: "kb-consent-v3",
  consentStorageKey: "curnext-kb-gdpr-consent",
  accuracyNotice: {
    title: "About these answers",
    body: "Responses from this assistant are AI-generated and may not be 100% accurate. For confirmed details, quotes, or project advice, contact a CurNext representative.",
    salesEmail: "sales@curnext.app",
    contactHref: "/contact",
  },
} as const;

export const knowledgeBaseConsentCopy = {
  title: "Privacy notice",
  lead: "To use the Knowledge Base, please confirm how we process your questions.",
  bullets: [
    "Your questions and short chat context are processed so we can reply",
    "Do not submit passwords, API keys, or personal data that is not needed for your question",
    "You may withdraw consent at any time for this browser",
  ],
  checkboxLabelBefore:
    "I agree that CurNext may process my Knowledge Base questions to reply, as described in the ",
  checkboxLabelLink: "Privacy Policy",
  checkboxLabelAfter: ".",
  acceptLabel: "Continue",
  declineHint: "You can still browse the site or Contact us without chatting.",
} as const;

export const knowledgeBaseStarterPrompts = [
  "How does the L1 to L5 site path work?",
  "Which markets does CurNext sell into?",
  "How do I authenticate to the REST API?",
  "Where is Client Data hosted?",
] as const;
