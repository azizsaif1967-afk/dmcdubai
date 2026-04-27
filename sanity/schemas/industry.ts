export default {
  name: 'industry', type: 'document', title: 'Industry',
  fields: [
    { name: 'title', type: 'localeString', validation: (R: any) => R.required() },
    { name: 'slug', type: 'slug', options: { source: 'title.en' }, validation: (R: any) => R.required() },
    { name: 'shortDescription', type: 'localeText' },
    { name: 'heroImage', type: 'image' },
    { name: 'requirements', type: 'array', of: [{ type: 'localeText' }] },
    { name: 'caseStudies', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'localeString' },
      { name: 'summary', type: 'localeText' },
      { name: 'metric', type: 'string' },
    ]}]},
    { name: 'body', type: 'localePortableText' },
    { name: 'seo', type: 'seo' },
  ],
};
