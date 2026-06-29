/**
 * CAPABILITIES / SKILLS
 * ------------------------------------------------------------------
 * Grouped by category. `level` (0–100) drives the progress bars.
 * `proof` is a short evidence statement. `related` references project
 * ids from data/projects.ts (used only as labels here).
 */

export type Accent = "blue" | "purple" | "green" | "red";

export interface Skill {
  name: string;
  level: number; // 0–100
  proof: string;
  related: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  accent: Accent;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    id: "ai-automation",
    title: "AI / Automation",
    accent: "blue",
    skills: [
      {
        name: "LLM Workflows",
        level: 88,
        proof: "Built booking + design pipelines on top of LLMs.",
        related: ["ai-booking", "design-engine"],
      },
      {
        name: "Process Automation",
        level: 84,
        proof: "Cut repetitive ops time targeting 94% efficiency.",
        related: ["ai-booking"],
      },
    ],
  },
  {
    id: "product",
    title: "Product Thinking",
    accent: "purple",
    skills: [
      {
        name: "Scoping & Prioritization",
        level: 82,
        proof: "Ship MVPs and iterate from real usage.",
        related: ["polyshield"],
      },
      {
        name: "Metrics & Outcomes",
        level: 80,
        proof: "Track impact numbers, not vanity activity.",
        related: ["media-experiments"],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    accent: "green",
    skills: [
      {
        name: "React / Next.js",
        level: 90,
        proof: "Production App Router sites with TypeScript.",
        related: ["portfolio-blueprint", "polyshield"],
      },
      {
        name: "Tailwind / Motion",
        level: 86,
        proof: "Polished, animated, responsive interfaces.",
        related: ["portfolio-blueprint"],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Systems",
    accent: "blue",
    skills: [
      {
        name: "APIs & Data",
        level: 76,
        proof: "Designed schemas and endpoints for live apps.",
        related: ["ai-booking", "polyshield"],
      },
      {
        name: "Edge / Infra",
        level: 68,
        proof: "Deployed low-latency edge functions.",
        related: ["polyshield"],
      },
    ],
  },
  {
    id: "design",
    title: "UI/UX Design",
    accent: "purple",
    skills: [
      {
        name: "Interface Design",
        level: 83,
        proof: "Premium, system-driven visual language.",
        related: ["design-engine", "portfolio-blueprint"],
      },
    ],
  },
  {
    id: "prompt",
    title: "Prompt Engineering",
    accent: "green",
    skills: [
      {
        name: "Structured Prompting",
        level: 85,
        proof: "Reliable outputs via schemas and guardrails.",
        related: ["design-engine"],
      },
    ],
  },
  {
    id: "research",
    title: "Research",
    accent: "blue",
    skills: [
      {
        name: "Technical Research",
        level: 74,
        proof: "Evaluate tools and approaches before committing.",
        related: [],
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    accent: "red",
    skills: [
      {
        name: "Writing & Demos",
        level: 80,
        proof: "Explain systems clearly to any audience.",
        related: ["media-experiments"],
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    accent: "purple",
    skills: [
      {
        name: "Team Coordination",
        level: 72,
        proof: "Collaborated with 5+ teams and groups.",
        related: ["nonprofit"],
      },
    ],
  },
  {
    id: "content",
    title: "Content / Media",
    accent: "green",
    skills: [
      {
        name: "Short-form Content",
        level: 78,
        proof: "Tested hooks and distribution at 50K+ reach.",
        related: ["media-experiments"],
      },
    ],
  },
];
