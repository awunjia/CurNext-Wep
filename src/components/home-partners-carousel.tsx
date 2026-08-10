"use client";

import { useEffect, useState } from "react";

import { partners, type Partner } from "@/config/partners";

function shufflePartners(items: Partner[]): Partner[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
}

function PartnerTrack({
  items,
  ariaHidden = false,
}: {
  items: Partner[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex w-max shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
    >
      {items.map((partner) => (
        <li
          key={`${ariaHidden ? "dup" : "a"}-${partner.name}`}
          className="flex w-[6.75rem] shrink-0 justify-center sm:w-32"
        >
          <a
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={ariaHidden ? -1 : undefined}
            className="partner-link group relative flex h-16 w-full flex-col items-center justify-center gap-1.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-[4.5rem]"
            title={partner.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={partner.src}
              alt={ariaHidden ? "" : partner.name}
              width={144}
              height={40}
              className="partner-logo max-h-8 w-auto max-w-[85%] object-contain transition-transform duration-200 group-hover:scale-105 sm:max-h-9"
              loading="lazy"
              decoding="async"
            />
            <span className="pointer-events-none max-w-full truncate px-1 text-center text-[11px] font-medium text-foreground/0 transition-colors duration-200 group-hover:text-foreground sm:text-xs">
              {partner.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function HomePartnersCarousel() {
  const [orderedPartners, setOrderedPartners] = useState(partners);

  useEffect(() => {
    setOrderedPartners(shufflePartners(partners));
  }, []);

  return (
    <section
      aria-label="Partners"
      className="border-border/60 relative w-full overflow-hidden border-y bg-background py-8 sm:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
      />
      <div className="animate-partners-marquee flex w-max">
        <PartnerTrack items={orderedPartners} />
        <PartnerTrack items={orderedPartners} ariaHidden />
      </div>
    </section>
  );
}
