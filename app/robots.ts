import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_URL ?? 'https://dmcdubai.com';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/portal', '/api', '/studio'] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
