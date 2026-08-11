export const siteConfig = {
  name: "CurNext",
  /** Default browser / SERP title when a page does not set its own */
  title: "CurNext | Build-ready Construction Site Intelligence",
  slogan: "Build-ready site intelligence for every surface, every phase",
  description:
    "CurNext turns industrial IoT sensing into clear go / no-go readiness for concrete curing, wall drying, indoor air, leaks, structural health, and MEP - evidence teams can act on.",
  domain: "curnext.app",
  businessId: "Coming soon",
  registeredIn: "Finland",
  /** Default Open Graph / Twitter share image (1200x630) */
  ogImage: "/og.png",
  twitterHandle: "@curnext",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://curnext.app"
      : "http://localhost:3003"),
  links: {
    twitter: "https://twitter.com/curnext",
    github: "https://github.com/curnext",
    dashboard: "https://dash.curnext.app",
    docs: "/docs",
    knowledgeBase: "/knowledge-base",
    apiDocs: "https://api.curnext.app/docs",
    appStore: "https://apps.apple.com/app/curnext",
    googlePlay: "https://play.google.com/store/apps/details?id=app.curnext",
  },
} as const;

export type SitePage = {
  title: string;
  href: string;
  description: string;
  group:
    | "primary"
    | "product"
    | "resources"
    | "company"
    | "legal"
    | "trust";
};

/** Planned marketing routes — placeholders only until implemented. */
export const sitePages: SitePage[] = [
  {
    title: "Home",
    href: "/",
    description: "CurNext marketing home",
    group: "primary",
  },
  {
    title: "Solutions",
    href: "/solutions",
    description: "Solutions for your industry and use case",
    group: "product",
  },
  {
    title: "Concrete Curing",
    href: "/solutions/concrete-curing",
    description: "Slab cure, maturity, readiness",
    group: "product",
  },
  {
    title: "Wall Drying",
    href: "/solutions/wall-drying",
    description: "Gypsum, wet rooms, tile backing",
    group: "product",
  },
  {
    title: "Indoor Air",
    href: "/solutions/indoor-air",
    description: "CO₂, PM, VOC (incl. post-handover)",
    group: "product",
  },
  {
    title: "Leak Detection",
    href: "/solutions/leak-detection",
    description: "Plant rooms, bathrooms, risers",
    group: "product",
  },
  {
    title: "Structural Health",
    href: "/solutions/structural-health",
    description: "Strain, crack, tilt, vibration",
    group: "product",
  },
  {
    title: "MEP",
    href: "/solutions/mep",
    description: "Flow, pressure, energy (PoE panel)",
    group: "product",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
    description: "How CurNext works",
    group: "product",
  },
  {
    title: "Technologies",
    href: "/technologies",
    description: "Platform stack from field nodes to cloud",
    group: "product",
  },
  {
    title: "Integrations",
    href: "/integrations",
    description: "Market Place integrations for your stack",
    group: "product",
  },
  {
    title: "API",
    href: "https://api.curnext.app/docs",
    description: "Swagger UI and API playground",
    group: "product",
  },
  {
    title: "SDKs",
    href: "/sdks",
    description: "JS/TS, PHP, Go, Python, Java, and Flutter clients",
    group: "product",
  },
  {
    title: "Firmware",
    href: "/firmware",
    description: "Firmware catalog, edge OTA, and install history",
    group: "product",
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Plans and pricing",
    group: "product",
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "Anonymous site patterns by solution",
    group: "resources",
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Guides, downloads, and reference material",
    group: "resources",
  },
  {
    title: "Documentation",
    href: "/docs",
    description: "Product documentation",
    group: "resources",
  },
  {
    title: "Knowledge Base",
    href: "/knowledge-base",
    description: "AI chat grounded in public website knowledge",
    group: "resources",
  },
  {
    title: "Our Blog",
    href: "/blog",
    description: "News, insights, and updates from CurNext",
    group: "resources",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Get in touch with CurNext",
    group: "company",
  },
  {
    title: "Careers",
    href: "/careers",
    description: "Join the CurNext team",
    group: "company",
  },
  {
    title: "Events",
    href: "/events",
    description: "Briefings and meetups in Helsinki, Ottawa, and Yaoundé",
    group: "company",
  },
  {
    title: "Support",
    href: "/support",
    description: "Product help, self-serve guides, and support channels",
    group: "company",
  },
  {
    title: "Datacenters",
    href: "/datacenters",
    description: "EU cloud residency - Germany and Frankfurt",
    group: "trust",
  },
  {
    title: "Security",
    href: "/security",
    description: "Architecture, zones, and layer controls",
    group: "trust",
  },
  {
    title: "Compliance",
    href: "/compliance",
    description: "Privacy, frameworks, and evidence without invented certifications",
    group: "trust",
  },
  {
    title: "DPA",
    href: "/data/data-processing-agreement",
    description: "Data Processing Agreement summary",
    group: "trust",
  },
  {
    title: "Audit Trail",
    href: "/audit-trail",
    description: "Project activity and accountability history",
    group: "trust",
  },
  {
    title: "Security Policy",
    href: "/data/security-policy",
    description: "Security objectives, access control, disclosure, and incident handling",
    group: "legal",
  },
  {
    title: "Privacy Policy",
    href: "/data/privacy-policy",
    description: "How CurNext collects, uses, and protects personal data",
    group: "legal",
  },
  {
    title: "Cookie Policy",
    href: "/data/cookie-policy",
    description: "Cookies, consent categories, inventory, and how to manage preferences",
    group: "legal",
  },
  {
    title: "Terms & Conditions",
    href: "/data/terms-and-conditions",
    description: "Terms and conditions",
    group: "legal",
  },
  {
    title: "GDPR Policies",
    href: "/data/gdpr",
    description: "GDPR roles, rights, retention, transfers, and how to contact gdpr@curnext.app",
    group: "legal",
  },
];

/**
 * CurNext solution catalog shown under Solutions in the header.
 */
export const solutions = [
  {
    code: "CN-CC",
    title: "Concrete Curing",
    href: "/solutions/concrete-curing",
    description: "Slab cure, maturity, readiness",
  },
  {
    code: "CN-WD",
    title: "Wall Drying",
    href: "/solutions/wall-drying",
    description: "Gypsum, wet rooms, tile backing",
  },
  {
    code: "CN-IAQ",
    title: "Indoor Air",
    href: "/solutions/indoor-air",
    description: "CO₂, PM, VOC (incl. post-handover)",
  },
  {
    code: "CN-LEAK",
    title: "Leak Detection",
    href: "/solutions/leak-detection",
    description: "Plant rooms, bathrooms, risers",
  },
  {
    code: "CN-SHM",
    title: "Structural Health",
    href: "/solutions/structural-health",
    description: "Strain, crack, tilt, vibration",
  },
  {
    code: "CN-MEP",
    title: "MEP",
    href: "/solutions/mep",
    description: "Flow, pressure, energy (PoE panel)",
  },
] as const;

export const whyChooseUs = [
  {
    title: "Readiness, not raw data",
    body: "CurNext answers \"Is this surface ready for the next phase?\" so teams act on go / no-go instead of deciphering sensor charts.",
  },
  {
    title: "Outcomes that pay for themselves",
    body: "Less drying uncertainty, fewer site inspections, documented compliance, earlier handovers, and fewer moisture claims - sold as construction intelligence, not a radio BOM.",
  },
  {
    title: "Industrial stack for real sites",
    body: "Factory-fixed L1 sensors through floor gateways, resilient power, and a secure building uplink into the cloud - designed for harsh construction environments, not consumer IoT toys.",
  },
  {
    title: "Evidence clients and auditors trust",
    body: "BIM-mapped monitoring, alerts, compliance reports, and a clear audit trail from concrete to the web app on curnext.app.",
  },
] as const;

export type NavLink = {
  title: string;
  href: string;
  description?: string;
  code?: string;
  /** Open in a new browser tab (e.g. docs, knowledge base). */
  external?: boolean;
};

export type NavItem =
  | { title: string; href: string; items?: never }
  | { title: string; href?: never; items: NavLink[] };

/** Header navigation — Home is a link; other items open dropdowns. */
export const primaryNav: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Solutions",
    items: solutions.map((solution) => ({
      title: solution.title,
      href: solution.href,
      description: solution.description,
    })),
  },
  {
    title: "Company",
    items: [
      {
        title: "How It Works",
        href: "/how-it-works",
        description: "How CurNext works",
      },
      {
        title: "Pricing",
        href: "/pricing",
        description: "Plans and pricing",
      },
      {
        title: "Docs",
        href: "/docs",
        description: "Product documentation",
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        description: "AI chat grounded in public website knowledge",
      },
      {
        title: "Careers",
        href: "/careers",
        description: "Join the CurNext team",
      },
    ],
  },
  {
    title: "Developer",
    items: [
      {
        title: "API",
        href: "https://api.curnext.app/docs",
        description: "Swagger UI and API playground",
        external: true,
      },
      {
        title: "Integration",
        href: "/integrations",
        description: "Market Place integrations for your stack",
      },
      {
        title: "SDKs",
        href: "/sdks",
        description: "JS/TS, PHP, Go, Python, Java, and Flutter clients",
      },
      {
        title: "Firmware",
        href: "/firmware",
        description: "Firmware catalog, edge OTA, and install history",
      },
      {
        title: "Technologies",
        href: "/technologies",
        description: "Platform stack from field nodes to cloud",
      },
    ],
  },
  {
    title: "More",
    items: [
      {
        title: "Contact Us",
        href: "/contact",
        description: "Get in touch with CurNext",
      },
      {
        title: "Resources",
        href: "/resources",
        description: "Guides, downloads, and reference material",
      },
      {
        title: "Datacenters",
        href: "/datacenters",
        description: "EU cloud residency - Germany and Frankfurt",
      },
      {
        title: "Security",
        href: "/security",
        description: "Architecture, zones, and layer controls",
      },
      {
        title: "Case Study",
        href: "/case-studies",
        description: "Anonymous site patterns by solution",
      },
    ],
  },
];

