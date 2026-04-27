import Link from 'next/link';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';
import type { Locale } from '@/lib/i18n/config';

const dict = { en, ar } as const;

export function Nav({ locale }: { locale: Locale }) {
  const t = dict[locale].nav;
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-7xl h-16 px-6 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-display font-bold text-xl tracking-tight">
          DMC<span className="text-brand-red">.</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          <Link href={`/${locale}/services`}>{t.services}</Link>
          <Link href={`/${locale}/industries`}>{t.industries}</Link>
          <Link href={`/${locale}/tools`}>{t.tools}</Link>
          <Link href={`/${locale}/insights`}>{t.insights}</Link>
          <Link href={`/${locale}/about`}>{t.about}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href={`/${otherLocale}`} className="text-sm hover:underline">
            {otherLocale === 'ar' ? 'العربية' : 'EN'}
          </Link>
          <a href={`mailto:info@dmcdubai.com`} className="bg-brand-red text-white h-10 px-5 inline-flex items-center text-sm font-medium">
            {t.contact}
          </a>
        </div>
      </div>
    </header>
  );
}
