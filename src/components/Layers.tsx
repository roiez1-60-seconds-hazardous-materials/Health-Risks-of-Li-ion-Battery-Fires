'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

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

      <div className="grid lg:grid-cols-5 gap-6 items-center">
        {/* Cross-section visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-center text-amber-400 font-bold mb-6 text-sm">{t('layers.dist')}</h3>

          {/* "smoke side" label */}
          <div className="flex items-center gap-2 mb-3 text-xs text-amber-300/80 font-bold">
            <span className="flame-flicker">🔥</span> {t('layers.legend')}
            <span className="flex-1 border-t border-dashed border-amber-500/30" />
          </div>

          <div className="relative rounded-xl overflow-hidden">
            {layers.map((l, i) => (
              <div key={l.k} className="relative">
                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative h-20 sm:h-24 flex items-center justify-between px-4 sm:px-6 border-b border-black/30"
                  style={{ background: l.band }}
                >
                  {/* contamination intensity overlay (animated penetration) */}
                  <motion.div
                    className="absolute inset-0 bg-black/40"
                    initial={{ opacity: 0.9 }}
                    whileInView={{ opacity: 1 - l.intensity / 130 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.2 }}
                  />
                  <div className="relative z-10">
                    <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      {t(`layers.${l.k}`)}
                      {l.skin && <span className="text-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/40 border border-red-300/40">{t('layers.skin')}</span>}
                    </div>
                  </div>
                  <div dir="ltr" className="relative z-10 text-xl sm:text-2xl font-black text-white/90 tabular-nums shrink-0">
                    {l.range}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* skin side label */}
          <div className="flex items-center gap-2 mt-3 text-xs text-red-300/80 font-bold">
            <span className="flex-1 border-t border-dashed border-red-500/30" />
            👤 {t('layers.tl')}
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed mt-5 text-center">{t('layers.cap')}</p>
        </motion.div>

        {/* explanatory cards */}
        <div className="lg:col-span-2 space-y-4">
          {layers.map((l, i) => (
            <motion.div
              key={l.k}
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`glass rounded-xl p-4 border-l-4 ${l.skin ? 'border-red-500' : ''}`}
              style={!l.skin ? { borderLeftColor: i === 0 ? '#f97316' : '#b45309' } : {}}
            >
              <div className="font-bold text-white text-sm mb-1">{t(`layers.${l.k}`)}</div>
              <div className="text-gray-400 text-xs leading-relaxed">{t(`layers.${l.k}.d`)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
