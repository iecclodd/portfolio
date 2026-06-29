/**
 * CORE PROFILE
 * ------------------------------------------------------------------
 * Top-level identity used in the boot loader, hero, terminal and
 * metadata. Edit the strings below — nothing in the JSX needs to change.
 */

export interface Profile {
  name: string;
  tagline: string; // short role line under the name
  subheadline: string; // "Systems Builder. AI Explorer. Problem Solver."
  summary: string; // supporting paragraph
  status: string; // shown as STATUS in the terminal card
  role: string; // shown as ROLE
  focus: string[]; // shown as FOCUS (joined with •)
  location: string;
  resumeUrl: string; // placeholder path — won't break the build if missing
  bootSequence: string[]; // lines printed by the boot loader, in order
}

export const profile: Profile = {
  name: "Azaan Noman",
  tagline: "Systems Builder · AI Explorer · Problem Solver",
  subheadline: "Systems Builder. AI Explorer. Problem Solver.",
  summary:
    "I build tools, automate workflows, and turn ideas into systems with real-world impact.",
  status: "ACTIVE",
  role: "BUILDER",
  focus: ["AI", "AUTOMATION", "SYSTEMS"],
  location: "EARTH",
  resumeUrl: "/resume.pdf",
  bootSequence: [
    "INITIALIZING AZAAN.SYSTEM...",
    "MOUNTING CORE MODULES...",
    "LOADING BUILDS...",
    "LOADING CAPABILITIES...",
    "LOADING MISSION LOG...",
    "CALIBRATING ROADMAP...",
    "ESTABLISHING TRANSMISSION LINK...",
    "SYSTEM ONLINE.",
  ],
};
