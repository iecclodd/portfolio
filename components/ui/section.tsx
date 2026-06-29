"use client";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Section — consistent anchor + max-width wrapper with an optional
 * "module" style heading (mono kicker + large title + subtitle).
 */
export function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
  className,
  headingClassName,
}: {
  id: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-site scroll-mt-24 px-6 py-20 sm:py-28",
        className
      )}
    >
      {(kicker || title) && (
        <Reveal className={cn("mb-12 max-w-3xl", headingClassName)}>
          {kicker && (
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent-green">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              {kicker}
            </p>
          )}
          {title && (
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-pretty text-base text-muted sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
