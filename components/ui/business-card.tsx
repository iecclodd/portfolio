"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, RotateCw, MapPin, Coffee, Leaf, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import { cn } from "@/lib/utils";

/**
 * BusinessCard — a compact card that, when clicked, opens a focused
 * overlay: the background blurs, a large card scales in, and clicking it
 * flips between the front (identity) and back (contact details). Close
 * with the ✕, the Esc key, or by clicking the dimmed backdrop.
 */
export function BusinessCard() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  // portal target is only available on the client
  useEffect(() => setMounted(true), []);

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function close() {
    setOpen(false);
    // reset to front for next open, after the exit animation
    setTimeout(() => setFlipped(false), 300);
  }

  return (
    <>
      {/* ── inline trigger ───────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open my business card"
        className="group relative block aspect-[1.7] w-full text-left transition-transform duration-300 hover:-translate-y-1"
      >
        <CardFront hint />
      </button>

      {/* ── overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          >
            {/* blurred backdrop */}
            <div
              onClick={close}
              className="absolute inset-0 bg-foreground/45 backdrop-blur-md"
            />

            {/* close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-lg transition-colors hover:text-accent-red"
            >
              <X className="h-5 w-5" />
            </button>

            {/* card stage */}
            <motion.div
              initial={{ scale: 0.9, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-[min(94vw,620px)] [perspective:1800px]"
            >
              <motion.div
                onClick={() => setFlipped((f) => !f)}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative aspect-[1.5] w-full cursor-pointer sm:aspect-[1.7]"
              >
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <CardFront large />
                </div>
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <CardBack />
                </div>
              </motion.div>

              <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-background/90">
                <RotateCw className="h-4 w-4" />
                Click the card to flip · Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── EMV-style chip (ties into the circuit theme) ───────────────── */
function Chip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 38" className={cn("h-9 w-11", className)} aria-hidden>
      <rect
        x="1"
        y="1"
        width="46"
        height="36"
        rx="6"
        fill="#C9A36A"
        stroke="#A9744C"
        strokeWidth="1.5"
      />
      <g stroke="#7A4F2E" strokeWidth="1.4" opacity="0.8" fill="none">
        <path d="M17 1 V37 M31 1 V37" />
        <path d="M1 13 H17 M31 13 H47" />
        <path d="M1 25 H17 M31 25 H47" />
        <rect x="17" y="13" width="14" height="12" />
      </g>
    </svg>
  );
}

/* ── Front face: identity ───────────────────────────────────────── */
function CardFront({
  hint,
  large,
}: {
  hint?: boolean;
  large?: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-background p-5 shadow-[0_24px_60px_-30px_rgba(111,78,55,0.55)] sm:p-6">
      {/* faint circuit traces */}
      <svg
        aria-hidden
        viewBox="0 0 400 240"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
        fill="none"
      >
        {/* traces tucked into the top-right band — clear of the name, tagline & footer text */}
        <g stroke="#7C9A3C" strokeWidth="2" strokeLinecap="round" opacity="0.35">
          <path d="M236 22 H300 L318 40 H400" />
          <path d="M300 58 H352 L366 44" />
          <path d="M400 30 H360" />
        </g>
        <circle cx="300" cy="40" r="3.5" fill="#A9744C" opacity="0.45" />
        <circle cx="352" cy="58" r="3.5" fill="#7C9A3C" opacity="0.45" />
      </svg>

      {/* top row: chip + brand */}
      <div className="relative flex items-start justify-between">
        <Chip />
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
          <Coffee className="h-3.5 w-3.5 text-accent-blue" />
          <Leaf className="h-3.5 w-3.5 text-accent-green" />
        </div>
      </div>

      {/* identity */}
      <div className="relative">
        <h3
          className={cn(
            "font-bold tracking-tight text-foreground",
            large ? "text-4xl sm:text-5xl" : "text-2xl"
          )}
        >
          {profile.name}
        </h3>
        <p
          className={cn(
            "mt-1 font-medium text-accent-green",
            large ? "text-base" : "text-sm"
          )}
        >
          {profile.subheadline}
        </p>
      </div>

      {/* footer */}
      <div className="relative flex items-end justify-between">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 text-accent-purple" />
          {profile.location}
        </span>
        {hint && (
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-accent-green">
            <RotateCw className="h-3 w-3" />
            Tap to open
          </span>
        )}
        {large && (
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            flip →
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Back face: contact details ─────────────────────────────────── */
function CardBack() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background to-card p-5 shadow-[0_24px_60px_-30px_rgba(111,78,55,0.55)] sm:p-6">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-green">
          Get in touch
        </p>
        <span className="flex items-center gap-1.5">
          <Coffee className="h-4 w-4 text-accent-blue" />
          <Leaf className="h-4 w-4 text-accent-green" />
        </span>
      </div>

      <div className="grid min-h-0 flex-1 content-center gap-2.5 overflow-y-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {contact.channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <div key={ch.id} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-card text-accent-green">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[0.7rem] uppercase tracking-wider text-muted">
                  {ch.label}
                </div>
                <div className="truncate text-sm font-medium text-foreground">
                  {ch.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <a
        href={`mailto:${contact.email}`}
        onClick={(e) => e.stopPropagation()}
        className="mt-3 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent-green px-4 py-2.5 text-sm font-semibold text-card transition-transform hover:scale-[1.01]"
      >
        Email me
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
