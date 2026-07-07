"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrewPicker } from "@/components/ui/brew-picker";

const links = [
  { label: "Home", href: "#system" },
  { label: "Impact", href: "#impact" },
  { label: "Experience", href: "#mission-log" },
  { label: "Work", href: "#builds" },
  { label: "Skills", href: "#capabilities" },
  { label: "Fidgets", href: "#fidget" },
  { label: "About", href: "#more" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Contact", href: "#transmission" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("system");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-site items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-300",
          scrolled
            ? "border-border glass shadow-lg shadow-accent-blue/10"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Brand */}
        <a href="#system" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-blue text-card">
            <Coffee className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Azaan Noman
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground",
                  active === l.href.slice(1) &&
                    "font-medium text-accent-green"
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* order a brew — live theme switcher */}
          <BrewPicker className="hidden sm:flex" />

          {/* primary CTA */}
          <a
            href="#transmission"
            className="hidden rounded-full bg-accent-blue px-4 py-1.5 text-sm font-medium text-card transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Let&apos;s talk
          </a>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-4 right-4 top-[4.5rem] z-50 rounded-2xl border border-border glass p-3 lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-accent-blue/10 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between border-t border-border px-3 pt-3 sm:hidden">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                Order a brew
              </span>
              <BrewPicker />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
