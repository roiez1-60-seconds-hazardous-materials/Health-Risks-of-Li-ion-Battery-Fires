'use client';
import { motion } from 'framer-motion';
import { Skull, TriangleAlert, Droplets, Plus, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCountUp } from '@/lib/useCountUp';
import Section from './Section';

export default function Fluoride() {
  const { t, lang } = useLang();
  const { ref, display } = useCountUp(2, 1400, 0);
  const bullets = ['fluoride.b1', 'fluoride.b2', 'fluoride.b3'];
  const Arrow = lang === 'he' ? ArrowRight : ArrowRight;

  return (
    <Section id="fluoride" eyebrow="Kim et al. 2025" title={t('fluoride.title')} subtitle={t('fluoride.subtitle')} wide>
      <div className="relative">
        <Skull className="absolute -top-10 right-0 text-white/[0.025] pointer-events-none" size={220} />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch relative">
          {/* Big stat + reaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          >
            <span ref={ref} className="text-7xl sm:text-8xl font-black text-amber-400 leading-none">
              ~{display}%
            </span>
            <span className="text-base font-bold text-gray-300 mt-3">{t('fluoride.pct')}</span>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed max-w-sm">{t('fluoride.pctNote')}</p>

            {/* reaction flow */}
            <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs">F⁻</div>
                <span className="text-[10px] text-gray-500 mt-1">{lang === 'he' ? 'חלקיק' : 'particle'}</span>
              </div>
              <Plus size={14} className="text-gray-500" />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-sky-500/15 border border-sky-500/40 flex items-center justify-center text-sky-300"><Droplets size={18} /></div>
                <span className="text-[10px] text-gray-500 mt-1">{lang === 'he' ? 'לחות' : 'moisture'}</span>
              </div>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <Arrow size={18} className="text-amber-400" style={{ transform: lang === 'he' ? 'scaleX(-1)' : 'none' }} />
              </motion.div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center text-red-300 font-black text-sm flame-flicker">HF</div>
                <span className="text-[10px] text-red-400/80 mt-1 font-bold">{lang === 'he' ? 'חומצה' : 'acid'}</span>
              </div>
            </div>
          </motion.div>

          {/* Mechanism */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-6 rounded-2xl border border-dashed border-red-500/40 bg-red-500/[0.05] flex flex-col"
          >
            <h3 className="flex items-center gap-2 text-red-400 font-bold mb-4">
              <TriangleAlert size={20} /> {t('fluoride.mech')}
            </h3>
            <p className="text-gray-300 text-sm mb-4">{t('fluoride.mechIntro')}</p>
            <div className="text-center py-3 mb-5 rounded-lg bg-red-500/10 border border-red-500/30">
              <span className="text-xl font-black text-red-400">{t('fluoride.hf')}</span>
            </div>
            <ul className="space-y-3 flex-1">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-gray-200">
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="leading-relaxed">{t(b)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 flex items-start gap-3 p-5 rounded-xl glass"
        >
          <Skull className="text-amber-400 shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-gray-400 leading-relaxed">{t('fluoride.note')}</p>
        </motion.div>
      </div>
    </Section>
  );
}
