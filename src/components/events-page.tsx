import { Link } from "@/i18n/navigation";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import {
  partitionEvents,
  type CurNextEvent,
} from "@/config/events";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const salesEmail = "sales@curnext.app";

async function EventList({
  events,
  emptyLabel,
}: {
  events: CurNextEvent[];
  emptyLabel: string;
}) {
  const t = await getTranslations("events");

  if (events.length === 0) {
    return (
      <p className="text-muted-foreground mt-8 text-sm leading-relaxed">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul className="mt-10 divide-y divide-border/70 border-y border-border/70 sm:mt-12">
      {events.map((event) => (
        <li
          key={event.id}
          className="grid gap-3 py-6 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-8 sm:py-7"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium tracking-tight">
              {t(`items.${event.id}.displayDate`)}
            </p>
            <p className="text-muted-foreground mt-2 inline-flex items-start gap-1.5 text-sm leading-snug">
              <MapPin className="mt-0.5 size-3.5 shrink-0 opacity-70" aria-hidden />
              <span>
                {t(`items.${event.id}.city`)}, {t(`items.${event.id}.country`)}
              </span>
            </p>
            <p className="text-muted-foreground mt-2 font-mono text-[11px] tracking-[0.12em] uppercase">
              {t(`formats.${event.format}`)}
            </p>
          </div>
          <div className="min-w-0">
            <h3 className={itemHeadingClassName}>
              {t(`items.${event.id}.title`)}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
              {t(`items.${event.id}.summary`)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export async function EventsPage() {
  const t = await getTranslations("events");
  const tCommon = await getTranslations("common");
  const { upcoming, past } = partitionEvents();

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="events-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {siteConfig.name}
            </p>
            <h1 id="events-heading" className={sectionHeadingClassName}>
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
                href={`mailto:${salesEmail}?subject=${encodeURIComponent("CurNext event attendance")}`}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {t("askAboutEvent")}
                <Mail className="size-4" aria-hidden />
              </a>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {tCommon("contact")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="events-upcoming-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="events-upcoming-heading"
              className={sectionHeadingClassName}
            >
              {t("upcoming")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("upcomingLead")}
            </p>
          </div>
          <EventList events={upcoming} emptyLabel={t("emptyUpcoming")} />
        </div>
      </section>

      <section
        aria-labelledby="events-past-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="events-past-heading" className={sectionHeadingClassName}>
              {t("past")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("pastLead")}
            </p>
          </div>
          <EventList events={past} emptyLabel={t("emptyPast")} />
        </div>
      </section>
    </main>
  );
}
