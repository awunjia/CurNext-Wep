import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { partners } from "@/config/partners";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

function partnerByName(name: string) {
  return partners.find((partner) => partner.name === name);
}

export async function DatacentersPage() {
  const t = await getTranslations("datacenters");
  const tCommon = await getTranslations("common");
  const datacentersPage = { title: t("title"), description: t("description"), leadNote: t("leadNote") };
  const datacentersRegions = t.raw("regions") as typeof import("@/config/datacenters").datacentersRegions;
  const datacentersObjectStorage = t.raw("objectStorage") as typeof import("@/config/datacenters").datacentersObjectStorage;
  const datacentersTraffic = t.raw("traffic") as typeof import("@/config/datacenters").datacentersTraffic;
  const datacentersStorage = t.raw("storage") as typeof import("@/config/datacenters").datacentersStorage;
  const datacentersScale = t.raw("scale") as typeof import("@/config/datacenters").datacentersScale;
  const datacentersTrust = t.raw("trust") as typeof import("@/config/datacenters").datacentersTrust;

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="datacenters-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name}
            </p>
            <h1 id="datacenters-heading" className={sectionHeadingClassName}>
              {datacentersPage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {datacentersPage.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {datacentersPage.leadNote}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="datacenters-regions-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="datacenters-regions-heading"
              className={sectionHeadingClassName}
            >
              {t("regionsTitle")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
{t("regionsLead")}
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3">
            {datacentersRegions.map((region) => {
              const partner = partnerByName(region.logo);
              return (
                <li
                  key={region.provider}
                  className="border-border/70 flex h-full flex-col rounded-lg border p-5"
                >
                  {partner ? (
                    <div className="mb-4 flex h-8 items-center">
                      <Image
                        src={partner.src}
                        alt=""
                        width={120}
                        height={32}
                        className="h-7 w-auto max-w-[7.5rem] object-contain object-left opacity-90"
                      />
                    </div>
                  ) : null}
                  <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
                    {region.layer}
                  </p>
                  <h3 className={cn(itemHeadingClassName, "mt-1")}>
                    {region.provider}
                  </h3>
                  <p className="mt-1 text-sm font-medium">{region.region}</p>
                  <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                    {region.body}
                  </p>
                  <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
                    Runs: {region.runs}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="border-border/70 mt-6 rounded-lg border p-5 sm:p-6">
            <h3 className={itemHeadingClassName}>
              {datacentersObjectStorage.provider}
            </h3>
            <p className="mt-1 text-sm font-medium">
              {datacentersObjectStorage.region}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {datacentersObjectStorage.body}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="datacenters-traffic-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="datacenters-traffic-heading"
              className={sectionHeadingClassName}
            >
              {datacentersTraffic.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {datacentersTraffic.lead}
            </p>
          </div>

          <ol className="border-border/70 mt-10 space-y-0 overflow-hidden rounded-lg border sm:mt-12">
            {datacentersTraffic.steps.map((step, index) => (
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
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {datacentersTraffic.healthNote}
          </p>

          <div className="mt-10 max-w-xl">
            <h3 className={itemHeadingClassName}>Publishable hosts</h3>
            <ul className="border-border/70 mt-4 overflow-hidden rounded-lg border">
              {datacentersTraffic.hosts.map((item) => (
                <li
                  key={item.host}
                  className="border-border/60 flex flex-col gap-0.5 border-b px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
                >
                  <a
                    href={`https://${item.host}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm underline-offset-4 hover:underline"
                  >
                    {item.host}
                  </a>
                  <span className="text-muted-foreground text-sm">
                    {item.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="datacenters-storage-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="datacenters-storage-heading"
              className={sectionHeadingClassName}
            >
              {datacentersStorage.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {datacentersStorage.lead}
            </p>
          </div>

          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Where CurNext stores and processes data by layer
              </caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Layer
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    Where
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {datacentersStorage.rows.map((row) => (
                  <tr
                    key={row.layer}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.layer}
                    </th>
                    <td className="py-4 pr-6 align-top font-medium">
                      {row.where}
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="datacenters-scale-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="datacenters-scale-heading"
              className={sectionHeadingClassName}
            >
              {datacentersScale.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {datacentersScale.lead}
            </p>
          </div>

          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {datacentersScale.rows.map((row) => (
              <li key={row.component} className="min-w-0">
                <h3 className={itemHeadingClassName}>{row.component}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {row.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="datacenters-trust-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2
              id="datacenters-trust-heading"
              className={sectionHeadingClassName}
            >
              {datacentersTrust.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {datacentersTrust.lead}
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
              {datacentersTrust.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <a
                href={`mailto:${datacentersTrust.securityEmail}`}
                className="inline-flex items-center gap-1.5 font-mono underline-offset-4 hover:underline"
              >
                <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {datacentersTrust.securityEmail}
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
            >
              Request assessment
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
      </section>
          <section className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-muted-foreground text-xs leading-relaxed">{tCommon("legalTranslationNote")}</p>
        </div>
      </section>
    </main>
  );
}
