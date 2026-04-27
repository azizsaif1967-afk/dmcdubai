export default {
  name: 'teamMember', type: 'document', title: 'Team Member',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'title', type: 'localeString' },
    { name: 'bio', type: 'localeText' },
    { name: 'photo', type: 'image' },
    { name: 'linkedin', type: 'url' },
    { name: 'order', type: 'number' },
  ],
};
