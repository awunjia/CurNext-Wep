import { siteConfig } from "@/config/site";

export const apiPage = {
  eyebrow: "API",
  title: "Readiness intelligence, as an API",
  lead: "Versioned REST at https://api.curnext.app - surface readiness, BIM project context, devices, and telemetry. Included with Professional.",
  primaryCta: {
    label: "Request API access",
    href: "/contact",
  },
  secondaryCta: {
    label: "Open platform",
    href: "https://curnext.app",
    external: true,
  },
  tertiaryCta: {
    label: "View pricing",
    href: "/pricing",
  },
  hosts: {
    production: "https://api.curnext.app",
    versionPrefix: "/api/v1",
    exampleBase: "https://api.curnext.app/api/v1",
    product: "https://curnext.app",
  },
} as const;

export const apiWhy = {
  eyebrow: "Why an API",
  title: "Decisions that leave the dashboard",
  lead: "CurNext's API is how readiness decisions enter the contractor's stack - schedules, BIM tools, compliance archives, and ops systems. This is not another IoT sensor dump.",
  outcomes: [
    {
      title: "Schedules that track the work",
      body: "Pull readiness scores and estimated ready dates into planning tools so field and office share one picture of what can proceed.",
    },
    {
      title: "BIM with live context",
      body: "Map buildings, spaces, and devices for coordination - without rebuilding project hierarchy by hand.",
    },
    {
      title: "Ops and compliance workflows",
      body: "Drive alerts, milestones, and handover evidence into the systems your teams already run.",
    },
  ],
} as const;

export const apiAudience = {
  eyebrow: "Who it's for",
  title: "Built for technical buyers and integrators",
  items: [
    "Project and BIM coordinators who need readiness in planning tools",
    "Enterprise IT connecting CurNext to internal dashboards",
    "Multi-site contractors who want event-driven workflows",
    "Partners integrating CurNext into construction software stacks",
  ],
} as const;

export const apiCapabilities = {
  eyebrow: "Capabilities",
  title: "What you can call",
  lead: "Frame integration around domains - readiness, BIM, fleet, telemetry, and events - not a raw sensor stream.",
  items: [
    {
      title: "Surface readiness",
      body: "Pull readiness score, status, estimated ready date, confidence, and recommendation for a surface.",
    },
    {
      title: "BIM context",
      body: "Fetch project hierarchy - buildings, spaces, and devices - for mapping and coordination.",
    },
    {
      title: "Device fleet",
      body: "List and inspect devices tied to a project.",
    },
    {
      title: "Telemetry ingest",
      body: "Site hardware and gateways post measurements into CurNext.",
    },
    {
      title: "Events (webhooks)",
      body: "Push alerts and project milestones to your HTTPS endpoint.",
    },
  ],
} as const;

export const apiEndpoints = {
  eyebrow: "Illustrative surfaces",
  title: "Example REST paths",
  lead: "All examples are under https://api.curnext.app/api/v1. The platform continues to expand - contact sales for integration scope beyond these surfaces.",
  rows: [
    { method: "GET", path: "/health", purpose: "Service health" },
    {
      method: "GET",
      path: "/surfaces/:id/readiness",
      purpose: "Readiness for a surface",
    },
    {
      method: "GET",
      path: "/bim/:projectId",
      purpose: "BIM / project tree",
    },
    {
      method: "GET",
      path: "/devices",
      purpose: "Device list (project_id query optional)",
    },
    {
      method: "GET",
      path: "/devices/:id",
      purpose: "Single device",
    },
    {
      method: "POST",
      path: "/telemetry",
      purpose: "Ingest telemetry",
    },
  ],
} as const;

export const apiReadinessSample = `{
  "surface_id": "...",
  "readiness_score": 0.0,
  "status": "...",
  "estimated_ready_date": "...",
  "confidence": 0.0,
  "recommendation": "..."
}`;

export const apiAccess = {
  eyebrow: "Access",
  title: "Professional includes API access",
  lead: "API access is included with Professional and available for Enterprise programs. Project API keys and webhooks are managed in the CurNext product under project developer settings.",
  points: [
    "Access is project-scoped (and can be building-scoped).",
    "Active keys and webhooks are limited per project.",
    "Keys use a live prefix pattern such as cn_live_... in the product.",
    "Request access and we will enable integration for your project - then walk through keys, scopes, and events in the platform.",
  ],
  enterpriseNote:
    "Enterprise programs may include enhanced API rate limits and a sandbox upon request - sales-led, not self-serve.",
} as const;

export const apiWebhooks = {
  eyebrow: "Webhooks",
  title: "Event-driven integration",
  lead: "Configure HTTPS endpoints in the project for alerts and project milestones. Delivery history is available in the product.",
  events: [
    "SURFACE_READY",
    "READY_DATE_CHANGED",
    "ALERT_CREATED",
    "ALERT_RESOLVED",
    "FREEZE_RISK_DETECTED",
    "CONDENSATION_RISK_DETECTED",
    "DRYING_PAUSED",
    "DEVICE_OFFLINE",
    "DEVICE_LOW_BATTERY",
    "DEVICE_SENSOR_FAILURE",
    "DEVICE_DISPLACED",
    "PROJECT_DELAY_RISK_DETECTED",
    "COMPLIANCE_REPORT_READY",
    "PROJECT_HANDOVER_READY",
  ],
} as const;

export const apiFaqs = [
  {
    q: "Is there a public OpenAPI / Swagger site?",
    a: "Yes - explore the interactive API playground at https://api.curnext.app/docs. Project keys and scopes are still enabled per subscription in the CurNext platform.",
  },
  {
    q: "What's included with Professional?",
    a: "API access alongside dashboard, BIM, alerts, compliance reports, and the rest of the Professional stack. See Pricing for commercial detail.",
  },
  {
    q: "How do I get an API key?",
    a: "Open the CurNext platform for your project (developer / API keys) after your subscription includes API access - or request enablement via Contact.",
  },
  {
    q: "Can we get webhooks?",
    a: "Yes - project webhooks for readiness, alerts, device, and handover-style events. Configure HTTPS endpoints in the product.",
  },
  {
    q: "Do you support BIM tools?",
    a: "The API exposes BIM and project hierarchy for coordination. BIM viewing also lives in the product UI.",
  },
  {
    q: "GraphQL? SDKs?",
    a: "REST /api/v1 is the public framing. There is no GraphQL surface or official public SDK catalog on this page.",
  },
] as const;

export const apiBuiltNote =
  "CurNext API is a NestJS REST service powering web, mobile, and site integrations.";

export const apiMqttFootnote =
  "Field devices also publish telemetry over MQTT (curnext/.../telemetry). Site hardware uses that path; buyer integrations should start with REST.";

export const apiPlatformUrl = "https://curnext.app";
export const apiMarketingHost = siteConfig.domain;
