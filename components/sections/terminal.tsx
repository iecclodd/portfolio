"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { contact } from "@/data/contact";
import { overview } from "@/data/interests";

interface Block {
  cmd: string;
  out: string[];
}

const COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "coffee",
  "clear",
] as const;

export function TerminalConsole() {
  const [value, setValue] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [past, setPast] = useState<string[]>([]);
  const [pointer, setPointer] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const welcome = useMemo(
    () => [
      `${profile.name} — interactive console`,
      "Type a command and press Enter. Try 'help' to get started.",
    ],
    []
  );

  // run a command → returns output lines (or null to signal "clear")
  function run(raw: string): string[] | null {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return [];

    switch (cmd) {
      case "help":
        return [
          "Available commands:",
          "  whoami       who I am, in one line",
          "  about        a short bio",
          "  skills       what I work with",
          "  projects     things I've built",
          "  experience   the timeline so far",
          "  contact      how to reach me",
          "  coffee       ☕",
          "  clear        clear the screen",
        ];
      case "whoami":
        return [`${profile.name} — ${profile.tagline}`, profile.summary];
      case "about":
        return overview;
      case "skills":
        return skills.flatMap((c) => [
          `${c.title}:`,
          ...c.skills.map((s) => `  • ${s.name} — ${s.level}%`),
        ]);
      case "projects":
        return projects.map(
          (p) => `  [${p.status.padEnd(11)}] ${p.name} — ${p.tagline}`
        );
      case "experience":
        return experience.map((e) => `  ${e.year.padEnd(8)} ${e.title}`);
      case "contact":
        return [
          ...contact.channels.map((c) => `  ${c.label.padEnd(9)} ${c.value}`),
          "",
          `Or just email me: ${contact.email}`,
        ];
      case "coffee":
        return [
          "☕  brewing…",
          "Thanks for stopping by — now let's build something.",
        ];
      case "clear":
        return null;
      default:
        return [
          `command not found: ${cmd}`,
          "Type 'help' to see what I can do.",
        ];
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = value;
    const out = run(cmd);
    if (out === null) {
      setBlocks([]);
    } else {
      setBlocks((b) => [...b, { cmd, out }]);
    }
    if (cmd.trim()) setPast((p) => [...p, cmd]);
    setPointer(null);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!past.length) return;
      const next = pointer === null ? past.length - 1 : Math.max(0, pointer - 1);
      setPointer(next);
      setValue(past[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (pointer === null) return;
      const next = pointer + 1;
      if (next >= past.length) {
        setPointer(null);
        setValue("");
      } else {
        setPointer(next);
        setValue(past[next]);
      }
    }
  }

  // keep the view pinned to the latest output
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [blocks]);

  return (
    <div>
      <div
        onClick={() => inputRef.current?.focus()}
        className="overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-[0_24px_60px_-30px_rgba(111,78,55,0.5)]"
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-background/50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-accent-red/80" />
          <span className="h-3 w-3 rounded-full bg-accent-purple/80" />
          <span className="h-3 w-3 rounded-full bg-accent-green/80" />
          <span className="ml-2 text-xs text-muted">
            azaan@portfolio — zsh
          </span>
        </div>

        {/* body */}
        <div
          ref={bodyRef}
          className="h-[20rem] space-y-3 overflow-y-auto p-5 leading-relaxed"
        >
          {/* welcome */}
          <div className="space-y-0.5 text-muted">
            {welcome.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>

          {/* history */}
          {blocks.map((b, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2">
                <Prompt />
                <span className="text-foreground">{b.cmd}</span>
              </div>
              {b.out.length > 0 && (
                <div className="whitespace-pre-wrap pl-1 text-muted">
                  {b.out.join("\n")}
                </div>
              )}
            </div>
          ))}

          {/* live input */}
          <form onSubmit={submit} className="flex items-center gap-2">
            <Prompt />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              className="flex-1 bg-transparent text-foreground caret-accent-blue outline-none placeholder:text-muted/60"
              placeholder="type 'help' …"
            />
          </form>
        </div>
      </div>

      {/* quick command chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {COMMANDS.filter((c) => c !== "clear").map((c) => (
          <button
            key={c}
            onClick={() => {
              const out = run(c);
              if (out === null) setBlocks([]);
              else setBlocks((b) => [...b, { cmd: c, out }]);
              setPast((p) => [...p, c]);
              inputRef.current?.focus();
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-accent-green">azaan@portfolio</span>
      <span className="text-muted">:</span>
      <span className="text-accent-blue">~</span>
      <span className="text-muted">$</span>
    </span>
  );
}
