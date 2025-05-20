export default {
  name: 'text',
  title: 'Text',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'body', type: 'richText' },
    { name: 'color', type: 'string' },
    { name: 'align', type: 'string' },
    { name: 'styles', type: 'object', fields: [] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
