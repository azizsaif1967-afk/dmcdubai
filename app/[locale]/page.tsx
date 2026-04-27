import en from '@/messages/en.json';
import ar from '@/messages/ar.json';
import type { Locale } from '@/lib/i18n/config';
import { Hero } from '@/components/marketing/hero';
import { KPIBar } from '@/components/marketing/kpi-bar';
import { ServiceGrid } from '@/components/marketing/service-grid';
import { CalculatorTeaser } from '@/components/marketing/calculator-teaser';
import { ContactCTA } from '@/components/marketing/contact-cta';
import { OrganizationSchema } from '@/lib/seo/schema';

export const revalidate = 60;

const dict = { en, ar } as const;

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const t = dict[params.locale];
  return (
    <>
      <OrganizationSchema />
      <Hero
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        sub={t.hero.sub}
        primaryCta={{ label: t.cta.getStarted, href: `/${params.locale}/contact` }}
        secondaryCta={{ label: t.cta.estimateCost, href: `/${params.locale}/tools/setup-cost-calculator` }}
        locale={params.locale}
      />
      <KPIBar
        items={[
          { label: t.kpi.years, value: 15, suffix: '+' },
          { label: t.kpi.companies, value: 5000, suffix: '+' },
          { label: t.kpi.approval, value: 98, suffix: '%' },
          { label: t.kpi.freezones, value: 40, suffix: '+' },
        ]}
      />
      <ServiceGrid locale={params.locale} />
      <CalculatorTeaser locale={params.locale} />
      <ContactCTA locale={params.locale} />
    </>
  );
}
