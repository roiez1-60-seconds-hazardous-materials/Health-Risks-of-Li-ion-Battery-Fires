'use client';
import { useEffect, useRef } from 'react';

type Ember = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number; c: string };

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Density scales with screen area, capped for performance.
    const count = Math.min(70, Math.round((w * h) / 26000));
    const colors = ['#f59e0b', '#f97316', '#ef4444', '#38bdf8'];

    const spawn = (initial = false): Ember => {
      const max = 260 + Math.random() * 320;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + Math.random() * 60,
        r: Math.random() * 2.2 + 0.5,
        vy: -(Math.random() * 0.45 + 0.18),
        vx: (Math.random() - 0.5) * 0.25,
        life: initial ? Math.random() * max : 0,
        max,
        c: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const embers: Ember[] = Array.from({ length: count }, () => spawn(true));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.02; // gentle drift
        p.life++;
        if (p.life > p.max || p.y < -20) embers[i] = spawn(false);

        const t = p.life / p.max;
        const alpha = Math.sin(t * Math.PI) * 0.5; // fade in/out
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.c;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      // Static single frame for reduced-motion users.
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none opacity-70" aria-hidden />;
}
