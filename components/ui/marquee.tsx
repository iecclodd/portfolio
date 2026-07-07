"use client";

import { Bean } from "lucide-react";

const ITEMS = [
  "AI",
  "AUTOMATION",
  "SYSTEMS",
  "FPV DRONES",
  "CAD + PROTOTYPING",
  "FABRICATION",
  "RESEARCH",
  "LEADERSHIP",
  "$100K+ RAISED",
  "RICHMOND, TX",
  "POWERED BY CAFFEINE",
];

/**
 * Marquee — a slightly tilted, endlessly scrolling ticker of what
 * Azaan does. Pauses on hover so you can actually read it.
 */
export function Marquee() {
  const row = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center gap-6 pr-6"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex shrink-0 items-center gap-6 whitespace-nowrap"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-foreground">
            {item}
          </span>
          <Bean className="h-3 w-3 shrink-0 text-accent-green" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative -my-2 py-6" aria-label="Highlights ticker">
      <div className="marquee w-[105vw] -translate-x-[2.5vw] -rotate-1 overflow-hidden border-y border-border bg-card/80 py-3">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
