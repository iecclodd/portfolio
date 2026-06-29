import { cn } from "@/lib/utils";

type Tone = "blue" | "purple" | "green" | "red" | "muted";

const toneMap: Record<Tone, string> = {
  blue: "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
  purple: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
  green: "border-accent-green/30 bg-accent-green/10 text-accent-green",
  red: "border-accent-red/30 bg-accent-red/10 text-accent-red",
  muted: "border-border bg-foreground/5 text-muted",
};

export function StatusBadge({
  children,
  tone = "muted",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider",
        toneMap[tone],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
