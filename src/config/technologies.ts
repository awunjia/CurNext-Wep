export const technologiesPage = {
  title: "Technologies",
  description:
    "The CurNext stack from field nodes to cloud - industrial connectivity, BIM-mapped readiness, and APIs your teams can call.",
  leadNote:
    "This page covers public platform capabilities. Detailed hardware security procedures stay in private operations documentation.",
} as const;

export const technologiesConnectivity = {
  title: "Connectivity",
  lead: "Standard industrial protocols - named at the capability level, not as an attack surface guide.",
  items: [
    {
      title: "LoRaWAN",
      body: "EU868 field uplinks for battery nodes - long-range, site-friendly radio into the CurNext floor path.",
    },
    {
      title: "MQTT over TLS",
      body: "Device and gateway telemetry into the platform over encrypted MQTT for the hardware path.",
    },
    {
      title: "WireGuard",
      body: "Secure tunnel themes for building edge connectivity into CurNext cloud services.",
    },
    {
      title: "HTTPS REST",
      body: "Versioned buyer integrations at api.curnext.app - readiness, BIM, devices, alerts, webhooks.",
    },
  ],
} as const;

export const technologiesProducts = [
  {
    sku: "CN-CC",
    name: "Concrete curing",
    href: "/solutions/concrete-curing",
    body: "Air, surface, and core probes with slab readiness intelligence and an in-house TensorFlow.js curing prediction model.",
  },
  {
    sku: "CN-WD",
    name: "Wall drying",
    href: "/solutions/wall-drying",
    body: "Finish readiness for gypsum, wet rooms, and tile backing.",
  },
  {
    sku: "CN-IAQ",
    name: "Indoor air",
    href: "/solutions/indoor-air",
    body: "PM, VOC, and climate context on the same site stack.",
  },
  {
    sku: "CN-LEAK",
    name: "Leak detection",
    href: "/solutions/leak-detection",
    body: "Event-driven alerts for plant rooms, wet zones, and risers.",
  },
  {
    sku: "CN-SHM",
    name: "Structural health",
    href: "/solutions/structural-health",
    body: "Tilt and vibration monitoring into the building path.",
  },
  {
    sku: "CN-MEP",
    name: "MEP",
    href: "/solutions/mep",
    body: "Wired plant signals where higher sample rates are needed.",
  },
] as const;

export const technologiesSoftware = {
  title: "Software surfaces",
  lead: "Cloud product and developer entry points your teams already use.",
  items: [
    {
      title: "Web & mobile",
      body: "Project dashboards, alerts, readiness views, and field apps on the CurNext platform.",
      href: "https://dash.curnext.app",
      external: true,
    },
    {
      title: "REST API",
      body: "Readiness, BIM hierarchy, devices, measurements, and webhooks under /api/v1.",
      href: "/api",
      external: false,
    },
    {
      title: "SDKs",
      body: "Official clients for JavaScript/TypeScript, PHP, Go, Python, Java, and Flutter.",
      href: "/sdks",
      external: false,
    },
    {
      title: "Market Place",
      body: "Connect messaging, scheduling, monitoring, BIM, CRM, and accounting tools.",
      href: "/integrations",
      external: false,
    },
    {
      title: "Firmware operations",
      body: "Version catalog, reported fleet strings, and edge OTA overview.",
      href: "/firmware",
      external: false,
    },
    {
      title: "Docs",
      body: "Product documentation for operators and integrators.",
      href: "/docs",
      external: false,
    },
    {
      title: "Knowledge Base",
      body: "AI chat grounded in public website knowledge, with GDPR consent.",
      href: "/knowledge-base",
      external: false,
    },
  ],
} as const;

export const technologiesSecurity = {
  title: "Security posture",
  lead: "Themes we can state publicly. Implementation detail stays in private security documentation.",
  items: [
    {
      title: "Encrypted transport",
      body: "TLS for cloud APIs and MQTT paths; WireGuard for edge tunnel themes.",
    },
    {
      title: "Signed field updates",
      body: "OTA is staged at the edge on CN-BC with checksum-addressed images - not a public browser flasher.",
    },
    {
      title: "Device identity",
      body: "Hardware identity and verification themes for field units; factory and field install procedures are ops-controlled.",
    },
    {
      title: "Audit trail",
      body: "Project activity and readiness decisions leave a clear trail for handover and compliance conversations.",
    },
  ],
} as const;

export const technologiesData = {
  title: "Intelligence layer",
  lead: "CurNext turns site measurements into build-ready decisions mapped to your project.",
  items: [
    {
      title: "Surface readiness",
      body: "Scores, status, and estimated ready timing for monitored surfaces.",
    },
    {
      title: "Concrete curing model",
      body: "In-house prediction for CN-CC slab readiness, trained and served with TensorFlow.js.",
    },
    {
      title: "BIM context",
      body: "Buildings, spaces, and devices for coordination - not a detached sensor dump.",
    },
    {
      title: "Alerts & events",
      body: "Operational alerts and webhook events into the tools your teams already run.",
    },
    {
      title: "Weather context",
      body: "Outdoor context where it helps curing and drying decisions on site.",
    },
  ],
} as const;

/** Every partner from `partners` appears in exactly one category. */
export const technologiesEcosystem = [
  {
    title: "Radio & sensing",
    names: [
      "Semtech",
      "LoRa Alliance",
      "Sensirion",
      "NFC",
      "Texas Instruments",
    ],
  },
  {
    title: "Edge & connectivity",
    names: ["MQTT", "WireGuard", "Espressif", "Victron"],
  },
  {
    title: "Cloud & ops",
    names: [
      "Cloudflare",
      "Supabase",
      "Hetzner",
      "Google Cloud",
      "Datadog",
      "Grafana",
    ],
  },
  {
    title: "AI & intelligence",
    names: ["TensorFlow.js", "Gemini", "Groq", "OpenWeather"],
  },
  {
    title: "BIM, identity & commerce",
    names: ["Autodesk Revit", "Signicat", "Stripe"],
  },
  {
    title: "Manufacturing & supply",
    names: ["JLCPCB", "Digi-Key"],
  },
] as const;
