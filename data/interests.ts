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
  Mountain,
  Timer,
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
  "When people first meet me, they notice the projects: the software, the prototypes, the fundraisers, the clubs, the ideas that multiply faster than I can finish them. But the projects aren't the story. They're the byproduct of how I think, and they only tell you so much about who I actually am. I'm a builder and an engineer, but I'm also a good friend, the guy who talks too much, and someone who has failed and rebuilt more than once. We're all more than what we make, and I've learned the failures deserve as much respect as the wins. They're what shaped me.",
  "What ties it together is that I'm drawn to systems. Machine, organization, or business, I ask the same questions: why does it work this way, what's inefficient, and how could it be rebuilt better? I've always loved the idea of autonomy too. Not the cold sci-fi version that strips away humanity, but the kind that took us from man building machine to machine building for man. That instinct has sent me down a lot of paths: carpentry and soldering, leading teams and fundraisers, and lately startups, because they're the fastest way to turn an observation into real impact.",
  "I don't wait until I'm an expert to start. I learn by doing, and every project becomes another way to stretch what I'm capable of. Looking ahead, I want to build technology that reaches millions, especially at the intersection of AI, security, and engineering. My goal isn't the title; it's to become someone who sees the hard problems other people walk past and quietly makes them disappear. At my core, I just love to build, and everything else follows from that.",
];

export const hobbies: Tagged[] = [
  { label: "Rock climbing", icon: Mountain },
  { label: "Competitive speed climbing", icon: Timer },
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
