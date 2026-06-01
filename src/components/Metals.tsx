'use client';
import { motion } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Metals() {
  const { t } = useLang();

  const metalCards = [
    { k: 'ni', color: '#ef4444', sym: 'Ni' },
    { k: 'co', color: '#f97316', sym: 'Co' },
    { k: 'mn', color: '#f59e0b', sym: 'Mn' },
    { k: 'li', color: '#eab308', sym: 'Li' },
  ];

  const rows = [
    { k: 'row1', ev: '455–1645', ice: '133–904', unit: 'ng/cm²' },
    { k: 'row2', ev: '161–538', ice: t('metals.pbLow'), unit: 'ng/cm²' },
    { k: 'row3', ev: '1322–8437', ice: t('metals.pbLow'), unit: 'ng/cm²' },
    { k: 'row4', ev: t('metals.pbLow'), ice: t('metals.pbHigh') + ' ←', unit: '' },
  ];

  return (
    <Section id="metals" title={t('metals.title')} subtitle={t('metals.subtitle')}>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
      >
        {t('metals.intro')}
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {metalCards.map((m, i) => (
          <motion.div
            key={m.k}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center"
            style={{ borderTop: `3px solid ${m.color}` }}
          >
            <div className="text-3xl font-black mb-1" style={{ color: m.color }}>{m.sym}</div>
            <div className="text-sm font-bold text-white mb-2">{t(`metals.${m.k}`)}</div>
            <div className="text-xs text-gray-400 leading-snug">{t(`metals.${m.k}.risk`)}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur"
      >
        <h3 className="text-center text-amber-400 font-bold mb-5">{t('metals.tableTitle')}</h3>
        <div className="table-scroll">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-500/30">
                <th className="py-3 px-3 text-start text-amber-400 font-bold">{t('metals.col.metric')}</th>
                <th className="py-3 px-3 text-center text-orange-400 font-bold">{t('metals.col.ev')}</th>
                <th className="py-3 px-3 text-center text-gray-400 font-bold">{t('metals.col.ice')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.k} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 px-3 text-start text-white font-semibold">{t(`metals.${r.k}`)}</td>
                  <td className="py-3 px-3 text-center text-orange-300 font-mono font-bold whitespace-nowrap">{r.ev}{r.unit && <span className="text-gray-500 text-xs"> {r.unit}</span>}</td>
                  <td className="py-3 px-3 text-center text-gray-400 font-mono whitespace-nowrap">{r.ice}{r.unit && <span className="text-gray-600 text-xs"> {r.unit}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-8 flex items-start gap-3 p-5 rounded-xl border-2 border-dashed border-amber-500/40 bg-amber-500/5"
      >
        <TriangleAlert className="text-amber-400 shrink-0 mt-0.5" size={22} />
        <p className="text-sm text-gray-300 leading-relaxed">{t('metals.note')}</p>
      </motion.div>
    </Section>
  );
}
