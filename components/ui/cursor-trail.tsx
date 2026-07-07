"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

const TRAIL_MS = 320; // how long the ribbon lingers
const HEAD_LERP = 0.35; // smoothing — head glides toward the cursor
const MAX_WIDTH = 4.5;

/**
 * CursorTrail — a smooth, tapered ink-brush ribbon that flows behind
 * the cursor and dissolves. Flat cel color, no particles, no blur.
 * Pointer-fine only, honors reduced motion.
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
    let color = "rgb(111 78 55)";
    let colorClock = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

      // ink color follows the active brew
      if (colorClock-- <= 0) {
        colorClock = 90;
        const c = getComputedStyle(document.documentElement)
          .getPropertyValue("--c-accent-1")
          .trim();
        if (c) color = `rgb(${c})`;
      }

      const now = performance.now();

      if (target.x >= 0) {
        // glide the head toward the cursor for a fluid, non-choppy line
        head.x += (target.x - head.x) * HEAD_LERP;
        head.y += (target.y - head.y) * HEAD_LERP;
        const last = points[points.length - 1];
        if (!last || Math.hypot(head.x - last.x, head.y - last.y) > 1.5) {
          points.push({ x: head.x, y: head.y, t: now });
        }
      }

      points = points.filter((p) => now - p.t < TRAIL_MS);
      if (points.length < 2) return;

      // tapered ribbon: young segments are thick, old ones thin out
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const age = (now - b.t) / TRAIL_MS; // 0 fresh → 1 gone
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = Math.max(0.4, MAX_WIDTH * (1 - age));
        ctx.globalAlpha = 0.85 * (1 - age * age);
        ctx.stroke();
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
