export default {
  name: 'insight', type: 'document', title: 'Insight',
  fields: [
    { name: 'title', type: 'localeString', validation: (R: any) => R.required() },
    { name: 'slug', type: 'slug', options: { source: 'title.en' }, validation: (R: any) => R.required() },
    { name: 'author', type: 'reference', to: [{ type: 'teamMember' }] },
    { name: 'category', type: 'string', options: { list: ['Setup', 'Tax', 'Visas', 'Compliance', 'Industry', 'News'] } },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'coverImage', type: 'image' },
    { name: 'excerpt', type: 'localeText' },
    { name: 'body', type: 'localePortableText' },
    { name: 'readTime', type: 'number', description: 'Minutes' },
    { name: 'seo', type: 'seo' },
  ],
};
