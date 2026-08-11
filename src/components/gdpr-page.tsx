import { ArrowRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type TextItem = { title: string; body: string };
type BasisRow = { basis: string; use: string };
type RightRow = { right: string; detail: string };
type RelatedItem = { title: string; href: string };

export async function GdprPage() {
  const t = await getTranslations("gdpr");
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
    honesty: string;
  };
  const controller = t.raw("controller") as {
    title: string;
    lead: string;
    privacyEmail: string;
    privacyEmailLabel: string;
    legalEmail: string;
    legalEmailLabel: string;
    securityEmail: string;
    securityEmailLabel: string;
    note: string;
  };
  const roles = t.raw("roles") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const scope = t.raw("scope") as {
    title: string;
    lead: string;
    bullets: string[];
    note: string;
  };
  const legalBases = t.raw("legalBases") as {
    title: string;
    lead: string;
    rows: BasisRow[];
    special: string;
  };
  const categories = t.raw("categories") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const rights = t.raw("rights") as {
    title: string;
    lead: string;
    rows: RightRow[];
    clientNote: string;
  };
  const exercise = t.raw("exercise") as {
    title: string;
    lead: string;
    steps: string[];
    timing: string;
    identity: string;
    email: string;
    formHint: string;
  };
  const retention = t.raw("retention") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const transfers = t.raw("transfers") as {
    title: string;
    lead: string;
    bullets: string[];
    note: string;
  };
  const subprocessors = t.raw("subprocessors") as {
    title: string;
    lead: string;
    bullets: string[];
    cta: string;
    href: string;
  };
  const security = t.raw("security") as {
    title: string;
    lead: string;
    bullets: string[];
    note: string;
    href: string;
    cta: string;
  };
  const breach = t.raw("breach") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const cookies = t.raw("cookies") as {
    title: string;
    lead: string;
    bullets: string[];
    cookieHref: string;
    cookieCta: string;
    privacyHref: string;
    privacyCta: string;
  };
  const children = t.raw("children") as { title: string; lead: string };
  const automated = t.raw("automated") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const authority = t.raw("authority") as {
    title: string;
    lead: string;
    name: string;
    url: string;
    urlLabel: string;
    note: string;
  };
  const updates = t.raw("updates") as { title: string; lead: string };
  const related = t.raw("related") as RelatedItem[];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="gdpr-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name} · {page.legalEyebrow}
            </p>
            <h1 id="gdpr-heading" className={sectionHeadingClassName}>
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
                href={`mailto:${exercise.email}`}
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
              >
                {t("emailGdpr")}
                <Mail className="size-4" aria-hidden />
              </a>
              <Link
                href="/data/data-processing-agreement"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 gap-2 px-5",
                )}
              >
                {t("readDpa")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-overview-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-overview-heading" className={sectionHeadingClassName}>
              {overview.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {overview.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {overview.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {overview.honesty}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-controller-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-controller-heading" className={sectionHeadingClassName}>
              {controller.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {controller.lead}
            </p>
            <ul className="mt-6 space-y-1 text-sm leading-relaxed">
              <li>{siteConfig.name}</li>
              <li>
                {t("controllerRegisteredIn", {
                  place: siteConfig.registeredIn,
                })}
              </li>
              <li>
                {t("controllerBusinessId", { id: siteConfig.businessId })}
              </li>
              <li>
                {t("controllerWebsite", { url: "https://curnext.app" })}
              </li>
            </ul>
            <div className="mt-8 space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wide">
                  {controller.privacyEmailLabel}
                </p>
                <a
                  href={`mailto:${controller.privacyEmail}`}
                  className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
                >
                  <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  {controller.privacyEmail}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wide">
                  {controller.legalEmailLabel}
                </p>
                <a
                  href={`mailto:${controller.legalEmail}`}
                  className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
                >
                  <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  {controller.legalEmail}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wide">
                  {controller.securityEmailLabel}
                </p>
                <a
                  href={`mailto:${controller.securityEmail}`}
                  className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
                >
                  <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  {controller.securityEmail}
                </a>
              </div>
            </div>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {controller.note}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-roles-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-roles-heading" className={sectionHeadingClassName}>
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
        aria-labelledby="gdpr-scope-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-scope-heading" className={sectionHeadingClassName}>
              {scope.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {scope.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {scope.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {scope.note}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-bases-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-bases-heading" className={sectionHeadingClassName}>
              {legalBases.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {legalBases.lead}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-border/60 border-b">
                  <th className="py-3 pr-6 font-medium">{t("basisCol")}</th>
                  <th className="py-3 font-medium">{t("useCol")}</th>
                </tr>
              </thead>
              <tbody>
                {legalBases.rows.map((row) => (
                  <tr
                    key={row.basis}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.basis}
                    </th>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-6 max-w-3xl text-sm leading-relaxed">
            {legalBases.special}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-categories-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-categories-heading" className={sectionHeadingClassName}>
              {categories.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {categories.lead}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {categories.items.map((item) => (
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
        aria-labelledby="gdpr-rights-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-rights-heading" className={sectionHeadingClassName}>
              {rights.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {rights.lead}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-border/60 border-b">
                  <th className="py-3 pr-6 font-medium">{t("rightCol")}</th>
                  <th className="py-3 font-medium">{t("detailCol")}</th>
                </tr>
              </thead>
              <tbody>
                {rights.rows.map((row) => (
                  <tr
                    key={row.right}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.right}
                    </th>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-6 max-w-3xl text-sm leading-relaxed">
            {rights.clientNote}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-exercise-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-exercise-heading" className={sectionHeadingClassName}>
              {exercise.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {exercise.lead}
            </p>
            <ol className="text-muted-foreground mt-6 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
              {exercise.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {exercise.timing}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {exercise.identity}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {exercise.formHint}
            </p>
            <a
              href={`mailto:${exercise.email}`}
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm underline-offset-4 hover:underline"
            >
              <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
              {exercise.email}
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-retention-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-retention-heading" className={sectionHeadingClassName}>
              {retention.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {retention.lead}
            </p>
            <div className="mt-10 space-y-8">
              {retention.items.map((item) => (
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
        aria-labelledby="gdpr-transfers-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-transfers-heading" className={sectionHeadingClassName}>
              {transfers.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {transfers.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {transfers.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {transfers.note}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-subprocessors-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2
              id="gdpr-subprocessors-heading"
              className={sectionHeadingClassName}
            >
              {subprocessors.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {subprocessors.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {subprocessors.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <Link
            href={subprocessors.href}
            className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
          >
            {subprocessors.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-security-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 id="gdpr-security-heading" className={sectionHeadingClassName}>
              {security.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {security.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {security.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {security.note}
            </p>
          </div>
          <Link
            href={security.href}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 gap-2 px-5",
            )}
          >
            {security.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-breach-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-breach-heading" className={sectionHeadingClassName}>
              {breach.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {breach.lead}
            </p>
            <div className="mt-10 space-y-8">
              {breach.items.map((item) => (
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
        aria-labelledby="gdpr-cookies-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-cookies-heading" className={sectionHeadingClassName}>
              {cookies.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {cookies.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {cookies.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={cookies.cookieHref}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 gap-2 px-5",
                )}
              >
                {cookies.cookieCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={cookies.privacyHref}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 gap-2 px-5",
                )}
              >
                {cookies.privacyCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-children-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-children-heading" className={sectionHeadingClassName}>
              {children.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {children.lead}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-automated-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-automated-heading" className={sectionHeadingClassName}>
              {automated.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {automated.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {automated.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-authority-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-authority-heading" className={sectionHeadingClassName}>
              {authority.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {authority.lead}
            </p>
            <p className="mt-6 text-sm font-medium sm:text-base">
              {authority.name}
            </p>
            <a
              href={authority.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-sm underline-offset-4 hover:underline"
            >
              {authority.urlLabel}
            </a>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {authority.note}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-updates-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="gdpr-updates-heading" className={sectionHeadingClassName}>
              {updates.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {updates.lead}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-cta-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 id="gdpr-cta-heading" className={sectionHeadingClassName}>
              {t("ctaTitle")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {t("ctaLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${exercise.email}`}
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
            >
              {t("emailGdpr")}
              <Mail className="size-4" aria-hidden />
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 px-5",
              )}
            >
              {t("contactForm")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gdpr-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <h2 id="gdpr-related-heading" className={sectionHeadingClassName}>
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
