'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';
import GearAnatomy from './GearAnatomy';

export default function Layers() {
  const { t } = useLang();

  // range = share of total battery-metal contamination found on each layer (Probert et al. 2026)
  // intensity drives the visual darkening overlay (deeper layer = less contamination)
  const layers = [
    { k: 'os', range: '61–84%', intensity: 84, band: 'linear-gradient(90deg,#ef4444,#f97316)', skin: false },
    { k: 'mb', range: '3–21%', intensity: 21, band: 'linear-gradient(90deg,#b45309,#92400e)', skin: false },
    { k: 'tl', range: '0–30%', intensity: 30, band: 'linear-gradient(90deg,#78350f,#451a03)', skin: true },
  ];

  return (
    <Section id="layers" eyebrow="Probert et al. 2026" title={t('layers.title')} subtitle={t('layers.subtitle')} wide>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed fs-body"
      >
        {t('layers.intro')}
      </motion.p>

      {/* 1 · What the suit is made of — animated anatomy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
        className="max-w-3xl mx-auto mb-16"
      >
        <GearAnatomy />
      </motion.div>

      {/* 2 · How deep contamination reaches */}
      <h3 className="text-center fs-h3 font-bold text-white mb-2">{t('layers.penTitle')}</h3>
      <p className="text-center text-gray-400 text-sm mb-8 max-w-xl mx-auto">{t('layers.dist')}</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto"
      >
        {/* fire / smoke side */}
        <div className="flex items-center gap-2 mb-3 text-xs text-amber-300/80 font-bold">
          <span className="flame-flicker">🔥</span> {t('layers.legend')}
          <span className="flex-1 border-t border-dashed border-amber-500/30" />
        </div>

        <div className="relative rounded-xl overflow-hidden">
          {layers.map((l, i) => (
            <motion.div
              key={l.k}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative h-20 sm:h-24 flex items-center justify-between px-4 sm:px-6 border-b border-black/30"
              style={{ background: l.band }}
            >
              {/* contamination intensity overlay */}
              <motion.div
                className="absolute inset-0 bg-black/40"
                initial={{ opacity: 0.9 }}
                whileInView={{ opacity: 1 - l.intensity / 130 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
              />
              <div className="relative z-10 font-bold text-white text-sm sm:text-base flex items-center gap-2">
                {t(`layers.${l.k}`)}
                {l.skin && <span className="text-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/40 border border-red-300/40">{t('layers.skin')}</span>}
              </div>
              <div dir="ltr" className="relative z-10 text-xl sm:text-2xl font-black text-white/90 tabular-nums shrink-0">
                {l.range}
              </div>
            </motion.div>
          ))}
        </div>

        {/* skin side */}
        <div className="flex items-center gap-2 mt-3 text-xs text-red-300/80 font-bold">
          <span className="flex-1 border-t border-dashed border-red-500/30" />
          👤 {t('layers.tl')}
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed mt-5 text-center">{t('layers.cap')}</p>
      </motion.div>
    </Section>
  );
}
