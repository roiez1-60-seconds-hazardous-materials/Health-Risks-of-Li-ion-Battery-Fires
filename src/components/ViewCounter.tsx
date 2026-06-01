'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const SUPABASE_URL = 'https://obqoyaoouznkyounssme.supabase.co';
const SUPABASE_KEY = 'sb_publishable_fPg3-GL7F76LDrCqaIaYOw_2_KtjFoQ';
const SLUG = 'home';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

export default function ViewCounter() {
  const { t, lang } = useLang();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const session = `pv_counted_${SLUG}`;

    const read = async () => {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/page_views?slug=eq.${SLUG}&select=count`, { headers });
      const rows = await r.json();
      return Array.isArray(rows) && rows[0] ? Number(rows[0].count) : null;
    };

    const run = async () => {
      try {
        let value: number | null;
        if (typeof window !== 'undefined' && sessionStorage.getItem(session)) {
          value = await read();
        } else {
          const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_views`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ page_slug: SLUG }),
          });
          value = r.ok ? Number(await r.json()) : await read();
          if (typeof window !== 'undefined') sessionStorage.setItem(session, '1');
        }
        if (!cancelled && value != null && !Number.isNaN(value)) setCount(value);
      } catch {
        /* counter is non-critical — fail silently */
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  if (count == null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm"
    >
      <Eye size={15} className="text-amber-400" />
      <span dir="ltr" className="font-mono font-bold text-amber-300 tabular-nums">
        {count.toLocaleString(lang === 'he' ? 'he-IL' : 'en-US')}
      </span>
      <span className="text-gray-400">{t('footer.views')}</span>
    </motion.div>
  );
}
