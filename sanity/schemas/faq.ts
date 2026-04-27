export default {
  name: 'faq', type: 'document', title: 'FAQ',
  fields: [
    { name: 'question', type: 'localeString', validation: (R: any) => R.required() },
    { name: 'answer', type: 'localePortableText' },
    { name: 'category', type: 'string', options: { list: ['Setup', 'Visas', 'Tax', 'Compliance', 'Pricing', 'General'] } },
    { name: 'order', type: 'number' },
  ],
};
