'use client';
import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import ViewCounter from './ViewCounter';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative py-16 px-4 border-t border-amber-500/20 bg-gradient-to-b from-transparent to-amber-900/5">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-500/40 shadow-xl shadow-amber-500/20">
            <img src="/images/logo-60sec.png" alt="60 שניות חומ״ס" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black mb-3 bg-gradient-to-l from-amber-400 to-red-500 bg-clip-text text-transparent"
        >
          {t('footer.tag')}
        </motion.h2>

        <p className="text-gray-400 text-sm mb-8">{t('footer.by')}</p>

        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-[#0d0d1a] font-bold hover:bg-amber-400 transition-colors mb-6"
        >
          <MessageCircle size={20} />
          {t('footer.join')}
        </motion.a>

        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Mail size={14} />
          <a href="mailto:roiez1@gmail.com" className="hover:text-amber-400 transition-colors">roiez1@gmail.com</a>
        </div>

        <div className="mt-6 flex justify-center">
          <ViewCounter />
        </div>
      </div>
    </footer>
  );
}
