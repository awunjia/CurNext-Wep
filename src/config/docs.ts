import { marketplaceIntegrations } from "@/config/marketplace";
import { sdkPackages } from "@/config/sdk-packages";
import { solutions, siteConfig } from "@/config/site";

export type DocsLink = { label: string; href: string; external?: boolean };

export type DocsSubsection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type DocsSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: DocsSubsection[];
  links?: DocsLink[];
  code?: string;
};

export type DocsTab = {
  id: string;
  label: string;
  description: string;
  sections: DocsSection[];
};

export const docsPage = {
  title: "Docs",
  description:
    "Long-form product documentation for CurNext - site path, solutions, API, SDKs, firmware, integrations, security, hosting, and commercial scope. Built from public material on curnext.app.",
} as const;

const solutionBodies: Record<
  (typeof solutions)[number]["code"],
  { summary: string; bullets: string[] }
> = {
  "CN-CC": {
    summary:
      "Concrete curing monitors slab maturity with air, surface, and core probes. A sealed edge node stays outside the pour; rugged probes sit where the slab needs measurement. CurNext's maturity computations plus XGBoost turn those temperatures into curing predictions and build-ready timing, with an audit trail for the pour package.",
    bullets: [
      "Air, surface, and core probe roles on the same harness model",
      "Maturity computations + XGBoost curing prediction for readiness",
      "Go / no-go readiness instead of calendar-only cure rules",
      "Documented cure trail for formwork and follow-on trades",
      "LoRaWAN field path into CN-FG and CN-BC",
    ],
  },
  "CN-WD": {
    summary:
      "Wall drying covers gypsum, wet rooms, and tile backing. Nodes watch moisture and drying windows so finishing crews do not trap wet assemblies behind coverings under schedule pressure.",
    bullets: [
      "Finish readiness for gypsum and wet-room assemblies",
      "Alerts when surfaces stay out of band",
      "Shared dry / wait calls for trades packages",
      "Trail of conditions before covering work",
    ],
  },
  "CN-IAQ": {
    summary:
      "Indoor air provides CO2, particulate, VOC, and climate context on the same site stack - including post-handover and early occupancy when teams need shared air quality without a separate lab campaign for every complaint.",
    bullets: [
      "Representative zone nodes for handover and occupancy",
      "Thresholds and alerts for site and facilities roles",
      "Measurements attached to spaces, not one-off walkthrough notes",
      "Same building uplink and project surface as other SKUs",
    ],
  },
  "CN-LEAK": {
    summary:
      "Leak detection watches plant rooms, bathrooms, and risers for moisture events that are often found late - after finishes and equipment are already at risk.",
    bullets: [
      "Event-driven alerts for high-risk wet zones",
      "Earlier awareness for site and MEP leads",
      "Edge uplink with project-mapped locations",
      "Response path before damage spreads",
    ],
  },
  "CN-SHM": {
    summary:
      "Structural health monitors tilt, crack, strain, and vibration context during critical works and temporary works - continuous context between periodic survey visits.",
    bullets: [
      "Agreed structural points instrumented on the building path",
      "Thresholds and history for engineers and site managers",
      "Events retained when works change site conditions",
      "Complements, does not replace, survey practice",
    ],
  },
  "CN-MEP": {
    summary:
      "MEP sensing covers flow, pressure, and energy where higher sample rates or wired plant signals are needed - including PoE panel paths during commissioning and balancing.",
    bullets: [
      "Wired plant signals on agreed circuits",
      "Shared record during commissioning windows",
      "Cloud readiness and history for MEP leads",
      "Fits the same project and API model as wireless SKUs",
    ],
  },
};

export const docsTabs: DocsTab[] = [
  {
    id: "overview",
    label: "Overview",
    description: "What CurNext is, how Docs is organized, and where to go next.",
    sections: [
      {
        id: "what-is-curnext",
        title: "What is CurNext?",
        paragraphs: [
          "CurNext provides build-ready site intelligence for construction surfaces and spaces. Field nodes measure conditions on the work itself. The platform answers whether work can proceed - with readiness, alerts, and an audit trail mapped to your project.",
          "The product is sold as construction intelligence, not a radio bill of materials. Site and office teams act on go / no-go decisions. Developers and operators extend the same stack through the REST API, SDKs, Market Place integrations, and firmware operations.",
          "This Docs surface summarizes public product material already published on curnext.app. It is meant to be readable end to end. Detailed hardware security runbooks, factory fixtures, and private ops procedures stay in internal documentation.",
        ],
      },
      {
        id: "who-it-is-for",
        title: "Who it is for",
        paragraphs: [
          "CurNext is built for contractors, project teams, BIM coordinators, facilities roles after handover, and integrators who need readiness decisions in tools they already run.",
        ],
        bullets: [
          "Site teams acting on go / no-go readiness on slabs, walls, air, leaks, structure, and plant",
          "Office teams tracking surfaces against schedule and handover evidence",
          "Developers calling the REST API or official SDKs",
          "Operators reviewing firmware catalog, reported versions, and edge OTA context",
          "Procurement and security reviewers reading Security, Datacenters, and DPA pages",
        ],
      },
      {
        id: "operating-markets",
        title: "Operating markets",
        paragraphs: [
          "CurNext currently sells into Finland, Canada, and Cameroon. Pricing is native list pricing per market (EUR, CAD, XAF) - not a single FX conversion table.",
          "Platform Client Data for those markets is hosted on the EU-anchored production stack (application origins in Germany, database and auth in Frankfurt) unless a written enterprise residency addendum says otherwise. Selling into Canada or Cameroon is not the same as hosting a local production region there.",
        ],
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Datacenters", href: "/datacenters" },
          { label: "DPA", href: "/data/data-processing-agreement" },
        ],
      },
      {
        id: "how-docs-is-organized",
        title: "How this documentation is organized",
        paragraphs: [
          "Use the tabs across the top to move between topics. On large screens, the left rail lists section headers for the active tab and highlights the section in view as you scroll.",
        ],
        bullets: [
          "Overview - product framing and navigation",
          "Site path - L1 through L5 and connectivity",
          "Solutions - each factory-fixed SKU in depth",
          "API - base URL, auth, domains, webhooks",
          "SDKs - languages, install, patterns",
          "Firmware - catalog, history, edge OTA",
          "Integrations - Market Place catalog",
          "Security - public architecture summary",
          "Hosting - residency and scale posture",
          "Commercial - pricing model and contact paths",
        ],
      },
      {
        id: "related-surfaces",
        title: "Related surfaces",
        paragraphs: [
          "Docs sits beside other public surfaces. Prefer the Knowledge Base AI chat for quick questions grounded in website knowledge, and Contact when a guide is missing.",
        ],
        links: [
          { label: "How it works", href: "/how-it-works" },
          { label: "Technologies", href: "/technologies" },
          { label: "Resources", href: "/resources" },
          { label: "Case studies", href: "/case-studies" },
          {
            label: "Knowledge Base",
            href: "/knowledge-base",
          },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
  {
    id: "site-path",
    label: "Site path",
    description: "From field nodes to CurNext cloud - layers, power, uplink, and outcomes.",
    sections: [
      {
        id: "path-intro",
        title: "One path for every surface",
        paragraphs: [
          "Curing, drying, air, leak, structure, and MEP share the same path to the cloud. Devices capture conditions on the work. Floor collection keeps a level organized. Dedicated power keeps floor and building hardware online. The building uplink is the secure bridge off the jobsite. CurNext cloud turns site data into readiness, alerts, and next actions - with an audit trail for clients and compliance.",
          "This is an industrial construction stack, not consumer IoT toys. Public pages name capabilities at a level suitable for buyers and integrators. They are not an attack-surface guide.",
        ],
        links: [
          { label: "How it works", href: "/how-it-works" },
          { label: "Technologies", href: "/technologies" },
        ],
      },
      {
        id: "layers",
        title: "Layers L1-L5",
        paragraphs: [
          "Each layer has one job. Power does not interpret measurements. Floor gateways do not face the public internet. The building controller is the security boundary for uplink and signed field OTA.",
        ],
        subsections: [
          {
            title: "L1 - Sense (field nodes)",
            paragraphs: [
              "Install on the work itself - curing slabs, drying walls, indoor air, leaks, structure, or plant systems. Devices capture the conditions that drive schedule and quality decisions.",
            ],
            bullets: [
              "SKUs: CN-CC, CN-WD, CN-IAQ, CN-LEAK, CN-SHM, CN-MEP",
              "Unique device identity and secure-element key material",
              "Tamper-proof design and displacement detection on field nodes",
              "LoRaWAN Class A (EU868) for battery wireless nodes where applicable",
            ],
          },
          {
            title: "L2 - Aggregate (CN-FG)",
            paragraphs: [
              "Each floor concentrates device traffic at one collection point, so a level stays organized as the project scales across wings and zones.",
            ],
            bullets: [
              "Trust anchor for air-link verification (MIC, counters, join)",
              "Floor VLAN only - no cloud-facing interface",
              "OTA only from CN-BC",
            ],
          },
          {
            title: "L3 - Power (CN-UPS)",
            paragraphs: [
              "Dedicated power keeps floor and building hardware online through outages. This layer supplies power only - it does not interpret measurements or carry a data plane on the management VLAN.",
            ],
          },
          {
            title: "L4 - Bridge (CN-BC)",
            paragraphs: [
              "The building unit is the secure link from the site network to CurNext. It maintains a protected path off the jobsite, terminates field OTA orchestration, and speaks to the private cloud broker path.",
            ],
            bullets: [
              "WireGuard client at the building security boundary",
              "MQTT over TLS with mutual TLS to the private broker",
              "Signed OTA jobs for L1/L2 targets",
              "Encrypted store-and-forward when the uplink is down",
            ],
          },
          {
            title: "L5 - Decide (CurNext cloud)",
            paragraphs: [
              "The platform turns site data into readiness status, alerts, and next actions - in the web dashboard and mobile app - with an audit trail for clients and compliance.",
            ],
            bullets: [
              "Project dashboards, alerts, BIM-mapped readiness",
              "REST API, SDKs, Market Place, firmware catalog",
              "Invite-only access, RBAC, privileged MFA",
            ],
          },
        ],
      },
      {
        id: "connectivity",
        title: "Connectivity",
        paragraphs: [
          "Named at the capability level - standard industrial protocols for the hardware path and HTTPS for buyer integrations.",
        ],
        bullets: [
          "LoRaWAN (EU868) for battery field nodes - long-range, site-friendly radio into the floor path",
          "MQTT over TLS for device and gateway telemetry on the hardware path",
          "WireGuard themes for building edge connectivity into CurNext cloud services",
          "HTTPS REST for buyer integrations at api.curnext.app - readiness, BIM, devices, alerts, webhooks",
        ],
      },
      {
        id: "outcomes",
        title: "Outcomes on site",
        paragraphs: [
          "Teams should leave CurNext with decisions and evidence, not only charts.",
        ],
        bullets: [
          "One stack for every surface - curing, drying, air, leak, structure, and MEP",
          "Decisions, not dashboards only - what is ready, what is at risk, what to do next",
          "Evidence that travels - handovers, claims, and audits without rebuilding reports by hand",
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    description: "Factory-fixed product lines for site jobs on the same stack.",
    sections: [
      {
        id: "solution-catalog",
        title: "Solution catalog",
        paragraphs: [
          "Each SKU is purpose-fixed for a site job on the same CurNext stack. Pick the product line that matches the surface, then scale nodes and duration on Pricing.",
        ],
        bullets: solutions.map(
          (s) => `${s.code} - ${s.title}: ${s.description}`,
        ),
        links: [{ label: "All solutions", href: "/solutions" }],
      },
      ...solutions.map((s) => ({
        id: `solution-${s.code.toLowerCase()}`,
        title: `${s.code} - ${s.title}`,
        paragraphs: [solutionBodies[s.code].summary],
        bullets: solutionBodies[s.code].bullets,
        links: [{ label: `Open ${s.code} page`, href: s.href }],
      })),
      {
        id: "solution-patterns",
        title: "Anonymous site patterns",
        paragraphs: [
          "Case studies on the marketing site are anonymous deployment patterns by SKU - challenge, approach, and outcome - without inventing customer logos or fake percentages. Named references are available via sales under NDA.",
        ],
        links: [{ label: "Case studies", href: "/case-studies" }],
      },
    ],
  },
  {
    id: "api",
    label: "API",
    description: "Versioned REST for readiness, BIM, devices, measurements, and events.",
    sections: [
      {
        id: "api-intro",
        title: "API overview",
        paragraphs: [
          "The CurNext REST API is the integration surface for readiness intelligence. Frame calls around decisions and project context - not a raw sensor dump. Official SDKs wrap the same /api/v1 paths.",
          "Interactive OpenAPI documentation and playground live at api.curnext.app/docs. Marketing overview lives at /api.",
        ],
        links: [
          { label: "API overview", href: "/api" },
          {
            label: "OpenAPI playground",
            href: siteConfig.links.apiDocs,
            external: true,
          },
        ],
      },
      {
        id: "api-base",
        title: "Base URL and versioning",
        paragraphs: [
          "Production API host is api.curnext.app. Pass the host only to SDKs - paths are prefixed with /api/v1 on the wire.",
        ],
        code: "https://api.curnext.app\nAuthorization: Bearer cn_live_...",
      },
      {
        id: "api-auth",
        title: "Authentication and access",
        paragraphs: [
          "Create a project API key in the product under Integration. Pass it as a Bearer token on every request.",
          "API access follows your site subscription - node count and duration - not a separate legacy \"Professional\" plan name. Keys are scoped to the project that issued them.",
        ],
        bullets: [
          "Store keys in a secrets manager - never in client-side code or public repos",
          "Rotate keys when people leave the project or a leak is suspected",
          "Prefer short-lived operational scripts over embedding keys in mobile apps",
        ],
      },
      {
        id: "api-domains",
        title: "Domains you can call",
        paragraphs: [
          "Use these domains as the mental model when designing an integration.",
        ],
        subsections: [
          {
            title: "Health",
            paragraphs: ["Service status for load balancers and uptime checks."],
          },
          {
            title: "Projects",
            paragraphs: [
              "List projects, members, audit events, subscription context, and readiness views tied to the building structure.",
            ],
          },
          {
            title: "Devices",
            paragraphs: ["List and get devices bound to the project."],
          },
          {
            title: "Alerts",
            paragraphs: ["List, get, and resolve operational alerts."],
          },
          {
            title: "Measurements",
            paragraphs: [
              "Measurement cycles and latest device readings for the surfaces you instrumented.",
            ],
          },
          {
            title: "Webhooks",
            paragraphs: [
              "List webhook endpoints via API. Create and manage receivers in the product UI for events such as SURFACE_READY, ALERT_CREATED, and DEVICE_DISPLACED.",
            ],
          },
          {
            title: "BIM",
            paragraphs: [
              "Project hierarchy tree so readiness stays mapped to floors, rooms, and surfaces.",
            ],
          },
        ],
      },
      {
        id: "api-errors",
        title: "Errors and rate behaviour",
        paragraphs: [
          "Treat 401 as an invalid or missing key, 404 as a missing resource, and 429 as rate limiting. Retry 429 with backoff. Do not retry 401 without rotating credentials.",
          "Exact rate limits depend on project and subscription context - do not hard-code invented RPS numbers from this Docs page.",
        ],
      },
    ],
  },
  {
    id: "sdks",
    label: "SDKs",
    description: "Official clients for the same REST surface across languages.",
    sections: [
      {
        id: "sdk-intro",
        title: "What you can build",
        paragraphs: [
          "Restricting the experience to the CurNext client is not enough. Official SDKs give teams freedom to extend readiness intelligence into applications, workflows, and stacks they already operate.",
        ],
        bullets: [
          "Pull readiness and telemetry into dashboards or reports",
          "Automate site workflows - resolve alerts, list audit events, drive ops from scripts",
          "Integrate with Node, PHP, Go, Python, Java, or Flutter apps you already run",
          "Work with webhooks - list endpoints via SDK; create receivers in the dashboard",
        ],
        links: [{ label: "SDK page", href: "/sdks" }],
      },
      {
        id: "sdk-languages",
        title: "Official languages",
        paragraphs: [
          "Install from public registries. Live versions on the SDK page are resolved from npm, Packagist, pkg.go.dev, PyPI, and Maven Central where published. Flutter is planned on pub.dev and marked coming soon until published.",
        ],
        bullets: sdkPackages.map((pkg) => {
          const status =
            pkg.status === "coming_soon"
              ? "coming soon"
              : pkg.status === "beta"
                ? "beta"
                : "live";
          return `${pkg.name} - ${pkg.packageName} (${pkg.registry}, ${status})`;
        }),
      },
      {
        id: "sdk-auth",
        title: "Auth pattern",
        paragraphs: [
          "Pass CURNEXT_API_KEY and optional baseUrl (host only). Default base is https://api.curnext.app.",
        ],
        code: 'apiKey: process.env.CURNEXT_API_KEY\n// baseUrl: "https://api.curnext.app"',
      },
      ...sdkPackages.map((pkg) => ({
        id: `sdk-${pkg.id}`,
        title: pkg.name,
        paragraphs: [pkg.summary],
        bullets: pkg.highlights,
        code: pkg.install,
        links: pkg.registryUrl
          ? [
              {
                label: `Open on ${pkg.registry}`,
                href: pkg.registryUrl,
                external: true,
              },
            ]
          : undefined,
      })),
    ],
  },
  {
    id: "firmware",
    label: "Firmware",
    description: "Catalog, reported versions, install history, and edge OTA.",
    sections: [
      {
        id: "firmware-model",
        title: "What exists today",
        paragraphs: [
          "CurNext tracks a firmware version catalog, reported device version strings, and install history. Field OTA is orchestrated at the edge on CN-BC.",
          "Cloud upload, publish channels, and one-click fleet rollout UI are not part of the public marketing surface. This is not a browser flasher.",
        ],
        bullets: [
          "Browse the catalog model: version, device type, production and CE flags",
          "Understand reported fleet strings vs catalog rows",
          "See how install history records factory, OTA, USB, and manual methods",
          "Field OTA runs as signed jobs on CN-BC",
        ],
        links: [{ label: "Firmware page", href: "/firmware" }],
      },
      {
        id: "firmware-catalog",
        title: "Catalog flags",
        paragraphs: [
          "Catalog rows carry production and CE marking flags. There is no draft/beta channel enum on the public model described here.",
        ],
        bullets: [
          "isProduction - whether the catalog row is marked for production use",
          "ceMarked - CE marking flag on the catalog row",
          "Device type ties the row to CN-CC, CN-FG, CN-BC, CN-UPS, and related classes",
        ],
      },
      {
        id: "firmware-history",
        title: "Install history",
        paragraphs: [
          "Install history records how a version reached a device. Methods include FACTORY, OTA, USB, and MANUAL.",
        ],
      },
      {
        id: "firmware-ota",
        title: "Edge OTA on CN-BC",
        paragraphs: [
          "Signed jobs reach CN-BC. The edge agent verifies, stages, and updates targets. Images are addressed by checksum. Rollouts can move through accepted, rejected, canary, rolling, done, and failed states.",
        ],
        subsections: [
          {
            title: "Targets",
            bullets: [
              "bc - CN-BC self-update",
              "fg - CN-FG floor update",
              "cc - field nodes via FUOTA / LoRaWAN",
              "ups - CN-UPS UART framed update",
            ],
          },
        ],
      },
      {
        id: "firmware-security",
        title: "Security themes",
        paragraphs: [
          "Signed OTA, secure-element identity, and anti-rollback themes are part of the hardware security model. Factory provisioning and field NFC install are documented for operations separately from this public Docs page.",
        ],
        links: [{ label: "Security architecture", href: "/security" }],
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Market Place third-party connections by category.",
    sections: [
      {
        id: "marketplace",
        title: "Market Place",
        paragraphs: [
          "Connect messaging, scheduling, monitoring, productivity, storage, BIM, construction, enterprise, IoT, maps, CRM, and accounting tools from the product Market Place.",
          "Most apps use one-click OAuth in the dashboard. Datadog connects with API keys (not OAuth). Project owners manage connections in the product. The marketing Integrations page is a catalog - connect actions run in the dashboard.",
        ],
        links: [
          { label: "Integrations page", href: "/integrations" },
          {
            label: "Open dashboard Market Place",
            href: "https://dash.curnext.app/addon",
            external: true,
          },
        ],
      },
      {
        id: "marketplace-categories",
        title: "Categories",
        paragraphs: [
          "Filter the catalog by category when you know the job - messaging for alerts, BIM for models, CRM for account workflows.",
        ],
        bullets: [
          "Messaging",
          "Scheduling",
          "Monitoring",
          "Productivity",
          "Storage",
          "BIM",
          "Construction",
          "Enterprise",
          "IoT",
          "Maps",
          "CRM",
          "Accounting",
        ],
      },
      {
        id: "marketplace-catalog",
        title: "Catalog (18 integrations)",
        paragraphs: [
          "The public catalog currently lists these integrations. Descriptions stay short - open the vendor site for product detail.",
        ],
        bullets: marketplaceIntegrations.map(
          (item) =>
            `${item.name} (${item.category}, ${item.connect === "oauth" ? "OAuth" : "API key"}): ${item.description}`,
        ),
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    description: "Public security architecture summary for reviewers.",
    sections: [
      {
        id: "security-objectives",
        title: "Security objectives",
        paragraphs: [
          "CurNext designs for confidentiality, integrity, authenticity, availability, accountability, and privacy across the five-layer stack. The Security page is the long-form public reference. This tab is the Docs digest.",
        ],
        bullets: [
          "Confidentiality - telemetry and credentials not readable without authorization",
          "Integrity - firmware, config, and measurements protected against undetected tampering",
          "Authenticity - devices and services prove identity before trust",
          "Availability - resilience to outage, replay, and flooding",
          "Accountability - audit trail for access, provisioning, OTA, and admin actions",
          "Privacy - GDPR-oriented handling of personal and site data in the cloud",
        ],
        links: [{ label: "Security page", href: "/security" }],
      },
      {
        id: "security-zones",
        title: "Zones and conduits",
        paragraphs: [
          "IEC 62443-style zones keep field radio, floor LAN, building edge, and cloud separated. Power has no data conduit.",
        ],
        bullets: [
          "Z1 - L1 field sensors (no IP stack on the node)",
          "Z2 - CN-FG floor gateway on local VLAN",
          "Z3 - CN-UPS power only",
          "Z4 - CN-BC building DMZ (WireGuard, MQTT, OTA)",
          "Z5 - CurNext cloud",
          "C1 air link: LoRaWAN MAC AES-128 + MIC, OTAA, secure-element keys",
          "C4 building to cloud: WireGuard + MQTT TLS 1.3 with mTLS; broker not public",
          "C5 install: NFC cryptographic binding; QR assign disabled by default",
        ],
      },
      {
        id: "security-field",
        title: "Field controls (L1-L4)",
        paragraphs: [
          "Field nodes use unique keys, secure boot, signed OTA, tamper-proof design, and displacement detection. CN-FG verifies the air link. CN-BC is the only field path for signed updates to L1/L2.",
        ],
      },
      {
        id: "security-cloud",
        title: "Cloud controls (L5)",
        paragraphs: [
          "Private MQTT mesh, invite-only access, RBAC, privileged MFA, rate limits, edge WAF, encryption in transit and at rest, tenant isolation, encrypted backups, and GDPR-oriented audit events.",
        ],
      },
      {
        id: "security-disclosure",
        title: "Disclosure",
        paragraphs: [
          "Report vulnerabilities to security@curnext.app. Coordinated disclosure is preferred. Do not invent CurNext ISO 27001 or SOC 2 certification from this Docs page - standards listed on Security are design alignment unless separately confirmed.",
        ],
        links: [
          { label: "Security page", href: "/security" },
          { label: "DPA", href: "/data/data-processing-agreement" },
        ],
      },
    ],
  },
  {
    id: "hosting",
    label: "Hosting",
    description: "Where CurNext runs, how traffic flows, and what scales.",
    sections: [
      {
        id: "hosting-intro",
        title: "EU cloud, anchored in Germany",
        paragraphs: [
          "Application hosting runs on Hetzner in Germany. Database and authentication run on Supabase in Frankfurt. Public traffic is protected at the Cloudflare edge and distributed across load-balanced replicas.",
          "This is a trust / residency explanation - not a status dashboard or a public inventory of machines. Customers in Finland, Canada, and Cameroon use this EU-anchored stack unless an enterprise addendum says otherwise.",
        ],
        links: [{ label: "Datacenters page", href: "/datacenters" }],
      },
      {
        id: "hosting-layers",
        title: "Publishable region facts",
        paragraphs: [
          "Use these labels in procurement reviews. They match the Datacenters page.",
        ],
        bullets: [
          "Application origins - Hetzner, Germany - Docker images for marketing, SaaS web, API",
          "Database + Auth - Supabase, Frankfurt - PostgreSQL and Auth",
          "Edge - Cloudflare global - DNS, TLS, WAF, CDN, Turnstile",
          "Object storage when used - Cloudflare R2 with EU jurisdiction option",
          "Scale path - load balancers in front of stateless replicas",
        ],
      },
      {
        id: "hosting-traffic",
        title: "How traffic flows",
        paragraphs: [
          "Internet to Cloudflare (DNS, TLS, WAF, CDN), then load balancers, then Docker replicas on Hetzner in Germany. Supabase Postgres and Auth sit in Frankfurt. Health checks keep unhealthy replicas out of rotation.",
        ],
        code: "Internet\n  → Cloudflare (DNS, TLS, WAF, CDN)\n      → Load balancer(s)\n          → Docker replicas (Hetzner, Germany)\n              · www.curnext.app   (marketing)\n              · dash.curnext.app  (SaaS web)\n              · api.curnext.app   (API)\n  → Supabase Postgres + Auth (Frankfurt, Germany)\n  → Cloudflare R2 (EU objects, when configured)",
      },
      {
        id: "hosting-scale",
        title: "Scale posture",
        paragraphs: [
          "Web and API replicas are stateless behind load balancers. Workers can add replicas as load grows. The database is managed Supabase with pooling for many replicas. Sessions use managed auth cookies - no sticky session requirement on the load balancer.",
          "Do not invent replica counts, RPS, or uptime percentages from this Docs page.",
        ],
      },
      {
        id: "hosting-honesty",
        title: "Residency honesty",
        paragraphs: [
          "Core application and database for platform Client Data are hosted in Germany / Frankfurt. Some third parties (edge CDN, Stripe billing, SMTP2GO email, AI APIs) may process limited data outside that boundary. See the DPA subprocessors table for the public list.",
        ],
        links: [
          { label: "DPA subprocessors", href: "/data/data-processing-agreement" },
          { label: "Privacy policy", href: "/data/privacy-policy" },
        ],
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    description: "Pricing model, quotes, and how to reach CurNext.",
    sections: [
      {
        id: "pricing-model",
        title: "Billing model",
        paragraphs: [
          "CurNext bills by node quantity and contract duration - not legacy plan tiers. Use Pricing to estimate installation bands and monthly subscription per node for Finland, Canada, or Cameroon, then request a quote.",
          "Tax is handled at checkout and is not shown as a live calculator line on the marketing estimator.",
        ],
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Request quote", href: "/pricing#request-quote" },
        ],
      },
      {
        id: "pricing-markets",
        title: "Markets",
        paragraphs: [
          "Independent list prices for Finland (EUR), Canada (CAD), and Cameroon (XAF). Expansion to additional markets is underway - do not invent unlisted countries as live commercial markets here.",
        ],
      },
      {
        id: "api-access-commercial",
        title: "API and SDK access",
        paragraphs: [
          "API and SDK access are tied to the site subscription (node count and duration). Create project API keys in the product under Integration after the site is in scope.",
        ],
      },
      {
        id: "contact",
        title: "Contact paths",
        paragraphs: [
          "For general product, API, partnership, support, security, and press topics use Contact. Quotes use the Pricing estimator form. Careers use the careers application flow.",
        ],
        bullets: [
          "sales@curnext.app - commercial and volume discussions",
          "dev@curnext.app - API, SDKs, and integrations",
          "info@curnext.app - general company questions",
          "legal@curnext.app - DPA and legal",
          "security@curnext.app - vulnerability disclosure and security incidents",
          "gdpr@curnext.app - GDPR and privacy requests",
          "support@curnext.app - product support",
        ],
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Careers", href: "/careers" },
          { label: "DPA", href: "/data/data-processing-agreement" },
        ],
      },
    ],
  },
];
