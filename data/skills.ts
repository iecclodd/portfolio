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
    id: "engineering-design",
    title: "Engineering & Design",
    accent: "blue",
    skills: [
      {
        name: "Engineering Design & CAD",
        level: 90,
        proof:
          "Design hands-on engineering projects and curriculum across 5 disciplines at Mecclabs.",
        related: ["drone-autonomy"],
      },
      {
        name: "Rapid & Iterative Prototyping",
        level: 88,
        proof:
          "Built and tuned 3 high-performance FPV drones from the ground up.",
        related: ["drone-autonomy"],
      },
      {
        name: "Systems Integration & Troubleshooting",
        level: 85,
        proof:
          "Layered AI perception onto existing drone platforms and debugged the stack end-to-end.",
        related: ["drone-autonomy", "polyshield"],
      },
    ],
  },
  {
    id: "fabrication-hardware",
    title: "Fabrication & Hardware",
    accent: "purple",
    skills: [
      {
        name: "Mechanical Assembly & Fabrication",
        level: 87,
        proof:
          "Component selection through full assembly of physical products.",
        related: ["drone-autonomy"],
      },
      {
        name: "Electronics & Circuit Integration",
        level: 84,
        proof:
          "Soldering, wiring, and electrical circuit integration on custom hardware.",
        related: ["drone-autonomy"],
      },
      {
        name: "Carpentry & Tooling",
        level: 82,
        proof:
          "Carpentry, woodworking, and confident hand- and power-tool proficiency.",
        related: [],
      },
    ],
  },
  {
    id: "research-execution",
    title: "Research & Execution",
    accent: "green",
    skills: [
      {
        name: "Technical Research & Documentation",
        level: 86,
        proof:
          "Co-authoring research on interpretable AI for prosthetics with a UM professor.",
        related: [],
      },
      {
        name: "Project Planning & Process Optimization",
        level: 85,
        proof:
          "Plan and ship projects end-to-end while streamlining repeatable processes.",
        related: ["mathlify-stem", "polyshield"],
      },
    ],
  },
  {
    id: "leadership-collaboration",
    title: "Leadership & Collaboration",
    accent: "red",
    skills: [
      {
        name: "Leadership & Team Development",
        level: 92,
        proof:
          "Officer and director roles; mentor student leaders and volunteers across 7 orgs.",
        related: [],
      },
      {
        name: "Cross-Functional Collaboration",
        level: 88,
        proof:
          "Work across engineers, leadership teams, and community partners to ship outcomes.",
        related: ["polyshield"],
      },
      {
        name: "Public Speaking & Strategic Communication",
        level: 87,
        proof:
          "Present, pitch, and align large audiences and stakeholders.",
        related: [],
      },
    ],
  },
  {
    id: "operations-initiative",
    title: "Operations & Initiative",
    accent: "blue",
    skills: [
      {
        name: "Partnership & Fundraising Development",
        level: 90,
        proof:
          "Drove $100K+ in annual fundraising plus sponsor and partner outreach.",
        related: [],
      },
      {
        name: "Event Planning & Project Management",
        level: 88,
        proof:
          "Coordinated school-wide events and logistics serving hundreds.",
        related: [],
      },
      {
        name: "Problem Solving & Entrepreneurial Drive",
        level: 89,
        proof:
          "Analytical, adaptable, and self-starting in fast-moving environments.",
        related: [],
      },
    ],
  },
];
