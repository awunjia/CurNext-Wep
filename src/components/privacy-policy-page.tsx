import { ArrowRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type TextItem = { title: string; body: string };
type RelatedItem = { title: string; href: string };

export async function PrivacyPolicyPage() {
  const t = await getTranslations("privacyPolicy");
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
    privacyEmail: string;
  };
  const roles = t.raw("roles") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const collect = t.raw("collect") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const purposes = t.raw("purposes") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const legalBases = t.raw("legalBases") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const sharing = t.raw("sharing") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const transfers = t.raw("transfers") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const retention = t.raw("retention") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const rights = t.raw("rights") as {
    title: string;
    lead: string;
    bullets: string[];
    note: string;
  };
  const cookies = t.raw("cookies") as {
    title: string;
    lead: string;
    cta: string;
    href: string;
  };
  const security = t.raw("security") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const children = t.raw("children") as { title: string; lead: string };
  const markets = t.raw("markets") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const updates = t.raw("updates") as { title: string; lead: string };
  const related = t.raw("related") as RelatedItem[];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="privacy-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name} · {page.legalEyebrow}
            </p>
            <h1 id="privacy-heading" className={sectionHeadingClassName}>
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
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${controller.privacyEmail}`}
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
              >
                {t("contactPrivacy")}
                <Mail className="size-4" aria-hidden />
              </a>
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

      <PolicySection id="pp-overview" title={overview.title} lead={overview.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {overview.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="pp-controller"
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
        <a
          href={`mailto:${controller.privacyEmail}`}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm underline-offset-4 hover:underline"
        >
          <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
          {controller.privacyEmail}
        </a>
      </PolicySection>

      <section
        aria-labelledby="pp-roles-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="pp-roles-heading" className={sectionHeadingClassName}>
              {roles.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {roles.lead}
            </p>
            <div className="mt-10 space-y-8">
              {roles.items.map((item) => (
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

      <section
        aria-labelledby="pp-collect-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="pp-collect-heading" className={sectionHeadingClassName}>
              {collect.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {collect.lead}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {collect.items.map((item) => (
                <div key={item.title}>
                  <h3 className={itemHeadingClassName}>{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="pp-purposes-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="pp-purposes-heading" className={sectionHeadingClassName}>
              {purposes.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {purposes.lead}
            </p>
            <div className="mt-10 space-y-8">
              {purposes.items.map((item) => (
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

      <section
        aria-labelledby="pp-bases-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="pp-bases-heading" className={sectionHeadingClassName}>
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

      <PolicySection id="pp-sharing" title={sharing.title} lead={sharing.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {sharing.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="pp-transfers"
        title={transfers.title}
        lead={transfers.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {transfers.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="pp-retention"
        title={retention.title}
        lead={retention.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {retention.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="pp-rights" title={rights.title} lead={rights.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {rights.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          {rights.note}
        </p>
      </PolicySection>

      <section
        aria-labelledby="pp-cookies-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 id="pp-cookies-heading" className={sectionHeadingClassName}>
              {cookies.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {cookies.lead}
            </p>
          </div>
          <Link
            href={cookies.href}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 gap-2 px-5",
            )}
          >
            {cookies.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <PolicySection id="pp-security" title={security.title} lead={security.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {security.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="pp-children" title={children.title} lead={children.lead} />

      <PolicySection id="pp-markets" title={markets.title} lead={markets.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {markets.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="pp-updates" title={updates.title} lead={updates.lead} />

      <section
        aria-labelledby="pp-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <h2 id="pp-related-heading" className={sectionHeadingClassName}>
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
