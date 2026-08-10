import { siteConfig } from "@/config/site";

export const contactChannels = [
  {
    title: "Sales",
    email: "sales@curnext.app",
    body: "Project rollout, commercial questions, and volume discussions.",
  },
  {
    title: "General",
    email: "info@curnext.app",
    body: "Company questions, partnerships, and anything that does not fit a dedicated inbox.",
  },
  {
    title: "API & integrations",
    email: "sales@curnext.app",
    body: "SDK access, API keys, and integration scoping.",
  },
] as const;

export const contactSubjects = [
  { id: "general", label: "General inquiry" },
  { id: "product", label: "Product information" },
  { id: "api", label: "API & SDKs" },
  { id: "integrations", label: "Integrations" },
  { id: "partnership", label: "Partnership" },
  { id: "support", label: "Product support" },
  { id: "security", label: "Security & compliance" },
  { id: "press", label: "Press / media" },
  { id: "other", label: "Something else" },
] as const;

export type ContactSubjectId = (typeof contactSubjects)[number]["id"];

export const contactOffices = [
  {
    title: "Registered company",
    lines: [
      "CurNext Oy",
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
