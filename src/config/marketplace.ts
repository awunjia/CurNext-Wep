export const marketplaceCategories = [
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
] as const;

export type MarketplaceCategory = (typeof marketplaceCategories)[number];

export type MarketplaceConnect = "oauth" | "api_key";

export type MarketplaceIntegration = {
  id: string;
  name: string;
  category: MarketplaceCategory;
  connect: MarketplaceConnect;
  description: string;
  /** Official product website */
  website: string;
  /** simple-icons export key, or path under /integrations */
  icon:
    | { kind: "simple"; slug: string }
    | { kind: "file"; src: string };
};

export const marketplacePage = {
  title: "Market Place",
  description: "Connect third-party tools and marketplace integrations.",
  widgetTitle: "Integrations",
  widgetDescription:
    "Link OAuth apps to automate alerts, schedules, maps, CRM, and accounting for your sites.",
  dashboardHref: "https://dash.curnext.app/addon",
} as const;

/** Exact 18-integration catalog from the Market Place brief. */
export const marketplaceIntegrations: MarketplaceIntegration[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Messaging",
    connect: "oauth",
    description:
      "Send critical site alerts and readiness updates to your WhatsApp number.",
    website: "https://www.whatsapp.com",
    icon: { kind: "simple", slug: "whatsapp" },
  },
  {
    id: "slack",
    name: "Slack",
    category: "Messaging",
    connect: "oauth",
    description:
      "Post alerts and daily digests to channels in your Slack workspace.",
    website: "https://slack.com",
    icon: { kind: "file", src: "/integrations/slack.svg" },
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    category: "Messaging",
    connect: "oauth",
    description:
      "Deliver operational alerts and readiness updates to Teams channels.",
    website: "https://www.microsoft.com/en-us/microsoft-teams",
    icon: { kind: "file", src: "/integrations/microsoftteams.svg" },
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "Scheduling",
    connect: "oauth",
    description:
      "Sync inspection windows, curing milestones, and site visits.",
    website: "https://calendar.google.com",
    icon: { kind: "simple", slug: "googlecalendar" },
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "Scheduling",
    connect: "oauth",
    description:
      "Let inspectors and owners book site visits from shared availability.",
    website: "https://calendly.com",
    icon: { kind: "simple", slug: "calendly" },
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Monitoring",
    connect: "api_key",
    description:
      "Forward device health metrics and alert events to your Datadog stack.",
    website: "https://www.datadoghq.com",
    icon: { kind: "simple", slug: "datadog" },
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "Productivity",
    connect: "oauth",
    description:
      "Export readiness snapshots and telemetry rollups to a shared spreadsheet.",
    website: "https://sheets.google.com",
    icon: { kind: "simple", slug: "googlesheets" },
  },
  {
    id: "dropbox",
    name: "Dropbox",
    category: "Storage",
    connect: "oauth",
    description:
      "Archive reports, certificates, and site photos to shared project folders.",
    website: "https://www.dropbox.com",
    icon: { kind: "simple", slug: "dropbox" },
  },
  {
    id: "autodesk-revit",
    name: "Autodesk Revit",
    category: "BIM",
    connect: "oauth",
    description:
      "Sync BIM models, rooms, and surfaces with curing readiness context.",
    website: "https://www.autodesk.com/products/revit",
    icon: { kind: "simple", slug: "autodesk" },
  },
  {
    id: "procore",
    name: "Procore",
    category: "Construction",
    connect: "oauth",
    description:
      "Push readiness status and alerts into Procore project records.",
    website: "https://www.procore.com",
    icon: { kind: "file", src: "/integrations/procore.svg" },
  },
  {
    id: "ibm-maximo",
    name: "IBM Maximo",
    category: "Enterprise",
    connect: "oauth",
    description:
      "Link probe assets and maintenance work orders with site telemetry.",
    website: "https://www.ibm.com/products/maximo",
    icon: { kind: "file", src: "/integrations/ibm.svg" },
  },
  {
    id: "azure-iot-hub",
    name: "Azure IoT Hub",
    category: "IoT",
    connect: "oauth",
    description:
      "Ingest device telemetry and commands through your Azure IoT estate.",
    website: "https://azure.microsoft.com/products/iot-hub",
    icon: { kind: "file", src: "/integrations/microsoftazure.svg" },
  },
  {
    id: "google-maps",
    name: "Google Maps",
    category: "Maps",
    connect: "oauth",
    description:
      "Plot buildings, probes, and weather context on project maps.",
    website: "https://maps.google.com",
    icon: { kind: "simple", slug: "googlemaps" },
  },
  {
    id: "mapbox",
    name: "Mapbox",
    category: "Maps",
    connect: "oauth",
    description: "Render custom site maps and geofenced alert zones.",
    website: "https://www.mapbox.com",
    icon: { kind: "simple", slug: "mapbox" },
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    connect: "oauth",
    description: "Sync client accounts, projects, and handover milestones.",
    website: "https://www.salesforce.com",
    icon: { kind: "file", src: "/integrations/salesforce.svg" },
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    connect: "oauth",
    description: "Keep owner contacts and onboarding workflows in HubSpot.",
    website: "https://www.hubspot.com",
    icon: { kind: "simple", slug: "hubspot" },
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    category: "Accounting",
    connect: "oauth",
    description:
      "Export invoices and subscription billing events to QuickBooks.",
    website: "https://quickbooks.intuit.com",
    icon: { kind: "simple", slug: "quickbooks" },
  },
  {
    id: "xero",
    name: "Xero",
    category: "Accounting",
    connect: "oauth",
    description: "Sync billing contacts and invoice line items with Xero.",
    website: "https://www.xero.com",
    icon: { kind: "simple", slug: "xero" },
  },
];
