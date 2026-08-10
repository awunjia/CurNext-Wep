import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  House,
  MapPin,
  Palmtree,
  type LucideIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  careersBelonging,
  careersHowWeWork,
  careersOpenings,
  type CareerRole,
} from "@/config/careers";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const howWeWorkIcons: Record<
  (typeof careersHowWeWork.items)[number]["icon"],
  LucideIcon
> = {
  remote: House,
  week: CalendarDays,
  holidays: Palmtree,
  health: HeartPulse,
};

type CareersPageProps = {
  roles: CareerRole[];
  page: number;
  totalPages: number;
  totalRoles: number;
};

export function CareersPage({
  roles,
  page,
  totalPages,
  totalRoles,
}: CareersPageProps) {
  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="careers-belonging-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {careersBelonging.eyebrow}
            </p>
            <h1
              id="careers-belonging-heading"
              className={sectionHeadingClassName}
            >
              {careersBelonging.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {careersBelonging.lead}
            </p>
            <div className="border-border/70 mt-8 border-l-2 pl-5">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                {careersBelonging.goalLabel}
              </p>
              <p className="text-foreground mt-2 text-base font-medium tracking-tight sm:text-lg">
                {careersBelonging.goal}
              </p>
            </div>
            <p className="text-muted-foreground mt-8 text-base leading-relaxed sm:text-lg">
              {careersBelonging.closing}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="careers-how-we-work-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {careersHowWeWork.eyebrow}
            </p>
            <h2
              id="careers-how-we-work-heading"
              className={sectionHeadingClassName}
            >
              {careersHowWeWork.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {careersHowWeWork.lead}
            </p>
          </div>

          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4">
            {careersHowWeWork.items.map((item) => {
              const Icon = howWeWorkIcons[item.icon];
              return (
                <li key={item.title} className="min-w-0">
                  <div className="bg-muted text-foreground mb-4 flex size-10 items-center justify-center rounded-lg">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className={itemHeadingClassName}>{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                    {item.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id="open-roles"
        aria-labelledby="careers-openings-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {careersOpenings.eyebrow}
            </p>
            <h2
              id="careers-openings-heading"
              className={sectionHeadingClassName}
            >
              {careersOpenings.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {careersOpenings.lead}
            </p>
          </div>

          {totalRoles === 0 ? (
            <p className="text-muted-foreground border-border/70 mt-10 border-y py-8 text-sm leading-relaxed sm:mt-12 sm:text-[15px]">
              {careersOpenings.empty}
            </p>
          ) : (
            <>
              <ul className="mt-10 grid gap-x-10 gap-y-0 sm:mt-12 sm:grid-cols-2">
                {roles.map((role) => (
                  <li
                    key={role.id}
                    className="border-border/70 flex flex-col gap-4 border-t py-6 sm:py-7"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className={itemHeadingClassName}>{role.title}</h3>
                      <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span>{role.team}</span>
                        <span aria-hidden className="text-border">
                          ·
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5 shrink-0" aria-hidden />
                          {role.location}
                        </span>
                        <span aria-hidden className="text-border">
                          ·
                        </span>
                        <span>{role.type}</span>
                      </p>
                      <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-[15px]">
                        {role.summary}
                      </p>
                    </div>
                    <Link
                      href={role.href}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "h-9 w-fit gap-1.5 px-3",
                      )}
                    >
                      See more
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>

              {totalPages > 1 ? (
                <nav
                  aria-label="Open roles pages"
                  className="border-border/70 mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                >
                  <p className="text-muted-foreground text-sm">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    {page > 1 ? (
                      <Link
                        href={careersPageHref(page - 1)}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3",
                        )}
                      >
                        <ChevronLeft className="size-4" aria-hidden />
                        Previous
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3 opacity-40",
                        )}
                        aria-disabled
                      >
                        <ChevronLeft className="size-4" aria-hidden />
                        Previous
                      </span>
                    )}
                    {page < totalPages ? (
                      <Link
                        href={careersPageHref(page + 1)}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3",
                        )}
                      >
                        Next
                        <ChevronRight className="size-4" aria-hidden />
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-9 gap-1 px-3 opacity-40",
                        )}
                        aria-disabled
                      >
                        Next
                        <ChevronRight className="size-4" aria-hidden />
                      </span>
                    )}
                  </div>
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function careersPageHref(page: number) {
  if (page <= 1) return "/careers#open-roles";
  return `/careers?page=${page}#open-roles`;
}
