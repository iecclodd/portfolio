"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** A subtle SVG grid background (Magic UI GridPattern style). */
export function GridPattern({
  width = 48,
  height = 48,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-foreground/[0.02] stroke-foreground/[0.06]",
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

/** A subtle SVG dot grid (Magic UI DotPattern style). */
export function DotPattern({
  width = 22,
  height = 22,
  radius = 1,
  className,
}: {
  width?: number;
  height?: number;
  radius?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-foreground/[0.12]",
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={radius} cy={radius} r={radius} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
