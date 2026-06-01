'use client';
import { motion } from 'framer-motion';
import { Flame, TriangleAlert, ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCountUp } from '@/lib/useCountUp';

function Stat({ end, label, suffix = '', decimals = 0, color }: { end: number; label: string; suffix?: string; decimals?: number; color: string }) {
  const { ref, display } = useCountUp(end, 1800, decimals);
  return (
    <div className="text-center">
      <span ref={ref} className="block text-4xl sm:text-5xl font-black" style={{ color }}>
        {display}{suffix}
      </span>
      <span className="text-xs sm:text-sm text-gray-400 mt-1 block">{label}</span>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-red-900/10" />
      <div className="absolute -top-20 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-[100px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-amber-500/40 bg-amber-500/5 text-amber-400 text-sm font-bold mb-8"
        >
          <TriangleAlert size={16} className="flame-flicker" />
          {t('hero.badge')}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-amber-500/40 shadow-2xl shadow-amber-500/30 flame-flicker">
            <img src="/images/logo-60sec.png" alt="60 שניות חומ״ס" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-l from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-2xl text-gray-300 font-light mb-6"
        >
          {t('hero.subtitle')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('hero.desc')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur"
        >
          <Stat end={6} label={t('hero.stat1')} color="#fbbf24" />
          <Stat end={3} label={t('hero.stat2')} color="#9ca3af" />
          <Stat end={3} label={t('hero.stat3')} color="#3b82f6" />
          <Stat end={7} label={t('hero.stat4')} suffix="×" color="#ef4444" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => document.getElementById('scope')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span className="text-sm">{t('hero.cta')}</span>
        </motion.button>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="mt-4 flex justify-center">
          <ChevronDown className="text-amber-500/50" size={28} />
        </motion.div>
      </div>
    </section>
  );
}
