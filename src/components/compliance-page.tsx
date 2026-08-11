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
type AiItem = { name: string; body: string };
type FrameworkRow = { name: string; scope: string; note: string };
type RelatedItem = { title: string; href: string };

export async function CompliancePage() {
  const t = await getTranslations("compliance");
  const tCommon = await getTranslations("common");
  const honest = t.raw("honest") as { title: string; items: TextItem[] };
  const frameworks = t.raw("frameworks") as {
    title: string;
    lead: string;
    caption: string;
    frameworkCol: string;
    scopeCol: string;
    howCol: string;
    rows: FrameworkRow[];
  };
  const evidence = t.raw("evidence") as { title: string; items: TextItem[] };
  const ai = t.raw("ai") as { title: string; lead: string; items: AiItem[] };
  const markets = t.raw("markets") as {
    title: string;
    lead: string;
    items: string[];
  };
  const related = t.raw("related") as RelatedItem[];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="compliance-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name}
            </p>
            <h1 id="compliance-heading" className={sectionHeadingClassName}>
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("description")}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {t("leadNote")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/data/data-processing-agreement"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {t("readDpa")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/security"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                )}
              >
                {t("securityArchitecture")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="compliance-honest-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="compliance-honest-heading"
              className={sectionHeadingClassName}
            >
              {honest.title}
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-x-10">
            {honest.items.map((item) => (
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
        aria-labelledby="compliance-frameworks-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="compliance-frameworks-heading"
              className={sectionHeadingClassName}
            >
              {frameworks.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {frameworks.lead}
            </p>
          </div>

          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">{frameworks.caption}</caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    {frameworks.frameworkCol}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    {frameworks.scopeCol}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    {frameworks.howCol}
                  </th>
                </tr>
              </thead>
              <tbody>
                {frameworks.rows.map((row) => (
                  <tr
                    key={row.name}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {row.name}
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
        </div>
      </section>

      <section
        aria-labelledby="compliance-evidence-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="compliance-evidence-heading"
              className={sectionHeadingClassName}
            >
              {evidence.title}
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-x-10">
            {evidence.items.map((item) => (
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
        aria-labelledby="compliance-ai-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="compliance-ai-heading"
              className={sectionHeadingClassName}
            >
              {ai.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {ai.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10">
            {ai.items.map((item) => (
              <li key={item.name} className="min-w-0">
                <h3 className={itemHeadingClassName}>{item.name}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="compliance-markets-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="compliance-markets-heading"
              className={sectionHeadingClassName}
            >
              {markets.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {markets.lead}
            </p>
            <ul className="text-muted-foreground mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-[15px]">
              {markets.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="compliance-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="compliance-related-heading"
              className={sectionHeadingClassName}
            >
              {t("relatedTitle")}
            </h2>
          </div>
          <ul className="mt-8 flex flex-col gap-3 sm:mt-10">
            {related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground hover:text-foreground/80 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  {link.title}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Mail className="size-3.5 shrink-0" aria-hidden />
            <span>{t("requestsLabel")}</span>
            <a
              href="mailto:legal@curnext.app"
              className="text-foreground underline-offset-4 hover:underline"
            >
              legal@curnext.app
            </a>
          </p>
          <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
            {tCommon("legalTranslationNote")}
          </p>
        </div>
      </section>
    </main>
  );
}
