import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // ── Brew-aware palette ───────────────────────────────────
        // Channels live in globals.css; [data-brew] on <html> swaps
        // the whole scheme (espresso / matcha / strawberry).
        background: "rgb(var(--c-background) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        border: "rgb(var(--c-border) / <alpha-value>)",
        foreground: "rgb(var(--c-foreground) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        accent: {
          blue: "rgb(var(--c-accent-1) / <alpha-value>)", // primary
          purple: "rgb(var(--c-accent-2) / <alpha-value>)", // secondary
          green: "rgb(var(--c-accent-3) / <alpha-value>)", // co-primary
          red: "rgb(var(--c-accent-4) / <alpha-value>)", // alert
        },
        matcha: {
          DEFAULT: "#7C9A3C", // matcha
          mist: "#EDF2DE", // faintest green wash (tints / backgrounds)
          soft: "#D4E0B0", // soft leaf
          light: "#9DBA5A", // bright matcha
          deep: "#5E7A2C", // steeped matcha
          dark: "#46591F", // darkest leaf
        },
        // ── Strawberry — the quietest accent, used sparingly ─────
        strawberry: {
          DEFAULT: "#D26A82", // soft strawberry
          soft: "#E7B7C2", // pale berry
          mist: "#F7E6EA", // faintest pink wash
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "1200px",
      },
      keyframes: {
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // gentle rising steam for the coffee dividers
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "20%": { opacity: "0.55" },
          "100%": { transform: "translateY(-14px) scaleX(0.7)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration,8s)) linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2.4s linear infinite",
        steam: "steam 3.2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
