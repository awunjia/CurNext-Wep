export const supportPage = {
  title: "Support",
  description:
    "Get help with CurNext products, the dashboard, devices, and integrations - starting with self-serve resources, then a clear path to the right human inbox.",
  leadNote:
    "CurNext is invite-only and, under internal policies, does not onboard product users under 18. If you cannot sign in, confirm you were invited to a project before opening a support ticket.",
  email: "support@curnext.app",
} as const;

export const supportSelfServe = {
  title: "Start here",
  lead: "Most setup and how-to questions are answered faster in Docs and the Knowledge Base than by email.",
  items: [
    {
      title: "Documentation",
      body: "Site path, solutions, API, SDKs, firmware, security, and commercial scope.",
      href: "/docs",
    },
    {
      title: "Knowledge Base",
      body: "Ask CurNext Assistant about products, hosting, pricing model, and common site questions.",
      href: "/knowledge-base",
    },
    {
      title: "Dashboard",
      body: "Sign in to manage projects, devices, alerts, and membership - invite required.",
      href: "https://dash.curnext.app",
    },
    {
      title: "API playground",
      body: "Interactive OpenAPI docs for buyer integrations under api.curnext.app.",
      href: "https://api.curnext.app/docs",
    },
  ],
} as const;

export const supportTopics = {
  title: "What product support covers",
  items: [
    {
      title: "Account & access",
      body: "Invites, sign-in issues for existing members, role confusion, and project membership questions.",
    },
    {
      title: "Dashboard & alerts",
      body: "Readiness views, alert behaviour, exports, and day-to-day use of the web product.",
    },
    {
      title: "Devices & firmware",
      body: "Node assignment, connectivity symptoms, and firmware stage / apply outcomes - with site context.",
    },
    {
      title: "API & SDKs",
      body: "Key usage, endpoint errors, and SDK setup for licensed Professional integrations.",
    },
  ],
} as const;

export const supportChannels = {
  title: "Human channels",
  lead: "Weekdays, typically within one business day. Include project name, device IDs if relevant, and what you already tried.",
  rows: [
    {
      team: "Product support",
      email: "support@curnext.app",
      useFor: "Existing customers - product, devices, dashboard, API runtime issues",
    },
    {
      team: "Sales",
      email: "sales@curnext.app",
      useFor: "Quotes, new rollouts, volume, commercial scope, Pricing follow-up",
    },
    {
      team: "Security",
      email: "security@curnext.app",
      useFor: "Vulnerability disclosure and security incidents only",
    },
    {
      team: "Legal / DPA",
      email: "legal@curnext.app",
      useFor: "Data Processing Agreement and privacy counsel requests",
    },
  ],
} as const;

export const supportBeforeYouWrite = [
  "Project or organisation name as shown in the dashboard",
  "Your login email (must already be invited for product issues)",
  "Approximate time of the issue (timezone)",
  "Screenshots or exact error text where useful",
  "Device / node IDs for field hardware problems",
  "Whether the issue is reproducible, and steps you already took",
] as const;

export const supportEscalation = {
  title: "Route correctly",
  items: [
    {
      title: "Not a customer yet?",
      body: "Use Pricing to estimate and request a quote, or Contact for company questions. Support is for active product use.",
      href: "/pricing",
      linkLabel: "Open Pricing",
    },
    {
      title: "General company topics",
      body: "Partnerships, press, and non-product inquiries go through Contact or info@curnext.app.",
      href: "/contact",
      linkLabel: "Open Contact",
    },
    {
      title: "Security reports",
      body: "Do not send vulnerability details to support@. Use coordinated disclosure at security@curnext.app.",
      href: "/security",
      linkLabel: "Security architecture",
    },
  ],
} as const;
