"use client";

import { motion } from "framer-motion";
import { skills, type Accent } from "@/data/skills";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Stagger, RevealItem } from "@/components/ui/reveal";

const accentBar: Record<Accent, string> = {
  blue: "from-accent-blue to-accent-blue/40",
  purple: "from-accent-purple to-accent-purple/40",
  green: "from-accent-green to-accent-green/40",
  red: "from-accent-red to-accent-red/40",
};
const accentText: Record<Accent, string> = {
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  green: "text-accent-green",
  red: "text-accent-red",
};
const accentGlow: Record<Accent, string> = {
  blue: "rgba(111,78,55,0.16)",
  purple: "rgba(169,116,76,0.16)",
  green: "rgba(124,140,90,0.16)",
  red: "rgba(188,106,75,0.16)",
};

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      kicker="What I work with"
      title="Skills & Tools"
      subtitle="The stack behind the work — with a sense of where I'm strongest and the projects that prove it."
    >
      <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skills.map((cat) => (
          <RevealItem key={cat.id}>
            <SpotlightCard glow={accentGlow[cat.accent]} className="h-full p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {cat.title}
                </h3>
                <span
                  className={`font-mono text-[0.65rem] ${accentText[cat.accent]}`}
                >
                  {cat.skills.length} {cat.skills.length === 1 ? "module" : "modules"}
                </span>
              </div>

              <div className="space-y-5">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {s.name}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {s.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full bg-gradient-to-r ${accentBar[cat.accent]}`}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted">{s.proof}</p>
                    {s.related.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {s.related.map((r) => (
                          <span
                            key={r}
                            className="rounded border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </Stagger>
    </Section>
  );
}
