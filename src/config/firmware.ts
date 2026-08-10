export const firmwarePage = {
  title: "Firmware",
  description:
    "Catalog firmware versions, see what the fleet reports, and review install history. Field OTA is handled by edge controllers.",
  supportLine:
    "Version catalog and fleet install history. Field updates run through signed edge OTA on CN-BC.",
} as const;

export const firmwareHonesty = {
  title: "What this page covers",
  body: "CurNext tracks a firmware version catalog, reported device versions, and install history in operations. Field OTA is orchestrated at the edge on CN-BC. Cloud upload, publish channels, and one-click fleet rollout UI are not part of the public marketing surface.",
  bullets: [
    "Browse the catalog model: version, device type, production and CE flags",
    "Understand reported fleet strings vs catalog rows",
    "See how install history records factory, OTA, USB, and manual methods",
    "Field OTA runs as signed jobs on CN-BC - not a browser flasher",
  ],
} as const;

export const firmwareStack = {
  title: "Hardware path",
  lead: "Firmware rides the same building stack as telemetry - from field nodes to the edge agent that stages signed updates.",
  layers: [
    {
      id: "L1",
      title: "L1 field nodes",
      body: "CN-CC, CN-WD, CN-IAQ, CN-LEAK, CN-SHM, CN-MEP",
    },
    {
      id: "L2",
      title: "L2 floor gateway",
      body: "CN-FG LoRaWAN concentrator",
    },
    {
      id: "L3",
      title: "L3 power",
      body: "CN-UPS power and status",
    },
    {
      id: "L4",
      title: "L4 edge agent",
      body: "CN-BC - tunnel, MQTT, OTA orchestration",
    },
    {
      id: "L5",
      title: "L5 cloud",
      body: "CurNext cloud - catalog, history, device records",
    },
  ],
} as const;

export const firmwareTrees = [
  {
    id: "cn-cc",
    name: "CN-CC",
    path: "firmware/cn-cc",
    role: "Concrete curing field node",
    ota: "FUOTA via CN-FG / LoRaWAN",
  },
  {
    id: "cn-fg",
    name: "CN-FG",
    path: "firmware/cn-fg",
    role: "Floor LoRaWAN concentrator",
    ota: "HMAC floor OTA from CN-BC",
  },
  {
    id: "cn-bc",
    name: "CN-BC",
    path: "firmware/cn-bc",
    role: "Building edge agent and OTA orchestrator",
    ota: "Self-update (bc target)",
  },
  {
    id: "cn-ups",
    name: "CN-UPS",
    path: "firmware/cn-ups",
    role: "UPS / power status unit",
    ota: "UART framed update from CN-BC",
  },
] as const;

export const firmwareOta = {
  title: "Edge OTA (CN-BC)",
  lead: "Signed jobs reach CN-BC. The edge agent verifies, stages, and rolls out to targets. Images are addressed by checksum. Optional canary then rolling on the orchestrator.",
  targets: [
    { id: "bc", label: "bc", detail: "CN-BC self-update" },
    { id: "fg", label: "fg", detail: "CN-FG over floor HMAC control" },
    { id: "cc", label: "cc", detail: "Field nodes via FUOTA / LoRaWAN" },
    { id: "ups", label: "ups", detail: "CN-UPS over UART framing" },
  ],
  edgeStates: [
    "accepted",
    "rejected",
    "canary",
    "rolling",
    "done",
    "failed",
  ],
  note: "Cloud draft/publish workflows and dashboard assign/rollback APIs are not shipped. Do not expect one-click fleet flash from the browser.",
} as const;

export const firmwareFlags = [
  {
    title: "Production",
    body: "Catalog rows use an isProduction flag. There is no separate draft/beta channel enum.",
  },
  {
    title: "CE marked",
    body: "ceMarked records CE marking on the catalog version when applicable.",
  },
  {
    title: "Install methods",
    body: "History records FACTORY, OTA, USB, or MANUAL - including previous version lineage when known.",
  },
] as const;

export type FirmwareCatalogRow = {
  version: string;
  deviceType: string;
  isProduction: boolean;
  ceMarked: boolean;
  releasedAt: string;
  checksumSha256: string;
  notes: string;
};

/** Placeholder catalog samples for marketing - not live fleet data. */
export const firmwareCatalogSamples: FirmwareCatalogRow[] = [
  {
    version: "1.2.0",
    deviceType: "CN-CC",
    isProduction: true,
    ceMarked: true,
    releasedAt: "2026-03-12",
    checksumSha256: "a3f1...9c2e",
    notes: "Stability and LoRaWAN duty-cycle fixes for slab nodes.",
  },
  {
    version: "1.1.4",
    deviceType: "CN-FG",
    isProduction: true,
    ceMarked: true,
    releasedAt: "2026-02-28",
    checksumSha256: "b7d0...4a11",
    notes: "Floor gateway OTA handshake and cache improvements.",
  },
  {
    version: "2.0.1",
    deviceType: "CN-BC",
    isProduction: true,
    ceMarked: true,
    releasedAt: "2026-04-02",
    checksumSha256: "c91e...77b4",
    notes: "Edge orchestrator canary/rolling job states.",
  },
  {
    version: "1.0.3",
    deviceType: "CN-UPS",
    isProduction: true,
    ceMarked: false,
    releasedAt: "2026-01-18",
    checksumSha256: "d2aa...08f6",
    notes: "UART framed update reliability.",
  },
  {
    version: "1.3.0-rc",
    deviceType: "CN-CC",
    isProduction: false,
    ceMarked: false,
    releasedAt: "2026-05-01",
    checksumSha256: "e44b...c1d9",
    notes: "Internal soak build - not marked production.",
  },
];

export const firmwareHistorySamples = [
  {
    deviceCode: "CN-CC-DEMO-001",
    version: "1.2.0",
    previousVersion: "1.1.8",
    method: "OTA",
    installedAt: "2026-03-15",
  },
  {
    deviceCode: "CN-FG-DEMO-014",
    version: "1.1.4",
    previousVersion: "1.1.2",
    method: "OTA",
    installedAt: "2026-03-01",
  },
  {
    deviceCode: "CN-BC-DEMO-002",
    version: "2.0.1",
    previousVersion: "2.0.0",
    method: "OTA",
    installedAt: "2026-04-03",
  },
  {
    deviceCode: "CN-CC-DEMO-009",
    version: "1.2.0",
    previousVersion: "-",
    method: "FACTORY",
    installedAt: "2026-03-20",
  },
] as const;

export const firmwareSecurity = {
  title: "Security themes",
  lead: "Signed OTA, secure-element identity, and anti-rollback themes are part of the hardware security model. Factory SWD provisioning and field NFC install are documented separately for operations.",
  items: [
    "Secure element for device identity and verify",
    "Signed OTA images addressed by checksum",
    "Anti-rollback controls called out in security architecture",
    "Protocols: LoRaWAN OTAA (EU868), MQTT/TLS, WireGuard, floor HMAC topics",
  ],
} as const;
