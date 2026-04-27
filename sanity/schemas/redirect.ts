export default {
  name: 'redirect', type: 'document', title: 'Redirect',
  fields: [
    { name: 'from', type: 'string', validation: (R: any) => R.required() },
    { name: 'to', type: 'string', validation: (R: any) => R.required() },
    { name: 'statusCode', type: 'number', initialValue: 301 },
  ],
};
