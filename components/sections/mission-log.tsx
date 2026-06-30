"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experience, type MissionStatus } from "@/data/experience";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const statusMeta: Record<
  MissionStatus,
  { label: string; tone: "green" | "blue" | "muted"; dot: boolean }
> = {
  complete: { label: "Complete", tone: "green", dot: false },
  active: { label: "In Progress", tone: "blue", dot: true },
  upcoming: { label: "Queued", tone: "muted", dot: false },
};

export function MissionLog() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="mission-log"
      kicker="The journey"
      title="Experience"
      subtitle="A timeline of what I've worked on and where I'm headed next."
    >
      <div ref={ref} className="relative ml-2 sm:ml-4">
        {/* track */}
        <div className="absolute left-0 top-0 h-full w-px bg-border" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-green"
        />

        <ul className="space-y-10">
          {experience.map((entry, i) => {
            const meta = statusMeta[entry.status];
            return (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-8 sm:pl-10"
              >
                {/* node */}
                <span
                  className={cn(
                    "absolute left-0 top-1.5 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 bg-background",
                    entry.status === "active"
                      ? "border-accent-blue"
                      : entry.status === "complete"
                        ? "border-accent-green"
                        : "border-border"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      entry.status === "active"
                        ? "bg-accent-blue"
                        : entry.status === "complete"
                          ? "bg-accent-green"
                          : "bg-muted"
                    )}
                  />
                </span>

                <div className="rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-foreground/20">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-accent-blue">
                      {entry.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {entry.title}
                    </h3>
                    <StatusBadge tone={meta.tone} dot={meta.dot}>
                      {meta.label}
                    </StatusBadge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {entry.description}
                  </p>
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-blue transition-colors hover:text-accent-purple"
                    >
                      Visit site
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
