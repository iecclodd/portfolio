import { Coffee, Heart } from "lucide-react";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";

const socials = contact.channels.filter((c) => c.href.startsWith("http"));

export function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-site px-6 pb-12 pt-8">
      {/* social links */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted transition-colors hover:border-accent-green/50 hover:text-accent-green"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row">
        <span className="flex items-center gap-2">
          <Coffee className="h-4 w-4 text-accent-blue" />© {new Date().getFullYear()}{" "}
          {profile.name}
        </span>
        <span className="flex flex-col items-center gap-1 sm:items-end">
          <span className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 text-accent-red" /> and a
            lot of coffee
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted/70">
            psst — try typing &ldquo;brew&rdquo;
          </span>
        </span>
      </div>
    </footer>
  );
}
