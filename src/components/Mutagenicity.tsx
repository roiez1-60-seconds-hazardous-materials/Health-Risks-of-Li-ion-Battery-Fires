'use client';
import { motion } from 'framer-motion';
import { Dna, ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Mutagenicity() {
  const { t, lang } = useLang();
  const Arrow = lang === 'he' ? ArrowLeft : ArrowLeft;

  return (
    <Section id="mutagen" title={t('mutagen.title')} subtitle={t('mutagen.subtitle')}>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
      >
        {t('mutagen.intro')}
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="p-6 rounded-2xl bg-red-500/[0.07] border border-red-500/30 text-center flex flex-col items-center justify-center"
        >
          <Dna size={44} className="text-red-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-3">{t('mutagen.c1t')}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{t('mutagen.c1d')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-center"
        >
          <h3 className="flex items-center gap-2 text-amber-400 font-bold mb-3">
            <Arrow size={18} /> {t('mutagen.c2t')}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">{t('mutagen.c2d')}</p>
        </motion.div>
      </div>
    </Section>
  );
}
