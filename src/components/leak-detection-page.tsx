import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  ClipboardCheck,
  Droplets,
  Radio,
  ShowerHead,
  Timer,
  Waves,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    title: "Faster response before damage spreads",
    body: "Catch water where it starts in plant rooms, bathrooms, and risers - before a small leak becomes a programme-stopping flood.",
  },
  {
    title: "Battery-friendly when dry",
    body: "Event-driven LoRaWAN uplinks on detection keep the node quiet when dry - long field life without constant chatter.",
  },
  {
    title: "Same stack as readiness",
    body: "Alerts land on CurNext web and mobile with building context - not trapped in a standalone gadget app.",
  },
  {
    title: "Traceable leak events",
    body: "An event log for the project record - evidence you can show clients, insurers, and auditors.",
  },
] as const;

const problems = [
  {
    icon: Droplets,
    title: "Small leaks become floods",
    body: "Water that starts under a toilet, tray, or plant skid spreads into finishes, shafts, and programme delay.",
  },
  {
    icon: Timer,
    title: "Wet zones checked too rarely",
    body: "Plant rooms, bathrooms, and risers sit between walk-throughs - overnight events go unseen.",
  },
  {
    icon: ClipboardCheck,
    title: "Alerts stuck outside the project",
    body: "Standalone gadget apps do not join CurNext permissions, building context, or the site timeline.",
  },
] as const;

const sensePoints = [
  {
    icon: Waves,
    name: "Leak electrodes",
    role: "Gold-plated electrodes detect water at the risk point where it first appears.",
  },
  {
    icon: Radio,
    name: "Rope / zone",
    role: "Hybrid-cable rope or zone interfaces cover trays, skirts, and longer runs.",
  },
  {
    icon: Droplets,
    name: "Optional ambient",
    role: "Optional SHT45 temperature and humidity for context beside the leak event.",
  },
] as const;

const steps = [
  {
    title: "Install",
    body: "Place the node and run electrode or rope in risk zones - plant room, bathroom, or riser.",
  },
  {
    title: "Sense",
    body: "Gold-plated leak electrodes, rope / zone interface, and optional ambient T/RH.",
  },
  {
    title: "Uplink",
    body: "Event-driven LoRaWAN on detection, plus heartbeats as designed - into CN-FG → CN-BC → cloud.",
  },
  {
    title: "Decide",
    body: "Immediate alerts, location context, and an event log on curnext.app - web and mobile.",
  },
] as const;

const installZones = [
  {
    icon: Building2,
    name: "Plant rooms",
    role: "Skids, trays, and floors where a small release can cascade into downtime.",
  },
  {
    icon: ShowerHead,
    name: "Bathrooms",
    role: "Wet rooms and sanitary zones where leaks hide until finishes and neighbours feel it.",
  },
  {
    icon: Waves,
    name: "Risers",
    role: "Shafts and vertical paths where water travels far before anyone sees it.",
  },
] as const;

const uplinkPoints = [
  {
    icon: Radio,
    title: "Event-driven when wet",
    body: "Uplink fires on water detection so the network carries the event that matters - not endless dry chatter.",
  },
  {
    icon: BatteryCharging,
    title: "Quiet when dry",
    body: "Heartbeats as designed keep health visible; primary battery life stays long between events.",
  },
] as const;

const trustPoints = [
  {
    label: "Hybrid cable",
    detail: "Electrodes and/or rope zones.",
  },
  {
    label: "Event-driven LoRa",
    detail: "Class A, EU868 on detection.",
  },
  {
    label: "Field life",
    detail: "5-10 years typical when dry.",
  },
  {
    label: "Factory-fixed purpose",
    detail: "Leak detection - not CN-WD or CN-MEP.",
  },
] as const;

export function LeakDetectionPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/solutions/cn-leak-hero.jpg"
            alt="Water leaking from a toilet cistern onto a tiled bathroom floor"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_0%,rgba(11,61,92,0.9)_40%,rgba(11,61,92,0.5)_70%,rgba(11,61,92,0.3)_100%)]"
          />
        </div>
        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[85svh] md:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
              CN-LEAK
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight !text-white sm:text-xl">
              CurNext
            </p>
            <h1 className="text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl">
              Leak detection for plant rooms, wet zones, and risers
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Catch water where it starts - before it stops the programme.
              Event-driven alerts on the same CurNext stack as site readiness.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-leak-outcomes-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Outcomes
            </p>
            <h3
              id="cn-leak-outcomes-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Early water detection - in the project stack
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              CurNext answers one question: is water where it should not be -
              and who needs to know now?
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2 sm:gap-x-12">
            {outcomes.map((item) => (
              <li key={item.title} className="min-w-0">
                <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                  {item.title}
                </h4>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="cn-leak-challenge-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              The cost of late detection
            </p>
            <h3
              id="cn-leak-challenge-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Water waits for no walk-through
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-3 sm:gap-x-10">
            {problems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="min-w-0">
                  <div className="bg-muted/60 text-foreground mb-4 flex size-10 items-center justify-center rounded-xl border border-border/60 sm:size-11">
                    <Icon className="size-4 sm:size-5" aria-hidden />
                  </div>
                  <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                    {item.title}
                  </h4>
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
        aria-labelledby="cn-leak-what-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                CN-LEAK
              </p>
              <h3
                id="cn-leak-what-heading"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Hybrid-cable leak detection on the CurNext stack
              </h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                A Layer-1 node with gold-plated electrodes and/or rope zone
                interfaces for plant rooms, bathrooms, and risers. Event-driven
                LoRaWAN on water detection. Optional ambient context. Joins
                CN-FG → CN-BC → CN-Cloud for alerts and audit history.
              </p>
              <p className="border-border mt-6 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
                <span className="font-medium">Note:</span>{" "}
                <span className="text-muted-foreground">
                  CN-LEAK is not moisture-in-gypsum drying (CN-WD) and not a flow
                  meter (CN-MEP). It does not claim automatic valve shutoff or
                  replace a full BMS.
                </span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="/solutions/cn-leak-hero.jpg"
                alt="Active bathroom leak with water pooling on tiled floor"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-leak-sense-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              How detection works
            </p>
            <h3
              id="cn-leak-sense-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Electrodes. Rope zones. Optional ambient.
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {sensePoints.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="min-w-0">
                  <div className="bg-muted/60 text-foreground mb-4 flex size-11 items-center justify-center rounded-xl border border-border/60">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                    {item.name}
                  </h4>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                    {item.role}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="cn-leak-how-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              How it works
            </p>
            <h3
              id="cn-leak-how-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              From the risk zone to a clear alert
            </h3>
          </div>
          <ol className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="min-w-0">
                <p className="text-muted-foreground text-[11px] font-medium tracking-[0.2em] uppercase">
                  0{index + 1}
                </p>
                <h4 className="mt-2 text-base font-semibold tracking-tight sm:text-lg">
                  {step.title}
                </h4>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-[15px]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground border-border/70 mt-10 border-t pt-8 font-mono text-xs leading-relaxed tracking-tight sm:text-sm">
            CN-LEAK zone → node → LoRaWAN (event) → CN-FG → CN-BC → CN-Cloud →
            Web app
          </p>
        </div>
      </section>

      <section
        aria-labelledby="cn-leak-zones-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Install zones
            </p>
            <h3
              id="cn-leak-zones-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Plant rooms · Bathrooms · Risers
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Place electrodes or rope where water first shows - continuous
              watch between walk-throughs.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {installZones.map((zone) => {
              const Icon = zone.icon;
              return (
                <li key={zone.name} className="min-w-0">
                  <div className="bg-muted/60 text-foreground mb-4 flex size-11 items-center justify-center rounded-xl border border-border/60">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                    {zone.name}
                  </h4>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                    {zone.role}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="cn-leak-uplink-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Event-driven uplink
            </p>
            <h3
              id="cn-leak-uplink-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Speak when water appears
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Long battery life when dry. Evidence when wet - on the same path
              as the rest of the site.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-12">
            {uplinkPoints.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="min-w-0">
                  <div className="bg-muted/60 text-foreground mb-4 flex size-11 items-center justify-center rounded-xl border border-border/60">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                    {item.title}
                  </h4>
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
        aria-labelledby="cn-leak-trust-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Built for the site
            </p>
            <h3
              id="cn-leak-trust-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Industrial by design
            </h3>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-4">
            {trustPoints.map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="text-base font-semibold tracking-tight sm:text-lg">
                  {item.label}
                </dt>
                <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="cn-leak-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Related
          </p>
          <h3
            id="cn-leak-related-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            More on the CurNext stack
          </h3>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <li>
              <Link href="/solutions/mep" className="group block outline-none">
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  CN-MEP
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  MEP
                  <ArrowRight
                    className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
                <span className="text-muted-foreground mt-1 block text-sm">
                  Flow, pressure, energy - not leak rope
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/wall-drying"
                className="group block outline-none"
              >
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  CN-WD
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  Wall drying
                  <ArrowRight
                    className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
                <span className="text-muted-foreground mt-1 block text-sm">
                  Finish readiness - not water-event alerts
                </span>
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="group block outline-none">
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  L1 → L5
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  How CurNext works
                  <ArrowRight
                    className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Next step
            </p>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              See CN-LEAK on your risk zones
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Walk through a site assessment with the CurNext team - early water
              detection on the same stack as readiness.
            </p>
          </div>
          <Link
            href="/pricing#request-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 shrink-0 gap-2 px-5",
            )}
          >
            Request Quote
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
