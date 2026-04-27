import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';

export function CalculatorTeaser({ locale }: { locale: Locale }) {
  return (
    <section className="bg-neutral-50 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-medium text-brand-red uppercase tracking-[0.2em]">Tools</p>
          <h2 className="mt-4 text-3xl lg:text-4xl font-display font-bold tracking-tight">
            Get a tailored cost estimate in 60 seconds.
          </h2>
          <p className="mt-4 text-neutral-700 max-w-xl">
            Answer five questions about your activity, jurisdiction and visa needs. We&apos;ll send a written breakdown with no obligation.
          </p>
          <Link
            href={`/${locale}/tools/setup-cost-calculator`}
            className="mt-8 bg-brand-red text-white h-12 px-7 inline-flex items-center font-medium"
          >
            Start the calculator →
          </Link>
        </div>
        <div className="bg-white border border-neutral-200 p-8">
          <ul className="space-y-4 text-sm">
            {['Mainland · Free Zone · Offshore', 'Visa quotas & dependents', 'Office, flexi or warehouse', 'Government & professional fees', 'AED breakdown emailed instantly'].map((x) => (
              <li key={x} className="flex gap-3"><span className="text-brand-red font-bold">✓</span> {x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
