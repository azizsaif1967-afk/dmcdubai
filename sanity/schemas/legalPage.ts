export default {
  name: 'legalPage', type: 'document', title: 'Legal Page',
  fields: [
    { name: 'title', type: 'localeString' },
    { name: 'slug', type: 'slug', options: { source: 'title.en' } },
    { name: 'body', type: 'localePortableText' },
    { name: 'lastUpdated', type: 'datetime' },
  ],
};
