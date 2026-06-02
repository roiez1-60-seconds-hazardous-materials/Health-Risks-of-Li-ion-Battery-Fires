'use client';
import { motion } from 'framer-motion';
import { Flame, User, Shirt } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const LAYERS = [
  { k: 'os', tag: 'OS', texture: 'weave', base: '#78350f', mark: '#d97706' },
  { k: 'mb', tag: 'MB', texture: 'membrane', base: '#155e5e', mark: '#5eead4' },
  { k: 'tl', tag: 'TL', texture: 'quilt', base: '#57534e', mark: '#a8a29e' },
] as const;

function swatchStyle(texture: string, base: string, mark: string): React.CSSProperties {
  if (texture === 'weave') {
    return {
      backgroundColor: base,
      backgroundImage: `repeating-linear-gradient(45deg, ${mark} 0 3px, transparent 3px 7px), repeating-linear-gradient(-45deg, ${mark}aa 0 3px, transparent 3px 7px)`,
    };
  }
  if (texture === 'membrane') {
    return {
      backgroundColor: base,
      backgroundImage: `radial-gradient(${mark} 1.3px, transparent 1.6px)`,
      backgroundSize: '8px 8px',
    };
  }
  // quilt
  return {
    backgroundColor: base,
    backgroundImage: `repeating-linear-gradient(45deg, ${mark}55 0 9px, transparent 9px 18px), repeating-linear-gradient(-45deg, ${mark}55 0 9px, transparent 9px 18px)`,
  };
}

export default function GearAnatomy() {
  const { t } = useLang();

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <h3 className="flex items-center justify-center gap-2 text-amber-400 font-bold mb-8 text-base">
        <Shirt size={18} /> {t('gear.title')}
      </h3>

      {/* fire side */}
      <div className="flex items-center gap-2 justify-center text-xs font-bold text-orange-300 mb-4">
        <Flame className="flame-flicker" size={16} /> {t('gear.fire')}
        <span className="flex-1 max-w-[120px] border-t border-dashed border-orange-500/30" />
      </div>

      <div className="space-y-3">
        {LAYERS.map((l, i) => (
          <motion.div
            key={l.k}
            initial={{ opacity: 0, y: -18, scaleY: 0.6 }}
            whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.22, type: 'spring', stiffness: 130, damping: 15 }}
            className="flex items-stretch gap-4"
            style={{ transformOrigin: 'top' }}
          >
            {/* realistic textured swatch */}
            <div
              className="relative w-24 sm:w-32 shrink-0 rounded-lg overflow-hidden border border-white/15 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]"
              style={{ height: 70, ...swatchStyle(l.texture, l.base, l.mark) }}
            >
              <span className="absolute bottom-1.5 start-1.5 text-[10px] font-mono font-black text-white bg-black/45 px-1.5 py-0.5 rounded">{l.tag}</span>
              {/* breathability: vapor escaping the moisture barrier */}
              {l.k === 'mb' && [0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="absolute rounded-full bg-white/60"
                  style={{ width: 4, height: 4, left: `${28 + d * 22}%`, bottom: 8 }}
                  animate={{ y: [0, -34], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2.4, delay: d * 0.7, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}
            </div>

            {/* spec */}
            <div className="flex-1 py-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{t(`layers.${l.k}`)}</span>
                {l.k === 'tl' && (
                  <span className="text-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/40 border border-red-300/40">{t('layers.skin')}</span>
                )}
              </div>
              <div className="text-amber-200/90 text-xs mt-1 font-medium">{t(`gear.${l.k}.mat`)}</div>
              <div className="text-gray-400 text-xs mt-1 leading-relaxed">{t(`gear.${l.k}.fn`)}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* skin side */}
      <div className="flex items-center gap-2 justify-center text-xs font-bold text-red-300 mt-4">
        <User size={16} /> {t('gear.skin')}
        <span className="flex-1 max-w-[120px] border-t border-dashed border-red-500/30" />
      </div>

      <p className="text-[11px] text-gray-500 leading-relaxed mt-6 text-center">{t('gear.note')}</p>
    </div>
  );
}
