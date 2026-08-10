import Link from "next/link";
import { BrainCircuit, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: BrainCircuit,
    title: "AI readiness predictions",
    body: "CurNext goes beyond dashboards. Models turn live sensor streams into clear readiness forecasts for curing, drying, and handoff - so teams act before schedules slip.",
    href: "/technologies",
    linkLabel: "Explore technologies",
  },
  {
    icon: ShieldCheck,
    title: "Security by design",
    body: "Site data stays protected with hardened controls, audit-ready trails, and practices built for construction and operations environments - from sensor to cloud.",
    href: "/security",
    linkLabel: "View security",
  },
] as const;

export function HomeIntelligenceSection() {
  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Intelligence & trust
          </p>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Not just graphs. Decisions you can trust.
          </h3>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            Visualize conditions when you need them - and rely on AI predictions
            plus security controls when the schedule and reputation are on the
            line.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-12 sm:gap-y-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div key={pillar.title} className="min-w-0">
                <div className="bg-muted/60 text-foreground mb-3 flex size-10 items-center justify-center rounded-xl border border-border/60 sm:mb-4 sm:size-11">
                  <Icon className="size-4 sm:size-5" aria-hidden />
                </div>
                <h3 className="text-base font-semibold tracking-tight sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed sm:mt-3 sm:text-base">
                  {pillar.body}
                </p>
                <Link
                  href={pillar.href}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "mt-3 h-auto px-0 text-xs sm:mt-4 sm:text-sm",
                  )}
                >
                  {pillar.linkLabel}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
