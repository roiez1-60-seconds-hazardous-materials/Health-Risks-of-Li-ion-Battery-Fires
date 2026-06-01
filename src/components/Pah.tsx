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

  return (
    <Section id="pah" title={t('pah.title')} subtitle={t('pah.subtitle')}>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
      >
        {t('pah.intro')}
      </motion.p>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {cards.map((c, i) => (
          <motion.div
            key={c.k}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
            style={{ borderTop: `4px solid ${c.color}` }}
          >
            <c.icon size={40} style={{ color: c.color }} className="mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-3">{t(`pah.${c.k}t`)}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t(`pah.${c.k}d`)}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="flex items-start gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/10"
      >
        <Info className="text-amber-400 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-gray-400 leading-relaxed">{t('pah.note')}</p>
      </motion.div>
    </Section>
  );
}
