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
  const isMatcha = tone === "matcha";
  const ink = isMatcha ? "text-matcha-deep" : "text-accent-blue";
  const steam = isMatcha ? "bg-matcha-light/50" : "bg-accent-purple/45";
  // subtle warm/green tint so the bean & leaf icons read a touch more clearly
  const frameTint = isMatcha
    ? "border-matcha-soft bg-matcha-mist"
    : "border-border bg-accent-purple/[0.06]";

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
          "relative grid h-12 w-12 shrink-0 place-items-center rounded-full border shadow-[0_10px_24px_-16px_rgba(111,78,55,0.6)]",
          frameTint,
          ink
        )}
      >
        {/* rising steam */}
        <span className="pointer-events-none absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1">
          <span className={cn("h-3 w-px rounded-full animate-steam [animation-delay:0s]", steam)} />
          <span className={cn("h-3 w-px rounded-full animate-steam [animation-delay:0.8s]", steam)} />
          <span className={cn("h-3 w-px rounded-full animate-steam [animation-delay:1.6s]", steam)} />
        </span>
        <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={2.25} />
      </span>

      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}
