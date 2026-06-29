import type { LucideIcon } from "lucide-react";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SectionDivider — a calm separator between sections: a tapered hairline
 * rule with a small framed coffee icon at center and a wisp of steam
 * rising from it. Quiet by default, warm on close inspection.
 */
export function SectionDivider({
  icon: Icon = Coffee,
  tone = "coffee",
  className,
}: {
  icon?: LucideIcon;
  tone?: "coffee" | "matcha";
  className?: string;
}) {
  const ink = tone === "matcha" ? "text-accent-green" : "text-accent-blue";
  const steam = tone === "matcha" ? "bg-accent-green/40" : "bg-accent-blue/40";

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-site items-center gap-5 px-6 py-4",
        className
      )}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />

      <span
        className={cn(
          "relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card shadow-[0_10px_24px_-16px_rgba(111,78,55,0.6)]",
          ink
        )}
      >
        {/* rising steam */}
        <span className="pointer-events-none absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1">
          <span className={cn("h-3 w-px rounded-full animate-steam [animation-delay:0s]", steam)} />
          <span className={cn("h-3 w-px rounded-full animate-steam [animation-delay:0.8s]", steam)} />
          <span className={cn("h-3 w-px rounded-full animate-steam [animation-delay:1.6s]", steam)} />
        </span>
        <Icon className="h-4 w-4" />
      </span>

      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}
