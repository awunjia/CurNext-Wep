/**
 * Shared marketing typography classes for CurNext pages.
 * Prefer these over ad-hoc heading sizes when building new sections.
 */

/** Section titles (and non-home page titles that should match). Use with h3, or h1 when it is the page title. */
export const sectionHeadingClassName =
  "text-xl font-semibold tracking-tight sm:text-2xl";

/** Card / list / step titles under a section heading. Use with h4. */
export const itemHeadingClassName =
  "text-base font-semibold tracking-tight sm:text-lg";

/**
 * Solution / product full-bleed hero titles only.
 * Home hero (`HomeHero`) keeps its larger display size - do not reuse this there.
 */
export const solutionHeroHeadingClassName =
  "text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl";
