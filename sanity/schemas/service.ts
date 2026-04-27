export default {
  name: 'service', type: 'document', title: 'Service',
  fields: [
    { name: 'title', type: 'localeString', validation: (R: any) => R.required() },
    { name: 'slug', type: 'slug', options: { source: 'title.en' }, validation: (R: any) => R.required() },
    { name: 'number', type: 'number', description: 'Card number 01-99' },
    { name: 'shortDescription', type: 'localeText' },
    { name: 'heroImage', type: 'image', options: { hotspot: true } },
    { name: 'icon', type: 'string' },
    { name: 'features', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'localeString' }, { name: 'description', type: 'localeText' },
    ]}]},
    { name: 'process', type: 'array', of: [{ type: 'object', fields: [
      { name: 'step', type: 'number' },
      { name: 'title', type: 'localeString' },
      { name: 'description', type: 'localeText' },
    ]}]},
    { name: 'pricing', type: 'object', fields: [
      { name: 'startingFrom', type: 'number' },
      { name: 'currency', type: 'string', initialValue: 'AED' },
    ]},
    { name: 'faq', type: 'array', of: [{ type: 'reference', to: [{ type: 'faq' }] }] },
    { name: 'relatedIndustries', type: 'array', of: [{ type: 'reference', to: [{ type: 'industry' }] }] },
    { name: 'body', type: 'localePortableText' },
    { name: 'seo', type: 'seo' },
  ],
};
