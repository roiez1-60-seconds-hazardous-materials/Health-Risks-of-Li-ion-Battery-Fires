'use client';
import { motion } from 'framer-motion';
import { Skull, TriangleAlert } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCountUp } from '@/lib/useCountUp';
import Section from './Section';

export default function Fluoride() {
  const { t } = useLang();
  const { ref, display } = useCountUp(2, 1400, 0);
  const bullets = ['fluoride.b1', 'fluoride.b2', 'fluoride.b3'];

  return (
    <Section id="fluoride" title={t('fluoride.title')} subtitle={t('fluoride.subtitle')}>
      <div className="relative">
        <Skull className="absolute -top-10 right-0 text-white/[0.02] pointer-events-none" size={200} />

        <div className="grid md:grid-cols-2 gap-8 items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <span ref={ref} className="text-8xl sm:text-9xl font-black text-amber-400 leading-none">
              {display}%
            </span>
            <span className="text-lg font-bold text-gray-300 mt-3">{t('fluoride.pct')}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-6 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/5"
          >
            <h3 className="flex items-center gap-2 text-amber-400 font-bold mb-4">
              <TriangleAlert size={20} /> {t('fluoride.mech')}
            </h3>
            <p className="text-gray-300 text-sm mb-3">{t('fluoride.mechIntro')}</p>
            <div className="text-center py-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <span className="text-xl font-black text-red-400">{t('fluoride.hf')}</span>
            </div>
            <ul className="space-y-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-red-400 mt-1">▪</span>
                  <span>{t(b)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 flex items-start gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/10"
        >
          <Skull className="text-amber-400 shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-gray-400 leading-relaxed">{t('fluoride.note')}</p>
        </motion.div>
      </div>
    </Section>
  );
}
