/**
 * ROADMAP / NEXT OBJECTIVES
 * ------------------------------------------------------------------
 * Futuristic checklist. To add an objective, copy a row and edit it.
 *  status:   "done" | "active" | "queued"
 *  priority: "critical" | "high" | "medium" | "low"
 *  progress: 0–100
 *  target:   free-text target date placeholder
 */

export type ObjectiveStatus = "done" | "active" | "queued";
export type Priority = "critical" | "high" | "medium" | "low";

export interface Objective {
  id: string;
  label: string;
  status: ObjectiveStatus;
  priority: Priority;
  target: string;
  progress: number; // 0–100
}

export const roadmap: Objective[] = [
  {
    id: "polyshield-v1",
    label: "Ship Polyshield V1",
    status: "active",
    priority: "critical",
    target: "Q3 2026",
    progress: 65,
  },
  {
    id: "launch-portfolio",
    label: "Launch personal portfolio",
    status: "active",
    priority: "high",
    target: "Q3 2026",
    progress: 80,
  },
  {
    id: "case-studies",
    label: "Build public case studies",
    status: "queued",
    priority: "high",
    target: "Q4 2026",
    progress: 20,
  },
  {
    id: "audience",
    label: "Grow audience",
    status: "active",
    priority: "medium",
    target: "Ongoing",
    progress: 35,
  },
  {
    id: "ai-design-tool",
    label: "Build AI engineering design tool",
    status: "queued",
    priority: "high",
    target: "Q1 2027",
    progress: 15,
  },
  {
    id: "fullstack",
    label: "Get stronger at full-stack development",
    status: "active",
    priority: "medium",
    target: "Ongoing",
    progress: 55,
  },
  {
    id: "scale-nonprofit",
    label: "Scale Hearts for Elders into new countries",
    status: "active",
    priority: "medium",
    target: "Ongoing",
    progress: 40,
  },
  {
    id: "programs",
    label: "Apply to major programs / internships",
    status: "queued",
    priority: "high",
    target: "Q4 2026",
    progress: 10,
  },
  {
    id: "real-users",
    label: "Build something with real users",
    status: "active",
    priority: "critical",
    target: "Q4 2026",
    progress: 40,
  },
];
