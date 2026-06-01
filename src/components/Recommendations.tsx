'use client';
import { motion } from 'framer-motion';
import {
  Navigation, Biohazard, Wind, Droplets, Shield,
  ShowerHead, Hand, Split, WashingMachine, Stethoscope, Timer,
} from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import Section from './Section';

const PHASES = [
  {
    key: 'p1', color: '#fbbf24', icon: Navigation,
    cards: [
      { k: 'a', icon: Wind },
      { k: 'b', icon: Biohazard },
    ],
  },
  {
    key: 'p2', color: '#f97316', icon: Shield,
    cards: [
      { k: 'a', icon: Wind },
      { k: 'b', icon: Droplets },
      { k: 'c', icon: Shield },
    ],
  },
  {
    key: 'p3', color: '#38bdf8', icon: ShowerHead,
    cards: [
      { k: 'a', icon: ShowerHead },
      { k: 'b', icon: Hand },
      { k: 'c', icon: Split },
    ],
  },
  {
    key: 'p4', color: '#ef4444', icon: Stethoscope,
    cards: [
      { k: 'a', icon: WashingMachine },
      { k: 'b', icon: Stethoscope },
      { k: 'c', icon: Timer },
    ],
  },
];

export default function Recommendations() {
  const { t } = useLang();

  return (
    <Section id="recommend" eyebrow="Operational Guidance" title={t('rec.title')} subtitle={t('rec.subtitle')} wide>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed fs-body"
      >
        {t('rec.intro')}
      </motion.p>

      <div className="relative">
        {/* vertical spine (desktop) */}
        <div className="hidden md:block absolute top-0 bottom-0 start-[27px] w-px bg-gradient-to-b from-amber-500/40 via-orange-500/30 to-red-500/40" />

        <div className="space-y-16 sm:space-y-20">
          {PHASES.map((phase, pi) => (
            <motion.div
              key={phase.key}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="relative md:ps-16"
            >
              {/* phase node */}
              <div className="flex items-center gap-4 mb-5 md:mb-6">
                <div
                  className="md:absolute md:start-0 shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg z-10"
                  style={{ background: `${phase.color}1f`, border: `2px solid ${phase.color}66` }}
                >
                  <phase.icon size={24} style={{ color: phase.color }} />
                </div>
                <h3 className="fs-h3 font-black text-white">{t(`rec.${phase.key}.phase`)}</h3>
              </div>

              {/* cards */}
              <div className={`grid gap-4 ${phase.cards.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                {phase.cards.map((c, ci) => (
                  <motion.div
                    key={c.k}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: ci * 0.08 }}
                    className="glass card-hover rounded-2xl p-5"
                    style={{ borderTop: `3px solid ${phase.color}` }}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${phase.color}1a` }}>
                        <c.icon size={18} style={{ color: phase.color }} />
                      </div>
                      <h4 className="font-bold text-white text-sm leading-tight">{t(`rec.${phase.key}.${c.k}.t`)}</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{t(`rec.${phase.key}.${c.k}.d`)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
