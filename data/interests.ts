/**
 * MORE ABOUT ME
 * ------------------------------------------------------------------
 * Feeds the tabbed "More About Me" section:
 *  - overview:   short bio paragraphs
 *  - hobbies:    label + icon (lucide name)
 *  - interests:  label + icon
 *  - builds:     informal things you tinker with
 *  - principles: operating rules
 */

import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Rocket,
  Workflow,
  Cpu,
  PenTool,
  Brain,
  Clapperboard,
  Dumbbell,
  FlaskConical,
  Plane,
  Gamepad2,
  BookOpen,
  Music,
  Camera,
  Hammer,
  Terminal,
} from "lucide-react";

export interface Tagged {
  label: string;
  icon: LucideIcon;
}

export interface Principle {
  rule: string;
  detail: string;
}

export const overview: string[] = [
  "I'm a builder at heart. I learn by making things and shipping them, and most of my time goes into AI systems, automation, and product design. What I really enjoy is taking a messy, manual problem and turning it into a clean, repeatable system — something that keeps working long after I've stepped away from it. I care less about how clever a solution looks and more about whether it actually holds up in the real world.",
  "Outside of building, I'm into fitness, drones and robotics, and figuring out why people do what they do. Those interests feed back into the work more than you'd think: training teaches consistency, hardware teaches patience, and psychology shapes how I design things people actually want to use. This page is a living blueprint of where I've been and where I'm headed — and it'll keep changing as I do.",
]; // ← edit these paragraphs to tell your own story

export const hobbies: Tagged[] = [
  { label: "Building side projects", icon: Hammer },
  { label: "Fitness & training", icon: Dumbbell },
  { label: "Drones / robotics", icon: Plane },
  { label: "Gaming", icon: Gamepad2 },
  { label: "Photography", icon: Camera },
  { label: "Music", icon: Music },
];

export const interests: Tagged[] = [
  { label: "AI tools", icon: Bot },
  { label: "Startups", icon: Rocket },
  { label: "Automation", icon: Workflow },
  { label: "Engineering systems", icon: Cpu },
  { label: "Design", icon: PenTool },
  { label: "Psychology", icon: Brain },
  { label: "Content creation", icon: Clapperboard },
  { label: "Tech experiments", icon: FlaskConical },
  { label: "Reading", icon: BookOpen },
];

export const builds: Tagged[] = [
  { label: "Automation scripts", icon: Workflow },
  { label: "AI agents & tools", icon: Bot },
  { label: "CLI / dev tools", icon: Terminal },
  { label: "Drone tinkering", icon: Plane },
  { label: "Design systems", icon: PenTool },
];

export const principles: Principle[] = [
  {
    rule: "Build before debating.",
    detail: "A rough prototype settles arguments faster than a meeting.",
  },
  {
    rule: "Measure outcomes, not effort.",
    detail: "Hours look good; results matter.",
  },
  {
    rule: "Systems beat motivation.",
    detail: "Design the process so the work happens by default.",
  },
  {
    rule: "Ship proof, not excuses.",
    detail: "Public proof of work compounds over time.",
  },
  {
    rule: "Learn by making.",
    detail: "Understanding follows building, not the other way around.",
  },
];
