import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { CookiePreferencesButton } from "@/components/cookie-consent-banner";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type TextItem = { title: string; body: string };
type CategoryRow = { id: string; title: string; body: string };
type InventoryRow = {
  name: string;
  category: string;
  purpose: string;
  duration: string;
  provider: string;
};
type RelatedItem = { title: string; href: string };

export async function CookiePolicyPage() {
  const t = await getTranslations("cookies");
  const tCommon = await getTranslations("common");

  const page = t.raw("page") as {
    title: string;
    description: string;
    leadNote: string;
    supportLine: string;
    lastUpdatedLabel: string;
    lastUpdated: string;
    legalEyebrow: string;
  };
  const overview = t.raw("overview") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const controller = t.raw("controller") as {
    title: string;
    lead: string;
    note: string;
  };
  const whatAre = t.raw("whatAre") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const categories = t.raw("categories") as {
    title: string;
    lead: string;
    items: CategoryRow[];
  };
  const inventory = t.raw("inventory") as {
    title: string;
    lead: string;
    nameCol: string;
    categoryCol: string;
    purposeCol: string;
    durationCol: string;
    providerCol: string;
    rows: InventoryRow[];
  };
  const legalBases = t.raw("legalBases") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const retention = t.raw("retention") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const manage = t.raw("manage") as {
    title: string;
    lead: string;
    bullets: string[];
    widgetNote: string;
  };
  const thirdParties = t.raw("thirdParties") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const kb = t.raw("knowledgeBase") as {
    title: string;
    lead: string;
  };
  const updates = t.raw("updates") as { title: string; lead: string };
  const related = t.raw("related") as RelatedItem[];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="cookies-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name} · {page.legalEyebrow}
            </p>
            <h1 id="cookies-heading" className={sectionHeadingClassName}>
              {page.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {page.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {page.supportLine}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {page.leadNote}
            </p>
            <p className="text-muted-foreground mt-4 text-xs tracking-wide uppercase">
              {page.lastUpdatedLabel}: {page.lastUpdated}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CookiePreferencesButton
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 no-underline hover:no-underline",
                )}
                label={t("managePreferences")}
              />
              <Link
                href="/data/gdpr"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 gap-2 px-5",
                )}
              >
                {t("readGdpr")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PolicySection id="cookies-overview" title={overview.title} lead={overview.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {overview.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="cookies-controller"
        title={controller.title}
        lead={controller.lead}
      >
        <ul className="mt-6 space-y-1 text-sm leading-relaxed">
          <li>{siteConfig.name}</li>
          <li>
            {t("controllerRegisteredIn", { place: siteConfig.registeredIn })}
          </li>
          <li>
            {t("controllerBusinessId", { id: siteConfig.businessId })}
          </li>
          <li>{t("controllerWebsite", { url: "https://curnext.app" })}</li>
        </ul>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          {controller.note}
        </p>
      </PolicySection>

      <PolicySection id="cookies-what" title={whatAre.title} lead={whatAre.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {whatAre.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <section
        aria-labelledby="cookies-categories-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2
              id="cookies-categories-heading"
              className={sectionHeadingClassName}
            >
              {categories.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {categories.lead}
            </p>
            <div className="mt-10 space-y-8">
              {categories.items.map((item) => (
                <div key={item.id}>
                  <h3 className={itemHeadingClassName}>{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cookies-inventory-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2
              id="cookies-inventory-heading"
              className={sectionHeadingClassName}
            >
              {inventory.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {inventory.lead}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y">
            <table className="w-full min-w-[48rem] text-left text-sm">
              <thead>
                <tr className="border-border/60 border-b">
                  <th className="py-3 pr-4 font-medium">{inventory.nameCol}</th>
                  <th className="py-3 pr-4 font-medium">
                    {inventory.categoryCol}
                  </th>
                  <th className="py-3 pr-4 font-medium">
                    {inventory.purposeCol}
                  </th>
                  <th className="py-3 pr-4 font-medium">
                    {inventory.durationCol}
                  </th>
                  <th className="py-3 font-medium">{inventory.providerCol}</th>
                </tr>
              </thead>
              <tbody>
                {inventory.rows.map((row) => (
                  <tr
                    key={row.name}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-4 align-top font-medium"
                    >
                      {row.name}
                    </th>
                    <td className="text-muted-foreground py-4 pr-4 align-top">
                      {row.category}
                    </td>
                    <td className="text-muted-foreground py-4 pr-4 align-top leading-relaxed">
                      {row.purpose}
                    </td>
                    <td className="text-muted-foreground py-4 pr-4 align-top leading-relaxed">
                      {row.duration}
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.provider}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cookies-bases-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="cookies-bases-heading" className={sectionHeadingClassName}>
              {legalBases.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {legalBases.lead}
            </p>
            <div className="mt-10 space-y-8">
              {legalBases.items.map((item) => (
                <div key={item.title}>
                  <h3 className={itemHeadingClassName}>{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PolicySection
        id="cookies-retention"
        title={retention.title}
        lead={retention.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {retention.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <section
        aria-labelledby="cookies-manage-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 id="cookies-manage-heading" className={sectionHeadingClassName}>
              {manage.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {manage.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {manage.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {manage.widgetNote}
            </p>
          </div>
          <CookiePreferencesButton
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 no-underline hover:no-underline",
            )}
            label={t("managePreferences")}
          />
        </div>
      </section>

      <PolicySection
        id="cookies-third"
        title={thirdParties.title}
        lead={thirdParties.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {thirdParties.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="cookies-kb" title={kb.title} lead={kb.lead}>
        <div className="mt-6">
          <Link
            href="/knowledge-base"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 gap-2 px-5",
            )}
          >
            {t("openKnowledgeBase")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </PolicySection>

      <PolicySection id="cookies-updates" title={updates.title} lead={updates.lead} />

      <section
        aria-labelledby="cookies-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <h2 id="cookies-related-heading" className={sectionHeadingClassName}>
            {t("relatedTitle")}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="border-border/70 hover:border-foreground/40 flex h-full items-center justify-between gap-3 rounded-lg border p-4 text-sm font-medium transition-colors"
                >
                  {item.title}
                  <ArrowRight className="size-3.5 shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-muted-foreground text-xs leading-relaxed">
            {tCommon("legalTranslationNote")}
          </p>
        </div>
      </section>
    </main>
  );
}

function PolicySection({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="border-border/60 relative w-full border-t bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="max-w-3xl">
          <h2 id={`${id}-heading`} className={sectionHeadingClassName}>
            {title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {lead}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}
