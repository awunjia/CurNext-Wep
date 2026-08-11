export const auditTrailPage = {
  title: "Audit trail",
  description:
    "CurNext keeps a project-bound record of who did what, when - from access and admin actions to readiness decisions, device lifecycle, and GDPR-oriented events.",
  leadNote:
    "This page describes the product audit trail buyers and site teams use in the CurNext platform. It is not a live log viewer. Open the dashboard for your project history.",
} as const;

export const auditTrailWhy = [
  {
    title: "Handover evidence",
    body: "Show clients and consultants what was measured, when readiness changed, and who acknowledged alerts - without rebuilding spreadsheets after the fact.",
  },
  {
    title: "Accountability",
    body: "Invite-only access, RBAC, and privileged MFA sit behind actions that matter. Sensitive operations leave a trail tied to identity and time.",
  },
  {
    title: "Claims and compliance conversations",
    body: "Leak events, curing packages, and drying decisions stay mapped to the project structure so insurers, auditors, and owners can review a coherent story.",
  },
] as const;

export const auditTrailEvents = {
  title: "What gets recorded",
  lead: "Event coverage grows with the platform. Publicly we describe categories - not every internal field name.",
  items: [
    {
      category: "Access & identity",
      examples:
        "Invites, sign-in outcomes, role changes, permission denials, session-sensitive admin steps",
    },
    {
      category: "Project & membership",
      examples:
        "Project creation, member add/remove, subscription and seat-related admin actions where applicable",
    },
    {
      category: "Devices & OTA",
      examples:
        "Provisioning and verification themes, assignment to spaces, firmware stage and apply outcomes at the edge",
    },
    {
      category: "Readiness & ops",
      examples:
        "Status transitions, alert create/acknowledge/resolve, exports and report generation where offered",
    },
    {
      category: "Privacy / GDPR",
      examples:
        "Structured audit events for access, export, and erasure paths - secrets are not written into logs",
    },
  ],
} as const;

export const auditTrailHow = {
  title: "How the trail is shaped",
  items: [
    {
      title: "Bound to the building",
      body: "Events sit in project and BIM context - buildings, spaces, and devices - so a sensor dump is not the whole story.",
    },
    {
      title: "API-visible where licensed",
      body: "Professional integrations can list audit events via the REST API and SDKs for scripts and internal tools.",
    },
    {
      title: "Integrity themes",
      body: "Cloud design targets append-friendly, integrity-conscious records. Hash themes (for example SHA-256) support audit integrity in the security architecture.",
    },
    {
      title: "Retention with purpose",
      body: "Retention follows product and contractual needs. Some security and GDPR audit streams may be append-only or pseudonymized rather than casually rewritten.",
    },
  ],
} as const;

export const auditTrailAccess = {
  title: "Who can see what",
  lead: "CurNext is invite-only and does not onboard product users under 18 under internal policies. New Google or email accounts do not auto-provision into a project without an invite or existing membership.",
  items: [
    {
      title: "Project roles",
      body: "Visibility follows RBAC on the project. Site and company admins see broader history than read-only collaborators.",
    },
    {
      title: "Privileged actions",
      body: "Elevated admin and security-sensitive steps expect stronger authentication and leave clearer accountability.",
    },
    {
      title: "Tenant isolation",
      body: "Audit history is scoped to your organisation and projects - not a shared public feed across customers.",
    },
  ],
} as const;

export const auditTrailRelated = [
  { title: "Security architecture", href: "/security" },
  { title: "Data Processing Agreement", href: "/data/data-processing-agreement" },
  { title: "Documentation", href: "/docs" },
  { title: "API playground", href: "https://api.curnext.app/docs" },
  { title: "Open dashboard", href: "https://dash.curnext.app" },
] as const;
