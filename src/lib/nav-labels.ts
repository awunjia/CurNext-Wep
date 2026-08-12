/** Map nav/footer titles and hrefs to `nav` / `footer` message keys. */

export const navGroupKey: Record<string, string> = {
  Home: "home",
  Solutions: "solutions",
  Company: "company",
  Developer: "developer",
  More: "more",
};

export const navItemKeyByHref: Record<string, string> = {
  "/": "home",
  "/how-it-works": "howItWorks",
  "/pricing": "pricing",
  "/docs": "docs",
  "/knowledge-base": "knowledgeBase",
  "/careers": "careers",
  "https://api.curnext.app/docs": "api",
  "/integrations": "integration",
  "/sdks": "sdks",
  "/firmware": "firmware",
  "/technologies": "technologies",
  "/architecture": "architecture",
  "/contact": "contactUs",
  "/resources": "resources",
  "/data/datacenters": "datacenters",
  "/data/security": "security",
  "/case-studies": "caseStudy",
  "/solutions/concrete-curing": "concreteCuring",
  "/solutions/wall-drying": "wallDrying",
  "/solutions/indoor-air": "indoorAir",
  "/solutions/leak-detection": "leakDetection",
  "/solutions/structural-health": "structuralHealth",
  "/solutions/mep": "mep",
};

export const footerGroupKey: Record<string, string> = {
  Solutions: "solutions",
  Resources: "resources",
  Company: "company",
  Trust: "trust",
  Legal: "legal",
};

export const footerItemKeyByHref: Record<string, string> = {
  ...navItemKeyByHref,
  "/blog": "ourBlog",
  "/events": "events",
  "/support": "support",
  "/data/compliance": "compliance",
  "/data/data-processing-agreement": "dpa",
  "/data/audit-trail": "auditTrail",
  "/data/security-policy": "securityPolicy",
  "/data/privacy-policy": "privacyPolicy",
  "/data/cookie-policy": "cookiePolicy",
  "/data/terms-and-conditions": "termsConditions",
  "/data/gdpr": "gdprPolicies",
  "/solutions": "solutions",
};
