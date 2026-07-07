"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  t: number;
  radius: number;
  drift: number;
  alpha: number;
  ring: boolean;
}

const TRAIL_MS = 900; // how long bubbles linger
const HEAD_LERP = 0.18; // smoothing — head floats toward the cursor
const MIN_STEP = 9;
const MAX_BUBBLES = 42;

function channelToRgb(channel: string) {
  return channel.trim().split(/\s+/).join(", ");
}

/**
 * CursorTrail — a gentle wake of translucent bubbles that floats behind
 * the cursor and dissolves. Pointer-fine only, honors reduced motion.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let points: TrailPoint[] = [];
    const target = { x: -1, y: -1 };
    const head = { x: -1, y: -1 };
    let color = "111, 78, 55";
    let colorClock = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.ceil(window.innerWidth * dpr);
      canvas.height = Math.ceil(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (head.x < 0) {
        head.x = e.clientX;
        head.y = e.clientY;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // bubble tint follows the active brew
      if (colorClock-- <= 0) {
        colorClock = 90;
        const c = getComputedStyle(document.documentElement)
          .getPropertyValue("--c-accent-1")
          .trim();
        if (c) color = channelToRgb(c);
      }

      const now = performance.now();

      if (target.x >= 0) {
        // glide the head toward the cursor for a relaxed, floaty wake
        head.x += (target.x - head.x) * HEAD_LERP;
        head.y += (target.y - head.y) * HEAD_LERP;
        const last = points[points.length - 1];
        if (!last || Math.hypot(head.x - last.x, head.y - last.y) > MIN_STEP) {
          const count = Math.random() > 0.7 ? 2 : 1;
          for (let i = 0; i < count; i++) {
            points.push({
              x: head.x + (Math.random() - 0.5) * 10,
              y: head.y + (Math.random() - 0.5) * 10,
              t: now - Math.random() * 80,
              radius: 4 + Math.random() * 9,
              drift: -10 + Math.random() * 20,
              alpha: 0.1 + Math.random() * 0.12,
              ring: Math.random() > 0.42,
            });
          }
          if (points.length > MAX_BUBBLES) {
            points = points.slice(points.length - MAX_BUBBLES);
          }
        }
      }

      points = points.filter((p) => now - p.t < TRAIL_MS);
      if (points.length < 1) return;

      for (const point of points) {
        const age = (now - point.t) / TRAIL_MS; // 0 fresh -> 1 gone
        const easeOut = 1 - age;
        const radius = point.radius + age * 9;
        const x = point.x + point.drift * age;
        const y = point.y - age * 20;
        const alpha = point.alpha * easeOut * easeOut;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.8);
        glow.addColorStop(0, `rgba(${color}, ${alpha})`);
        glow.addColorStop(0.7, `rgba(${color}, ${alpha * 0.35})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (point.ring) {
          ctx.strokeStyle = `rgba(${color}, ${alpha * 1.5})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${color}, ${alpha * 0.72})`;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden
    />
  );
}
