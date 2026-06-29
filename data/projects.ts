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
    tagline: "Adaptive protection layer that hardens apps against abuse.",
    summary:
      "A security layer that sits in front of an app and learns what abuse looks like. It scores traffic in real time and blocks bad actors while keeping latency low enough that real users never notice it's there.",
    status: "in-progress",
    role: "Founder / Lead Engineer",
    tools: ["Next.js", "TypeScript", "Edge Functions", "PostgreSQL"],
    metrics: [
      { label: "Threats Modeled", value: "40+" },
      { label: "Latency", value: "<25ms" },
    ],
    link: "",
    featured: true,
  },
  {
    id: "ai-booking",
    name: "AI Booking System",
    tagline: "Conversational scheduling that fills calendars on autopilot.",
    summary:
      "A conversational assistant that talks to leads, answers their questions, and books them straight into a live calendar. Reminders and follow-ups run automatically, cutting no-shows without any manual work.",
    status: "shipped",
    role: "Builder",
    tools: ["Next.js", "OpenAI", "Twilio", "Supabase"],
    metrics: [
      { label: "Bookings", value: "1.2K+" },
      { label: "No-show Drop", value: "-31%" },
    ],
    link: "",
  },
  {
    id: "design-engine",
    name: "Design Generation Engine",
    tagline: "Turns prompts into on-brand UI systems in seconds.",
    summary:
      "A pipeline that turns a plain-language prompt into a complete, on-brand UI system — components, tokens, and layouts. It lets one person spin up production-ready interfaces in seconds instead of days.",
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
    tagline: "Short-form content systems testing distribution & hooks.",
    summary:
      "An ongoing series of short-form content experiments testing hooks, formats, and distribution. Each post is treated like a test — measured, iterated, and fed back into a repeatable content system.",
    status: "in-progress",
    role: "Creator",
    tools: ["Premiere", "Notion", "Automation"],
    metrics: [
      { label: "Reach", value: "50K+" },
      { label: "Posts", value: "120+" },
    ],
    link: "",
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
