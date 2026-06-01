'use client';
import { motion } from 'framer-motion';
import { TriangleAlert, ChevronDown, ArrowDown, ShieldCheck, BatteryWarning, Flame } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCountUp } from '@/lib/useCountUp';

function Stat({ end, label, suffix = '', prefix = '', decimals = 0, color }: { end: number; label: string; suffix?: string; prefix?: string; decimals?: number; color: string }) {
  const { ref, display } = useCountUp(end, 1800, decimals);
  return (
    <div className="text-center">
      <span ref={ref} className="block text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums" style={{ color }}>
        {prefix}{display}{suffix}
      </span>
      <span className="text-[11px] sm:text-sm text-gray-400 mt-1.5 block leading-tight">{label}</span>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center px-5 pt-24 pb-16 overflow-hidden">
      {/* layered glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-red-900/10 pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-24 left-1/4 w-80 h-80 bg-amber-500/12 rounded-full blur-[120px] pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-500/12 rounded-full blur-[120px] pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} className="absolute top-1/3 right-10 w-64 h-64 bg-sky-500/8 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-300 text-xs sm:text-sm font-bold mb-8 tracking-wide"
        >
          <TriangleAlert size={15} className="flame-flicker" />
          {t('hero.badge')}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/25 to-red-500/25 blur-xl" />
            <div className="relative w-full h-full rounded-full grid place-items-center border-2 border-amber-500/40 glass-strong shadow-2xl shadow-amber-500/30">
              <BatteryWarning className="text-amber-300" size={46} strokeWidth={1.6} aria-label="סוללת ליתיום" />
              <Flame
                className="absolute left-1/2 -translate-x-1/2 top-1.5 text-orange-500 flame-flicker"
                size={28}
                fill="currentColor"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="fs-hero font-black mb-5 gradient-fire text-balance"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="fs-h3 text-gray-200 font-light mb-6 text-balance"
        >
          {t('hero.subtitle')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="fs-body text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
        >
          {t('hero.desc')}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 max-w-2xl mx-auto mb-10 p-6 rounded-2xl glass"
        >
          <Stat end={6} label={t('hero.stat1')} color="#fbbf24" />
          <Stat end={3} label={t('hero.stat2')} color="#9ca3af" />
          <Stat end={3} label={t('hero.stat3')} color="#38bdf8" />
          <Stat end={7} prefix="×" label={t('hero.stat4')} color="#ef4444" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <button
            onClick={() => go('scope')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[#0d0d1a] font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-95 transition-all"
          >
            <ArrowDown size={18} /> {t('hero.cta')}
          </button>
          <button
            onClick={() => go('recommend')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-500/10 active:scale-95 transition-all"
          >
            <ShieldCheck size={18} /> {t('hero.cta2')}
          </button>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="mt-12 flex justify-center">
          <ChevronDown className="text-amber-500/50" size={28} />
        </motion.div>
      </div>
    </section>
  );
}
