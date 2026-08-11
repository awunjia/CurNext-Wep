import { siteConfig } from "@/config/site";

export const contactChannels = [
  {
    id: "sales",
    title: "Sales",
    email: "sales@curnext.app",
    body: "Project rollout, commercial questions, and volume discussions.",
  },
  {
    id: "general",
    title: "General",
    email: "info@curnext.app",
    body: "Company questions, partnerships, and anything that does not fit a dedicated inbox.",
  },
  {
    id: "api",
    title: "API & integrations",
    email: "dev@curnext.app",
    body: "SDK access, API keys, and integration scoping.",
  },
  {
    id: "security",
    title: "Security",
    email: "security@curnext.app",
    body: "Vulnerability disclosure and security incidents.",
  },
  {
    id: "gdpr",
    title: "GDPR / privacy",
    email: "gdpr@curnext.app",
    body: "Data subject requests, GDPR inquiries, and privacy questions.",
  },
] as const;

export type ContactChannelId = (typeof contactChannels)[number]["id"];

export const contactSubjects = [
  { id: "general", label: "General inquiry" },
  { id: "product", label: "Product information" },
  { id: "api", label: "API & SDKs" },
  { id: "integrations", label: "Integrations" },
  { id: "partnership", label: "Partnership" },
  { id: "support", label: "Product support" },
  { id: "security", label: "Security" },
  { id: "gdpr", label: "GDPR / privacy" },
  { id: "press", label: "Press / media" },
  { id: "other", label: "Something else" },
] as const;

export type ContactSubjectId = (typeof contactSubjects)[number]["id"];

export const contactOffices = [
  {
    title: "Registered company",
    lines: [
      "CurNext",
      siteConfig.registeredIn,
      `Business ID ${siteConfig.businessId}`,
    ],
  },
  {
    title: "Response time",
    lines: [
      "Weekdays, typically within one business day",
      "Quotes follow your site size and surfaces on Pricing",
    ],
  },
] as const;
