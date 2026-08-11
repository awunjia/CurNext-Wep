export const cookieConsentConfig = {
  storageKey: "curnext-cookie-consent",
  version: "cookie-consent-v1",
} as const;

export type CookieCategoryId =
  | "necessary"
  | "preferences"
  | "analytics"
  | "marketing";

export const cookieCategories = [
  {
    id: "necessary" as const,
    locked: true,
    defaultEnabled: true,
  },
  {
    id: "preferences" as const,
    locked: false,
    defaultEnabled: false,
  },
  {
    id: "analytics" as const,
    locked: false,
    defaultEnabled: false,
  },
  {
    id: "marketing" as const,
    locked: false,
    defaultEnabled: false,
  },
] as const;

export const cookieInventory = [
  {
    name: "curnext-cookie-consent",
    category: "necessary" as const,
    purpose: "Stores your cookie preference choices and consent version for this browser.",
    duration: "Local storage - until cleared or consent version changes",
    provider: "CurNext (first-party)",
  },
  {
    name: "Theme preference",
    category: "preferences" as const,
    purpose: "Remembers light / dark / system appearance when you set a theme.",
    duration: "Local storage - until cleared",
    provider: "CurNext (first-party)",
  },
  {
    name: "Locale / routing",
    category: "necessary" as const,
    purpose: "Delivers the correct language route and next-intl locale handling for the marketing site.",
    duration: "Session / as required by the framework",
    provider: "CurNext (first-party)",
  },
  {
    name: "Supabase auth session",
    category: "necessary" as const,
    purpose: "Keeps you signed in for invite-only product features (for example blog interactions) when authentication is used.",
    duration: "Session / managed auth cookie lifetime",
    provider: "CurNext via Supabase",
  },
  {
    name: "Cloudflare Turnstile",
    category: "necessary" as const,
    purpose: "Bot protection on contact, quote, demo, subscribe, and job application forms.",
    duration: "As set by Cloudflare for the challenge widget",
    provider: "Cloudflare",
  },
  {
    name: "Analytics tags (reserved)",
    category: "analytics" as const,
    purpose: "Reserved for optional measurement tags. No analytics vendor is loaded on the marketing site until this category is enabled and a vendor is configured.",
    duration: "N/A until enabled",
    provider: "None active",
  },
  {
    name: "Marketing tags (reserved)",
    category: "marketing" as const,
    purpose: "Reserved for optional advertising or campaign tags. None are loaded until this category is enabled and a vendor is configured.",
    duration: "N/A until enabled",
    provider: "None active",
  },
] as const;
