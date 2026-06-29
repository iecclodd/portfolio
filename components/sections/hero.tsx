"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Send, MapPin, ImagePlus } from "lucide-react";
import { profile } from "@/data/profile";
import { portrait } from "@/data/photos";
import { GridPattern } from "@/components/ui/grid-pattern";
import { WordRotate } from "@/components/ui/word-rotate";
import { Magnetic } from "@/components/ui/magnetic";
import { StatusBadge } from "@/components/ui/status-badge";
import { TerminalConsole } from "@/components/sections/terminal";

export function Hero() {
  return (
    <section
      id="system"
      className="relative flex min-h-screen items-start overflow-hidden pb-28 pt-32 lg:pt-36"
    >
      {/* warm ambient wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full bg-accent-green/15 blur-[150px]" />
        <div className="absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent-purple/15 blur-[150px]" />
        <div className="absolute left-1/3 top-1/2 h-[24rem] w-[24rem] rounded-full bg-accent-blue/10 blur-[150px]" />
      </div>
      <GridPattern className="opacity-60 [mask-image:radial-gradient(ellipse_at_center,white,transparent_72%)]" />

      <div className="relative mx-auto grid w-full max-w-site grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left — identity */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <IntroAvatar />
            <StatusBadge tone="green" dot>
              Available for new projects
            </StatusBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-8 text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            Azaan
            <br />
            Noman
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 flex items-center gap-2 text-lg font-medium sm:text-xl"
          >
            <WordRotate
              words={["Systems Builder.", "AI Explorer.", "Problem Solver."]}
              className="text-accent-green"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 flex items-center gap-1.5 text-sm text-muted"
          >
            <MapPin className="h-4 w-4 text-accent-purple" />
            {profile.location}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#impact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-blue px-5 py-3 text-sm font-semibold text-card transition-transform hover:scale-[1.02]"
              >
                View My Work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-blue/40"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#transmission"
                className="inline-flex items-center gap-2 rounded-full border border-accent-green/40 bg-accent-green/10 px-5 py-3 text-sm font-medium text-accent-green transition-colors hover:bg-accent-green/20"
              >
                <Send className="h-4 w-4" />
                Get in Touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right — interactive terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative w-full"
        >
          <TerminalConsole />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted"
        >
          scroll
        </motion.div>
      </div>
    </section>
  );
}

/**
 * IntroAvatar — a small, friendly headshot at the top of the hero so
 * Azaan can introduce himself. Falls back to a compact "add a photo"
 * placeholder (just an icon) so it never breaks the inline intro row.
 */
function IntroAvatar() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can 404 before hydration, so re-check on mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-border bg-card shadow-[0_10px_24px_-16px_rgba(111,78,55,0.6)] ring-1 ring-accent-green/20">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={portrait.src}
          alt={portrait.alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className="grid h-full w-full place-items-center bg-gradient-to-br from-card to-background text-accent-blue"
          title="Add public/photos/portrait.jpg"
        >
          <ImagePlus className="h-5 w-5" />
        </span>
      )}
    </span>
  );
}
