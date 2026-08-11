import { Link } from "@/i18n/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const selfServeItems = [
  { key: "docs", href: "/docs" },
  { key: "knowledgeBase", href: "/knowledge-base" },
  { key: "dashboard", href: "https://dash.curnext.app" },
  { key: "api", href: "https://api.curnext.app/docs" },
] as const;

const topicKeys = ["account", "dashboard", "devices", "api"] as const;

const channelRows = [
  { key: "product", email: "support@curnext.app" },
  { key: "sales", email: "sales@curnext.app" },
  { key: "security", email: "security@curnext.app" },
  { key: "legal", email: "legal@curnext.app" },
] as const;

const beforeKeys = ["1", "2", "3", "4", "5", "6"] as const;

const escalationItems = [
  { key: "notCustomer", href: "/pricing" },
  { key: "company", href: "/contact" },
  { key: "security", href: "/security" },
] as const;

const supportEmail = "support@curnext.app";

export async function SupportPage() {
  const t = await getTranslations("support");

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="support-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name}
            </p>
            <h1 id="support-heading" className={sectionHeadingClassName}>
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("description")}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {t("leadNote")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${supportEmail}`}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {t("emailCta", { email: supportEmail })}
                <Mail className="size-4" aria-hidden />
              </a>
              <Link
                href="/docs"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {t("openDocs")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="support-self-serve-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="support-self-serve-heading"
              className={sectionHeadingClassName}
            >
              {t("selfServeTitle")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("selfServeLead")}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {selfServeItems.map((item) => (
              <li key={item.key} className="min-w-0">
                <h3 className={itemHeadingClassName}>
                  {t(`selfServe.${item.key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {t(`selfServe.${item.key}.body`)}
                </p>
                <Link
                  href={item.href}
                  className="text-foreground mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {t("open")}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="support-topics-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="support-topics-heading"
              className={sectionHeadingClassName}
            >
              {t("topicsTitle")}
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {topicKeys.map((key) => (
              <li key={key} className="min-w-0">
                <h3 className={itemHeadingClassName}>
                  {t(`topics.${key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {t(`topics.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="support-channels-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="support-channels-heading"
              className={sectionHeadingClassName}
            >
              {t("channelsTitle")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("channelsLead")}
            </p>
          </div>

          <div className="border-border/70 mt-10 overflow-x-auto border-y sm:mt-12">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">{t("tableCaption")}</caption>
              <thead>
                <tr className="border-border/70 border-b">
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    {t("team")}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 pr-6 font-medium tracking-wide uppercase"
                  >
                    {t("email")}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground py-3 font-medium tracking-wide uppercase"
                  >
                    {t("useFor")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {channelRows.map((row) => (
                  <tr
                    key={row.key}
                    className="border-border/60 border-b last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top font-medium"
                    >
                      {t(`channels.${row.key}.team`)}
                    </th>
                    <td className="py-4 pr-6 align-top">
                      <a
                        href={`mailto:${row.email}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[13px] underline-offset-4 hover:underline"
                      >
                        <Mail
                          className="size-3.5 shrink-0 opacity-70"
                          aria-hidden
                        />
                        {row.email}
                      </a>
                    </td>
                    <td className="text-muted-foreground py-4 align-top leading-relaxed">
                      {t(`channels.${row.key}.useFor`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 max-w-2xl">
            <h3 className={itemHeadingClassName}>{t("beforeTitle")}</h3>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-[15px]">
              {beforeKeys.map((key) => (
                <li key={key}>{t(`before.${key}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="support-escalation-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="support-escalation-heading"
              className={sectionHeadingClassName}
            >
              {t("escalationTitle")}
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-x-10">
            {escalationItems.map((item) => (
              <li key={item.key} className="min-w-0">
                <h3 className={itemHeadingClassName}>
                  {t(`escalation.${item.key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {t(`escalation.${item.key}.body`)}
                </p>
                <Link
                  href={item.href}
                  className="text-foreground mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                >
                  {t(`escalation.${item.key}.linkLabel`)}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
