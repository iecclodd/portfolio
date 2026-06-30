/**
 * BUILDS / PROJECTS
 * ------------------------------------------------------------------
 * Each entry renders as a bento card. To add a project, copy any
 * object below and edit it — keep `id` unique.
 *
 *  status:   "shipped" | "in-progress" | "planned"
 *  summary:  2–3 line description shown on the card (the case study
 *            holds the full story)
 *  featured: true makes the card span wider in the bento grid
 *  link:     external URL or "" (button shows "Open Case Study")
 */

export type ProjectStatus = "shipped" | "in-progress" | "planned";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string; // one-line hook
  summary: string; // 2–3 line description for the card
  status: ProjectStatus;
  role: string;
  tools: string[];
  metrics: ProjectMetric[];
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "polyshield",
    name: "Polyshield",
    tagline: "Safety layer that keeps AI agents from going rogue.",
    summary:
      "Co-founded a security platform that stops AI agents from taking unauthorized or unsafe actions. It defines the real-time guardrails and policy workflows that let autonomous agents operate safely — without slowing them down.",
    status: "in-progress",
    role: "Co-Founder",
    tools: ["Next.js", "TypeScript", "Edge Functions", "PostgreSQL"],
    metrics: [
      { label: "Threats Modeled", value: "40+" },
      { label: "Added Latency", value: "<25ms" },
    ],
    link: "https://polyshield.vercel.app",
    featured: true,
  },
  {
    id: "skyes-travel",
    name: "Skyes Travel — AI Booking",
    tagline: "AI-assisted booking engine that runs reservations on autopilot.",
    summary:
      "An AI automation internship building a booking engine for a travel company. It hunts down the repetitive steps in the reservation workflow and automates them — making bookings faster, more consistent, and largely hands-free.",
    status: "in-progress",
    role: "AI Automation Intern",
    tools: ["AI Workflows", "Automation", "Next.js", "APIs"],
    metrics: [
      { label: "Manual Work", value: "-60%" },
      { label: "Booking Speed", value: "3x" },
    ],
    link: "",
  },
  {
    id: "drone-autonomy",
    name: "Autonomous Drone Navigation & Mapping",
    tagline: "AI perception that lets off-the-shelf drones map and fly themselves.",
    summary:
      "Self-taught FPV drone builder — from component selection and assembly to advanced tuning and flight testing. That hardware obsession became an AI build: an autonomous navigation and mapping system that retrofits AI-driven perception onto existing drone platforms.",
    status: "in-progress",
    role: "Builder / Robotics",
    tools: ["Computer Vision", "SLAM", "Python", "Embedded"],
    metrics: [
      { label: "High-Perf Drones Built", value: "3" },
      { label: "Autonomy Stack", value: "SLAM + CV" },
    ],
    link: "",
    featured: true,
  },
  {
    id: "vibe-engineering",
    name: "Experimental Vibe Engineering Software",
    tagline: "Turns plain intent into shipped, on-brand UI.",
    summary:
      "Experimental vibe-engineering software that turns a plain-language prompt into a complete, on-brand UI system — components, tokens, and layouts. It lets one person spin up production-ready interfaces in seconds instead of days.",
    status: "in-progress",
    role: "Designer / Engineer",
    tools: ["React", "Framer Motion", "LLM Pipelines"],
    metrics: [
      { label: "Templates", value: "60+" },
      { label: "Gen Time", value: "~4s" },
    ],
    link: "",
  },
  {
    id: "portfolio-blueprint",
    name: "Personal Portfolio Blueprint",
    tagline: "This site — a handcrafted, data-driven portfolio.",
    summary:
      "This very site: a personal portfolio built to feel handcrafted. Every section reads from a single content layer, so the whole thing can be re-themed or rewritten without touching a line of JSX.",
    status: "shipped",
    role: "Designer / Engineer",
    tools: ["Next.js", "Tailwind", "Framer Motion"],
    metrics: [
      { label: "Sections", value: "10" },
      { label: "Load", value: "<1s" },
    ],
    link: "",
    featured: true,
  },
  {
    id: "media-experiments",
    name: "Content / Media Experiments",
    tagline: "Early-stage content system, built on a design foundation.",
    summary:
      "A work-in-progress content system in its early innings — testing hooks, formats, and distribution, with each post treated like an experiment. Backed by years of digital design instinct and steadily scaling toward a wider audience.",
    status: "in-progress",
    role: "Creator",
    tools: ["Premiere", "Notion", "Automation"],
    metrics: [
      { label: "Reach", value: "Working toward 50K+" },
      { label: "Digital Design", value: "5 Years" },
    ],
    link: "",
  },
  {
    id: "mathlify-stem",
    name: "Mathlify STEM",
    tagline: "Free, structured STEM learning — pre-launch.",
    summary:
      "A pre-launch STEM education platform in active development — building free, structured STEM learning for students. Currently a work in progress ahead of its public launch.",
    status: "in-progress",
    role: "Builder",
    tools: ["Next.js", "Education", "Web"],
    metrics: [
      { label: "Status", value: "Pre-Launch" },
      { label: "Phase", value: "In Build" },
    ],
    link: "https://stem.mathlify.org",
  },
  {
    id: "nonprofit",
    name: "Nonprofit / Community Work",
    tagline: "Volunteer tooling and outreach for local initiatives.",
    summary:
      "Volunteer tooling and outreach for local community initiatives — simple sites, sign-up flows, and automations that help small teams reach more people with far less overhead.",
    status: "planned",
    role: "Organizer / Builder",
    tools: ["Web", "Forms", "Automation"],
    metrics: [
      { label: "People", value: "300+" },
      { label: "Events", value: "8" },
    ],
    link: "",
  },
];
