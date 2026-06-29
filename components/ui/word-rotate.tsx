"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** WordRotate — cycles through words with a vertical fade/slide. */
export function WordRotate({
  words,
  duration = 2600,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      duration
    );
    return () => clearInterval(id);
  }, [words.length, duration]);

  return (
    <span className="relative inline-grid overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: "60%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-60%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap",
            className
          )}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
