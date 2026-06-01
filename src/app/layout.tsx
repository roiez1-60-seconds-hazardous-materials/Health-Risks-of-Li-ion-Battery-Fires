import './globals.css';
import type { Metadata } from 'next';
import { LangProvider } from '@/lib/LanguageContext';

export const metadata: Metadata = {
  title: 'סיכוני שריפת סוללות ליתיום | ניתוח 60 שניות חומ"ס',
  description: 'Health Risks in Lithium-Ion Battery Fires — turnout gear contamination, battery metals, PAHs, fluoride and mutagenicity. FSRI research analysis.',
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
      <body className="bg-[#0d0d1a] text-gray-200 antialiased" style={{ fontFamily: 'Heebo, Inter, sans-serif' }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
