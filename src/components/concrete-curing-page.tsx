import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrickWall,
  ClipboardCheck,
  Gauge,
  Thermometer,
  Timer,
  Wind,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    title: "Less cure uncertainty",
    body: "Know when the slab is ready for tiling, flooring, or coating - before you finish it.",
  },
  {
    title: "Fewer site inspections",
    body: "Replace sparse spot checks with continuous evidence from the pour.",
  },
  {
    title: "Documented compliance",
    body: "Defensible readiness reports for clients, disputes, and handovers.",
  },
  {
    title: "Earlier, safer handovers",
    body: "Move flooring and coating trades when maturity says go - not when the calendar guesses.",
  },
] as const;

const problems = [
  {
    icon: Timer,
    title: "Guessing burns the schedule",
    body: "Cure times guessed wrong mean delays - or finishes that go on too early.",
  },
  {
    icon: Gauge,
    title: "One sensor is not enough",
    body: "A single point misses thermal gradients through the slab depth.",
  },
  {
    icon: ClipboardCheck,
    title: "Disputes need evidence",
    body: "Clients and insurers want documented readiness - not a handheld reading from last week.",
  },
] as const;

const steps = [
  {
    title: "Install",
    body: "Place the sealed node outside the pour. Deploy air, surface, and core probes where the slab needs them.",
  },
  {
    title: "Sense",
    body: "Measure ambient, finish interface, and core temperature together - the gradient that maturity depends on.",
  },
  {
    title: "Connect",
    body: "Industrial wireless uplink into the CurNext building stack and cloud - built for the jobsite.",
  },
  {
    title: "Decide",
    body: "See go / no-go readiness on curnext.app: alerts, compliance evidence, and clear next steps.",
  },
] as const;

const probes = [
  {
    icon: Wind,
    name: "Air",
    role: "Ambient conditions around the pour - the drying boundary.",
  },
  {
    icon: Thermometer,
    name: "Surface",
    role: "Finish and membrane interface - where coatings and flooring meet the slab.",
  },
  {
    icon: Gauge,
    name: "Core",
    role: "Thermal mass inside the slab - the maturity signal that drives readiness.",
  },
] as const;

const trustPoints = [
  {
    label: "IP68",
    detail: "Sealed for the site. Probe legs under 2 m.",
  },
  {
    label: "Stable uplink",
    detail: "LoRaWAN and PoE for a stable connection.",
  },
  {
    label: "Long field life",
    detail: "2-5 years typical",
  },
  {
    label: "Secure by design",
    detail: "Industry-grade encryption, VPN, and OTA.",
  },
] as const;

export function ConcreteCuringPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/solutions/cn-cc-hero.jpg"
            alt="CurNext CN-CC probes and readiness monitoring on a concrete slab"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_0%,rgba(11,61,92,0.88)_38%,rgba(11,61,92,0.45)_68%,rgba(11,61,92,0.25)_100%)]"
          />
        </div>
        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[85svh] md:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
              CN-CC
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight !text-white sm:text-xl">
              CurNext
            </p>
            <h1 className="text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl">
              Know when the slab is ready - before you finish it
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Concrete curing intelligence for build-ready slabs. Air, surface,
              and core sensing turned into clear go / no-go for tiling,
              flooring, and coating.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-cc-outcomes-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Outcomes
            </p>
            <h3
              id="cn-cc-outcomes-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Readiness for the next phase - not another chart
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              CurNext answers one question: is this surface ready for the next
              construction phase?
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
        aria-labelledby="cn-cc-challenge-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              The challenge
            </p>
            <h3
              id="cn-cc-challenge-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Guesswork costs schedule and margin
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
        aria-labelledby="cn-cc-what-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                CN-CC
              </p>
              <h3
                id="cn-cc-what-heading"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Slab maturity intelligence on the jobsite
              </h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                A sealed edge node sits outside the pour. Only rugged air,
                surface, and core probes enter the harsh zone. The cloud turns
                those measurements into readiness for finishes - with documented
                evidence.
              </p>
              <p className="border-border mt-6 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
                <span className="font-medium">Important:</span>{" "}
                <span className="text-muted-foreground">
                  CN-CC is not electronics embedded in concrete. Intelligence
                  stays in the serviceable node; probes are the only parts in the
                  embed environment.
                </span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="/solutions/cn-cc-hero.jpg"
                alt="CN-CC node, yellow probe harness, and readiness view on site"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-cc-how-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              How it works
            </p>
            <h3
              id="cn-cc-how-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              From the pour to a clear decision
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
        aria-labelledby="cn-cc-probes-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Probe system
            </p>
            <h3
              id="cn-cc-probes-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Three points. One readiness call.
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Air, surface, and core - so maturity reflects the slab, not a
              single lucky reading.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {probes.map((probe) => {
              const Icon = probe.icon;
              return (
                <li key={probe.name} className="min-w-0">
                  <div className="bg-muted/60 text-foreground mb-4 flex size-11 items-center justify-center rounded-xl border border-border/60">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                    {probe.name}
                  </h4>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                    {probe.role}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="cn-cc-trust-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Built for the site
            </p>
            <h3
              id="cn-cc-trust-heading"
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
        aria-labelledby="cn-cc-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Related
          </p>
          <h3
            id="cn-cc-related-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            More on the CurNext stack
          </h3>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
            <li>
              <Link href="/contact" className="group block outline-none">
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  Sales
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  Contact
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
              See CN-CC on your slabs
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Walk through a site assessment with the CurNext team - outcomes
              first, evidence you can hand to the client.
            </p>
          </div>
          <Link
            href="/pricing#request-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 shrink-0 gap-2 px-5",
            )}
          >
            <BrickWall className="size-4" aria-hidden />
            Request Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
