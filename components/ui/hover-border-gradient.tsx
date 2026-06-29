"use client";

import { cn } from "@/lib/utils";

/**
 * HoverBorderGradient — a button/wrapper with an animated gradient border
 * that intensifies on hover (Aceternity style). Renders as a button by
 * default; pass `as="a"` semantics by wrapping with a link if needed.
 */
export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative rounded-full p-[1.5px] transition-transform duration-200 active:scale-[0.98]",
        containerClassName
      )}
    >
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#3B82F6,#7C3AED,#22C55E,#3B82F6)] opacity-40 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#3B82F6,#7C3AED,#22C55E,#3B82F6)] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-medium text-foreground",
          className
        )}
      >
        {children}
      </span>
    </button>
  );
}
