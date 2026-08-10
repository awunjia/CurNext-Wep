import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrickWall,
  ClipboardCheck,
  Droplets,
  Layers,
  ShowerHead,
  Timer,
  Wind,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    title: "Finish when walls are ready",
    body: "Schedule coating, tiling, and handover when drying says go - not after another pin-meter round.",
  },
  {
    title: "Fewer moisture callbacks",
    body: "Catch damp gypsum, wet rooms, and tile backing before finishes trap the problem.",
  },
  {
    title: "Evidence you can share",
    body: "Documented drying history for clients, insurers, and dispute trails - not clipboard spot checks.",
  },
  {
    title: "One platform with the rest of the site",
    body: "Same CurNext stack as concrete curing and other L1 lines - one readiness view across surfaces.",
  },
] as const;

const problems = [
  {
    icon: Droplets,
    title: "Premature finishes fail",
    body: "Tiling or coating on damp walls causes bond loss, blistering, and costly claims.",
  },
  {
    icon: Timer,
    title: "Spot checks miss the night",
    body: "Overnight rewetting and cold corners do not show up in a single afternoon reading.",
  },
  {
    icon: ClipboardCheck,
    title: "No shared proof",
    body: "Wet rooms and gypsum dry at different rates - without shared evidence, finishes stay a guess.",
  },
] as const;

const steps = [
  {
    title: "Install",
    body: "Mount the sealed node and place distributed probes in wall cavity, wet room, or tile-backing zones.",
  },
  {
    title: "Sense",
    body: "Track air and surface climate plus a material moisture proxy - continuous drying progress, not a one-off pin check.",
  },
  {
    title: "Connect",
    body: "Industrial wireless uplink into the CurNext building stack and cloud - built for the jobsite.",
  },
  {
    title: "Decide",
    body: "Finish-ready signals, alerts, and a compliance trail on curnext.app - for web and mobile.",
  },
] as const;

const installZones = [
  {
    icon: Layers,
    name: "Gypsum",
    role: "Board and lining that must be dry before paint, wallpaper, or next-layer work.",
  },
  {
    icon: ShowerHead,
    name: "Wet rooms",
    role: "Bathrooms and wet zones where moisture linger delays waterproofing and finishes.",
  },
  {
    icon: BrickWall,
    name: "Tile backing",
    role: "Substrates behind tile - dry enough so adhesives and membranes hold for the long haul.",
  },
] as const;

const trustPoints = [
  {
    label: "Industrial sealed node",
    detail: "IP68 philosophy for site conditions.",
  },
  {
    label: "Stable uplink",
    detail: "LoRaWAN EU868 into the CurNext stack.",
  },
  {
    label: "Long field life",
    detail: "5-10 years typical reporting cadence.",
  },
  {
    label: "Factory-fixed purpose",
    detail: "Wall drying - not a field reflash of CN-CC.",
  },
] as const;

export function WallDryingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/solutions/cn-wd-hero.jpg"
            alt="Finishing trades tiling a prepared wall surface"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_0%,rgba(11,61,92,0.88)_38%,rgba(11,61,92,0.45)_68%,rgba(11,61,92,0.28)_100%)]"
          />
        </div>
        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[85svh] md:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
              CN-WD
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight !text-white sm:text-xl">
              CurNext
            </p>
            <h1 className="text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl">
              Know when walls and wet rooms are dry enough to finish
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Wall drying intelligence for finish-ready surfaces. Gypsum, wet
              rooms, and tile backing - with evidence, not endless pin-meter
              rounds.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-wd-outcomes-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Outcomes
            </p>
            <h3
              id="cn-wd-outcomes-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Finish readiness - not another clipboard check
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
        aria-labelledby="cn-wd-challenge-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              The challenge
            </p>
            <h3
              id="cn-wd-challenge-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Damp walls hide until finishes fail
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
        aria-labelledby="cn-wd-what-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                CN-WD
              </p>
              <h3
                id="cn-wd-what-heading"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Wall and wet-room drying on the CurNext stack
              </h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                A sealed battery LoRaWAN node with distributed probes tracks
                drying in gypsum, tile backing, and wet rooms. CN-Cloud turns
                that into finish readiness - when coating, tiling, or handover
                can proceed - with evidence, not guesswork.
              </p>
              <p className="border-border mt-6 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
                <span className="font-medium">Note:</span>{" "}
                <span className="text-muted-foreground">
                  CN-WD is wall drying - not concrete slab curing (CN-CC) and not
                  indoor air quality (CN-IAQ). Factory-fixed purpose on the same
                  engineering platform family.
                </span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="/solutions/cn-wd-hero.jpg"
                alt="Tile finish applied to a prepared wall - finish-ready surfaces"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cn-wd-how-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              How it works
            </p>
            <h3
              id="cn-wd-how-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              From the wall to a clear decision
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
        aria-labelledby="cn-wd-zones-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Where it installs
            </p>
            <h3
              id="cn-wd-zones-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Gypsum · Wet rooms · Tile backing
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Distributed probes where finishes depend on dryness - continuous
              progress, not a lucky afternoon reading.
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
        aria-labelledby="cn-wd-trust-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Built for the site
            </p>
            <h3
              id="cn-wd-trust-heading"
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
        aria-labelledby="cn-wd-related-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Related
          </p>
          <h3
            id="cn-wd-related-heading"
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
                href="/solutions/indoor-air"
                className="group block outline-none"
              >
                <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                  CN-IAQ
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-medium tracking-tight">
                  Indoor air
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
              See CN-WD on your finishes
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Walk through a site assessment with the CurNext team - dry enough
              to finish, with evidence you can hand to the client.
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
