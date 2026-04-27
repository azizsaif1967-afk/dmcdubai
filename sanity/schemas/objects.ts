export const localeString = {
  name: 'localeString', type: 'object', title: 'Locale string',
  fields: [{ name: 'en', type: 'string' }, { name: 'ar', type: 'string' }],
};

export const localeText = {
  name: 'localeText', type: 'object', title: 'Locale text',
  fields: [{ name: 'en', type: 'text' }, { name: 'ar', type: 'text' }],
};

export const localePortableText = {
  name: 'localePortableText', type: 'object', title: 'Locale portable text',
  fields: [
    { name: 'en', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'ar', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
};

export const seo = {
  name: 'seo', type: 'object', title: 'SEO',
  fields: [
    { name: 'metaTitle', type: 'localeString' },
    { name: 'metaDescription', type: 'localeText' },
    { name: 'ogImage', type: 'image' },
    { name: 'noindex', type: 'boolean', initialValue: false },
  ],
};
