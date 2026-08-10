import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cable,
  CircuitBoard,
  ClipboardCheck,
  Gauge,
  PlugZap,
  Timer,
  Waves,
  Zap,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    title: "Plant signals next to the slab",
    body: "Flow, pressure, and energy land in the same CurNext project view as surface readiness - not a separate vendor silo.",
  },
  {
    title: "Rates LoRa cannot carry",
    body: "Ethernet uplink for plant-room sample rates where battery wireless is not enough.",
  },
  {
    title: "Power when you need visibility",
    body: "PoE from CN-UPS keeps the panel up with mains plus backup - outages no longer kill the picture.",
  },
  {
    title: "One security and installer model",
    body: "Same permissions, alerts, and site discipline as the rest of the CurNext stack.",
  },
] as const;

const problems = [
  {
    icon: Timer,
    title: "MEP runs lack a unified view",
    body: "Temporary and permanent plant sit outside the cloud that already watches slabs and wet rooms.",
  },
  {
    icon: ClipboardCheck,
    title: "Vendor silos split the story",
    body: "Flow, pressure, and energy live in separate tools - hard to see next to schedule risk.",
  },
  {
    icon: Zap,
    title: "Outages kill visibility",
    body: "Exactly when plant behaves oddly, battery-less panels without UPS go dark.",
  },
] as const;

const measures = [
  {
    icon: Waves,
    name: "Flow",
    role: "Plant-room and circuit flow where rate matters for commissioning and ops.",
  },
  {
    icon: Gauge,
    name: "Pressure",
    role: "Transmitters on critical loops - evidence when conditions drift.",
  },
  {
    icon: Zap,
    name: "Energy",
    role: "Panel-level energy metering for plant loads on the same project trail.",
  },
] as const;

const steps = [
  {
    title: "Install",
    body: "Wire the panel in the plant room or MEP location and connect flow, pressure, and energy interfaces.",
  },
  {
    title: "Power",
    body: "PoE from CN-UPS - mains with UPS resilience, not a primary battery like other L1 lines.",
  },
  {
    title: "Uplink",
    body: "Ethernet to CN-FG / CN-BC, then into CN-Cloud - higher sample rates than LoRaWAN battery nodes.",
  },
  {
    title: "Decide",
    body: "Trends, alerts, and flow / energy context on curnext.app - beside the rest of the site.",
  },
] as const;

const differentiators = [
  {
    icon: PlugZap,
    title: "PoE via CN-UPS",
    body: "Powered from the CurNext UPS layer - mains plus backup so plant visibility survives short outages.",
  },
  {
    icon: Cable,
    title: "Ethernet, not battery LoRa",
    body: "Wired uplink for plant signals that need higher rates than LoRaWAN L1 nodes.",
  },
] as const;

const trustPoints = [
  {
    label: "Wired panel",
    detail: "Plant-room / panel topology.",
  },
  {
    label: "PoE + CN-UPS",
    detail: "Mains with UPS resilience.",
  },
  {
    label: "Ethernet uplink",
    detail: "Higher sample rate than LoRa L1.",
  },
  {
    label: "Factory-fixed purpose",
    detail: "MEP - not leak rope or IAQ.",
  },
] as const;

export function MepPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/solutions/cn-mep-hero.jpg"
            alt="Exposed industrial ceiling with HVAC ducts, piping, and plant systems"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_0%,rgba(11,61,92,0.9)_42%,rgba(11,61,92,0.52)_72%,rgba(11,61,92,0.32)_100%)]"
          />
        </div>
        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[85svh] md:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
              CN-MEP
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight !text-white sm:text-xl">
              CurNext
            </p>
            <h1 className="text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl">
              Plant-room intelligence on the CurNext stack
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Flow, pressure, and energy - on the same stack as the slab. PoE
              from CN-UPS, Ethernet uplink, cloud evidence next to surface
              readiness.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-mep-outcomes-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Why MEP on CurNext
            </p>
            <h3
              id="cn-mep-outcomes-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Plant signals in the same project view
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Construction cloud that sees plant-room telemetry beside curing,
              drying, and the rest of the site - not another isolated BMS island.
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
        aria-labelledby="cn-mep-challenge-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              The challenge
            </p>
            <h3
              id="cn-mep-challenge-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Plant rooms stay invisible to the site cloud
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
        aria-labelledby="cn-mep-what-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                CN-MEP
              </p>
              <h3
                id="cn-mep-what-heading"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                A wired MEP panel on the CurNext stack
              </h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                CN-MEP is a Layer-1 wired panel for flow, pressure, and energy in
                plant-room and panel installs. Powered by PoE from CN-UPS.
                Ethernet uplink to CN-FG / CN-BC for rates that battery LoRaWAN
                nodes are not built for. Data lands in CN-Cloud with the rest of
                the site.
              </p>
              <p className="border-border mt-6 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
                <span className="font-medium">Note:</span>{" "}
                <span className="text-muted-foreground">
                  CN-MEP is not a leak rope (CN-LEAK), not a battery IAQ pod
                  (CN-IAQ), and not a full BMS replacement. Factory-fixed purpose
                  - PoE and Ethernet by design.
                </span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="/solutions/cn-mep-hero.jpg"
                alt="Plant-room MEP ceiling with ducts, insulated pipes, and HVAC units"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-mep-measures-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              What we measure
            </p>
            <h3
              id="cn-mep-measures-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Flow · Pressure · Energy
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {measures.map((item) => {
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
        aria-labelledby="cn-mep-diff-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              PoE + Ethernet
            </p>
            <h3
              id="cn-mep-diff-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Built differently from battery L1
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              CN-MEP is the wired, PoE path for plant signals - while CN-CC,
              CN-WD, and CN-IAQ stay on LoRaWAN where that fits.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-12">
            {differentiators.map((item) => {
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
        aria-labelledby="cn-mep-how-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              How it works
            </p>
            <h3
              id="cn-mep-how-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              From the panel to a clear decision
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
        </div>
      </section>

      <section
        aria-labelledby="cn-mep-trust-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Built for the plant room
            </p>
            <h3
              id="cn-mep-trust-heading"
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
        aria-labelledby="cn-mep-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Related
          </p>
          <h3
            id="cn-mep-related-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            More on the CurNext stack
          </h3>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <li>
              <Link
                href="/solutions/leak-detection"
                className="group block outline-none"
              >
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  CN-LEAK
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  Leak detection
                  <ArrowRight
                    className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/concrete-curing"
                className="group block outline-none"
              >
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  CN-CC
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  Concrete curing
                  <ArrowRight
                    className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="group block outline-none">
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  Catalog
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  All solutions
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
              See CN-MEP on your plant rooms
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Walk through a site assessment with the CurNext team - flow,
              pressure, and energy on the same stack as the slab.
            </p>
          </div>
          <Link
            href="/pricing#request-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 shrink-0 gap-2 px-5",
            )}
          >
            <CircuitBoard className="size-4" aria-hidden />
            Request Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
