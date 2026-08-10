import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  CloudFog,
  Droplets,
  LayoutGrid,
  Timer,
  Wind,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    title: "IAQ you can prove at handover",
    body: "Defensible air-quality evidence for owners and facilities - not a vague claim that the space feels fine.",
  },
  {
    title: "Catch issues while they still move",
    body: "Temporary heaters, curing, and finishing can spike CO₂ and VOC. See it early, not after occupancy complaints.",
  },
  {
    title: "Continuous, not clipboard rounds",
    body: "Trends and alerts on curnext.app so teams stop relying on one-off handheld readings.",
  },
  {
    title: "Same stack as the rest of the site",
    body: "Industrial LoRaWAN into the CurNext building path - not a consumer gadget outside your secure stack.",
  },
] as const;

const problems = [
  {
    icon: ClipboardCheck,
    title: "Handover disputes lack data",
    body: "Stuffiness and poor indoor air become he-said claims without a shared evidence trail.",
  },
  {
    icon: Timer,
    title: "Build phases spike unnoticed",
    body: "Heaters, curing, and finishing can push VOC and CO₂ without anyone catching the event.",
  },
  {
    icon: CloudFog,
    title: "Gadgets stay off the site stack",
    body: "Consumer IAQ toys do not join your building uplink, BIM zones, or project timeline.",
  },
] as const;

const measures = [
  {
    name: "CO₂",
    role: "Ventilation and occupancy load in rooms you are ready to hand over.",
  },
  {
    name: "PM2.5",
    role: "Fine particles from work, traffic, and unfinished spaces.",
  },
  {
    name: "VOC",
    role: "Volatile compounds from finishes, adhesives, and temporary works.",
  },
  {
    name: "T / RH",
    role: "Climate context that shapes comfort and how air events read.",
  },
] as const;

const steps = [
  {
    title: "Install",
    body: "Ceiling or wall mount the integrated pod in the rooms that matter for handover and early occupancy.",
  },
  {
    title: "Sense",
    body: "One industrial pod: CO₂, PM2.5, VOC, and temperature / humidity - continuous room air evidence.",
  },
  {
    title: "Connect",
    body: "LoRaWAN uplink into the CurNext floor and building path, then CN-Cloud - same stack as other L1 lines.",
  },
  {
    title: "Decide",
    body: "Thresholds, trends, and reports on curnext.app - for build phases and post-handover monitoring.",
  },
] as const;

const placements = [
  {
    icon: LayoutGrid,
    name: "During build",
    role: "Watch rooms where finishing and temporary plant change the air before handover.",
  },
  {
    icon: Wind,
    name: "At handover",
    role: "Share a clear evidence trail that the space is fit to occupy from an air-quality angle.",
  },
  {
    icon: Droplets,
    name: "Post-handover",
    role: "Keep monitoring in early occupancy when complaints usually start - still on the same stack.",
  },
] as const;

const trustPoints = [
  {
    label: "Integrated pod",
    detail: "Sensors in one ceiling / wall unit.",
  },
  {
    label: "Stable uplink",
    detail: "LoRaWAN EU868 into CurNext.",
  },
  {
    label: "Field life",
    detail: "3-7 years typical, configurable interval.",
  },
  {
    label: "Factory-fixed purpose",
    detail: "IAQ - not CN-WD or CN-CC.",
  },
] as const;

export function IndoorAirPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/solutions/cn-iaq-hero.jpg"
            alt="Bright finished interior space representing post-handover indoor air monitoring"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_45%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_0%,rgba(11,61,92,0.88)_40%,rgba(11,61,92,0.48)_70%,rgba(11,61,92,0.28)_100%)]"
          />
        </div>
        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[85svh] md:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
              CN-IAQ
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight !text-white sm:text-xl">
              CurNext
            </p>
            <h1 className="text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl">
              Indoor air intelligence for build and handover
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Indoor air you can prove - CO₂, particles, VOC, and climate during
              build and after handover, on the same CurNext stack as the rest of
              the site.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-iaq-outcomes-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Why IAQ on a construction platform
            </p>
            <h3
              id="cn-iaq-outcomes-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Is this space fit to occupy?
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Same core CurNext question - framed for air: evidence that rooms
              are ready to hand over and live in.
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
        aria-labelledby="cn-iaq-challenge-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              The challenge
            </p>
            <h3
              id="cn-iaq-challenge-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Air problems show up after the keys are handed over
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
        aria-labelledby="cn-iaq-what-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                CN-IAQ
              </p>
              <h3
                id="cn-iaq-what-heading"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                An industrial indoor air pod on the CurNext stack
              </h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                CN-IAQ is a Layer-1 integrated pod for indoor air quality: CO₂,
                PM2.5, VOC, and T/RH. Battery LoRaWAN for ceiling or wall mount.
                Trends, alerts, and handover documentation in CN-Cloud -
                especially useful post-handover and in occupied project phases.
              </p>
              <p className="border-border mt-6 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
                <span className="font-medium">Note:</span>{" "}
                <span className="text-muted-foreground">
                  CN-IAQ is indoor air - not wall moisture drying (CN-WD) and not
                  slab maturity (CN-CC). Factory-fixed purpose.
                </span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="/solutions/cn-iaq-hero.jpg"
                alt="Finished interior representing post-handover indoor air monitoring"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-iaq-measures-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              What&apos;s measured
            </p>
            <h3
              id="cn-iaq-measures-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              CO₂ · PM · VOC · Climate
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              One pod. The signals that matter for build and handover - without
              medical or clinical claims.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-4 sm:gap-8">
            {measures.map((item) => (
              <li key={item.name} className="min-w-0">
                <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                  {item.name}
                </h4>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="cn-iaq-how-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              How it works
            </p>
            <h3
              id="cn-iaq-how-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              From the room to a clear decision
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
        aria-labelledby="cn-iaq-placements-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Where it installs
            </p>
            <h3
              id="cn-iaq-placements-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Build · Handover · Occupancy
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {placements.map((item) => {
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
        aria-labelledby="cn-iaq-trust-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Built for the site
            </p>
            <h3
              id="cn-iaq-trust-heading"
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
        aria-labelledby="cn-iaq-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Related
          </p>
          <h3
            id="cn-iaq-related-heading"
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
              See CN-IAQ on your spaces
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Walk through a site assessment with the CurNext team - indoor air
              evidence for build and handover.
            </p>
          </div>
          <Link
            href="/pricing#request-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 shrink-0 gap-2 px-5",
            )}
          >
            <Wind className="size-4" aria-hidden />
            Request Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
