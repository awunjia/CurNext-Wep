import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  securityContact,
  securityCrypto,
  securityLayers,
  securityLevels,
  securityObjectives,
  securityOta,
  securityPage,
  securityProvisioning,
  securityStandards,
  securityVerification,
  securityZones,
} from "@/config/security";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SecurityPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="security-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name}
            </p>
            <h1 id="security-heading" className={sectionHeadingClassName}>
              {securityPage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {securityPage.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {securityPage.leadNote}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="security-objectives-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="security-objectives-heading"
              className={sectionHeadingClassName}
            >
              Security objectives
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3">
            {securityObjectives.map((item) => (
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
        aria-labelledby="security-standards-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="security-standards-heading"
              className={sectionHeadingClassName}
            >
              {securityStandards.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {securityStandards.lead}
            </p>
          </div>

          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">
                Standards CurNext security controls are designed against
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Standard
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Scope
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    How we use it
                  </th>
                </tr>
              </thead>
              <tbody>
                {securityStandards.rows.map((row) => (
                  <tr
                    key={row.standard}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.standard}
                    </th>
                    <td className="text-muted-foreground py-4 pr-6 align-top leading-relaxed">
                      {row.scope}
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 max-w-2xl">
            <h3 className={itemHeadingClassName}>{securityLevels.title}</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-[15px]">
              {securityLevels.lead}
            </p>
          </div>
          <div className="border-border/70 mt-6 overflow-x-auto border-y">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                IEC 62443 security level targets by component
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Component
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    SL-T target
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Rationale
                  </th>
                </tr>
              </thead>
              <tbody>
                {securityLevels.rows.map((row) => (
                  <tr
                    key={row.component}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.component}
                    </th>
                    <td className="py-4 pr-6 align-top font-medium">
                      {row.target}
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.rationale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="security-zones-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="security-zones-heading"
              className={sectionHeadingClassName}
            >
              {securityZones.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {securityZones.lead}
            </p>
          </div>

          <ol className="border-border/70 mt-10 space-y-0 overflow-hidden rounded-lg border sm:mt-12">
            {securityZones.zones.map((zone, index) => (
              <li
                key={zone.id}
                className="border-border/60 border-b px-4 py-4 last:border-b-0 sm:px-5"
              >
                <div className="flex gap-4">
                  <span className="text-muted-foreground font-mono text-xs tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className={itemHeadingClassName}>{zone.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {zone.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 max-w-2xl">
            <h3 className={itemHeadingClassName}>Conduit controls</h3>
          </div>
          <div className="border-border/70 mt-6 overflow-x-auto border-y">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">
                Security conduit requirements between CurNext zones
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Conduit
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Path
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Controls
                  </th>
                </tr>
              </thead>
              <tbody>
                {securityZones.conduits.map((row) => (
                  <tr
                    key={row.id}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.id}
                    </th>
                    <td className="py-4 pr-6 align-top font-medium">
                      {row.path}
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.controls}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 max-w-2xl">
            <h3 className={itemHeadingClassName}>WireGuard scope</h3>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {securityZones.wireguard.map((item) => (
              <li
                key={item.layer}
                className="border-border/70 rounded-lg border p-4"
              >
                <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
                  {item.layer}
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="security-layers-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="security-layers-heading"
              className={sectionHeadingClassName}
            >
              Controls by layer
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              From field nodes to cloud - what each layer must enforce before
              trust moves upward.
            </p>
          </div>

          <ul className="mt-10 space-y-10 sm:mt-12">
            {securityLayers.map((layer) => (
              <li key={layer.id} className="min-w-0">
                <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
                  {layer.id}
                </p>
                <h3 className={cn(itemHeadingClassName, "mt-1")}>
                  {layer.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {layer.lead}
                </p>
                <ul className="text-muted-foreground mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  {layer.bullets.map((bullet) => (
                    <li key={bullet} className="leading-relaxed">
                      - {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="security-ota-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="security-ota-heading" className={sectionHeadingClassName}>
              {securityOta.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {securityOta.lead}
            </p>
          </div>

          <ol className="border-border/70 mt-10 overflow-hidden rounded-lg border sm:mt-12">
            {securityOta.signing.map((step, index) => (
              <li
                key={step}
                className="border-border/60 flex gap-4 border-b px-4 py-3 last:border-b-0 sm:px-5"
              >
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium sm:text-[15px]">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <ul className="text-muted-foreground mt-8 grid gap-2 text-sm sm:grid-cols-2">
            {securityOta.bullets.map((bullet) => (
              <li key={bullet} className="leading-relaxed">
                - {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className={itemHeadingClassName}>Factory</h3>
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-relaxed">
                {securityProvisioning.factory.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={itemHeadingClassName}>Field install</h3>
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-relaxed">
                {securityProvisioning.field.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="security-crypto-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="security-crypto-heading"
              className={sectionHeadingClassName}
            >
              {securityCrypto.title}
            </h2>
          </div>
          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">
                Cryptographic algorithms used in CurNext
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Use
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Algorithm
                  </th>
                </tr>
              </thead>
              <tbody>
                {securityCrypto.rows.map((row) => (
                  <tr
                    key={row.use}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.use}
                    </th>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.algorithm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {securityCrypto.deprecated}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="security-verify-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="security-verify-heading"
              className={sectionHeadingClassName}
            >
              {securityVerification.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {securityVerification.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {securityVerification.items.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="security-contact-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2
              id="security-contact-heading"
              className={sectionHeadingClassName}
            >
              {securityContact.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {securityContact.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {securityContact.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <a
                href={`mailto:${securityContact.email}`}
                className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
              >
                <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {securityContact.email}
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
            >
              Contact
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
            <Link
              href="/datacenters"
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "h-11 gap-2 px-5",
              )}
            >
              Datacenters
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
