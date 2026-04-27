import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';

const SERVICES = [
  { num: '01', slug: 'mainland-setup', en: 'Mainland Setup', ar: 'تأسيس البر الرئيسي', desc_en: 'DED licensing, local agent options, full UAE market access.', desc_ar: 'ترخيص دائرة التنمية الاقتصادية والوصول الكامل لسوق الإمارات.' },
  { num: '02', slug: 'free-zone-setup', en: 'Free Zone Setup', ar: 'تأسيس المنطقة الحرة', desc_en: '40+ free zones — IFZA, DMCC, JAFZA, Meydan and more.', desc_ar: 'أكثر من 40 منطقة حرة — IFZA، DMCC، جافزا، ميدان وغيرها.' },
  { num: '03', slug: 'offshore-setup', en: 'Offshore Setup', ar: 'تأسيس الأوفشور', desc_en: 'JAFZA Offshore, RAK ICC, asset holding structures.', desc_ar: 'هياكل ممتلكات الأصول — جافزا أوفشور، RAK ICC.' },
  { num: '04', slug: 'visas', en: 'Visas & Immigration', ar: 'التأشيرات والإقامة', desc_en: 'Investor, employee, dependent and Golden Visa processing.', desc_ar: 'تأشيرات المستثمرين والموظفين والمعالين والذهبية.' },
  { num: '05', slug: 'vat-tax', en: 'VAT & Corporate Tax', ar: 'ضريبة القيمة المضافة والشركات', desc_en: 'Registration, filings, corporate tax compliance.', desc_ar: 'التسجيل والإقرارات وامتثال ضريبة الشركات.' },
  { num: '06', slug: 'pro-services', en: 'PRO & Government Liaison', ar: 'خدمات المعاملات الحكومية', desc_en: 'Document attestation, MOFA, MOL, GDRFA processing.', desc_ar: 'تصديق المستندات ومعاملات الجهات الحكومية.' },
];

export function ServiceGrid({ locale }: { locale: Locale }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium text-brand-red uppercase tracking-[0.2em]">Services</p>
          <h2 className="mt-4 text-3xl lg:text-5xl font-display font-bold tracking-tight">
            Everything you need to operate in the UAE.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="bg-white p-8 lg:p-10 hover:bg-neutral-50 transition-colors group"
            >
              <p className="text-5xl font-display font-bold text-brand-red">{s.num}.</p>
              <h3 className="mt-6 text-xl font-display font-bold">{locale === 'ar' ? s.ar : s.en}</h3>
              <p className="mt-2 text-sm text-neutral-600">{locale === 'ar' ? s.desc_ar : s.desc_en}</p>
              <p className="mt-6 text-sm font-medium group-hover:text-brand-red">Learn more →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
