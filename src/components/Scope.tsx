'use client';
import { motion } from 'framer-motion';
import { Flame, GitCompare, Layers } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Scope() {
  const { t } = useLang();
  const cards = [
    { icon: Flame, k: 'c1', color: '#f59e0b' },
    { icon: GitCompare, k: 'c2', color: '#3b82f6' },
    { icon: Layers, k: 'c3', color: '#ef4444' },
  ];

  return (
    <Section id="scope" title={t('scope.title')} subtitle={t('scope.subtitle')}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed text-base sm:text-lg"
      >
        {t('scope.intro')}
      </motion.p>

      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur"
            style={{ borderTop: `4px solid ${c.color}` }}
          >
            <c.icon size={36} style={{ color: c.color }} className="mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">{t(`scope.${c.k}t`)}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t(`scope.${c.k}d`)}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
