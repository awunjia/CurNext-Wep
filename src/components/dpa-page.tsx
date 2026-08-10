import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  dpaAudience,
  dpaBreach,
  dpaExecute,
  dpaHosting,
  dpaInstructions,
  dpaMarkets,
  dpaPage,
  dpaRelated,
  dpaRoles,
  dpaScope,
  dpaSubprocessors,
  dpaToms,
  dpaTransfers,
} from "@/config/dpa";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

export function DpaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="dpa-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name} · Legal
            </p>
            <h1 id="dpa-heading" className={sectionHeadingClassName}>
              {dpaPage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaPage.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {dpaPage.supportLine}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {dpaPage.leadNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
              >
                Request DPA
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/data/privacy-policy"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 gap-2 px-5",
                )}
              >
                Privacy policy
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dpa-audience-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="dpa-audience-heading" className={sectionHeadingClassName}>
              {dpaAudience.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaAudience.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {dpaAudience.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dpa-markets-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="dpa-markets-heading" className={sectionHeadingClassName}>
              {dpaMarkets.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaMarkets.lead}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[48rem] text-left text-sm">
              <caption className="sr-only">
                CurNext commercial markets versus hosting residency
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Market
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Commercial
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Hosting
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Frameworks
                  </th>
                </tr>
              </thead>
              <tbody>
                {dpaMarkets.rows.map((row) => (
                  <tr
                    key={row.market}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.market}
                    </th>
                    <td className="py-4 pr-6 align-top font-medium">
                      {row.commercial}
                    </td>
                    <td className="text-muted-foreground py-4 pr-6 align-top leading-relaxed">
                      {row.hosting}
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.frameworks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {dpaMarkets.honesty}
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            Pricing by market
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="dpa-roles-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="dpa-roles-heading" className={sectionHeadingClassName}>
              {dpaRoles.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaRoles.lead}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">DPA parties and roles</caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Party
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {dpaRoles.rows.map((row) => (
                  <tr
                    key={row.role}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.role}
                    </th>
                    <td className="py-4 pr-6 align-top font-medium">
                      {row.party}
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
            {dpaRoles.honesty.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="dpa-scope-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="dpa-scope-heading" className={sectionHeadingClassName}>
              {dpaScope.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaScope.lead}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Typical categories of Client Data
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody>
                {dpaScope.categories.map((row) => (
                  <tr
                    key={row.category}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.category}
                    </th>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            {dpaScope.specialCategory}
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            {dpaScope.duration}
          </p>
          <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-relaxed">
            {dpaScope.minimization.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>

          <div className="mt-14 max-w-2xl">
            <h3 className={itemHeadingClassName}>{dpaInstructions.title}</h3>
            <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-relaxed">
              {dpaInstructions.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dpa-hosting-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="dpa-hosting-heading" className={sectionHeadingClassName}>
              {dpaHosting.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaHosting.lead}
            </p>
            <Link
              href="/datacenters"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
            >
              Datacenters
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dpa-subprocessors-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="dpa-subprocessors-heading"
              className={sectionHeadingClassName}
            >
              {dpaSubprocessors.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaSubprocessors.lead}
            </p>
            <p className="text-muted-foreground mt-3 text-sm">
              Last updated: {dpaSubprocessors.lastUpdated}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <caption className="sr-only">
                CurNext subprocessors with purpose, data categories, and location
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase"
                  >
                    Subprocessor
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase"
                  >
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase"
                  >
                    Data categories
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-4 font-medium tracking-wide uppercase"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Privacy
                  </th>
                </tr>
              </thead>
              <tbody>
                {dpaSubprocessors.rows.map((row) => (
                  <tr
                    key={row.name}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-4 align-top font-medium"
                    >
                      <span className="block">{row.name}</span>
                      <span className="text-muted-foreground mt-1 block font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
                        {row.group}
                      </span>
                    </th>
                    <td className="text-muted-foreground py-4 pr-4 align-top leading-relaxed">
                      {row.purpose}
                    </td>
                    <td className="text-muted-foreground py-4 pr-4 align-top leading-relaxed">
                      {row.dataCategories}
                    </td>
                    <td className="text-muted-foreground py-4 pr-4 align-top leading-relaxed">
                      {row.location}
                    </td>
                    <td className="py-4 align-top">
                      <a
                        href={row.privacyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                      >
                        Policy
                        <ArrowRight className="size-3.5" aria-hidden />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {dpaSubprocessors.honesty}
          </p>

          <div className="mt-14 max-w-2xl">
            <h3 className={itemHeadingClassName}>{dpaTransfers.title}</h3>
            <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-relaxed">
              {dpaTransfers.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dpa-toms-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="dpa-toms-heading" className={sectionHeadingClassName}>
              {dpaToms.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaToms.lead}
            </p>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Technical and organizational measures summary
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Control
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Summary
                  </th>
                </tr>
              </thead>
              <tbody>
                {dpaToms.rows.map((row) => (
                  <tr
                    key={row.control}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.control}
                    </th>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href="/data/security-policy"
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              Security policy
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              Security architecture
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dpa-breach-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="dpa-breach-heading" className={sectionHeadingClassName}>
              {dpaBreach.title}
            </h2>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Breach notification targets by agreement type
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Context
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Target
                  </th>
                </tr>
              </thead>
              <tbody>
                {dpaBreach.rows.map((row) => (
                  <tr
                    key={row.context}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.context}
                    </th>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm font-medium">DSR assistance</p>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
            {dpaBreach.assistance.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {dpaBreach.note}
          </p>
          <p className="mt-6 text-sm">
            <a
              href={`mailto:${dpaBreach.securityEmail}`}
              className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
            >
              <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
              {dpaBreach.securityEmail}
            </a>
          </p>
        </div>
      </section>

      <section
        aria-labelledby="dpa-execute-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 id="dpa-execute-heading" className={sectionHeadingClassName}>
              {dpaExecute.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {dpaExecute.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {dpaExecute.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${dpaExecute.legalEmail}`}
                className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
              >
                <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {dpaExecute.legalEmail}
              </a>
              <a
                href={`mailto:${dpaExecute.supportEmail}`}
                className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
              >
                <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {dpaExecute.supportEmail}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
            >
              Talk to sales
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/data/gdpr"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 px-5",
              )}
            >
              GDPR policies
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dpa-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <h2 id="dpa-related-heading" className={sectionHeadingClassName}>
            Related policies
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dpaRelated.map((item) => (
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
    </main>
  );
}
