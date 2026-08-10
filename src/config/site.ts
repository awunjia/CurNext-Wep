export const siteConfig = {
  name: "CurNext",
  slogan: "Build-ready site intelligence for every surface, every phase",
  description:
    "CurNext provides build-ready site intelligence for every surface, every phase.",
  domain: "curnext.app",
  businessId: "3456789-0",
  registeredIn: "Finland",
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
    title: "Concrete curing",
    href: "/solutions/concrete-curing",
    description: "Slab cure, maturity, readiness",
    group: "product",
  },
  {
    title: "Wall drying",
    href: "/solutions/wall-drying",
    description: "Gypsum, wet rooms, tile backing",
    group: "product",
  },
  {
    title: "Indoor air",
    href: "/solutions/indoor-air",
    description: "CO₂, PM, VOC (incl. post-handover)",
    group: "product",
  },
  {
    title: "Leak detection",
    href: "/solutions/leak-detection",
    description: "Plant rooms, bathrooms, risers",
    group: "product",
  },
  {
    title: "Structural health",
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
    title: "Blog",
    href: "/blog",
    description: "News, insights, and updates",
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
    description: "Upcoming events, webinars, and meetups",
    group: "company",
  },
  {
    title: "Support",
    href: "/support",
    description: "Customer support and assistance",
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
    description: "Compliance certifications and frameworks",
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
    description: "Audit logging and activity history",
    group: "trust",
  },
  {
    title: "Security Policy",
    href: "/data/security-policy",
    description: "Security policy",
    group: "legal",
  },
  {
    title: "Privacy Policy",
    href: "/data/privacy-policy",
    description: "Privacy policy",
    group: "legal",
  },
  {
    title: "Cookie Policy",
    href: "/data/cookie-policy",
    description: "Cookie policy",
    group: "legal",
  },
  {
    title: "Terms of Service",
    href: "/data/terms-of-service",
    description: "Terms of service",
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
    description: "GDPR policies",
    group: "legal",
  },
];

/**
 * CurNext solution catalog shown under Solutions in the header.
 */
export const solutions = [
  {
    code: "CN-CC",
    title: "Concrete curing",
    href: "/solutions/concrete-curing",
    description: "Slab cure, maturity, readiness",
  },
  {
    code: "CN-WD",
    title: "Wall drying",
    href: "/solutions/wall-drying",
    description: "Gypsum, wet rooms, tile backing",
  },
  {
    code: "CN-IAQ",
    title: "Indoor air",
    href: "/solutions/indoor-air",
    description: "CO₂, PM, VOC (incl. post-handover)",
  },
  {
    code: "CN-LEAK",
    title: "Leak detection",
    href: "/solutions/leak-detection",
    description: "Plant rooms, bathrooms, risers",
  },
  {
    code: "CN-SHM",
    title: "Structural health",
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

