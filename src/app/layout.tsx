import './globals.css';
import type { Metadata } from 'next';
import { LangProvider } from '@/lib/LanguageContext';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata: Metadata = {
  title: 'סיכוני שריפת סוללות ליתיום | ניתוח 60 שניות חומ"ס',
  description: 'ניתוח מלא של שני מחקרי FSRI: מה נשאר על ביגוד המגן של לוחם האש אחרי שריפת רכב חשמלי — מתכות סוללה, PAH, פלואוריד ועשן מוטגני — והמלצות מבצעיות. Health Risks in Lithium-Ion Battery Fires.',
  keywords: ['EV fire', 'lithium battery', 'firefighter', 'turnout gear', 'FSRI', 'HazMat', 'חומ"ס', 'שריפת רכב חשמלי', 'לוחם אש'],
  authors: [{ name: 'Roie Zukerman' }],
  openGraph: {
    title: 'הסכנה הנסתרת בעשן — סיכוני שריפת סוללות ליתיום',
    description: 'ניתוח מלא של שני מחקרי FSRI: מתכות סוללה, PAH, פלואוריד, מוטגניות והמלצות ללוחם האש.',
    type: 'website',
    locale: 'he_IL',
    images: ['/icon-512.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'הסכנה הנסתרת בעשן — סיכוני שריפת סוללות ליתיום',
    description: 'ניתוח מלא של שני מחקרי FSRI + המלצות מבצעיות ללוחם האש.',
    images: ['/icon-512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Heebo:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="text-gray-200 antialiased" style={{ fontFamily: 'Heebo, Inter, sans-serif' }}>
        <div className="app-backdrop" aria-hidden />
        <LangProvider>
          <ScrollProgress />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
