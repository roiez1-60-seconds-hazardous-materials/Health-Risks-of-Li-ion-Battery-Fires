'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="inline-block text-2xl sm:text-4xl font-black text-white pb-4 border-b-4 border-amber-500">
            {title}
          </h2>
          {subtitle && <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
