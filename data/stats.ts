/**
 * IMPACT STATS
 * ------------------------------------------------------------------
 * Big-number cards in the "Impact At A Glance" section.
 * `value` is the numeric target the counter animates to.
 * `suffix` / `prefix` decorate it (e.g. "+", "K+", "%").
 * `accent` controls the glow color: blue | purple | green | red.
 * `icon` is any export name from lucide-react.
 */

import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Users,
  Clock,
  Gauge,
  Network,
} from "lucide-react";

export type Accent = "blue" | "purple" | "green" | "red";

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  explanation: string;
  icon: LucideIcon;
  accent: Accent;
}

export const stats: Stat[] = [
  {
    id: "projects",
    value: 12,
    suffix: "+",
    label: "Projects Built",
    explanation: "Tools, automations and products shipped end-to-end.",
    icon: Boxes,
    accent: "blue",
  },
  {
    id: "reach",
    value: 50,
    suffix: "K+",
    label: "Users / Views / Reach",
    explanation: "Cumulative reach across builds, content and experiments.",
    icon: Users,
    accent: "purple",
  },
  {
    id: "hours",
    value: 3.1,
    suffix: "K+",
    decimals: 1,
    label: "Hours Learning & Building",
    explanation: "Deliberate practice across engineering and design.",
    icon: Clock,
    accent: "green",
  },
  {
    id: "efficiency",
    value: 94,
    suffix: "%",
    label: "Workflow Efficiency Target",
    explanation: "Automation goal for repeatable internal processes.",
    icon: Gauge,
    accent: "red",
  },
  {
    id: "teams",
    value: 5,
    suffix: "+",
    label: "Teams Collaborated With",
    explanation: "Startups, communities and project groups.",
    icon: Network,
    accent: "blue",
  },
];
