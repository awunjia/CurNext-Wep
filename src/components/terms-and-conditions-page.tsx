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

export async function TermsAndConditionsPage() {
  const t = await getTranslations("termsAndConditions");
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
  const parties = t.raw("parties") as {
    title: string;
    lead: string;
    note: string;
    legalEmail: string;
  };
  const acceptance = t.raw("acceptance") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const scope = t.raw("scope") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const eligibility = t.raw("eligibility") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const accounts = t.raw("accounts") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const acceptableUse = t.raw("acceptableUse") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const commercial = t.raw("commercial") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const hardware = t.raw("hardware") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const ip = t.raw("intellectualProperty") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const feedback = t.raw("feedback") as { title: string; lead: string };
  const confidentiality = t.raw("confidentiality") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const privacy = t.raw("privacy") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const thirdParties = t.raw("thirdParties") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const disclaimers = t.raw("disclaimers") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const liability = t.raw("liability") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const indemnity = t.raw("indemnity") as { title: string; lead: string };
  const suspension = t.raw("suspension") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const governingLaw = t.raw("governingLaw") as {
    title: string;
    lead: string;
    bullets: string[];
  };
  const changes = t.raw("changes") as { title: string; lead: string };
  const contact = t.raw("contact") as {
    title: string;
    lead: string;
    legalEmail: string;
    salesEmail: string;
    privacyEmail: string;
    securityEmail: string;
  };
  const related = t.raw("related") as RelatedItem[];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="terms-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name} · {page.legalEyebrow}
            </p>
            <h1 id="terms-heading" className={sectionHeadingClassName}>
              {page.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {page.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {page.supportLine}
            </p>
            <p className="text-muted-foreground mt-6 border-border/70 border-l-2 pl-4 text-sm leading-relaxed">
              {page.leadNote}
            </p>
            <p className="text-muted-foreground mt-6 text-xs tracking-wide uppercase">
              {page.lastUpdatedLabel}: {page.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <PolicySection id="tc-overview" title={overview.title} lead={overview.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {overview.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <section
        aria-labelledby="tc-parties-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="tc-parties-heading" className={sectionHeadingClassName}>
              {parties.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {parties.lead}
            </p>
            <dl className="mt-8 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="text-foreground font-medium">{siteConfig.name}</dt>
                <dd className="text-muted-foreground">
                  {t("partiesRegisteredIn", { place: siteConfig.registeredIn })}
                </dd>
                <dd className="text-muted-foreground">
                  {t("partiesBusinessId", { id: siteConfig.businessId })}
                </dd>
                <dd className="text-muted-foreground">
                  {t("partiesWebsite", { url: `https://${siteConfig.domain}` })}
                </dd>
              </div>
            </dl>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {parties.note}
            </p>
            <a
              href={`mailto:${parties.legalEmail}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-6 inline-flex h-9 gap-2",
              )}
            >
              <Mail className="size-3.5" aria-hidden />
              {parties.legalEmail}
            </a>
          </div>
        </div>
      </section>

      <PolicySection
        id="tc-acceptance"
        title={acceptance.title}
        lead={acceptance.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {acceptance.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="tc-scope" title={scope.title} lead={scope.lead}>
        <div className="mt-10 space-y-8">
          {scope.items.map((item) => (
            <div key={item.title}>
              <h3 className={itemHeadingClassName}>{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </PolicySection>

      <PolicySection
        id="tc-eligibility"
        title={eligibility.title}
        lead={eligibility.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {eligibility.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="tc-accounts" title={accounts.title} lead={accounts.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {accounts.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="tc-acceptable-use"
        title={acceptableUse.title}
        lead={acceptableUse.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {acceptableUse.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="tc-commercial"
        title={commercial.title}
        lead={commercial.lead}
      >
        <div className="mt-10 space-y-8">
          {commercial.items.map((item) => (
            <div key={item.title}>
              <h3 className={itemHeadingClassName}>{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </PolicySection>

      <PolicySection id="tc-hardware" title={hardware.title} lead={hardware.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {hardware.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="tc-ip" title={ip.title} lead={ip.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {ip.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="tc-feedback" title={feedback.title} lead={feedback.lead} />

      <PolicySection
        id="tc-confidentiality"
        title={confidentiality.title}
        lead={confidentiality.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {confidentiality.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="tc-privacy" title={privacy.title} lead={privacy.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {privacy.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="tc-third-parties"
        title={thirdParties.title}
        lead={thirdParties.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {thirdParties.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="tc-disclaimers"
        title={disclaimers.title}
        lead={disclaimers.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {disclaimers.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="tc-liability" title={liability.title} lead={liability.lead}>
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {liability.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="tc-indemnity"
        title={indemnity.title}
        lead={indemnity.lead}
      />

      <PolicySection
        id="tc-suspension"
        title={suspension.title}
        lead={suspension.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {suspension.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection
        id="tc-governing-law"
        title={governingLaw.title}
        lead={governingLaw.lead}
      >
        <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
          {governingLaw.bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="tc-changes" title={changes.title} lead={changes.lead} />

      <section
        aria-labelledby="tc-contact-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 id="tc-contact-heading" className={sectionHeadingClassName}>
              {contact.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {contact.lead}
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {[
                contact.legalEmail,
                contact.salesEmail,
                contact.privacyEmail,
                contact.securityEmail,
              ].map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "inline-flex h-9 gap-2",
                    )}
                  >
                    <Mail className="size-3.5" aria-hidden />
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="tc-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <h2 id="tc-related-heading" className={sectionHeadingClassName}>
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
