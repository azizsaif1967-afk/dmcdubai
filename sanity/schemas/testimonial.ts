export default {
  name: 'testimonial', type: 'document', title: 'Testimonial',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'localeString' },
    { name: 'company', type: 'string' },
    { name: 'quote', type: 'localeText' },
    { name: 'avatar', type: 'image' },
    { name: 'rating', type: 'number', validation: (R: any) => R.min(1).max(5) },
    { name: 'order', type: 'number' },
  ],
};
