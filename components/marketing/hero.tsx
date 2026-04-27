import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';

interface HeroProps {
  eyebrow: string;
  headline: string;
  sub: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  locale: Locale;
}

export function Hero({ eyebrow, headline, sub, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium text-brand-red uppercase tracking-[0.2em]">{eyebrow}</p>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-black leading-[1.05] tracking-tight">
            {headline}
          </h1>
          <p className="mt-6 text-lg text-neutral-700 max-w-xl">{sub}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={primaryCta.href} className="bg-brand-red text-white h-14 px-8 inline-flex items-center font-medium">
              {primaryCta.label} →
            </Link>
            <Link href={secondaryCta.href} className="border border-black h-14 px-8 inline-flex items-center font-medium">
              {secondaryCta.label}
            </Link>
          </div>
          <dl className="mt-14 grid grid-cols-3 gap-8 max-w-md">
            <div>
              <dt className="text-3xl font-bold">15+</dt>
              <dd className="text-sm text-neutral-600 mt-1">Years</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold">5,000+</dt>
              <dd className="text-sm text-neutral-600 mt-1">Companies</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold">98%</dt>
              <dd className="text-sm text-neutral-600 mt-1">Approval</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-5 hidden lg:block aspect-[4/5] bg-neutral-100 border border-neutral-200" aria-hidden />
      </div>
    </section>
  );
}
