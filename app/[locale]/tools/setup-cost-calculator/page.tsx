import { CostCalculator } from '@/components/tools/cost-calculator';
import type { Locale } from '@/lib/i18n/config';

export const metadata = { title: 'Setup Cost Calculator' };

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-medium text-brand-red uppercase tracking-[0.2em]">Tool</p>
        <h1 className="mt-4 text-4xl lg:text-5xl font-display font-bold tracking-tight">Setup Cost Calculator</h1>
        <p className="mt-4 text-neutral-700 max-w-2xl">Five questions. Indicative AED breakdown. We&apos;ll email a tailored quote.</p>
        <div className="mt-12">
          <CostCalculator locale={params.locale} />
        </div>
      </div>
    </div>
  );
}
