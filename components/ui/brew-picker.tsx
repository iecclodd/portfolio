"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Leaf, Cherry } from "lucide-react";
import { cn } from "@/lib/utils";

type Brew = "espresso" | "matcha" | "strawberry";

const brews: {
  id: Brew;
  label: string;
  icon: typeof Coffee;
  /* the liquid color used for the pour animation */
  pour: string;
}[] = [
  { id: "espresso", label: "Espresso", icon: Coffee, pour: "#6F4E37" },
  { id: "matcha", label: "Matcha latte", icon: Leaf, pour: "#7C9A3C" },
  { id: "strawberry", label: "Strawberry milk", icon: Cherry, pour: "#D26A82" },
];

/**
 * BrewPicker — "order a drink" theme switcher. Picking a brew pours a
 * wave of that drink down the screen and re-steeps the whole palette
 * (via [data-brew] on <html>). Persists to localStorage.
 */
export function BrewPicker({ className }: { className?: string }) {
  const [brew, setBrew] = useState<Brew>("espresso");
  const [pouring, setPouring] = useState<Brew | null>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  // sync with whatever the boot script restored
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-brew");
    if (attr === "matcha" || attr === "strawberry") setBrew(attr);
    const pendingTimeouts = timeouts.current;
    return () => pendingTimeouts.forEach(clearTimeout);
  }, []);

  const order = useCallback(
    (next: Brew) => {
      if (next === brew || pouring) return;
      setPouring(next);

      // swap the palette mid-pour, behind the wave
      timeouts.current.push(
        setTimeout(() => {
          const root = document.documentElement;
          root.classList.add("brew-transition");
          if (next === "espresso") root.removeAttribute("data-brew");
          else root.setAttribute("data-brew", next);
          try {
            localStorage.setItem("brew", next);
          } catch {}
          setBrew(next);
          timeouts.current.push(
            setTimeout(() => root.classList.remove("brew-transition"), 700)
          );
        }, 380)
      );
      timeouts.current.push(setTimeout(() => setPouring(null), 1100));
    },
    [brew, pouring]
  );

  const pourColor = brews.find((b) => b.id === pouring)?.pour;

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-full border border-border bg-card/70 p-1",
          className
        )}
        role="radiogroup"
        aria-label="Pick a brew (site theme)"
      >
        {brews.map((b) => {
          const Icon = b.icon;
          const active = brew === b.id;
          return (
            <button
              key={b.id}
              role="radio"
              aria-checked={active}
              title={`Order a ${b.label.toLowerCase()}`}
              onClick={() => order(b.id)}
              className={cn(
                "relative grid h-7 w-7 place-items-center rounded-full text-muted transition-all hover:scale-110 hover:text-foreground active:scale-90",
                active && "text-card"
              )}
            >
              {active && (
                <motion.span
                  layoutId="brew-active"
                  className="absolute inset-0 rounded-full bg-accent-blue"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" />
            </button>
          );
        })}
      </div>

      {/* the pour — a wave of the ordered drink washes down the screen */}
      <AnimatePresence>
        {pouring && (
          <motion.div
            key={pouring}
            initial={{ y: "-115%" }}
            animate={{ y: "115%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
            className="pointer-events-none fixed inset-x-0 z-[90]"
            style={{ top: "-10vh", height: "120vh" }}
            aria-hidden
          >
            {/* flat, opaque body of the drink */}
            <div className="h-full w-full" style={{ background: pourColor }} />

            {/* cel wave: flat fill + bold ink edge + drips */}
            <svg
              className="absolute -bottom-[70px] left-0 w-full"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              style={{ height: 72 }}
            >
              {/* filled wave continuing the body color */}
              <path
                fill={pourColor}
                d="M0,0 L1440,0 L1440,38 C1330,78 1220,22 1090,52 C960,82 850,26 720,54 C590,82 480,24 350,52 C220,80 110,30 0,46 Z"
              />
              {/* thick ink outline riding the leading edge */}
              <path
                fill="none"
                stroke="rgb(var(--c-foreground) / 0.85)"
                strokeWidth="7"
                strokeLinecap="round"
                d="M0,46 C110,30 220,80 350,52 C480,24 590,82 720,54 C850,26 960,82 1090,52 C1220,22 1330,78 1440,38"
              />
              {/* drips */}
              <g stroke="rgb(var(--c-foreground) / 0.85)" strokeWidth="5">
                <circle cx="260" cy="86" r="11" fill={pourColor} />
                <circle cx="705" cy="94" r="14" fill={pourColor} />
                <circle cx="1120" cy="84" r="9" fill={pourColor} />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
