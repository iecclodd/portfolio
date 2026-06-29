/**
 * MISSION LOG (TIMELINE)
 * ------------------------------------------------------------------
 * Chronological log rendered as an animated timeline.
 *  status:     "complete" | "active" | "upcoming"
 *  importance: 1–5 (drives the importance pips)
 */

export type MissionStatus = "complete" | "active" | "upcoming";

export interface MissionEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  status: MissionStatus;
  importance: number; // 1–5
}

export const experience: MissionEntry[] = [
  {
    id: "2023",
    year: "2023",
    title: "First Builds",
    description:
      "Started experimenting with coding, design, and online projects.",
    status: "complete",
    importance: 2,
  },
  {
    id: "2024",
    year: "2024",
    title: "Real Projects",
    description:
      "Built early tools, joined teams, and learned startup / product basics.",
    status: "complete",
    importance: 3,
  },
  {
    id: "2025",
    year: "2025",
    title: "Systems & Scale",
    description:
      "Worked on automation, AI workflows, and end-to-end project execution.",
    status: "complete",
    importance: 4,
  },
  {
    id: "2026",
    year: "2026",
    title: "Expansion",
    description:
      "Focused on AI systems, portfolio building, product design, and startup-level projects.",
    status: "active",
    importance: 5,
  },
  {
    id: "future",
    year: "Future",
    title: "Next Phase",
    description:
      "Bigger products, stronger skills, and more public proof of work.",
    status: "upcoming",
    importance: 5,
  },
];
