import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { siteContent } from '@/content/site-content';

export function ServiceGrid({ locale }: { locale: Locale }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium text-brand-red uppercase tracking-[0.2em]">Services</p>
          <h2 className="mt-4 text-3xl lg:text-5xl font-display font-bold tracking-tight">
            {locale === 'ar' ? 'كل ما تحتاجه للعمل في الإمارات.' : 'Everything you need to operate in the UAE.'}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
          {siteContent.services.map((s) => (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="bg-white p-8 lg:p-10 hover:bg-neutral-50 transition-colors group"
            >
              <p className="text-5xl font-display font-bold text-brand-red">{s.num}.</p>
              <h3 className="mt-6 text-xl font-display font-bold">{locale === 'ar' ? s.ar : s.en}</h3>
              <p className="mt-2 text-sm text-neutral-600">{locale === 'ar' ? s.desc_ar : s.desc_en}</p>
              <p className="mt-6 text-sm font-medium group-hover:text-brand-red">
                {locale === 'ar' ? 'اعرف المزيد ←' : 'Learn more →'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
