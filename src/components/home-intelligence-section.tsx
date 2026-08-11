"use client";

import { BrainCircuit, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function HomeIntelligenceSection() {
  const t = useTranslations("home");

  const pillars = [
    {
      icon: BrainCircuit,
      title: t("aiTitle"),
      body: t("aiBody"),
      href: "/solutions/concrete-curing" as const,
      linkLabel: t("aiLink"),
    },
    {
      icon: ShieldCheck,
      title: t("securityTitle"),
      body: t("securityBody"),
      href: "/security" as const,
      linkLabel: t("securityLink"),
    },
  ];

  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            {t("intelligenceEyebrow")}
          </p>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t("intelligenceTitle")}
          </h3>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {t("intelligenceLead")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-12 sm:gap-y-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div key={pillar.href} className="min-w-0">
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
