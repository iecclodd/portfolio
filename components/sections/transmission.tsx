"use client";

import { ArrowUpRight, Coffee, MapPin } from "lucide-react";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
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
      {/* Featured: flippable business card */}
      <Reveal className="mx-auto mb-10 w-full max-w-md">
        <BusinessCard />
      </Reveal>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Warm invite panel */}
        <Reveal>
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8">
            <DotPattern className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
            <BorderBeam duration={10} colorFrom="#7C9A3C" colorTo="#A9744C" />

            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-blue/10 text-accent-blue">
                <Coffee className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-foreground">
                Coffee&apos;s on me.
              </h3>
              <p className="mt-2 text-sm text-muted">
                The fastest way to reach me is email — I read everything and
                reply to the good stuff.
              </p>
            </div>

            <div className="relative mt-8 space-y-2 text-sm">
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
        </Reveal>

        {/* Channels */}
        <Reveal delayIndex={1}>
          <div className="flex h-full flex-col">
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              {contact.channels.map((ch) => {
                const Icon = ch.icon;
                const external = ch.href.startsWith("http");
                return (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target={external || ch.id === "resume" ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <SpotlightCard className="group flex h-full items-center gap-4 p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-accent-blue transition-colors group-hover:text-accent-green">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-foreground">
                          {ch.label}
                        </div>
                        <div className="truncate text-sm text-muted">
                          {ch.value}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    </SpotlightCard>
                  </a>
                );
              })}
            </div>

            {/* primary CTA */}
            <div className="mt-4">
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
      </div>
    </Section>
  );
}
