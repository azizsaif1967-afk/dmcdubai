export default {
  name: 'siteSettings', type: 'document', title: 'Site Settings', __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'companyName', type: 'string', initialValue: 'DMC Dubai' },
    { name: 'logo', type: 'image' },
    { name: 'tagline', type: 'localeString' },
    { name: 'contactEmail', type: 'string' },
    { name: 'contactPhone', type: 'string' },
    { name: 'whatsapp', type: 'string' },
    { name: 'address', type: 'localeText' },
    { name: 'socialLinks', type: 'array', of: [{ type: 'object', fields: [
      { name: 'platform', type: 'string' }, { name: 'url', type: 'url' },
    ]}]},
  ],
};
