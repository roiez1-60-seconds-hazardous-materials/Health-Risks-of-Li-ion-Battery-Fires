'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Section({
  id, title, subtitle, eyebrow, children, wide = false,
}: {
  id: string; title: string; subtitle?: string; eyebrow?: string; children: ReactNode; wide?: boolean;
}) {
  return (
    <section id={id} className="section-band relative py-24 sm:py-36 px-5 scroll-mt-24">
      {/* subtle divider between sections */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" aria-hidden />

      <div className={`mx-auto ${wide ? 'max-w-6xl' : 'max-w-5xl'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 text-center"
        >
          {eyebrow && (
            <span className="inline-block mb-5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase text-amber-300/90 border border-amber-500/25 bg-amber-500/5">
              {eyebrow}
            </span>
          )}
          <h2 className="fs-h2 font-black text-white text-balance">
            {title}
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
          {subtitle && (
            <p className="text-gray-400 mt-6 fs-lead max-w-2xl mx-auto text-balance">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
