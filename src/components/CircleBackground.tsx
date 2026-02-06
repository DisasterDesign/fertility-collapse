'use client';

import { useRef, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────
interface Circle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  scale: number;
  targetScale: number;
}

// ─── Count Curve ──────────────────────────────────────────────
function getTargetCount(scroll: number, max: number): number {
  if (scroll <= 0.005) return 1;

  // Growth phase: exponential
  if (scroll < 0.28) {
    const t = scroll / 0.28;
    return Math.min(Math.round(Math.pow(2, t * 8)), max);
  }

  // Plateau
  if (scroll < 0.35) return max;

  // Decline: cubic decay
  if (scroll < 0.98) {
    const t = (scroll - 0.35) / 0.63;
    return Math.max(0, Math.round(max * Math.pow(1 - t, 3)));
  }

  return 0;
}

// ─── Color Interpolation ─────────────────────────────────────
const colorStops = [
  { at: 0.00, color: [212, 136, 15] },
  { at: 0.25, color: [230, 170, 20] },
  { at: 0.45, color: [224, 112, 32] },
  { at: 0.60, color: [192, 57, 43] },
  { at: 0.75, color: [139, 0, 0] },
  { at: 0.90, color: [85, 85, 102] },
];

function getColor(scroll: number): [number, number, number] {
  for (let i = 0; i < colorStops.length - 1; i++) {
    if (scroll <= colorStops[i + 1].at) {
      const t = (scroll - colorStops[i].at) / (colorStops[i + 1].at - colorStops[i].at);
      return [
        Math.round(colorStops[i].color[0] + (colorStops[i + 1].color[0] - colorStops[i].color[0]) * t),
        Math.round(colorStops[i].color[1] + (colorStops[i + 1].color[1] - colorStops[i].color[1]) * t),
        Math.round(colorStops[i].color[2] + (colorStops[i + 1].color[2] - colorStops[i].color[2]) * t),
      ];
    }
  }
  return [85, 85, 102];
}

// ─── Global Opacity ───────────────────────────────────────────
function getOpacity(scroll: number): number {
  if (scroll < 0.50) return 1.0;
  if (scroll > 1.0) return 0.0;
  return 1.0 - ((scroll - 0.50) / 0.50);
}

// ─── Component ────────────────────────────────────────────────
export default function CircleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<Circle[]>([]);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nextIdRef = useRef(0);
  const animRef = useRef(0);
  const maxCountRef = useRef(256);

  const spawnCircle = useCallback((w: number, h: number): Circle => {
    return {
      id: nextIdRef.current++,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 16 + Math.random() * 14,
      scale: 0,
      targetScale: 1,
    };
  }, []);

  useEffect(() => {
    // Skip reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mobile detection
    const isMobile = window.innerWidth < 768;
    maxCountRef.current = isMobile ? 128 : 256;

    // Resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    // Scroll
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    onScroll();

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Touch
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Init with 1 circle
    const circles = circlesRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (circles.length === 0) {
      circles.push(spawnCircle(w, h));
    }

    // ─── Animation Loop ──────────────────────────────────────
    const animate = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scroll = scrollRef.current;
      const target = getTargetCount(scroll, maxCountRef.current);
      const [cr, cg, cb] = getColor(scroll);
      const globalAlpha = getOpacity(scroll);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Adjust count ──
      const aliveCount = circles.filter(c => c.targetScale > 0).length;

      if (aliveCount < target) {
        const toSpawn = Math.min(target - aliveCount, 5); // max 5 per frame
        for (let i = 0; i < toSpawn; i++) {
          circles.push(spawnCircle(vw, vh));
        }
      } else if (aliveCount > target) {
        // Kill farthest from center first
        const cx = vw / 2, cy = vh / 2;
        const alive = circles
          .filter(c => c.targetScale > 0)
          .sort((a, b) => {
            const da = (a.x - cx) ** 2 + (a.y - cy) ** 2;
            const db = (b.x - cx) ** 2 + (b.y - cy) ** 2;
            return db - da; // farthest first
          });

        const toKill = aliveCount - target;
        for (let i = 0; i < Math.min(toKill, 3); i++) { // max 3 deaths/frame
          if (alive[i]) alive[i].targetScale = 0;
        }
      }

      // ── Update physics ──
      for (let i = 0; i < circles.length; i++) {
        const c = circles[i];

        // Scale animation
        c.scale += (c.targetScale - c.scale) * 0.08;

        // Brownian motion
        c.vx += (Math.random() - 0.5) * 0.02;
        c.vy += (Math.random() - 0.5) * 0.02;

        // Damping
        c.vx *= 0.998;
        c.vy *= 0.998;

        // Mouse repulsion
        const dx = c.x - mx;
        const dy = c.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (1 - dist / 150) * 0.5;
          c.vx += (dx / dist) * force;
          c.vy += (dy / dist) * force;
        }

        // Soft inter-circle repulsion (check nearest few, not all)
        for (let j = i + 1; j < circles.length; j++) {
          const other = circles[j];
          const ix = c.x - other.x;
          const iy = c.y - other.y;
          const idist = Math.sqrt(ix * ix + iy * iy);
          const minDist = (c.radius + other.radius) * c.scale * other.scale;
          if (idist < minDist && idist > 0) {
            const overlap = (minDist - idist) / minDist;
            const pushForce = overlap * 0.15;
            const nx = ix / idist;
            const ny = iy / idist;
            c.vx += nx * pushForce;
            c.vy += ny * pushForce;
            other.vx -= nx * pushForce;
            other.vy -= ny * pushForce;
          }
        }

        // Move
        c.x += c.vx;
        c.y += c.vy;

        // Boundary bounce
        const r = c.radius * c.scale;
        if (c.x < r) { c.x = r; c.vx *= -0.8; }
        if (c.x > vw - r) { c.x = vw - r; c.vx *= -0.8; }
        if (c.y < r) { c.y = r; c.vy *= -0.8; }
        if (c.y > vh - r) { c.y = vh - r; c.vy *= -0.8; }
      }

      // ── Remove dead ──
      for (let i = circles.length - 1; i >= 0; i--) {
        if (circles[i].scale < 0.01 && circles[i].targetScale === 0) {
          circles.splice(i, 1);
        }
      }

      // ── Draw ──
      const dpr = Math.min(window.devicePixelRatio, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      ctx.globalCompositeOperation = 'lighter';

      for (const c of circles) {
        if (c.scale < 0.01) continue;
        const drawR = c.radius * c.scale;
        const alpha = globalAlpha * c.scale;

        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, drawR);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${(alpha * 0.8).toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${(alpha * 0.35).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(c.x, c.y, drawR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      clearTimeout(resizeTimer);
    };
  }, [spawnCircle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
