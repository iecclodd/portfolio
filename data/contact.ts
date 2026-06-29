/**
 * CONTACT / TRANSMISSION
 * ------------------------------------------------------------------
 * Channels rendered in the final "Transmission" section.
 * `href` is used directly: mailto:, https://, or a file path.
 * `icon` is a lucide-react export name.
 */

import type { LucideIcon } from "lucide-react";
import { Mail, Linkedin, Github, Instagram, FileDown } from "lucide-react";

export interface Channel {
  id: string;
  label: string;
  value: string; // displayed text
  href: string;
  icon: LucideIcon;
  primary?: boolean;
}

export const contact = {
  email: "azaannoman03@gmail.com",
  headline: "Open a channel",
  blurb:
    "Available for serious builds, collaborations, and opportunities. Signal is open — send a transmission.",
  channels: [
    {
      id: "email",
      label: "Email",
      value: "azaannoman03@gmail.com",
      href: "mailto:azaannoman03@gmail.com",
      icon: Mail,
      primary: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/azaan",
      href: "https://linkedin.com/in/azaan",
      icon: Linkedin,
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/azaan",
      href: "https://github.com/azaan",
      icon: Github,
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@iecclodd",
      href: "https://instagram.com/iecclodd",
      icon: Instagram,
    },
    {
      id: "resume",
      label: "Resume",
      value: "Download PDF",
      href: "/resume.pdf",
      icon: FileDown,
    },
  ] as Channel[],
};
