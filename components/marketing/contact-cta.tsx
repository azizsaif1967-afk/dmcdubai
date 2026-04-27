import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';

export function ContactCTA({ locale }: { locale: Locale }) {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
          Talk to a senior consultant today.
        </h2>
        <div className="space-y-4">
          <p className="text-neutral-300">No call centers. No junior associates. Direct access to consultants who&apos;ve completed thousands of UAE setups.</p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/contact`} className="bg-brand-red text-white h-12 px-7 inline-flex items-center font-medium">
              Book a consultation
            </Link>
            <a href="https://wa.me/971500000000" className="border border-white text-white h-12 px-7 inline-flex items-center font-medium">
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
