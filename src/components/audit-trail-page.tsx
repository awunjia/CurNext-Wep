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
type EventItem = { category: string; examples: string };
type RelatedItem = { title: string; href: string };

export async function AuditTrailPage() {
  const t = await getTranslations("auditTrail");
  const tCommon = await getTranslations("common");
  const why = t.raw("why") as TextItem[];
  const events = t.raw("events") as {
    title: string;
    lead: string;
    categoryCol: string;
    examplesCol: string;
    caption: string;
    items: EventItem[];
  };
  const how = t.raw("how") as { title: string; items: TextItem[] };
  const access = t.raw("access") as {
    title: string;
    lead: string;
    items: TextItem[];
  };
  const related = t.raw("related") as RelatedItem[];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="audit-trail-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name}
            </p>
            <h1 id="audit-trail-heading" className={sectionHeadingClassName}>
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
                href={siteConfig.links.dashboard}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {t("openDashboard")}
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
        aria-labelledby="audit-trail-why-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="audit-trail-why-heading"
              className={sectionHeadingClassName}
            >
              {t("whyTitle")}
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-x-10">
            {why.map((item) => (
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
        aria-labelledby="audit-trail-events-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="audit-trail-events-heading"
              className={sectionHeadingClassName}
            >
              {events.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {events.lead}
            </p>
          </div>

          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">{events.caption}</caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    {events.categoryCol}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    {events.examplesCol}
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.items.map((row) => (
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
        </div>
      </section>

      <section
        aria-labelledby="audit-trail-how-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="audit-trail-how-heading"
              className={sectionHeadingClassName}
            >
              {how.title}
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {how.items.map((item) => (
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
        aria-labelledby="audit-trail-access-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="audit-trail-access-heading"
              className={sectionHeadingClassName}
            >
              {access.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {access.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-x-10">
            {access.items.map((item) => (
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
        aria-labelledby="audit-trail-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="audit-trail-related-heading"
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
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.title}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Mail className="size-3.5 shrink-0" aria-hidden />
            <span>{t("questionsLabel")}</span>
            <a
              href="mailto:security@curnext.app"
              className="text-foreground underline-offset-4 hover:underline"
            >
              security@curnext.app
            </a>
            <span aria-hidden>·</span>
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
