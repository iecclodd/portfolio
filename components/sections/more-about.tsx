"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, MapPin, Target, Activity } from "lucide-react";
import {
  overview,
  hobbies,
  interests,
  builds,
  principles,
} from "@/data/interests";
import { profile } from "@/data/profile";
import { gallery } from "@/data/photos";
import { Section } from "@/components/ui/section";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "hobbies", label: "Hobbies" },
  { id: "interests", label: "Interests" },
  { id: "builds", label: "Builds" },
  { id: "principles", label: "Principles" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function MoreAbout() {
  const [tab, setTab] = useState<TabId>("hobbies");

  return (
    <Section
      id="more"
      kicker="Beyond the work"
      title="More About Me"
      subtitle="Read a bit about me, then see what I'm into."
    >
      {/* Bigger about-me area — 1–2 paragraphs + at-a-glance */}
      <div className="mb-14 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Who I am
          </h3>
          <div className="mt-5 space-y-5">
            {overview.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground/80 sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* at a glance */}
        <aside className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-green">
            At a glance
          </p>
          <dl className="space-y-4 text-sm">
            <Fact icon={Activity} label="Status" value={profile.status} />
            <Fact icon={Target} label="Focus" value={profile.focus.join(" · ")} />
            <Fact icon={MapPin} label="Based" value={profile.location} />
          </dl>
        </aside>
      </div>

      {/* Tab bar */}
      <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-border bg-card/50 p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id ? "text-foreground" : "text-muted hover:text-foreground"
            )}
          >
            {tab === t.id && (
              <motion.span
                layoutId="more-tab"
                className="absolute inset-0 rounded-xl border border-border bg-background"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "hobbies" && <TagGrid items={hobbies} />}
          {tab === "interests" && <TagGrid items={interests} />}
          {tab === "builds" && <TagGrid items={builds} />}

          {tab === "principles" && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {principles.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card/60 p-5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-accent-green">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">
                      {p.rule}
                    </h3>
                  </div>
                  <p className="mt-2 pl-8 text-sm text-muted">{p.detail}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Photo gallery — life in frames */}
      <div className="mt-14">
        <div className="mb-5 flex items-center gap-2">
          <Camera className="h-4 w-4 text-accent-purple" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Life in Frames
          </h3>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {gallery.map((photo, i) => (
            <PhotoFrame
              key={photo.src}
              photo={photo}
              rounded="rounded-xl"
              className={cn(
                "aspect-[4/5]",
                i === 0 &&
                  "col-span-2 row-span-2 aspect-square sm:col-span-1 sm:row-span-1 sm:aspect-[4/5]"
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background/60 text-accent-green">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}

function TagGrid({
  items,
}: {
  items: { label: string; icon: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 transition-colors hover:border-accent-green/50"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/60 text-accent-blue transition-colors group-hover:text-accent-green">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-foreground">
              {item.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
