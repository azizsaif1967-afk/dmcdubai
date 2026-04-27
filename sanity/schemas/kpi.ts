export default {
  name: 'kpi', type: 'document', title: 'KPI',
  fields: [
    { name: 'label', type: 'localeString' },
    { name: 'value', type: 'number' },
    { name: 'suffix', type: 'string' },
    { name: 'order', type: 'number' },
  ],
};
