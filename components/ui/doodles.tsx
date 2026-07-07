"use client";

import { cn } from "@/lib/utils";

type Kind = "sparkle" | "bean" | "swirl" | "squiggle" | "ring" | "burst";

const INK = "rgb(var(--c-foreground) / 0.65)";

/**
 * Doodle — flat, hand-drawn cel accents (sparkles, beans, steam curls,
 * squiggles, coffee-ring stains, comic bursts) to scatter around the
 * page. Purely decorative; position with className.
 */
export function Doodle({
  kind,
  className,
}: {
  kind: Kind;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
    >
      {art[kind]}
    </span>
  );
}

const art: Record<Kind, JSX.Element> = {
  sparkle: (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M16 2 Q17.5 12.5 30 16 Q17.5 19.5 16 30 Q14.5 19.5 2 16 Q14.5 12.5 16 2 Z"
        fill="rgb(var(--c-accent-3) / 0.85)"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bean: (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <ellipse
        cx="16"
        cy="16"
        rx="9"
        ry="12.5"
        fill="rgb(var(--c-accent-1) / 0.85)"
        stroke={INK}
        strokeWidth="1.8"
      />
      <path
        d="M16 4.5 C 11 10, 21 22, 16 27.5"
        fill="none"
        stroke="rgb(var(--c-card))"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  swirl: (
    <svg viewBox="0 0 32 40" className="h-full w-full">
      <path
        d="M16 38 C 8 32, 24 26, 16 19 C 8 12, 24 8, 16 2"
        fill="none"
        stroke={INK}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  squiggle: (
    <svg viewBox="0 0 64 14" className="h-full w-full">
      <path
        d="M2 10 Q9 2 16 8 T30 8 T44 8 T58 8"
        fill="none"
        stroke="rgb(var(--c-accent-2))"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  ring: (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M32 6 A26 26 0 1 1 10 18"
        fill="none"
        stroke="rgb(var(--c-accent-1) / 0.35)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M32 15 A17 17 0 1 0 47 24"
        fill="none"
        stroke="rgb(var(--c-accent-1) / 0.25)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  burst: (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <g stroke={INK} strokeWidth="2.6" strokeLinecap="round">
        <path d="M20 2 L20 10" />
        <path d="M33 7 L28 13" />
        <path d="M38 20 L30 20" />
        <path d="M7 7 L12 13" />
        <path d="M2 20 L10 20" />
      </g>
    </svg>
  ),
};
