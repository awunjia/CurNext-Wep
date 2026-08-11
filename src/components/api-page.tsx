import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const codeBlockClass =
  "border-border/70 bg-muted/40 overflow-x-auto rounded-lg border p-4 font-mono text-[12px] leading-relaxed text-foreground sm:text-[13px]";

export async function ApiPage() {
  const t = await getTranslations("api");
  const apiAccess = t.raw("apiAccess") as typeof import("@/config/api-page").apiAccess;
  const apiAudience = t.raw("apiAudience") as typeof import("@/config/api-page").apiAudience;
  const apiBuiltNote = t.raw("apiBuiltNote") as typeof import("@/config/api-page").apiBuiltNote;
  const apiCapabilities = t.raw("apiCapabilities") as typeof import("@/config/api-page").apiCapabilities;
  const apiEndpoints = t.raw("apiEndpoints") as typeof import("@/config/api-page").apiEndpoints;
  const apiFaqs = t.raw("apiFaqs") as typeof import("@/config/api-page").apiFaqs;
  const apiMqttFootnote = t.raw("apiMqttFootnote") as typeof import("@/config/api-page").apiMqttFootnote;
  const apiPage = t.raw("apiPage") as typeof import("@/config/api-page").apiPage;
  const apiReadinessSample = t.raw("apiReadinessSample") as typeof import("@/config/api-page").apiReadinessSample;
  const apiWebhooks = t.raw("apiWebhooks") as typeof import("@/config/api-page").apiWebhooks;
  const apiWhy = t.raw("apiWhy") as typeof import("@/config/api-page").apiWhy;

  const mid = Math.ceil(apiFaqs.length / 2);

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="api-hero-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {apiPage.eyebrow}
            </p>
            <h1 id="api-hero-heading" className={sectionHeadingClassName}>
              {apiPage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {apiPage.lead}
            </p>
            <p className="text-muted-foreground mt-3 inline-flex items-center gap-2 text-sm">
              <span className="bg-muted text-foreground rounded-md px-2 py-0.5 text-xs font-medium tracking-wide uppercase">
                Professional
              </span>
              API access included
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={apiPage.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 gap-2 px-5",
                )}
              >
                {apiPage.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href="https://api.curnext.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 gap-2 px-5",
                )}
              >
                Open API playground
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a
                href={apiPage.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "ghost" }),
                  "h-11 gap-2 px-5",
                )}
              >
                {apiPage.secondaryCta.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <Link
                href={apiPage.tertiaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg", variant: "ghost" }),
                  "h-11 px-5",
                )}
              >
                {apiPage.tertiaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="api-why-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {apiWhy.eyebrow}
            </p>
            <h2 id="api-why-heading" className={sectionHeadingClassName}>
              {apiWhy.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {apiWhy.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {apiWhy.outcomes.map((item) => (
              <li key={item.title} className="min-w-0">
                <h3 className={itemHeadingClassName}>{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="api-audience-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {apiAudience.eyebrow}
            </p>
            <h2 id="api-audience-heading" className={sectionHeadingClassName}>
              {apiAudience.title}
            </h2>
            <ul className="text-muted-foreground mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-[15px]">
              {apiAudience.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="api-capabilities-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {apiCapabilities.eyebrow}
            </p>
            <h2
              id="api-capabilities-heading"
              className={sectionHeadingClassName}
            >
              {apiCapabilities.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {apiCapabilities.lead}
            </p>
          </div>
          <ul className="border-border/70 mt-10 divide-y border-y sm:mt-12">
            {apiCapabilities.items.map((item) => (
              <li
                key={item.title}
                className="grid gap-2 py-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8 sm:py-7"
              >
                <h3 className={itemHeadingClassName}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="api-base-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Base URL &amp; versioning
            </p>
            <h2 id="api-base-heading" className={sectionHeadingClassName}>
              Production host and /api/v1
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Production API:{" "}
              <span className="text-foreground font-medium">
                https://api.curnext.app
              </span>
              . Version prefix:{" "}
              <span className="text-foreground font-medium">/api/v1</span>.
              Example base:{" "}
              <span className="text-foreground font-medium">
                https://api.curnext.app/api/v1
              </span>
              .
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {apiBuiltNote}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className={itemHeadingClassName}>Health check</h3>
              <pre className={cn(codeBlockClass, "mt-4")}>
                <code>{`curl -sS "https://api.curnext.app/api/v1/health"`}</code>
              </pre>
              <pre className={cn(codeBlockClass, "mt-3")}>
                <code>{`# Authenticated calls are enabled per project after access is provisioned.
# Manage keys in https://curnext.app - then call
# /api/v1/surfaces/{id}/readiness`}</code>
              </pre>
            </div>
            <div>
              <h3 className={itemHeadingClassName}>
                Illustrative readiness response
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Sample shape only - fields as published for marketing.
              </p>
              <pre className={cn(codeBlockClass, "mt-4")}>
                <code>{apiReadinessSample}</code>
              </pre>
            </div>
          </div>

          <div className="mt-12 sm:mt-14">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {apiEndpoints.eyebrow}
            </p>
            <h3 className={sectionHeadingClassName}>{apiEndpoints.title}</h3>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
              {apiEndpoints.lead}
            </p>
            <div className="border-border/70 mt-8 overflow-x-auto border-y">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead>
                  <tr className="border-border/70 border-b text-xs tracking-[0.12em] uppercase">
                    <th className="text-muted-foreground py-3 pr-4 font-medium">
                      Method
                    </th>
                    <th className="text-muted-foreground py-3 pr-4 font-medium">
                      Path
                    </th>
                    <th className="text-muted-foreground py-3 font-medium">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.rows.map((row) => (
                    <tr
                      key={`${row.method}-${row.path}`}
                      className="border-border/50 border-b last:border-b-0"
                    >
                      <td className="py-3.5 pr-4 align-top font-mono text-xs font-medium sm:text-sm">
                        {row.method}
                      </td>
                      <td className="py-3.5 pr-4 align-top font-mono text-xs sm:text-sm">
                        {row.path}
                      </td>
                      <td className="text-muted-foreground py-3.5 align-top">
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 text-xs leading-relaxed sm:text-sm">
              {apiMqttFootnote}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="api-access-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {apiAccess.eyebrow}
            </p>
            <h2 id="api-access-heading" className={sectionHeadingClassName}>
              {apiAccess.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {apiAccess.lead}
            </p>
            <ul className="text-muted-foreground mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-[15px]">
              {apiAccess.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {apiAccess.enterpriseNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 gap-2 px-5",
                )}
              >
                Request access
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 px-5",
                )}
              >
                Professional on pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="api-webhooks-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {apiWebhooks.eyebrow}
            </p>
            <h2 id="api-webhooks-heading" className={sectionHeadingClassName}>
              {apiWebhooks.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {apiWebhooks.lead}
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2 sm:mt-10">
            {apiWebhooks.events.map((event) => (
              <li
                key={event}
                className="border-border/70 bg-muted/30 rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-tight sm:text-xs"
              >
                {event}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 px-5",
              )}
            >
              Talk to sales about events
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="api-faq-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              FAQ
            </p>
            <h2 id="api-faq-heading" className={sectionHeadingClassName}>
              Common questions
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 lg:mt-12 lg:grid-cols-2 lg:gap-x-12">
            <Accordion className="border-border/70 h-fit border-y">
              {apiFaqs.slice(0, mid).map((item, index) => (
                <AccordionItem key={item.q} value={`faq-a-${index}`}>
                  <AccordionTrigger className="py-4 text-base font-semibold tracking-tight hover:no-underline sm:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed sm:text-[15px]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Accordion className="border-border/70 h-fit border-y lg:border-t-0 lg:pt-0">
              {apiFaqs.slice(mid).map((item, index) => (
                <AccordionItem key={item.q} value={`faq-b-${index}`}>
                  <AccordionTrigger className="py-4 text-base font-semibold tracking-tight hover:no-underline sm:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed sm:text-[15px]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase">
              <Code2 className="size-3.5" aria-hidden />
              Next step
            </p>
            <h2 className={sectionHeadingClassName}>
              Enable API access for your project
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Request access. We will enable integration for your project and
              walk through keys, scopes, and events in the platform.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 px-5",
              )}
            >
              Contact sales
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="https://curnext.app"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 px-5",
              )}
            >
              Open platform
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "h-11 px-5",
              )}
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
