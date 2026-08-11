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

export async function SecurityPolicyPage() {
  const t = await getTranslations("securityPolicy");
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
  const scope = t.raw("scope") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const objectives = t.raw("objectives") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const organisational = t.raw("organisational") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const technical = t.raw("technical") as {
    title: string;
    lead: string;
    bullets: string[];
    architectureCta: string;
    architectureHref: string;
  };
  const access = t.raw("access") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const dataProtection = t.raw("dataProtection") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const vulnerability = t.raw("vulnerability") as {
    title: string;
    lead: string;
    bullets: string[];
    email: string;
  };
  const incidents = t.raw("incidents") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const vendors = t.raw("vendors") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const customer = t.raw("customer") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const updates = t.raw("updates") as { title: string; lead: string };
  const related = t.raw("related") as RelatedItem[];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="security-policy-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name} · {page.legalEyebrow}
            </p>
            <h1 id="security-policy-heading" className={sectionHeadingClassName}>
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
                href={`mailto:${vulnerability.email}`}
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
              >
                {t("reportVulnerability")}
                <Mail className="size-4" aria-hidden />
              </a>
              <Link
                href="/security"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 gap-2 px-5",
                )}
              >
                {t("readArchitecture")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PolicySection id="sp-overview" title={overview.title} lead={overview.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {overview.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          {overview.honesty}
        </p>
      </PolicySection>

      <PolicySection id="sp-scope" title={scope.title} lead={scope.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {scope.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <section
        aria-labelledby="sp-objectives-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="sp-objectives-heading" className={sectionHeadingClassName}>
              {objectives.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {objectives.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.items.map((item) => (
              <li key={item.title}>
                <h3 className={itemHeadingClassName}>{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="sp-org-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="sp-org-heading" className={sectionHeadingClassName}>
              {organisational.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {organisational.lead}
            </p>
            <div className="mt-10 space-y-8">
              {organisational.items.map((item) => (
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
        aria-labelledby="sp-tech-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 id="sp-tech-heading" className={sectionHeadingClassName}>
              {technical.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {technical.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {technical.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <Link
            href={technical.architectureHref}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 gap-2 px-5",
            )}
          >
            {technical.architectureCta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <PolicySection id="sp-access" title={access.title} lead={access.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {access.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="sp-data"
        title={dataProtection.title}
        lead={dataProtection.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {dataProtection.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <section
        aria-labelledby="sp-vuln-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="sp-vuln-heading" className={sectionHeadingClassName}>
              {vulnerability.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {vulnerability.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {vulnerability.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <a
              href={`mailto:${vulnerability.email}`}
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm underline-offset-4 hover:underline"
            >
              <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
              {vulnerability.email}
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sp-incidents-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="sp-incidents-heading" className={sectionHeadingClassName}>
              {incidents.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {incidents.lead}
            </p>
            <div className="mt-10 space-y-8">
              {incidents.items.map((item) => (
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

      <PolicySection id="sp-vendors" title={vendors.title} lead={vendors.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {vendors.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="sp-customer" title={customer.title} lead={customer.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {customer.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="sp-updates" title={updates.title} lead={updates.lead} />

      <section
        aria-labelledby="sp-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <h2 id="sp-related-heading" className={sectionHeadingClassName}>
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
