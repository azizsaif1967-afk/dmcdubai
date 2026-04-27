export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'DMC Dubai',
    url: process.env.NEXT_PUBLIC_URL ?? 'https://dmcdubai.com',
    logo: `${process.env.NEXT_PUBLIC_URL ?? 'https://dmcdubai.com'}/logo.svg`,
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    areaServed: 'AE',
    sameAs: [],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FAQSchema({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question', name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ServiceSchema({ name, description, slug }: { name: string; description: string; slug: string }) {
  const base = process.env.NEXT_PUBLIC_URL ?? 'https://dmcdubai.com';
  const data = {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: name, description,
    provider: { '@type': 'Organization', name: 'DMC Dubai', url: base },
    url: `${base}/services/${slug}`,
    areaServed: 'AE',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
