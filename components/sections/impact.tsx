"use client";

import { stats, type Accent } from "@/data/stats";
import { Section } from "@/components/ui/section";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Stagger, RevealItem } from "@/components/ui/reveal";

const accentText: Record<Accent, string> = {
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  green: "text-accent-green",
  red: "text-accent-red",
};
const accentGlow: Record<Accent, string> = {
  blue: "rgba(111,78,55,0.20)",
  purple: "rgba(169,116,76,0.20)",
  green: "rgba(124,140,90,0.20)",
  red: "rgba(188,106,75,0.20)",
};

export function Impact() {
  return (
    <Section
      id="impact"
      kicker="By the numbers"
      title="Impact at a Glance"
      subtitle="The proof of work — a few numbers that capture what I've built and shipped so far."
    >
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <RevealItem key={s.id}>
              <SpotlightCard
                glow={accentGlow[s.accent]}
                className="h-full p-6"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl border border-border bg-background/60 ${accentText[s.accent]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-6">
                  <div
                    className={`text-4xl font-bold tracking-tight sm:text-5xl ${accentText[s.accent]}`}
                  >
                    <NumberTicker
                      value={s.value}
                      decimals={s.decimals ?? 0}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{s.explanation}</p>
                </div>
              </SpotlightCard>
            </RevealItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
