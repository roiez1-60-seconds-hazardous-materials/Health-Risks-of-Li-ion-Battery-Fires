'use client';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

export default function Sources() {
  const { t } = useLang();
  const sources = [
    { k: 's1', url: 'https://doi.org/10.1016/j.firesaf.2026.104865' },
    { k: 's2', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12746415/' },
  ];

  return (
    <Section id="sources" eyebrow="Peer-Reviewed" title={t('sources.title')} subtitle={t('sources.subtitle')}>
      <div className="space-y-4 max-w-3xl mx-auto">
        {sources.map((s, i) => (
          <motion.a
            key={s.k}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 6 }}
            className="flex items-start gap-4 p-5 rounded-2xl glass hover:border-amber-500/40 transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <FileText className="text-amber-400" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm leading-snug mb-1">{t(`sources.${s.k}`)}</p>
              <p className="text-gray-500 text-xs">{t(`sources.${s.k}pub`)}</p>
            </div>
            <ExternalLink className="text-gray-500 group-hover:text-amber-400 shrink-0 mt-1 transition-colors" size={18} />
          </motion.a>
        ))}

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs text-gray-500 leading-relaxed text-center pt-4 px-2"
        >
          {t('sources.disclaimer')}
        </motion.p>
      </div>
    </Section>
  );
}
