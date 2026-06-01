'use client';
import { motion } from 'framer-motion';
import { Dna, GitCompareArrows, FlaskConical } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

// Real Total Mutagenicity Scores (0–3) from Kim et al. 2025
const SCORES = [
  { id: 'EV6', score: 2.70, type: 'ev', match: true },
  { id: 'EV5', score: 2.27, type: 'ev' },
  { id: 'EV2', score: 2.21, type: 'ev' },
  { id: 'EV4', score: 1.78, type: 'ev' },
  { id: 'EV1', score: 1.23, type: 'ev' },
  { id: 'ICEV1', score: 0.94, type: 'ice' },
  { id: 'EV3', score: 0.00, type: 'ev' },
];
const MAX = 3;

export default function Mutagenicity() {
  const { t } = useLang();

  // qualitative potency ladder vs other combustion sources
  const ladder = [
    { k: 'mutagen.cmp.ev', w: 100, color: '#ef4444', strong: true },
    { k: 'mutagen.cmp.plastic', w: 78, color: '#f97316' },
    { k: 'mutagen.cmp.diesel', w: 64, color: '#f59e0b' },
    { k: 'mutagen.cmp.evlow', w: 40, color: '#eab308', strong: true },
    { k: 'mutagen.cmp.wood', w: 26, color: '#84cc16' },
    { k: 'mutagen.cmp.gas', w: 16, color: '#22c55e' },
  ];

  return (
    <Section id="mutagen" eyebrow="Kim et al. 2025 · Ames Test" title={t('mutagen.title')} subtitle={t('mutagen.subtitle')} wide>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed fs-body"
      >
        {t('mutagen.intro')}
      </motion.p>

      {/* Main TMS chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-6 sm:p-8 mb-8"
      >
        <h3 className="flex items-center gap-2 text-amber-400 font-bold mb-7 text-sm">
          <Dna size={18} /> {t('mutagen.chartTitle')}
        </h3>
        <div className="space-y-3.5">
          {SCORES.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className={`w-14 shrink-0 text-xs font-bold font-mono ${s.type === 'ice' ? 'text-sky-300' : 'text-orange-300'}`}>
                {s.id}
              </span>
              <div className="flex-1 h-7 rounded-lg bg-white/5 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${(s.score / MAX) * 100}%` }} viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.08, ease: 'easeOut' }}
                  className="h-full rounded-lg flex items-center justify-end pe-2"
                  style={{
                    background: s.type === 'ice'
                      ? 'linear-gradient(90deg,#0ea5e9,#38bdf8)'
                      : s.match ? 'linear-gradient(90deg,#b91c1c,#ef4444)' : 'linear-gradient(90deg,#f59e0b,#f97316)',
                  }}
                />
                <span className="absolute inset-y-0 end-2 flex items-center text-xs font-black text-white/90 tabular-nums">{s.score.toFixed(2)}</span>
              </div>
              {s.match && <span className="text-[10px] text-red-300 font-bold shrink-0 hidden sm:inline">★</span>}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-500" /> EV</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-sky-400" /> ICEV</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-600" /> ★ EV6 = ICEV1</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed mt-5">{t('mutagen.chartNote')}</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* matched pair */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl p-6 border border-red-500/30 bg-red-500/[0.06]"
        >
          <h3 className="flex items-center gap-2 text-red-400 font-bold mb-4">
            <GitCompareArrows size={20} /> {t('mutagen.matchTitle')}
          </h3>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-black text-orange-400">2.70</div>
              <div className="text-xs text-gray-400 mt-1">EV6</div>
            </div>
            <div className="text-2xl text-gray-600 font-black">vs</div>
            <div className="text-center">
              <div className="text-3xl font-black text-sky-300">0.94</div>
              <div className="text-xs text-gray-400 mt-1">ICEV1</div>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{t('mutagen.matchDesc')}</p>
        </motion.div>

        {/* comparison ladder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="flex items-center gap-2 text-amber-400 font-bold mb-5">
            <FlaskConical size={20} /> {t('mutagen.cmpTitle')}
          </h3>
          <div className="space-y-2.5">
            {ladder.map((l, i) => (
              <div key={l.k}>
                <div className="flex justify-between text-xs mb-1">
                  <span className={`font-semibold ${l.strong ? 'text-white' : 'text-gray-400'}`}>{t(l.k)}</span>
                </div>
                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${l.w}%` }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full rounded-full" style={{ background: l.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">{t('mutagen.cmpDesc')}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="flex items-start gap-3 p-5 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5"
      >
        <Dna className="text-amber-400 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-gray-300 leading-relaxed">{t('mutagen.meaning')}</p>
      </motion.div>
    </Section>
  );
}
