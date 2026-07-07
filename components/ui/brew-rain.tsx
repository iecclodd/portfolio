"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bean, Cherry, Coffee, Leaf } from "lucide-react";

interface Drop {
  id: number;
  x: number; // vw
  delay: number;
  duration: number;
  size: number;
  spin: number;
  Icon: typeof Bean;
  color: string;
}

const ICONS = [Bean, Coffee, Leaf, Cherry];
const COLORS = [
  "text-accent-blue",
  "text-accent-green",
  "text-accent-purple",
  "text-accent-red",
];

/**
 * BrewRain — easter egg. Type "brew" anywhere on the page and a fresh
 * pot rains down. Hinted at by the mascot and the footer.
 */
export function BrewRain() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [toast, setToast] = useState(false);
  const buffer = useRef("");
  const active = useRef(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      )
        return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-4);
      if (buffer.current !== "brew" || active.current) return;

      buffer.current = "";
      active.current = true;
      setToast(true);

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!reduced) {
        setDrops(
          Array.from({ length: 36 }, (_, i) => ({
            id: i,
            x: Math.random() * 96,
            delay: Math.random() * 1.2,
            duration: 2.2 + Math.random() * 1.4,
            size: 14 + Math.random() * 12,
            spin: (Math.random() - 0.5) * 720,
            Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          }))
        );
      }

      timeouts.current.push(setTimeout(() => setToast(false), 2600));
      timeouts.current.push(
        setTimeout(
          () => {
            setDrops([]);
            active.current = false;
          },
          reduced ? 2700 : 5200
        )
      );
    };

    const pendingTimeouts = timeouts.current;

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      pendingTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {drops.length > 0 && (
        <div
          className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
          aria-hidden
        >
          {drops.map((d) => {
            const Icon = d.Icon;
            return (
              <motion.div
                key={d.id}
                className="absolute top-0"
                style={{ left: `${d.x}vw` }}
                initial={{ y: -40, opacity: 0, rotate: 0 }}
                animate={{ y: "105vh", opacity: [0, 1, 1, 0.8], rotate: d.spin }}
                transition={{
                  delay: d.delay,
                  duration: d.duration,
                  ease: "easeIn",
                }}
              >
                <Icon
                  className={d.color}
                  style={{ width: d.size, height: d.size }}
                />
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="fixed left-1/2 top-20 z-[81] -translate-x-1/2"
          >
            <span className="flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent-blue shadow-lg">
              <Coffee className="h-3.5 w-3.5" /> fresh pot incoming
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
