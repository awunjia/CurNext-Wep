/** Public L1-L5 architecture overview (Developer menu). */

export const architecturePage = {
  title: "Architecture",
  description:
    "The CurNext site path from field nodes to cloud - five layers with one job each: L1 sense, L2 floor aggregate, L3 power, L4 building uplink, L5 decide.",
  leadNote:
    "This is the product architecture reference for operators and developers. Security zone detail lives on the Security page.",
} as const;

export const architectureLayers = [
  {
    id: "L1",
    role: "Sense",
    product: "Field nodes",
    title: "L1 - Field sensors",
    body: "Devices install on the work itself - curing slabs, drying walls, indoor air, leaks, structure, or plant systems. They capture the conditions that drive schedule and quality decisions.",
    bullets: [
      "SKUs: CN-CC, CN-WD, CN-IAQ, CN-LEAK, CN-SHM, CN-MEP",
      "Unique device identity and secure-element key material",
      "Tamper-proof design and displacement detection",
      "LoRaWAN Class A (EU868) for battery wireless nodes where applicable",
    ],
  },
  {
    id: "L2",
    role: "Aggregate",
    product: "CN-FG",
    title: "L2 - Floor gateway",
    body: "Each floor concentrates device traffic at one collection point so a level stays organized as the project scales across wings and zones.",
    bullets: [
      "Trust anchor for air-link verification (MIC, counters, join)",
      "Floor VLAN only - no cloud-facing interface",
      "OTA only from CN-BC",
    ],
  },
  {
    id: "L3",
    role: "Power",
    product: "CN-UPS",
    title: "L3 - Site power",
    body: "Dedicated power keeps floor and building hardware online through outages. This layer supplies power only - it does not interpret measurements or carry a data plane on the management VLAN.",
    bullets: [
      "Power continuity for L2 / L4 during grid loss",
      "No telemetry interpretation",
      "No public data plane on the management path",
    ],
  },
  {
    id: "L4",
    role: "Bridge",
    product: "CN-BC",
    title: "L4 - Building controller",
    body: "The building unit is the secure link from the site network to CurNext. It maintains a protected path off the jobsite, terminates field OTA orchestration, and speaks to the private cloud broker path.",
    bullets: [
      "WireGuard client at the building security boundary",
      "MQTT over TLS with mutual TLS to the private broker",
      "Signed OTA jobs for L1 / L2 targets",
      "Encrypted store-and-forward when the uplink is down",
    ],
  },
  {
    id: "L5",
    role: "Decide",
    product: "CurNext cloud",
    title: "L5 - CurNext cloud",
    body: "The platform turns site data into readiness status, alerts, and next actions - in the web dashboard and mobile app - with an audit trail for clients and compliance.",
    bullets: [
      "Project dashboards, alerts, BIM-mapped readiness",
      "REST API, SDKs, Market Place, firmware catalog",
      "Invite-only access, RBAC, privileged MFA",
    ],
  },
] as const;

export const architectureFlow = {
  title: "Data path",
  lead: "Measurements move up the stack. Decisions and signed operations come back through CurNext.",
  steps: [
    { from: "L1", to: "L2", path: "LoRaWAN air link" },
    { from: "L2", to: "L4", path: "Floor / building Ethernet VLAN" },
    { from: "L3", to: "L2 / L4", path: "PoE / site power only" },
    { from: "L4", to: "L5", path: "WireGuard + MQTT / TLS" },
    { from: "L5", to: "Buyers", path: "HTTPS REST · dash · mobile" },
  ],
} as const;

export const architectureDeployAnywhere = {
  title: "Deploy anywhere with internet",
  body: "This L1-L5 structure is self-contained on site: field nodes talk LoRaWAN only to CurNext floor gateways (CN-FG), and the building controller (CN-BC) reaches CurNext cloud over ordinary internet. That means a project can be deployed anywhere on earth with internet connectivity. It does not depend on a country-specific public LoRaWAN network operator - unlike systems that only work where such a national or carrier LoRaWAN network already exists.",
} as const;

export const architecturePrinciples = {
  title: "Design rules",
  items: [
    {
      title: "One job per layer",
      body: "Power does not interpret measurements. Floor gateways do not face the public internet. The building controller is the security boundary for uplink and signed field OTA.",
    },
    {
      title: "Same path for every surface",
      body: "Curing, drying, air, leak, structure, and MEP share L2-L5. Only the L1 product line changes.",
    },
    {
      title: "Decisions and evidence",
      body: "L5 is where teams act - readiness, alerts, and an audit trail - not raw sensor dumps alone.",
    },
    {
      title: "Internet, not a national LoRaWAN net",
      body: "Site radio stays private (L1↔L2). Cloud reach uses CN-BC over internet - so coverage is not limited to countries with a public LoRaWAN network.",
    },
  ],
} as const;
