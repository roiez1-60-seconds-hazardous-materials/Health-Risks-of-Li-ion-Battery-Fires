'use client';
import { motion } from 'framer-motion';
import { Wind, ShowerHead, Hand, Clock } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Operational() {
  const { t } = useLang();
  const cards = [
    { icon: Wind, k: 'scba' },
    { icon: ShowerHead, k: 'decon' },
    { icon: Hand, k: 'skin' },
    { icon: Clock, k: 'time' },
  ];

  return (
    <Section id="ops" title={t('ops.title')} subtitle={t('ops.subtitle')}>
      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.k}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4 items-start"
          >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <c.icon className="text-amber-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{t(`ops.${c.k}T`)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t(`ops.${c.k}D`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
