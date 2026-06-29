"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * TypingText — types out a string character-by-character with a caret.
 * Calls `onDone` when finished. Used by the boot loader and hero.
 */
export function TypingText({
  text,
  speed = 28,
  startDelay = 0,
  className,
  caret = true,
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  caret?: boolean;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay]);

  return (
    <span className={cn(className)}>
      {shown}
      {caret && (
        <span className="ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.12em] animate-blink bg-accent-green align-middle" />
      )}
    </span>
  );
}
