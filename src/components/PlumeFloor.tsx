'use client';
import { motion } from 'framer-motion';
import { Building2, Hand } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCountUp } from '@/lib/useCountUp';
import Section from './Section';

function PlumeViz({ label }: { label: string }) {
  const { ref, display } = useCountUp(10, 1600, 0);
  return (
    <div className="relative h-full min-h-[320px] rounded-2xl overflow-hidden glass flex flex-col items-center justify-end p-6">
      {/* rising plume gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-900/10 to-red-900/20" />
      {/* rising particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${15 + (i * 70) / 14 + (i % 3) * 4}%`,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            background: ['#f59e0b', '#ef4444', '#f97316'][i % 3],
            bottom: 60,
          }}
          animate={{ y: [0, -240], opacity: [0, 0.8, 0], scale: [0.6, 1.2, 0.4] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.35, ease: 'easeOut' }}
        />
      ))}

      {/* plume zone marker (top) */}
      <div className="absolute top-6 inset-x-0 text-center z-10">
        <span ref={ref} className="text-6xl sm:text-7xl font-black gradient-fire leading-none">{display}×</span>
        <div className="text-xs text-amber-300/80 font-bold mt-1 tracking-wide">PLUME · פלומת העשן</div>
      </div>

      {/* divider line */}
      <div className="absolute top-1/2 inset-x-6 border-t border-dashed border-white/15 z-10" />

      {/* body/floor zone marker (bottom) */}
      <div className="relative z-10 text-center">
        <div className="text-3xl font-black text-gray-400 leading-none">1×</div>
        <div className="text-xs text-gray-500 font-bold mt-1 tracking-wide">BODY · גובה הגוף</div>
        <p className="text-[11px] text-gray-400 mt-3 max-w-[200px] mx-auto leading-snug">{label}</p>
      </div>
    </div>
  );
}

export default function PlumeFloor() {
  const { t } = useLang();
  const zones = [
    { k: 'ppe.zoneArm', pct: 100, color: '#ef4444', tag: '↑↑↑' },
    { k: 'ppe.zoneChest', pct: 62, color: '#f97316', tag: '↑↑' },
    { k: 'ppe.zoneLeg', pct: 40, color: '#f59e0b', tag: '↑' },
  ];

  return (
    <Section id="ppe" eyebrow="Probert et al. 2026" title={t('ppe.title')} subtitle={t('ppe.subtitle')} wide>
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        >
          <PlumeViz label={t('ppe.plumeLabel')} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-5">
          <p className="text-gray-300 leading-relaxed fs-body">{t('ppe.intro')}</p>

          {/* body sampling */}
          <div className="glass rounded-2xl p-5">
            <h3 className="flex items-center gap-2 text-amber-400 font-bold mb-2">
              <Hand size={18} /> {t('ppe.bodyTitle')}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{t('ppe.bodyDesc')}</p>
            <div className="space-y-3">
              {zones.map((z, i) => (
                <div key={z.k}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-200 font-semibold">{t(z.k)}</span>
                    <span className="font-mono" style={{ color: z.color }}>{z.tag}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${z.pct}%` }} viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
                      className="h-full rounded-full" style={{ background: z.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-red-500/25 bg-red-500/[0.06]">
            <h3 className="flex items-center gap-2 text-red-400 font-bold mb-3">
              <Building2 size={20} /> {t('ppe.opTitle')}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{t('ppe.opDesc')}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
