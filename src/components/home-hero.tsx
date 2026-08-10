"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Waypoints } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative w-full">
      <div className="relative flex min-h-[100svh] w-full items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero/site-atmosphere.png"
            alt="Concrete construction site atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover motion-safe:animate-hero-pan"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#09090b_0%,rgba(9,9,11,0.88)_34%,rgba(9,9,11,0.55)_62%,rgba(9,9,11,0.4)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_15%_90%,rgba(9,9,11,0.7),transparent_58%)]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:pb-24">
          <h1 className="motion-safe:animate-hero-rise max-w-2xl text-4xl font-semibold tracking-tight !text-white motion-safe:opacity-0 [animation-delay:120ms] sm:text-5xl md:text-6xl">
            Build-ready site intelligence
          </h1>
          <p className="motion-safe:animate-hero-rise mt-4 max-w-xl text-base leading-relaxed !text-white/80 motion-safe:opacity-0 [animation-delay:220ms] sm:mt-5 sm:text-lg">
            A site intelligence platform that monitors slabs, walls, and wet
            rooms with industrial IoT sensors and provides adequate AI
            predictions for readiness.
          </p>
          <div className="motion-safe:animate-hero-rise mt-8 flex w-full flex-row flex-wrap gap-3 motion-safe:opacity-0 [animation-delay:320ms] sm:mt-10">
            <Link
              href="/pricing#request-quote"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 flex-1 gap-2 px-4 sm:flex-none sm:px-5",
              )}
            >
              <CalendarDays className="size-4" aria-hidden />
              Request Quote
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 flex-1 gap-2 border-white/25 bg-white/5 px-4 !text-white hover:bg-white/12 hover:!text-white sm:flex-none sm:px-5 dark:border-white/25 dark:bg-white/5 dark:hover:bg-white/12",
              )}
            >
              <Waypoints className="size-4" aria-hidden />
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeProductPlane() {
  const productRef = useRef<HTMLElement>(null);
  const [productVisible, setProductVisible] = useState(false);

  useEffect(() => {
    const node = productRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setProductVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={productRef}
      aria-label="CurNext product"
      className={cn(
        "relative w-full overflow-hidden bg-[#09090b] transition-all duration-1000 ease-out",
        productVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <div className="relative aspect-[16/9] w-full min-h-[42vh] md:min-h-[56vh]">
        <Image
          src="/hero/product-dashboard.png"
          alt="CurNext sensing dashboard showing site conditions and workflows"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#09090b] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#09090b] to-transparent"
        />
      </div>
    </section>
  );
}
