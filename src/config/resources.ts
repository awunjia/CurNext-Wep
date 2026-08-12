import { siteConfig, solutions } from "@/config/site";

export const resourcesPage = {
  title: "Resources",
  description:
    "Guides, product references, and developer material already published for CurNext.",
} as const;

export type ResourceLink = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

export type ResourceGroup = {
  title: string;
  lead: string;
  items: ResourceLink[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    title: "Guides & docs",
    lead: "Operator and integrator documentation hosted outside this marketing site.",
    items: [
      {
        title: "Documentation",
        description: "Product documentation for CurNext.",
        href: siteConfig.links.docs,
      },
      {
        title: "Knowledge Base",
        description: "AI chat grounded in public CurNext website knowledge.",
        href: siteConfig.links.knowledgeBase,
      },
    ],
  },
  {
    title: "Product",
    lead: "How CurNext works on site, solution SKUs, and commercial scope.",
    items: [
      {
        title: "How it works",
        description: "From probes to readiness decisions on the building path.",
        href: "/how-it-works",
      },
      {
        title: "Pricing",
        description: "Node count, duration, and request a scoped quote.",
        href: "/pricing",
      },
      ...solutions.map((solution) => ({
        title: `${solution.code} - ${solution.title}`,
        description: solution.description,
        href: solution.href,
      })),
    ],
  },
  {
    title: "Developers",
    lead: "API, SDKs, Market Place integrations, firmware overview, and stack notes.",
    items: [
      {
        title: "API",
        description: "REST readiness, BIM, devices, telemetry, and webhooks.",
        href: "/api",
      },
      {
        title: "SDKs",
        description:
          "Official clients for JavaScript/TypeScript, PHP, Go, Python, Java, and Flutter.",
        href: "/sdks",
      },
      {
        title: "Market Place",
        description: "Third-party integrations for messaging, BIM, CRM, and more.",
        href: "/integrations",
      },
      {
        title: "Firmware",
        description: "Catalog, edge OTA on CN-BC, and install history overview.",
        href: "/firmware",
      },
      {
        title: "Technologies",
        description: "Public stack, connectivity, and ecosystem partners.",
        href: "/technologies",
      },
      {
        title: "Architecture",
        description: "L1-L5 site path from field nodes to cloud",
        href: "/architecture",
      },
      {
        title: "API playground",
        description: "Interactive OpenAPI docs at api.curnext.app.",
        href: siteConfig.links.apiDocs,
        external: true,
      },
    ],
  },
  {
    title: "Company",
    lead: "Talk to CurNext, explore open roles, or review EU hosting residency.",
    items: [
      {
        title: "Contact",
        description: "General inquiries, support, and partnership topics.",
        href: "/contact",
      },
      {
        title: "Careers",
        description: "Open roles and how we work.",
        href: "/careers",
      },
      {
        title: "Case studies",
        description:
          "Anonymous site patterns by solution - named references via sales.",
        href: "/case-studies",
      },
      {
        title: "Datacenters",
        description:
          "Where CurNext runs - Hetzner Germany, Supabase Frankfurt, Cloudflare edge.",
        href: "/datacenters",
      },
      {
        title: "Security",
        description:
          "Zone model, layer controls, signed OTA, and disclosure contact.",
        href: "/security",
      },
      {
        title: "DPA",
        description:
          "Art. 28 processor summary - request the executable agreement via legal.",
        href: "/data/data-processing-agreement",
      },
    ],
  },
];
