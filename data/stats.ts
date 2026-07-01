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
  DollarSign,
  Clock,
  Users,
  Network,
  Globe,
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
    id: "raised",
    value: 125,
    prefix: "$",
    suffix: "K+",
    label: "Raised for Causes",
    explanation:
      "Annual fundraising driven across student council and engineering programs.",
    icon: DollarSign,
    accent: "green",
  },
  {
    id: "volunteer-hours",
    value: 10,
    suffix: "K+",
    label: "Volunteer Hours Driven",
    explanation:
      "Service hours mobilized each year — meals, supplies, and outreach for those who need it most.",
    icon: Clock,
    accent: "blue",
  },
  {
    id: "members",
    value: 600,
    suffix: "+",
    label: "Members Led",
    explanation:
      "Grew a single organization 50% (400 → 600+) and helps steer thousands across all roles.",
    icon: Users,
    accent: "purple",
  },
  {
    id: "roles",
    value: 7,
    suffix: "+",
    label: "Orgs Founded & Led",
    explanation:
      "Founder, intern, director, and officer roles run in parallel — two with President seats incoming.",
    icon: Network,
    accent: "red",
  },
  {
    id: "countries",
    value: 4,
    label: "Countries Reached",
    explanation:
      "Nonprofit chapters launched across the U.S., Nigeria, and Kenya, with more in development.",
    icon: Globe,
    accent: "green",
  },
];
