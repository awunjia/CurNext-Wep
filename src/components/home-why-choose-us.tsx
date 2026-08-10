import {
  BadgeCheck,
  CircuitBoard,
  Gauge,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

import { whyChooseUs } from "@/config/site";

const reasonIcons: LucideIcon[] = [Gauge, BadgeCheck, CircuitBoard, ScrollText];

export function HomeWhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="relative w-full bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Why choose us
          </p>
          <h3
            id="why-choose-us-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Construction intelligence that pays for itself
          </h3>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            CurNext is built for go / no-go decisions on real sites - not another
            chart to decipher.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12">
          {whyChooseUs.map((reason, index) => {
            const Icon = reasonIcons[index] ?? Gauge;

            return (
              <li key={reason.title} className="min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-muted/60 text-foreground flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 sm:size-11">
                    <Icon className="size-4 sm:size-5" aria-hidden />
                  </div>
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.2em] uppercase">
                    0{index + 1}
                  </p>
                </div>
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-base">
                  {reason.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
