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
  link?: string; // optional external link (org site, etc.)
}

export const experience: MissionEntry[] = [
  {
    id: "seven-lakes",
    year: "2024 — 2028",
    title: "Seven Lakes High School",
    description:
      "Carrying a founder's workload while still in high school — running ventures, an internship, and officer roles across seven organizations.",
    status: "active",
    importance: 3,
  },
  {
    id: "student-council",
    year: "2025 — Present",
    title: "SLHS Student Council — Officer",
    description:
      "Lead officer behind a 600+ member organization, orchestrating $100K+ in annual fundraising and 10,000+ volunteer hours a year that fuel thousands of donated meals and supplies to local shelters.",
    status: "active",
    importance: 5,
    link: "https://linktr.ee/7lakesstuco",
  },
  {
    id: "hearts-for-elders",
    year: "2025 — Present",
    title: "Hearts for Elders — Secretary & Chapter Lead",
    description:
      "Helped scale a senior-care nonprofit into a global network — launching chapters across the U.S., Nigeria, and Kenya and coordinating international delivery of food, hygiene, and essential supplies to underserved elderly communities.",
    status: "active",
    importance: 4,
    link: "https://www.hearts4elders.org",
  },
  {
    id: "mecclabs",
    year: "2026 — Present",
    title: "Mecclabs — Engineering Director",
    description:
      "Director architecting rigorous, hands-on curriculum across five engineering disciplines — aerospace, electrical, biomedical, chemical, and mechanical — while helping generate nearly $20K through education programs.",
    status: "active",
    importance: 4,
    link: "https://www.mecclabs.com",
  },
  {
    id: "tsa",
    year: "2026 — Present",
    title: "Technology Student Association — Officer",
    description:
      "Officer preparing 50+ competitors for regional, state, and national contests — building the guides, workshops, and mentorship that carried the chapter all the way to the TSA National Conference.",
    status: "active",
    importance: 3,
    link: "https://slhstsa.wixsite.com/home",
  },
  {
    id: "um-research",
    year: "May — Aug 2026",
    title: "University of Miami — AI Research Collaborator",
    description:
      "Collaborating with a biomedical engineering professor at the University of Miami on interpretable AI for prosthetic gesture recognition — building the analysis model and co-authoring the research abstract. Bridges machine learning, biomedical engineering, and next-generation human-computer interaction.",
    status: "active",
    importance: 5,
  },
];
