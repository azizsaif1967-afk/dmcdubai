import type { Metadata } from 'next';
import '@/app/globals.css';
import { dir, locales, type Locale } from '@/lib/i18n/config';
import { Nav } from '@/components/marketing/nav';
import { Footer } from '@/components/marketing/footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? 'https://dmcdubai.com'),
  title: { default: 'DMC Dubai — Business Setup Consultancy', template: '%s | DMC Dubai' },
  description: 'Dubai business setup, licensing, visas, and ongoing compliance handled by senior consultants.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={params.locale} dir={dir(params.locale)}>
      <body className={params.locale === 'ar' ? 'font-ar' : 'font-sans'}>
        <Nav locale={params.locale} />
        <main>{children}</main>
        <Footer locale={params.locale} />
      </body>
    </html>
  );
}
