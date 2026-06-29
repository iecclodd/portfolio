"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Coffee,
  MapPin,
  MousePointerClick,
  RotateCw,
} from "lucide-react";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/section";
import { DotPattern } from "@/components/ui/grid-pattern";
import { Magnetic } from "@/components/ui/magnetic";
import { BusinessCard } from "@/components/ui/business-card";
import { Reveal } from "@/components/ui/reveal";

export function Transmission() {
  return (
    <Section
      id="transmission"
      kicker="Say hello"
      title="Let's Build Something"
      subtitle="Open to serious builds, collaborations, and opportunities. Grab a coffee — virtually or otherwise — and let's talk."
    >
      {/* Featured: flippable business card — holds all my contact details */}
      <Reveal className="mx-auto w-full max-w-md">
        <BusinessCard />
      </Reveal>

      {/* Prominent prompt: open the card, then flip it for contact info */}
      <Reveal className="mx-auto mt-6 w-full max-w-md">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center gap-3 rounded-2xl border border-matcha-soft bg-matcha-mist px-5 py-3.5 text-center"
        >
          <MousePointerClick className="h-5 w-5 shrink-0 text-matcha-deep" />
          <p className="text-sm font-medium text-foreground">
            Tap the card, then{" "}
            <span className="font-semibold text-matcha-deep">flip it</span> — all
            my contact details live on the back.
          </p>
          <RotateCw className="h-4 w-4 shrink-0 text-matcha-deep" />
        </motion.div>
      </Reveal>

      {/* Warm invite + primary email CTA */}
      <Reveal className="mx-auto mt-10 w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
          <DotPattern className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-blue/10 text-accent-blue">
                  <Coffee className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-semibold text-foreground">
                  Coffee&apos;s on me.
                </h3>
              </div>
              <p className="mt-3 max-w-sm text-sm text-muted">
                The fastest way to reach me is email — I read everything and
                reply to the good stuff.
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                  </span>
                  Currently available
                </p>
                <p className="flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4 text-accent-purple" />
                  {profile.location}
                </p>
              </div>
            </div>

            <Magnetic>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-blue px-6 py-4 text-sm font-semibold text-card transition-transform hover:scale-[1.01] sm:w-auto"
              >
                Send me an email
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
