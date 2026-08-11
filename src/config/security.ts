export const securityPage = {
  title: "Security architecture",
  description:
    "Industry-grade controls across the CurNext five-layer stack - from field sensors to cloud - designed for industrial IoT, building OT, and EU privacy expectations.",
  leadNote:
    "This page summarizes how CurNext designs confidentiality, integrity, authenticity, availability, accountability, and privacy. It is not a public runbook, status page, or certificate vault.",
} as const;

export const securityObjectives = [
  {
    title: "Confidentiality",
    body: "Telemetry and credentials are not readable in transit or at rest without authorization.",
  },
  {
    title: "Integrity",
    body: "Firmware, configuration, and measurements are protected against undetected tampering.",
  },
  {
    title: "Authenticity",
    body: "Every device and service proves identity before trust is granted.",
  },
  {
    title: "Availability",
    body: "Resilience to outage, replay, and flooding, with graceful degradation where possible.",
  },
  {
    title: "Accountability",
    body: "Audit trail for access, provisioning, OTA, and admin actions.",
  },
  {
    title: "Privacy",
    body: "GDPR-oriented handling of personal and site data in the cloud layer.",
  },
] as const;

export const securityStandards = {
  title: "Standards we design against",
  lead: "Controls are mapped to widely used industrial, IoT, and EU frameworks. Listing a standard here means design alignment - not that CurNext has completed every third-party certification for that framework.",
  rows: [
    {
      standard: "IEC 62443",
      scope: "Industrial / building IoT zones",
      note: "Zone and conduit model; security level targets per layer",
    },
    {
      standard: "NIST SP 800-82",
      scope: "ICS / building OT",
      note: "Segmentation, monitoring, remote access via WireGuard on the building edge only",
    },
    {
      standard: "NIST SP 800-213",
      scope: "IoT device cybersecurity",
      note: "Device identity, secure update, and configuration",
    },
    {
      standard: "ENISA IoT / OT",
      scope: "EU IoT baseline",
      note: "Crypto, updates, and minimal attack surface",
    },
    {
      standard: "EU CRA",
      scope: "Product security lifecycle",
      note: "SBOM, vulnerability disclosure, signed updates",
    },
    {
      standard: "EU RED 3.3(d)",
      scope: "Radio product cybersecurity",
      note: "Secure radio and update path for field nodes, CN-FG, and CN-BC",
    },
    {
      standard: "ISO 27001",
      scope: "Organisational ISMS",
      note: "Cloud and CurNext operations design target - not claimed as certified here",
    },
    {
      standard: "GDPR",
      scope: "Personal data",
      note: "Audit logging, access control, erasure and export paths",
    },
    {
      standard: "OWASP IoT Top 10",
      scope: "Device and cloud pitfalls",
      note: "Addressed per layer in field and cloud controls",
    },
  ],
} as const;

export const securityLevels = {
  title: "IEC 62443 security level targets",
  lead: "Target security levels (SL-T) guide product design. They are engineering targets, not third-party assessment results.",
  rows: [
    {
      component: "L1 sensor nodes",
      target: "SL 2 (stretch SL 3)",
      rationale: "Unattended, long-lived, physical access possible",
    },
    {
      component: "CN-FG (L2)",
      target: "SL 2",
      rationale: "Field gateway on a construction site",
    },
    {
      component: "CN-UPS (L3)",
      target: "SL 1",
      rationale: "Power only - no data processing",
    },
    {
      component: "CN-BC (L4)",
      target: "SL 3",
      rationale: "Building security boundary, internet-facing path",
    },
    {
      component: "CurNext Cloud (L5)",
      target: "SL 3",
      rationale: "Multi-tenant platform with customer data",
    },
  ],
} as const;

export const securityZones = {
  title: "Security zones and conduits",
  lead: "IEC 62443-style zones keep field radio, floor LAN, building edge, and cloud separated. Power has no data conduit.",
  zones: [
    {
      id: "Z1",
      title: "Zone Z1 - L1 field sensors",
      body: "Field nodes (CN-CC, CN-WD, and related SKUs). LoRaWAN MAC with AES-128, secure element for keys, NFC for install. No IP stack on the node.",
    },
    {
      id: "Z2",
      title: "Zone Z2 - Floor (CN-FG)",
      body: "Floor gateway verifies frames, stays on the local VLAN, and has no cloud-facing interface.",
    },
    {
      id: "Z3",
      title: "Zone Z3 - Power (CN-UPS)",
      body: "Energizes floor and building edge gear. No data conduit.",
    },
    {
      id: "Z4",
      title: "Zone Z4 - Building DMZ (CN-BC)",
      body: "Building controller: WireGuard client, MQTT client, OTA orchestrator. Outbound cellular path only for tunnel and broker traffic.",
    },
    {
      id: "Z5",
      title: "Zone Z5 - CurNext Cloud (L5)",
      body: "Application, managed database and auth, private MQTT broker, AI, and object storage behind edge protection.",
    },
  ],
  conduits: [
    {
      id: "C1",
      path: "L1 ↔ CN-FG",
      controls:
        "LoRaWAN MAC-layer AES-128 (payload encryption + MIC), OTAA, unique device keys in secure element, frame counters, replay rejection",
    },
    {
      id: "C2",
      path: "CN-FG ↔ CN-FG",
      controls:
        "Ethernet daisy-chain on the floor VLAN only; no internet route",
    },
    {
      id: "C3",
      path: "CN-FG ↔ CN-BC",
      controls:
        "Ethernet VLAN; building firewall denies floor gateways a path to the public internet",
    },
    {
      id: "C4",
      path: "CN-BC ↔ L5",
      controls:
        "WireGuard plus MQTT over TLS 1.3 with mutual TLS; broker not on the public internet",
    },
    {
      id: "C5",
      path: "Installer ↔ L1",
      controls:
        "NFC tap only with cryptographic proof; QR scan-to-provision disabled; factory debug interfaces are not left open in the field",
    },
  ],
  wireguard: [
    { layer: "L1-L2", role: "No WireGuard" },
    { layer: "L3", role: "No WireGuard" },
    { layer: "L4 CN-BC", role: "WireGuard client - building security boundary" },
    { layer: "L5 Cloud", role: "WireGuard hub - MQTT on the private mesh only" },
  ],
} as const;

export const securityLayers = [
  {
    id: "L1",
    title: "L1 - Field sensors",
    lead: "Unique device identity, LoRaWAN air-link crypto, secure boot, signed OTA, tamper-proof design, and displacement detection.",
    bullets: [
      "Unique root key per probe in a secure element - never shared across the fleet",
      "Labels may show public serial / DevEUI for logistics - never the root key",
      "LoRaWAN Class A (EU868): AES-128 payload encryption and MIC via the MAC stack",
      "OTAA join only; frame counters and replay rejection at the floor gateway",
      "Secure boot, signed firmware, anti-rollback, production debug locked",
      "Tamper-proof field enclosure and sensing path - physical interference is detectable and reported",
      "Displacement detection when a node is moved from its assigned install position",
      "Field assign via NFC cryptographic binding - QR assign disabled by default",
    ],
  },
  {
    id: "L2",
    title: "L2 - CN-FG floor gateway",
    lead: "Trust anchor for the air link. Validates join, MIC, and counters before forwarding.",
    bullets: [
      "Signed firmware with secure boot and secure-element identity",
      "No default internet route; uplink only toward CN-BC on the floor VLAN",
      "OTA only from CN-BC",
      "Join and verification events retained for audit upload",
      "Service ports constrained in production images",
    ],
  },
  {
    id: "L3",
    title: "L3 - CN-UPS power",
    lead: "Power path only - no data plane on the management VLAN.",
    bullets: [
      "No IPs or management API on the data VLAN",
      "Locked enclosure practices at install",
      "Fault indication stays local - no network leak from power faults",
    ],
  },
  {
    id: "L4",
    title: "L4 - CN-BC building controller",
    lead: "Building security boundary between floor LAN and cloud.",
    bullets: [
      "WireGuard outbound from the building (CGNAT-safe)",
      "MQTT over TLS 1.3 with per-building client certificates",
      "Host firewall default deny; no public SSH, MQTT, or API on cellular",
      "Only OTA path to L1/L2: verify signed manifest and image, staged rollout, report result",
      "Store-and-forward telemetry buffer encrypted at rest; purge after successful delivery",
    ],
  },
  {
    id: "L5",
    title: "L5 - CurNext Cloud",
    lead: "Multi-tenant application and data with private field ingress.",
    bullets: [
      "MQTT broker reachable only on the private mesh - not on the public internet",
      "Per-building authorization; deny cross-tenant wildcards",
      "User auth with short-lived tokens; MFA required for privileged roles",
      "RBAC enforced on API routes; rate limits and edge WAF in production",
      "Encryption in transit and at rest; tenant isolation on queries",
      "Encrypted backups with restore drills; GDPR audit, export, and erasure paths",
      "Secrets kept in a secrets manager - not in source control",
    ],
  },
] as const;

export const securityOta = {
  title: "OTA and software supply chain",
  lead: "Aligned with EU Cyber Resilience Act expectations for signed updates, SBOM, and coordinated disclosure.",
  signing: [
    "Offline root CA",
    "OTA signing CA",
    "Signed L1, CN-FG, and CN-BC images / manifests",
  ],
  bullets: [
    "Firmware signatures with ECDSA P-256 (or stronger RSA where required)",
    "Manifest includes device class, version, minimum version, hash, signature, and revocation epoch",
    "Compromised signing material rotated on an emergency path",
    "A/B partitions on field devices with rollback on failed boot",
    "Staged rollout before fleet-wide apply",
    "SBOM per firmware and cloud release; continuous vulnerability monitoring",
    "Critical security updates targeted within 14 days; high within 30 days",
  ],
} as const;

export const securityProvisioning = {
  title: "Provisioning",
  factory: [
    "Factory HSM injects unique device identity material into the secure element",
    "Secure boot enabled before ship",
    "NFC personalization with cryptographic proof",
    "Device registered as manufactured; keys never shipped in spreadsheets or email",
  ],
  field: [
    "Installer NFC tap verifies cryptographic binding",
    "Surface bind requires authenticated app session and device-assign permission",
    "QR scan is not trusted for cryptographic assign",
    "Building commission issues WireGuard peer and MQTT client credentials at install",
  ],
} as const;

export const securityCrypto = {
  title: "Cryptography at a glance",
  rows: [
    { use: "Transport (cloud / MQTT)", algorithm: "TLS 1.3" },
    {
      use: "Building tunnel",
      algorithm: "WireGuard (Curve25519, ChaCha20-Poly1305)",
    },
    {
      use: "Air link (L1 ↔ CN-FG)",
      algorithm: "LoRaWAN MAC AES-128 encryption + MIC",
    },
    { use: "Firmware signature", algorithm: "ECDSA P-256" },
    {
      use: "Local telemetry buffer",
      algorithm: "AES-256-GCM at rest on the building edge",
    },
    { use: "Audit integrity", algorithm: "SHA-256" },
  ],
  deprecated:
    "Not used: TLS 1.0/1.1, MD5, SHA-1 for signatures, or static air-link session keys without OTAA.",
} as const;

export const securityVerification = {
  title: "How we verify",
  lead: "Releases and annual operations follow a fixed security bar before enterprise use.",
  items: [
    "Threat model update per zone for material releases",
    "Layer checklists for L1, CN-FG, CN-BC, and cloud",
    "Static analysis and dependency scanning with no critical open CVE on release",
    "Signed artifact and SBOM attached to release",
    "Annual external penetration test and key-rotation / backup-restore drills",
    "Certification readiness (IEC 62443 assessment, ISO 27001 ISMS, RED technical file) tracked separately - not claimed complete on this page",
  ],
} as const;

export const securityContact = {
  title: "Disclosure and contact",
  lead: "Report vulnerabilities to the CurNext security inbox. For privacy and residency detail, use the linked policies and datacenters page.",
  email: "security@curnext.app",
  bullets: [
    "Coordinated disclosure: security@curnext.app",
    "Legal entity: CurNext, Helsinki, Finland",
    "Privacy policy covers personal data handling",
    "Datacenters page covers EU hosting residency (Germany / Frankfurt)",
  ],
} as const;
