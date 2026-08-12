export const compliancePage = {
  title: "Compliance",
  description:
    "How CurNext approaches privacy, construction evidence, and standards alignment - without inventing certifications we have not completed.",
  leadNote:
    "This page is a buyer-facing summary. It is not a certificate vault, audit report, or substitute for a signed DPA.",
} as const;

export const complianceHonest = {
  title: "What we claim - and what we do not",
  items: [
    {
      title: "We do not claim here",
      body: "CurNext does not advertise ISO 27001 or SOC 2 certification for itself on public pages. Standards listed elsewhere are design alignment unless we confirm a completed third-party assessment separately.",
    },
    {
      title: "What we do operate under",
      body: "EU GDPR applies to core platform processing for EEA Clients. Invite-only access, RBAC, privileged MFA, and GDPR-oriented audit, export, and erasure paths are product and process themes.",
    },
    {
      title: "Infrastructure inheritance",
      body: "Hetzner, Supabase, and Cloudflare publish their own trust materials. Customers inherit those provider controls at the infrastructure layer - review vendor trust pages for their certifications.",
    },
  ],
} as const;

export const complianceFrameworks = {
  title: "Frameworks we design against",
  lead: "Listing a framework means engineering and process alignment. It does not mean every certification for that framework is complete.",
  rows: [
    {
      name: "GDPR",
      scope: "Personal data / EU Clients",
      note: "Roles, TOMs, subprocessors, transfers - see DPA and Privacy",
    },
    {
      name: "IEC 62443",
      scope: "Industrial / building IoT zones",
      note: "Zone and conduit model; security level targets per layer",
    },
    {
      name: "NIST SP 800-82 / 800-213",
      scope: "ICS / IoT device cybersecurity",
      note: "Segmentation, device identity, secure update themes",
    },
    {
      name: "ENISA IoT / OT & EU CRA",
      scope: "EU IoT / product security lifecycle",
      note: "Baseline crypto, updates, SBOM and disclosure themes",
    },
    {
      name: "ISO 27001",
      scope: "Organisational ISMS",
      note: "Design and operations target - not claimed certified here",
    },
    {
      name: "PIPEDA / Law 25 diligence",
      scope: "Canadian Clients",
      note: "Vendor diligence supported; local hosting in Canada is not claimed",
    },
  ],
} as const;

export const complianceEvidence = {
  title: "Construction and buyer evidence",
  items: [
    {
      title: "Site readiness trail",
      body: "Readiness decisions, alerts, and project activity leave a trail mapped to the building for handover and claims conversations.",
    },
    {
      title: "Audit trail",
      body: "Access, provisioning, OTA, admin actions, and GDPR-oriented events are designed for accountability - see Audit Trail.",
    },
    {
      title: "DPA & subprocessors",
      body: "Art. 28-oriented summary, public subprocessor list (including Gemini and Groq for AI when enabled), and market notes for Finland, Canada, and Cameroon.",
    },
  ],
} as const;

export const complianceAi = {
  title: "AI in the product",
  lead: "CurNext combines an in-house readiness model with optional assisted AI features.",
  items: [
    {
      name: "In-house curing model",
      body: "Concrete curing prediction runs on CurNext maturity computations plus XGBoost - part of the product readiness engine for CN-CC.",
    },
    {
      name: "Gemini (Google AI)",
      body: "Assisted product AI features when Gemini is enabled - prompts and context minimized for the task.",
    },
    {
      name: "Groq",
      body: "Knowledge Base assistant on curnext.app after consent, and other assisted product AI features when Groq is enabled.",
    },
  ],
} as const;

export const complianceMarkets = {
  title: "Operating markets",
  lead: "CurNext is registered in Finland. Commercial markets include Finland, Canada, and Cameroon. Core app and database for EU Users are hosted in Germany / Frankfurt.",
  items: [
    "Finland / EEA - GDPR as primary privacy regime for platform Client Data",
    "Canada - PIPEDA / Law 25 vendor diligence supported; Canadian local hosting is not claimed here",
    "Cameroon - local diligence supported; Cameroon local hosting is not claimed here",
  ],
} as const;

export const complianceRelated = [
  { title: "Security architecture", href: "/security" },
  { title: "Data Processing Agreement", href: "/data/data-processing-agreement" },
  { title: "GDPR Policies", href: "/data/gdpr" },
  { title: "Privacy Policy", href: "/data/privacy-policy" },
  { title: "Audit Trail", href: "/audit-trail" },
  { title: "Datacenters", href: "/datacenters" },
] as const;
