import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ClipboardCheck,
  Gauge,
  MoveVertical,
  Radio,
  Timer,
  Waves,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    title: "Continuous watch on critical points",
    body: "Cores, transfers, and temporary-works interfaces get ongoing visibility - not a one-off survey photo.",
  },
  {
    title: "Threshold events with a timestamp",
    body: "Burst when limits trip, plus heartbeats for fleet health - so overnight movement is not silent.",
  },
  {
    title: "Evidence in the project record",
    body: "Trends and alerts land in CurNext cloud alongside curing, leak, and IAQ - one stack, one trail.",
  },
  {
    title: "Built for engineering buyers",
    body: "Site-integrated monitoring with a conservative voice - complements judgment, does not replace consultancy.",
  },
] as const;

const problems = [
  {
    icon: Timer,
    title: "Infrequent checks, thin logs",
    body: "Crack and tilt rounds are sparse and poorly recorded when something later becomes a claim.",
  },
  {
    icon: Activity,
    title: "Critical elements go unwatched",
    body: "Cores, transfers, and temporary interfaces lack continuous attention between site visits.",
  },
  {
    icon: ClipboardCheck,
    title: "Loggers sit outside the stack",
    body: "Standalone devices do not share the same secure path as curing, leak, and IAQ on site.",
  },
] as const;

const measures = [
  {
    icon: Gauge,
    name: "Strain",
    role: "Load paths and member response where design needs ongoing watch.",
  },
  {
    icon: MoveVertical,
    name: "Crack width",
    role: "Opening trends on critical joints and interfaces over the project life.",
  },
  {
    icon: Activity,
    name: "Tilt",
    role: "Rotation and settlement cues on cantilevers, cores, and temporary works.",
  },
  {
    icon: Waves,
    name: "Vibration",
    role: "Dynamic events that static spot checks miss between visits.",
  },
] as const;

const steps = [
  {
    title: "Install",
    body: "Mount the node and connect the hybrid sensor cable to gauges, crack / LVDT, or tilt-vibration packs per design.",
  },
  {
    title: "Sense",
    body: "Strain, crack width, tilt, and vibration on one L1 family - continuous enough for site decisions.",
  },
  {
    title: "Connect",
    body: "LoRaWAN uplink with threshold-triggered bursts and scheduled heartbeats into the CurNext building path.",
  },
  {
    title: "Decide",
    body: "Trends, threshold alerts, and evidence on curnext.app - for construction through early operations.",
  },
] as const;

const uplinkModel = [
  {
    icon: Radio,
    title: "Burst on threshold",
    body: "When limits trip, the node sends promptly so overnight events are not lost.",
  },
  {
    icon: Timer,
    title: "Scheduled heartbeats",
    body: "Regular fleet health checks keep the network trustworthy between events.",
  },
] as const;

const trustPoints = [
  {
    label: "Hybrid cable topology",
    detail: "Gauges and packs wired to one L1 node.",
  },
  {
    label: "Stable uplink",
    detail: "LoRaWAN EU868 into CurNext.",
  },
  {
    label: "Field life",
    detail: "5-8 years typical, configurable sampling.",
  },
  {
    label: "Factory-fixed purpose",
    detail: "Structural health - not a field reflash.",
  },
] as const;

export function StructuralHealthPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/solutions/cn-shm-hero.jpg"
            alt="Modern structure with cantilever and columns - critical elements for structural monitoring"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_0%,rgba(11,61,92,0.9)_42%,rgba(11,61,92,0.5)_72%,rgba(11,61,92,0.3)_100%)]"
          />
        </div>
        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[85svh] md:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
              CN-SHM
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight !text-white sm:text-xl">
              CurNext
            </p>
            <h1 className="text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl">
              Strain, crack, tilt, and vibration - on the CurNext stack
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Structural movement you can trend - before it becomes a claim.
              Site-integrated monitoring with alerts and evidence in the cloud.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-shm-outcomes-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Why SHM on site
            </p>
            <h3
              id="cn-shm-outcomes-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Structural confidence from construction through operations
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Continuous watch on the points that matter - integrated into the
              same CurNext building stack as the rest of the site.
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
        aria-labelledby="cn-shm-challenge-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              The challenge
            </p>
            <h3
              id="cn-shm-challenge-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Movement does not wait for the next site walk
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
        aria-labelledby="cn-shm-what-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                CN-SHM
              </p>
              <h3
                id="cn-shm-what-heading"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Hybrid-cable structural health on the CurNext stack
              </h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                CN-SHM is a Layer-1 hybrid-cable node for strain, crack width,
                tilt, and vibration. Battery LoRaWAN with threshold-triggered
                bursts and scheduled heartbeats. Data joins the CurNext building
                path for trends, alerts, and project documentation.
              </p>
              <p className="border-border mt-6 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
                <span className="font-medium">Disclaimer:</span>{" "}
                <span className="text-muted-foreground">
                  CN-SHM complements engineering judgment. It is site-integrated
                  monitoring within CurNext - not a replacement for structural
                  consultancy or a certified laboratory SHM system, and not an
                  earthquake early-warning product.
                </span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="/solutions/cn-shm-hero.jpg"
                alt="Cantilevered structure with slender columns - critical structural elements"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-shm-measures-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              What we measure
            </p>
            <h3
              id="cn-shm-measures-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Strain · Crack · Tilt · Vibration
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-4 sm:gap-8">
            {measures.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="min-w-0">
                  <div className="bg-muted/60 text-foreground mb-3 flex size-10 items-center justify-center rounded-xl border border-border/60">
                    <Icon className="size-4" aria-hidden />
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
        aria-labelledby="cn-shm-how-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              How it works
            </p>
            <h3
              id="cn-shm-how-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              From the member to a clear decision
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
        aria-labelledby="cn-shm-uplink-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Burst + heartbeat
            </p>
            <h3
              id="cn-shm-uplink-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Events when it matters. Heartbeats when it does not.
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-12">
            {uplinkModel.map((item) => {
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
        aria-labelledby="cn-shm-trust-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Built for the site
            </p>
            <h3
              id="cn-shm-trust-heading"
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
        aria-labelledby="cn-shm-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Related
          </p>
          <h3
            id="cn-shm-related-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            More on the CurNext stack
          </h3>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
              See CN-SHM on your critical points
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Walk through a site assessment with the CurNext team -
              conservative structural monitoring on the same stack as the rest of
              the site.
            </p>
          </div>
          <Link
            href="/pricing#request-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 shrink-0 gap-2 px-5",
            )}
          >
            <Activity className="size-4" aria-hidden />
            Request Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
