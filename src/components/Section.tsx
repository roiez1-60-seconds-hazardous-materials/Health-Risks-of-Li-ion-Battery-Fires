'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Section({
  id, title, subtitle, eyebrow, children, wide = false,
}: {
  id: string; title: string; subtitle?: string; eyebrow?: string; children: ReactNode; wide?: boolean;
}) {
  return (
    <section id={id} className="relative py-20 sm:py-28 px-5 scroll-mt-24">
      <div className={`mx-auto ${wide ? 'max-w-6xl' : 'max-w-5xl'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          {eyebrow && (
            <span className="inline-block mb-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase text-amber-300/90 border border-amber-500/25 bg-amber-500/5">
              {eyebrow}
            </span>
          )}
          <h2 className="fs-h2 font-black text-white text-balance">
            {title}
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
          {subtitle && (
            <p className="text-gray-400 mt-5 fs-lead max-w-2xl mx-auto text-balance">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
