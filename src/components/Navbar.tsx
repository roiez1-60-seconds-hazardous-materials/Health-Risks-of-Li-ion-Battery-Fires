'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useScrollSpy, useScrolled } from '@/lib/hooks';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t';

const sections = ['home', 'scope', 'metals', 'ppe', 'layers', 'pah', 'fluoride', 'mutagen', 'recommend', 'sources'];

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(sections);
  const scrolled = useScrolled(30);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl bg-[#07070e]/85 border-b border-amber-500/20 shadow-lg shadow-black/30' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-lg shadow-amber-500/20">
              <img
                src="/images/logo-60sec.png"
                alt="60 שניות של חומ״ס"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f59e0b,#ef4444);color:white;font-weight:bold;font-size:11px;">60s</div>';
                }}
              />
            </div>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-[11px] font-bold text-amber-400/90">60 שניות חומ״ס</span>
              <span className="text-[10px] text-gray-500">HazMat Analysis</span>
            </span>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {sections.map((s) => {
              const isActive = active === s;
              return (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className={`relative px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors ${
                    isActive ? 'text-amber-300' : 'text-gray-400 hover:text-amber-300'
                  }`}
                >
                  {t(`nav.${s}`)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-amber-500/12 border border-amber-500/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-bold hover:bg-amber-500/20 transition-colors"
            >
              <Globe size={14} />
              {t('nav.lang')}
            </motion.button>

            <motion.button onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }} className="lg:hidden p-2 text-gray-300">
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl bg-[#07070e]/96 border-b border-amber-500/20 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-1.5 p-4">
              {sections.map((s, i) => (
                <motion.button
                  key={s}
                  onClick={() => scrollTo(s)}
                  initial={{ opacity: 0, x: lang === 'he' ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  className={`py-3 px-4 text-center rounded-xl transition-all text-sm font-medium ${
                    active === s
                      ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30'
                      : 'text-gray-300 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent'
                  }`}
                >
                  {t(`nav.${s}`)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
