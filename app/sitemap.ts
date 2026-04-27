import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_URL ?? 'https://dmcdubai.com';
  const paths = ['', '/about', '/services', '/industries', '/insights', '/tools',
    '/tools/setup-cost-calculator', '/tools/trade-name-checker', '/tools/business-plan-builder',
    '/faq', '/contact'];
  return paths.flatMap((p) =>
    (['en', 'ar'] as const).map((l) => ({
      url: `${base}/${l}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
      alternates: { languages: { en: `${base}/en${p}`, ar: `${base}/ar${p}` } },
    })),
  );
}
