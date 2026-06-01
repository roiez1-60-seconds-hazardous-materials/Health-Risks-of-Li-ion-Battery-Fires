'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Layers() {
  const { t } = useLang();

  const bars = [
    { k: 'os', pct: 84, range: '61–84%', color: 'linear-gradient(90deg,#ff5e00,#ff0000)', skin: false },
    { k: 'mb', pct: 21, range: '3–21%', color: '#c2410c', skin: false },
    { k: 'tl', pct: 30, range: '0–30%', color: '#92400e', skin: true },
  ];

  return (
    <Section id="layers" title={t('layers.title')} subtitle={t('layers.subtitle')}>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        {t('layers.intro')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 backdrop-blur"
      >
        <h3 className="text-center text-amber-400 font-bold mb-8">{t('layers.dist')}</h3>
        <div className="space-y-6">
          {bars.map((b, i) => (
            <div key={b.k}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  {t(`layers.${b.k}`)}
                  {b.skin && <span className="text-red-400 text-xs font-normal">{t('layers.skin')}</span>}
                </span>
                <span className="font-mono font-bold text-amber-300 text-sm">{b.range}</span>
              </div>
              <div className="h-8 rounded-lg bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeOut' }}
                  className="h-full rounded-lg"
                  style={{ background: b.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
