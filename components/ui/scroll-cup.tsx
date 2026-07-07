"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * ScrollCup — a takeaway cup in the corner that fills with coffee as
 * you scroll. Full cup = you read the whole thing. Click to sip back
 * to the top.
 */
export function ScrollCup() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const [pct, setPct] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    setPct(Math.round(Math.min(1, Math.max(0, v)) * 100));
  });

  // coffee rises from the cup floor (y=50) to just under the lid (y=15)
  const coffeeY = useTransform(progress, [0, 1], [50, 15]);
  const coffeeHeight = useTransform(coffeeY, (y) => 50 - y);

  const visible = pct >= 3;
  const full = pct > 90;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={
        visible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.6, y: 16 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="fixed bottom-5 right-5 z-50"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <button
        type="button"
        aria-label="Back to top"
        title={full ? "Cup's full — back to the top?" : `${pct}% brewed`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl border border-border bg-card/80 p-2 shadow-lg backdrop-blur transition-transform hover:scale-110 active:scale-90"
      >
        <svg width="40" height="52" viewBox="0 0 44 56" fill="none">
          {/* steam — only once the cup is basically full */}
          <g
            className={
              full
                ? "opacity-100 transition-opacity duration-500"
                : "opacity-0 transition-opacity duration-500"
            }
            stroke="rgb(var(--c-muted))"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path className="animate-steam" d="M16 7 C 15 5, 17 4, 16 2" />
            <path
              className="animate-steam [animation-delay:1.1s]"
              d="M22 8 C 21 6, 23 5, 22 2"
            />
            <path
              className="animate-steam [animation-delay:2s]"
              d="M28 7 C 27 5, 29 4, 28 2"
            />
          </g>

          {/* coffee, clipped to the cup interior */}
          <clipPath id="cup-interior">
            <path d="M11 15 L33 15 L30.5 50 L13.5 50 Z" />
          </clipPath>
          <motion.rect
            x="10"
            width="24"
            clipPath="url(#cup-interior)"
            fill="rgb(var(--c-accent-1))"
            style={{ y: coffeeY, height: coffeeHeight }}
          />

          {/* cup outline */}
          <path
            d="M11 15 L33 15 L30.5 48.5 Q30.3 51 27.8 51 L16.2 51 Q13.7 51 13.5 48.5 Z"
            stroke="rgb(var(--c-foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* lid */}
          <rect
            x="9"
            y="10"
            width="26"
            height="5"
            rx="2.5"
            fill="rgb(var(--c-foreground))"
          />
        </svg>

        <span className="font-mono text-[0.6rem] tabular-nums text-muted">
          {pct}%
        </span>
      </button>
    </motion.div>
  );
}
