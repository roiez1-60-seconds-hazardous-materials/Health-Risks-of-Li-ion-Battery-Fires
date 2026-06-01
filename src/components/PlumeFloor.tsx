'use client';
import { motion } from 'framer-motion';
import { Wind, Building2 } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCountUp } from '@/lib/useCountUp';
import Section from './Section';

export default function PlumeFloor() {
  const { t } = useLang();
  const { ref, display } = useCountUp(10, 1600, 0);

  return (
    <Section id="ppe" title={t('ppe.title')} subtitle={t('ppe.subtitle')}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="flex flex-col items-center justify-center p-10 rounded-2xl bg-gradient-to-br from-red-900/20 to-amber-900/10 border border-amber-500/20"
        >
          <Wind className="text-amber-400 mb-4 flame-flicker" size={48} />
          <span ref={ref} className="text-7xl sm:text-8xl font-black bg-gradient-to-b from-amber-300 to-red-500 bg-clip-text text-transparent">
            {display}×
          </span>
          <span className="text-lg text-gray-300 font-bold mt-2 text-center">{t('ppe.plumeLabel')}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="text-gray-300 leading-relaxed mb-6 text-base sm:text-lg">{t('ppe.intro')}</p>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
            <h3 className="flex items-center gap-2 text-red-400 font-bold mb-3">
              <Building2 size={20} /> {t('ppe.opTitle')}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('ppe.opDesc')}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
