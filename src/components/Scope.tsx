'use client';
import { motion } from 'framer-motion';
import { Flame, GitCompare, Layers } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Scope() {
  const { t } = useLang();
  const cards = [
    { icon: Flame, k: 'c1', color: '#f59e0b' },
    { icon: GitCompare, k: 'c2', color: '#38bdf8' },
    { icon: Layers, k: 'c3', color: '#ef4444' },
  ];
  const metrics = [
    { v: '13', k: 'scope.m1' },
    { v: '3', k: 'scope.m2' },
    { v: '3', k: 'scope.m3', sub: 'scope.m3sub' },
  ];

  return (
    <Section id="scope" eyebrow="FSRI · 2025–2026" title={t('scope.title')} subtitle={t('scope.subtitle')} wide>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-14 leading-relaxed fs-body"
      >
        {t('scope.intro')}
      </motion.p>

      {/* metric strip */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-14 max-w-3xl mx-auto">
        {metrics.map((m, i) => (
          <motion.div
            key={m.k}
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-4 sm:p-5 text-center"
          >
            <div className="text-3xl sm:text-4xl font-black gradient-fire">{m.v}</div>
            <div className="text-xs sm:text-sm text-gray-300 font-semibold mt-1">{t(m.k)}</div>
            {m.sub && <div className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-tight">{t(m.sub)}</div>}
          </motion.div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="glass card-hover rounded-2xl p-6"
            style={{ borderTop: `4px solid ${c.color}` }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${c.color}1a` }}>
              <c.icon size={26} style={{ color: c.color }} />
            </div>
            <h3 className="fs-h3 font-bold text-white mb-3">{t(`scope.${c.k}t`)}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t(`scope.${c.k}d`)}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
