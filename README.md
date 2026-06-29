# AZAAN.SYSTEM — Life Blueprint Portfolio

A premium, single-page personal portfolio built to feel like an interactive
operating system: boot loader, glass navbar, cinematic hero, ASCII modules,
impact metrics, mission-log timeline, build registry, capability dashboard,
roadmap queue, a live interactive terminal, and a transmission/contact array.

Stack: **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
lucide-react**. Magic UI / Aceternity effects (BorderBeam, DotPattern,
BackgroundBeams, NumberTicker, WordRotate, CardSpotlight, HoverBorderGradient,
animated timeline, magnetic buttons, cursor spotlight) are recreated locally in
`components/ui` so there are no external registry dependencies to break.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server  → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## File structure

```
app/
  layout.tsx        # fonts, metadata, <body> shell
  page.tsx          # composes every section in order
  globals.css       # theme tokens, grain, glass, scrollbar, gradients
data/               # ← EDIT YOUR INFO HERE (no JSX changes needed)
  profile.ts        # name, taglines, terminal card, boot sequence
  stats.ts          # "Impact At A Glance" big-number cards
  projects.ts       # builds / project cards + status board
  experience.ts     # mission-log timeline entries
  skills.ts         # capability categories + levels
  roadmap.ts        # next-objectives checklist
  interests.ts      # overview / hobbies / interests / builds / principles
  contact.ts        # transmission channels + email
components/
  sections/         # one file per page section
  ui/               # reusable effects/primitives (BorderBeam, NumberTicker, …)
lib/utils.ts        # cn() class merge helper
public/resume.pdf   # placeholder — replace with your real resume
tailwind.config.ts  # colors, fonts, keyframes/animations
```

## Where to edit your information

Everything you'll routinely change lives in **`/data`**. The components read
from these files, so you never touch JSX to update content.

| You want to change…            | Edit this file        |
| ------------------------------ | --------------------- |
| Name, taglines, terminal card  | `data/profile.ts`     |
| Big impact numbers             | `data/stats.ts`       |
| Projects / builds              | `data/projects.ts`    |
| Timeline (mission log)         | `data/experience.ts`  |
| Skills & levels                | `data/skills.ts`      |
| Roadmap objectives             | `data/roadmap.ts`     |
| Hobbies / interests / principles | `data/interests.ts` |
| Email, LinkedIn, GitHub, resume | `data/contact.ts`    |
| Your resume PDF                | `public/resume.pdf`   |

### Add a new project

Open `data/projects.ts`, copy any object in the `projects` array, and edit it:

```ts
{
  id: "my-new-build",            // unique
  name: "My New Build",
  tagline: "One-line description.",
  status: "in-progress",          // "shipped" | "in-progress" | "planned"
  importance: 8,                  // 1–10 → drives the score bar
  role: "Founder / Engineer",
  tools: ["Next.js", "TypeScript"],
  metrics: [
    { label: "Users", value: "1.2K+" },
    { label: "Latency", value: "<25ms" },
  ],
  link: "https://example.com",    // "" shows the button without navigating away
  featured: true,                 // optional: wider bento card
}
```

It automatically appears in the bento grid **and** the Completed / In Progress /
Planned status board.

### Change stats

In `data/stats.ts`, edit `value` (the number the counter animates to), plus
`prefix`/`suffix` (e.g. `"+"`, `"K+"`, `"%"`), `label`, `explanation`, the
lucide `icon`, and `accent` (`blue` | `purple` | `green` | `red`).

### Change roadmap items

In `data/roadmap.ts`, edit each objective's `label`, `status`
(`done` | `active` | `queued`), `priority`
(`critical` | `high` | `medium` | `low`), `target` (any date text), and
`progress` (0–100).

## Notes

- **Resume:** the Download buttons point at `/resume.pdf`. A placeholder PDF is
  included; drop your real file at `public/resume.pdf` to replace it. A missing
  file won't break the build.
- **Boot loader** runs once per browser session (and is skipped for users with
  reduced-motion preferences).
- **Colors & fonts** are centralized in `tailwind.config.ts` and `app/globals.css`.
