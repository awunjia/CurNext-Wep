import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "fi", "sv", "es"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});
