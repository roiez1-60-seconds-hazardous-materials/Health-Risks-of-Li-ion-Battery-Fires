'use client';
import { motion } from 'framer-motion';

/**
 * Animated thematic emblem for the study: a burning lithium-ion battery
 * releasing smoke — flames flicker continuously and smoke wisps rise in a loop.
 */
export default function HazardEmblem() {
  const smoke = [
    { x: 50, delay: 0, dur: 3.2, drift: -6 },
    { x: 44, delay: 0.8, dur: 3.8, drift: 5 },
    { x: 56, delay: 1.5, dur: 3.5, drift: -3 },
    { x: 50, delay: 2.2, dur: 4.0, drift: 7 },
  ];

  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
      {/* pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-t from-red-600/35 via-orange-500/25 to-amber-300/20"
        animate={{ opacity: [0.5, 0.95, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative w-full h-full rounded-full grid place-items-center glass-strong border-2 border-amber-500/40 shadow-2xl shadow-amber-500/30 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-[78%] h-[78%]" role="img" aria-label="סוללת ליתיום בוערת מעלה עשן">
          <defs>
            <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#b91c1c" />
              <stop offset="45%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
            <linearGradient id="battGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f2433" />
              <stop offset="100%" stopColor="#0c0f18" />
            </linearGradient>
          </defs>

          {/* rising smoke */}
          {smoke.map((s, i) => (
            <motion.ellipse
              key={i}
              rx="5"
              ry="6"
              fill="#9aa6b8"
              initial={{ opacity: 0 }}
              animate={{
                cy: [40, 8],
                cx: [s.x, s.x + s.drift],
                opacity: [0, 0.4, 0],
                scale: [0.5, 1.5],
              }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeOut' }}
              style={{ transformOrigin: 'center' }}
            />
          ))}

          {/* battery body */}
          <rect x="34" y="50" width="32" height="40" rx="5" fill="url(#battGrad)" stroke="#f59e0b" strokeWidth="2.5" />
          {/* terminal */}
          <rect x="43" y="45" width="14" height="6" rx="2" fill="#f59e0b" />
          {/* lithium hazard bolt inside */}
          <path d="M52 58 L44 72 L50 72 L48 82 L57 67 L51 67 Z" fill="#ef4444" stroke="#fca5a5" strokeWidth="0.8" />

          {/* flames rising from the battery top */}
          <motion.g
            style={{ transformOrigin: '50px 50px' }}
            animate={{ scaleY: [1, 1.14, 0.94, 1.08, 1], scaleX: [1, 0.96, 1.04, 0.98, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M50 16 C 42 28, 36 34, 42 44 C 45 49, 55 49, 58 44 C 64 34, 58 28, 50 16 Z"
              fill="url(#flameGrad)"
            />
            <motion.path
              d="M50 26 C 46 33, 43 37, 46 43 C 48 46, 52 46, 54 43 C 57 37, 54 33, 50 26 Z"
              fill="#fde047"
              animate={{ opacity: [0.7, 1, 0.6, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
