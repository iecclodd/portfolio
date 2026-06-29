"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Square } from "lucide-react";
import { roadmap, type ObjectiveStatus, type Priority } from "@/data/roadmap";
import { Section } from "@/components/ui/section";
import { Stagger, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const priorityTone: Record<Priority, string> = {
  critical: "border-accent-red/40 bg-accent-red/10 text-accent-red",
  high: "border-accent-purple/40 bg-accent-purple/10 text-accent-purple",
  medium: "border-accent-blue/40 bg-accent-blue/10 text-accent-blue",
  low: "border-border bg-foreground/5 text-muted",
};

function StatusIcon({ status }: { status: ObjectiveStatus }) {
  if (status === "done")
    return <Check className="h-4 w-4 text-accent-green" />;
  if (status === "active")
    return <Loader2 className="h-4 w-4 animate-spin text-accent-blue" />;
  return <Square className="h-4 w-4 text-muted" />;
}

export function Roadmap() {
  const done = roadmap.filter((o) => o.status === "done").length;
  return (
    <Section
      id="roadmap"
      kicker="What's next"
      title="Roadmap"
      subtitle={`Where I'm pointed next. ${done}/${roadmap.length} done — the rest are in motion.`}
    >
      <Stagger className="space-y-3">
        {roadmap.map((o) => (
          <RevealItem key={o.id}>
            <div className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 transition-colors hover:border-foreground/20 sm:flex-row sm:items-center">
              {/* checkbox + label */}
              <div className="flex flex-1 items-center gap-3">
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-md border",
                    o.status === "done"
                      ? "border-accent-green/40 bg-accent-green/10"
                      : o.status === "active"
                        ? "border-accent-blue/40 bg-accent-blue/10"
                        : "border-border bg-background/60"
                  )}
                >
                  <StatusIcon status={o.status} />
                </span>
                <span
                  className={cn(
                    "text-sm font-medium sm:text-base",
                    o.status === "done"
                      ? "text-muted line-through"
                      : "text-foreground"
                  )}
                >
                  {o.label}
                </span>
              </div>

              {/* progress */}
              <div className="flex items-center gap-3 sm:w-56">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${o.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-green"
                  />
                </div>
                <span className="w-9 text-right font-mono text-xs text-muted">
                  {o.progress}%
                </span>
              </div>

              {/* meta */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider",
                    priorityTone[o.priority]
                  )}
                >
                  {o.priority}
                </span>
                <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[0.6rem] text-muted">
                  {o.target}
                </span>
              </div>
            </div>
          </RevealItem>
        ))}
      </Stagger>
    </Section>
  );
}
