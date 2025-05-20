export default {
  name: 'theme',
  title: 'Theme',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'components', type: 'object', fields: [] },
    { name: 'typography', type: 'object', fields: [] },
    { name: 'variant', type: 'string' }
  ]
}
