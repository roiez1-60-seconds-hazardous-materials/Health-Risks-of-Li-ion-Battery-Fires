'use client';
import { motion } from 'framer-motion';
import { TriangleAlert, BatteryWarning } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCountUp } from '@/lib/useCountUp';
import Section from './Section';

function MassBar({ pct, label, value, color, delay }: { pct: number; label: string; value: number; color: string; delay: number }) {
  const { ref, display } = useCountUp(value, 1600, 1);
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-gray-200">{label}</span>
        <span ref={ref} className="text-2xl font-black tabular-nums" style={{ color }}>{display}%</span>
      </div>
      <div className="h-5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
          transition={{ duration: 1.3, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
        />
      </div>
    </div>
  );
}

export default function Metals() {
  const { t } = useLang();

  const metalCards = [
    { k: 'ni', color: '#ef4444', sym: 'Ni' },
    { k: 'mn', color: '#f97316', sym: 'Mn' },
    { k: 'co', color: '#f59e0b', sym: 'Co' },
    { k: 'li', color: '#eab308', sym: 'Li' },
  ];

  const rows = [
    { k: 'row1', ev: '455–1645', ice: '133–904', unit: 'ng/cm²' },
    { k: 'row2', ev: '161–538', ice: '—', unit: 'ng/cm²' },
    { k: 'row3', ev: '1322–8437', ice: '—', unit: 'ng/cm²' },
    { k: 'row4', ev: t('metals.evMetals'), ice: t('metals.iceMetals'), unit: '' },
  ];

  return (
    <Section id="metals" eyebrow="Probert et al. 2026" title={t('metals.title')} subtitle={t('metals.subtitle')} wide>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed fs-body"
      >
        {t('metals.intro')}
      </motion.p>

      {/* metal cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {metalCards.map((m, i) => (
          <motion.div
            key={m.k}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass card-hover rounded-2xl p-5 text-center"
            style={{ borderTop: `3px solid ${m.color}` }}
          >
            <div className="text-4xl font-black mb-1" style={{ color: m.color }}>{m.sym}</div>
            <div className="text-sm font-bold text-white mb-2">{t(`metals.${m.k}`)}</div>
            <div className="text-xs text-gray-400 leading-snug">{t(`metals.${m.k}.risk`)}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        {/* mass fraction comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 flex flex-col"
        >
          <h3 className="flex items-center gap-2 text-amber-400 font-bold mb-6">
            <BatteryWarning size={20} /> {t('metals.massTitle')}
          </h3>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <MassBar pct={100} value={28} label={t('metals.massEv')} color="#ef4444" delay={0.1} />
            <MassBar pct={23} value={6.4} label={t('metals.massIce')} color="#9ca3af" delay={0.3} />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mt-6">{t('metals.massNote')}</p>
        </motion.div>

        {/* data table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-center text-amber-400 font-bold mb-5 text-sm">{t('metals.tableTitle')}</h3>
          <div className="table-scroll">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/30">
                  <th className="py-3 px-2 text-start text-amber-400 font-bold">{t('metals.col.metric')}</th>
                  <th className="py-3 px-2 text-center text-orange-400 font-bold">{t('metals.col.ev')}</th>
                  <th className="py-3 px-2 text-center text-gray-400 font-bold">{t('metals.col.ice')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.k} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="py-3 px-2 text-start text-white font-semibold">{t(`metals.${r.k}`)}</td>
                    <td dir="ltr" className="py-3 px-2 text-center text-orange-300 font-mono font-bold whitespace-nowrap">{r.ev}{r.unit && <span className="text-gray-500 text-[10px]"> {r.unit}</span>}</td>
                    <td dir="ltr" className="py-3 px-2 text-center text-gray-400 font-mono whitespace-nowrap">{r.ice}{r.unit && r.ice !== '—' && <span className="text-gray-600 text-[10px]"> {r.unit}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-8 flex items-start gap-3 p-5 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5"
      >
        <TriangleAlert className="text-amber-400 shrink-0 mt-0.5" size={22} />
        <p className="text-sm text-gray-300 leading-relaxed">{t('metals.note')}</p>
      </motion.div>
    </Section>
  );
}
