"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
} from "framer-motion";
import { Bean, Coffee, Moon, Zap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * FidgetBar — an intermission of pointless-but-satisfying toys.
 * Bean bubble-wrap, a bean grinder spinner, a decaf switch, and a
 * pit of flingable beans. None of it means anything. That's the point.
 */
export function FidgetBar() {
  return (
    <Section
      id="fidget"
      kicker="Intermission"
      title="The Fidget Bar"
      subtitle="Halfway through the portfolio — take a coffee break. Everything here does absolutely nothing. That's the point."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BeanWrap className="md:col-span-2" />
        <BeanSpinner />
        <DecafSwitch />
        <BeanPit className="md:col-span-2 lg:col-span-4" />
      </div>
    </Section>
  );
}

/* ── shared card shell ─────────────────────────────────────────── */
function FidgetCard({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 glow-coffee",
        className
      )}
    >
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent-blue">
          {label}
        </span>
        <span className="text-right text-[0.7rem] italic text-muted">{hint}</span>
      </div>
      {children}
    </div>
  );
}

/* ── 1. Bean wrap — bubble wrap, but beans ─────────────────────── */
const WRAP_COUNT = 24;

function BeanWrap({ className }: { className?: string }) {
  const [popped, setPopped] = useState<boolean[]>(() =>
    Array(WRAP_COUNT).fill(false)
  );
  const [lifetime, setLifetime] = useState(0);
  const [roasting, setRoasting] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prevCount = useRef(0);

  useEffect(() => {
    try {
      setLifetime(Number(localStorage.getItem("beanPops") || 0));
    } catch {}
    const pendingTimeouts = timeouts.current;
    return () => pendingTimeouts.forEach(clearTimeout);
  }, []);

  const count = popped.filter(Boolean).length;

  // lifetime counter + batch reset react to the popped state itself, so
  // rapid-fire clicks can't double-count or skip the roast
  useEffect(() => {
    const gained = count - prevCount.current;
    prevCount.current = count;
    if (gained <= 0) return;
    setLifetime((prev) => {
      const total = prev + gained;
      try {
        localStorage.setItem("beanPops", String(total));
      } catch {}
      return total;
    });
    if (count === WRAP_COUNT) {
      setRoasting(true);
      timeouts.current.push(
        setTimeout(() => {
          setPopped(Array(WRAP_COUNT).fill(false));
          setRoasting(false);
        }, 1600)
      );
    }
  }, [count]);

  const pop = (i: number) => {
    if (roasting) return;
    setPopped((prev) =>
      prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))
    );
  };

  return (
    <FidgetCard
      label="Bean wrap"
      hint="like bubble wrap, but roasted"
      className={className}
    >
      <div className="grid flex-1 grid-cols-6 gap-2 sm:grid-cols-8">
        {popped.map((isPopped, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={isPopped ? "Popped bean" : "Pop this bean"}
            onClick={() => pop(i)}
            whileTap={{ scale: 0.65 }}
            animate={
              isPopped
                ? { scale: [1, 1.35, 0.85], rotate: 40, opacity: 0.25 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className={cn(
              "grid aspect-square place-items-center rounded-full transition-colors",
              isPopped
                ? "border border-dashed border-border bg-transparent"
                : "border border-accent-blue/20 bg-accent-blue/10 hover:bg-accent-blue/20"
            )}
          >
            <Bean
              className={cn(
                "h-4 w-4",
                isPopped ? "text-muted" : "text-accent-blue"
              )}
            />
          </motion.button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-widest text-muted">
        <span>
          batch {count}/{WRAP_COUNT}
        </span>
        <span>lifetime pops: {lifetime}</span>
      </div>

      {/* fresh batch overlay */}
      <AnimatePresence>
        {roasting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 grid place-items-center rounded-3xl bg-card/85 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-2 w-fit"
              >
                <Coffee className="h-6 w-6 text-accent-blue" />
              </motion.div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-blue">
                roasting a fresh batch…
              </p>
            </div>
            {/* celebratory bean burst */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2"
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: Math.cos((i / 10) * Math.PI * 2) * 130,
                  y: Math.sin((i / 10) * Math.PI * 2) * 90,
                  opacity: 0,
                  rotate: i % 2 ? 220 : -220,
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <Bean className="h-4 w-4 text-accent-green" />
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </FidgetCard>
  );
}

/* ── 2. Bean spinner — click to grind, physics decay ───────────── */
function BeanSpinner() {
  const discRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const velocity = useRef(0); // deg/s
  const [rpm, setRpm] = useState(0);
  const rpmClock = useRef(0);

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 64) / 1000;
    velocity.current *= Math.pow(0.35, dt); // friction
    if (Math.abs(velocity.current) < 2) velocity.current = 0;
    angle.current += velocity.current * dt;
    if (discRef.current) {
      discRef.current.style.transform = `rotate(${angle.current}deg)`;
    }
    rpmClock.current += delta;
    if (rpmClock.current > 180) {
      rpmClock.current = 0;
      setRpm(Math.round(Math.abs(velocity.current) / 6)); // deg/s → rpm
    }
  });

  const grind = () => {
    velocity.current += 1400 + Math.random() * 600;
  };

  const turbo = rpm > 400;

  return (
    <FidgetCard label="Grind-o-matic" hint="click to grind">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Spin the bean grinder"
          onClick={grind}
          className="group relative grid h-32 w-32 cursor-pointer place-items-center rounded-full border border-border bg-background transition-transform active:scale-95"
        >
          <div ref={discRef} className="relative h-full w-full will-change-transform">
            {[0, 120, 240].map((deg) => (
              <span
                key={deg}
                className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent-blue/10"
                style={{
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-38px)`,
                }}
              >
                <Bean className="h-5 w-5 text-accent-blue" />
              </span>
            ))}
          </div>
          {/* hub */}
          <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-card bg-accent-green shadow" />
        </button>

        <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
          <span>{rpm} rpm</span>
          <AnimatePresence>
            {turbo && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex items-center gap-1 rounded-full bg-accent-red/15 px-2 py-0.5 text-accent-red"
              >
                <Zap className="h-3 w-3" /> turbo
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FidgetCard>
  );
}

/* ── 3. Decaf switch — a very consequential toggle ─────────────── */
function DecafSwitch() {
  const [caffeinated, setCaffeinated] = useState(true);
  const [flips, setFlips] = useState(0);

  const verdict = !caffeinated
    ? "decaf?? why would you do this."
    : flips === 0
      ? "fully operational."
      : "phew. much better.";

  return (
    <FidgetCard label="Caffeine valve" hint="flip it. feel something.">
      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-5 rounded-2xl transition-all duration-500",
          caffeinated ? "caffeinated" : "opacity-80 grayscale"
        )}
      >
        <motion.div
          animate={{ rotate: caffeinated ? 0 : 8 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          {caffeinated ? (
            <Coffee className="h-8 w-8 text-accent-blue" />
          ) : (
            <Moon className="h-8 w-8 text-muted" />
          )}
        </motion.div>

        <button
          type="button"
          role="switch"
          aria-checked={caffeinated}
          aria-label="Toggle caffeine"
          onClick={() => {
            setCaffeinated((c) => !c);
            setFlips((f) => f + 1);
          }}
          className={cn(
            "flex h-11 w-20 items-center rounded-full border p-1 transition-colors",
            caffeinated
              ? "justify-end border-accent-green/50 bg-accent-green/20"
              : "justify-start border-border bg-background"
          )}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 600, damping: 28 }}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full shadow",
              caffeinated ? "bg-accent-green text-card" : "bg-card text-muted"
            )}
          >
            {caffeinated ? (
              <Zap className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </motion.span>
        </button>

        <div className="text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent-blue">
            {caffeinated ? "caffeinated" : "decaf"}
          </p>
          <p className="mt-1 text-[0.7rem] italic text-muted">{verdict}</p>
          {flips > 7 && (
            <p className="mt-1 text-[0.7rem] italic text-muted">
              {flips} flips. the cup is getting dizzy.
            </p>
          )}
        </div>
      </div>
    </FidgetCard>
  );
}

/* ── 4. Bean pit — free-range flingable beans ──────────────────── */
const PIT_BEANS = [
  { left: "8%", top: "30%", size: 34, tone: "text-accent-blue bg-accent-blue/10" },
  { left: "22%", top: "58%", size: 26, tone: "text-accent-green bg-accent-green/10" },
  { left: "38%", top: "26%", size: 30, tone: "text-accent-purple bg-accent-purple/10" },
  { left: "52%", top: "55%", size: 38, tone: "text-accent-blue bg-accent-blue/10" },
  { left: "66%", top: "30%", size: 24, tone: "text-accent-red bg-accent-red/10" },
  { left: "78%", top: "56%", size: 32, tone: "text-accent-green bg-accent-green/10" },
  { left: "89%", top: "34%", size: 27, tone: "text-accent-purple bg-accent-purple/10" },
];

function BeanPit({ className }: { className?: string }) {
  const pitRef = useRef<HTMLDivElement>(null);
  const [flings, setFlings] = useState(0);

  return (
    <FidgetCard
      label="The bean pit"
      hint="free-range beans. fling responsibly."
      className={className}
    >
      <div
        ref={pitRef}
        className="relative h-44 overflow-hidden rounded-2xl border border-dashed border-border bg-background/60"
      >
        {PIT_BEANS.map((b, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={pitRef}
            dragElastic={0.12}
            dragTransition={{ bounceStiffness: 350, bounceDamping: 14 }}
            whileDrag={{ scale: 1.2, rotate: 12, cursor: "grabbing" }}
            whileHover={{ scale: 1.08 }}
            onDragEnd={() => setFlings((f) => f + 1)}
            className={cn(
              "absolute grid cursor-grab place-items-center rounded-full border border-border/60 shadow-sm",
              b.tone
            )}
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
            }}
          >
            <Bean style={{ width: b.size * 0.55, height: b.size * 0.55 }} />
          </motion.div>
        ))}

        <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
          {flings === 0 ? "grab one" : `${flings} flings logged`}
        </span>
      </div>
    </FidgetCard>
  );
}
