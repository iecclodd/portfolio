"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

const QUIPS = [
  "Careful — I'm hot.",
  "Azaan runs on me. Literally.",
  "Psst… type B-R-E-W anywhere.",
  "Stop poking. I'll spill.",
  "Scroll down, there's a fidget bar.",
  "I'm 90% espresso, 10% deadlines.",
  "Best served with a résumé download.",
];
const GRUMPY_QUIP = "OK. That's enough caffeine for you.";

const INK = "rgb(var(--c-foreground) / 0.85)";

/**
 * Mascot — a chibi to-go cup that hangs out in the hero. Its big eyes
 * follow your cursor, it blinks, waves a stubby arm, and pops a heart
 * (plus a quip) when poked. Pure SVG, cel-shaded.
 */
export function Mascot({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [blink, setBlink] = useState(false);
  const [poked, setPoked] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);
  const pokes = useRef(0);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  // pupils track the cursor (springy, no re-renders)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pupilX = useSpring(rawX, { stiffness: 300, damping: 22 });
  const pupilY = useSpring(rawY, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.5);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist / 40, 3); // clamp inside the eye
      rawX.set((dx / dist) * reach);
      rawY.set((dy / dist) * reach);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  // random blinking
  useEffect(() => {
    let alive = true;
    const pendingTimeouts = timeouts.current;
    const loop = () => {
      if (!alive) return;
      timeouts.current.push(
        setTimeout(() => {
          setBlink(true);
          timeouts.current.push(
            setTimeout(() => {
              setBlink(false);
              loop();
            }, 130)
          );
        }, 2400 + Math.random() * 3200)
      );
    };
    loop();
    return () => {
      alive = false;
      pendingTimeouts.forEach(clearTimeout);
    };
  }, []);

  const poke = () => {
    pokes.current += 1;
    setPoked(true);
    setQuip(
      pokes.current > 6
        ? GRUMPY_QUIP
        : QUIPS[Math.floor(Math.random() * QUIPS.length)]
    );
    timeouts.current.push(setTimeout(() => setPoked(false), 550));
    timeouts.current.push(setTimeout(() => setQuip(null), 2800));
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={poke}
      aria-label="Poke the coffee cup mascot"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "relative block w-20 cursor-pointer select-none outline-none",
        className
      )}
    >
      {/* speech bubble */}
      <AnimatePresence>
        {quip && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-[13rem] -translate-x-1/2 rounded-2xl border-2 border-foreground/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-[3px_3px_0_rgb(var(--c-foreground)/0.25)]"
          >
            {quip}
            <span className="absolute -bottom-[6px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-foreground/60 bg-card" />
          </motion.span>
        )}
      </AnimatePresence>

      {/* heart pop on poke */}
      <AnimatePresence>
        {poked && (
          <motion.svg
            key={pokes.current}
            viewBox="0 0 20 20"
            className="absolute -top-4 left-1/2 z-10 h-5 w-5"
            initial={{ opacity: 0, y: 6, scale: 0.4, x: "-50%" }}
            animate={{ opacity: 1, y: -8, scale: 1.1, x: "-50%" }}
            exit={{ opacity: 0, y: -16, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.5 }}
          >
            <path
              d="M10 17 C 4 12, 1.5 8.5, 3.5 5.5 C 5.5 2.7, 9 3.5, 10 6 C 11 3.5, 14.5 2.7, 16.5 5.5 C 18.5 8.5, 16 12, 10 17 Z"
              fill="rgb(var(--c-accent-4))"
              stroke={INK}
              strokeWidth="1.4"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <motion.svg
        viewBox="0 0 100 120"
        className="w-full"
        animate={
          poked
            ? { scaleY: 0.84, scaleX: 1.12, rotate: [-2, 2, 0] }
            : { scaleY: 1, scaleX: 1, rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
        style={{ originY: 1 }}
      >
        {/* steam curls */}
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.5">
          <motion.path
            d="M40 15 C 37 11, 42 8, 40 3"
            animate={{ opacity: [0, 0.7, 0], y: [2, -4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M58 13 C 55 9, 60 6, 58 1"
            animate={{ opacity: [0, 0.55, 0], y: [2, -5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
        </g>

        {/* lid — rounded dome + rim */}
        <path
          d="M32 22 Q32 13 50 13 Q68 13 68 22 Z"
          fill="rgb(var(--c-accent-1))"
          stroke={INK}
          strokeWidth="2.6"
        />
        <rect
          x="26"
          y="21"
          width="48"
          height="9"
          rx="4.5"
          fill="rgb(var(--c-accent-1))"
          stroke={INK}
          strokeWidth="2.6"
        />

        {/* stubby arms */}
        <path
          d="M30 76 Q20 80 22 89"
          fill="none"
          stroke={INK}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <motion.path
          d="M70 74 Q80 68 79 58"
          fill="none"
          stroke={INK}
          strokeWidth="5.5"
          strokeLinecap="round"
          animate={{ rotate: [0, 16, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "70px", originY: "74px" }}
        />

        {/* squat cup body */}
        <path
          d="M29 30 L71 30 L68.5 100 Q68.2 107 60 107 L40 107 Q31.8 107 31.5 100 Z"
          fill="rgb(var(--c-card))"
          stroke={INK}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* sleeve with a heart stamp */}
        <path
          d="M30.3 55 L69.7 55 L68.3 84 L31.7 84 Z"
          fill="rgb(var(--c-accent-3) / 0.3)"
          stroke={INK}
          strokeWidth="2.2"
        />
        <path
          d="M50 79.5 C 46.5 76.5, 45 74.5, 46.2 72.7 C 47.4 71, 49.4 71.5, 50 73 C 50.6 71.5, 52.6 71, 53.8 72.7 C 55 74.5, 53.5 76.5, 50 79.5 Z"
          fill="rgb(var(--c-accent-4) / 0.75)"
        />

        {/* face */}
        <g>
          {/* big sparkly eyes */}
          <circle cx="41" cy="66" r="8" fill="white" stroke={INK} strokeWidth="2" />
          <circle cx="59" cy="66" r="8" fill="white" stroke={INK} strokeWidth="2" />
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <circle cx="41" cy="66" r={poked ? 2.2 : 3.6} fill="rgb(var(--c-foreground))" />
            <circle cx="59" cy="66" r={poked ? 2.2 : 3.6} fill="rgb(var(--c-foreground))" />
            <circle cx="42.4" cy="64.6" r="1.3" fill="white" />
            <circle cx="60.4" cy="64.6" r="1.3" fill="white" />
          </motion.g>
          {/* eyelids */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: blink ? 1 : 0 }}
            transition={{ duration: 0.06 }}
          >
            <circle cx="41" cy="66" r="9.6" fill="rgb(var(--c-card))" />
            <circle cx="59" cy="66" r="9.6" fill="rgb(var(--c-card))" />
            <path d="M34 66 Q41 71.5 48 66" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M52 66 Q59 71.5 66 66" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </motion.g>
          {/* rosy cheeks */}
          <ellipse cx="31.5" cy="73.5" rx="4" ry="2.6" fill="rgb(var(--c-accent-4) / 0.4)" />
          <ellipse cx="68.5" cy="73.5" rx="4" ry="2.6" fill="rgb(var(--c-accent-4) / 0.4)" />
          {/* mouth: happy "ω" normally, "o" when poked */}
          {poked ? (
            <ellipse cx="50" cy="78" rx="3" ry="3.6" fill="rgb(var(--c-foreground))" />
          ) : (
            <path
              d="M44.5 75.5 Q47.2 79 50 76.5 Q52.8 79 55.5 75.5"
              stroke={INK}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>
      </motion.svg>
    </motion.button>
  );
}
