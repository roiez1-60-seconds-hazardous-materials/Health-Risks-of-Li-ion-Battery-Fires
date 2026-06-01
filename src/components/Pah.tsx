'use client';
import { motion } from 'framer-motion';
import { Equal, ArrowDownToLine, Info } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Pah() {
  const { t } = useLang();
  const cards = [
    { icon: Equal, k: 'c1', color: '#f59e0b' },
    { icon: ArrowDownToLine, k: 'c2', color: '#ef4444' },
  ];
  // range bars: scale to max 3.96
  const MAX = 4.2;
  const bars = [
    { label: t('pah.evLabel'), val: t('pah.evVal'), lo: 0.92, hi: 3.96, color: '#f97316' },
    { label: t('pah.iceLabel'), val: t('pah.iceVal'), lo: 0.27, hi: 3.04, color: '#9ca3af' },
  ];

  return (
    <Section id="pah" eyebrow="Probert et al. 2026" title={t('pah.title')} subtitle={t('pah.subtitle')} wide>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed fs-body"
      >
        {t('pah.intro')}
      </motion.p>

      {/* range comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-6 mb-8 max-w-3xl mx-auto"
      >
        <div className="space-y-6">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-200">{b.label}</span>
                <span dir="ltr" className="font-mono font-bold text-sm" style={{ color: b.color }}>{b.val}</span>
              </div>
              <div className="relative h-4 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0, x: 0 }}
                  whileInView={{ width: `${((b.hi - b.lo) / MAX) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.2 }}
                  className="absolute h-full rounded-full"
                  style={{ insetInlineStart: `${(b.lo / MAX) * 100}%`, background: `linear-gradient(90deg, ${b.color}55, ${b.color})` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">ng/cm² · 0 → {MAX}</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {cards.map((c, i) => (
          <motion.div
            key={c.k}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass card-hover rounded-2xl p-6 text-center"
            style={{ borderTop: `4px solid ${c.color}` }}
          >
            <c.icon size={36} style={{ color: c.color }} className="mx-auto mb-4" />
            <h3 className="fs-h3 font-bold text-white mb-3">{t(`pah.${c.k}t`)}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t(`pah.${c.k}d`)}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="flex items-start gap-3 p-5 rounded-xl glass"
      >
        <Info className="text-amber-400 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-gray-400 leading-relaxed">{t('pah.note')}</p>
      </motion.div>
    </Section>
  );
}
