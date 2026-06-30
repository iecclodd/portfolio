"use client";

import { ArrowUpRight, CircleDot, CheckCircle2, Clock3 } from "lucide-react";
import { projects, type Project, type ProjectStatus } from "@/data/projects";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Stagger, RevealItem, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const statusMeta: Record<
  ProjectStatus,
  { label: string; tone: "green" | "blue" | "muted"; dot: boolean }
> = {
  shipped: { label: "Shipped", tone: "green", dot: false },
  "in-progress": { label: "In Progress", tone: "blue", dot: true },
  planned: { label: "Planned", tone: "muted", dot: false },
};

const boardCols: {
  status: ProjectStatus;
  title: string;
  icon: typeof CheckCircle2;
  tone: string;
}[] = [
  { status: "shipped", title: "Completed", icon: CheckCircle2, tone: "text-accent-green" },
  { status: "in-progress", title: "In Progress", icon: CircleDot, tone: "text-accent-blue" },
  { status: "planned", title: "Planned", icon: Clock3, tone: "text-muted" },
];

export function Builds() {
  return (
    <Section
      id="builds"
      kicker="Selected work"
      title="Projects"
      subtitle="Things I've built — shipped, in progress, and planned. Each one started as a problem worth solving."
    >
      {/* Bento grid */}
      <Stagger className="grid auto-rows-[1fr] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <RevealItem
            key={p.id}
            className={cn(p.featured && "lg:col-span-2")}
          >
            <ProjectCard project={p} />
          </RevealItem>
        ))}
      </Stagger>

      {/* Status board */}
      <Reveal className="mt-16">
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Currently Building / Planning
        </h3>
        <p className="mb-6 text-sm text-muted">
          The same registry, grouped by execution state.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {boardCols.map((col) => {
            const Icon = col.icon;
            const items = projects.filter((p) => p.status === col.status);
            return (
              <div
                key={col.status}
                className="rounded-2xl border border-border bg-card/50 p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", col.tone)} />
                  <span className="text-sm font-semibold text-foreground">
                    {col.title}
                  </span>
                  <span className="ml-auto rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[0.65rem] text-muted">
                    {items.length}
                  </span>
                </div>
                <ul className="space-y-2">
                  {items.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground/90"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          col.tone.replace("text-", "bg-")
                        )}
                      />
                      {p.name}
                    </li>
                  ))}
                  {items.length === 0 && (
                    <li className="px-3 py-2 text-sm text-muted">— none —</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const meta = statusMeta[p.status];
  return (
    <SpotlightCard className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
          <p className="mt-1 text-sm font-medium text-accent-green">
            {p.tagline}
          </p>
        </div>
        <StatusBadge tone={meta.tone} dot={meta.dot}>
          {meta.label}
        </StatusBadge>
      </div>

      {/* 2–3 line summary (full story lives in the case study) */}
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>

      {/* metrics */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {p.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-border/60 bg-background/40 px-3 py-2"
          >
            <div className="text-sm font-semibold text-foreground">
              {m.value}
            </div>
            <div className="text-[0.7rem] text-muted">{m.label}</div>
          </div>
        ))}
      </div>

      {/* role + tools */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex gap-2">
          <span className="text-muted">Role</span>
          <span className="text-foreground/90">{p.role}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.tools.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[0.65rem] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA — only rendered when a project has a real link */}
      <div className="mt-5 flex-1" />
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
        >
          Visit Site
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      )}
    </SpotlightCard>
  );
}
