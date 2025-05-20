export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'introText', type: 'reference', to: [{ type: 'text' }] },
    { name: 'items', type: 'array', of: [
        { type: 'reference', to: [{ type: 'card' }, { type: 'link' }, { type: 'media' }, { type: 'navigationItem' }, { type: 'section' }] }
      ] },
    { name: 'itemsSpacing', type: 'number' },
    { name: 'itemsVariant', type: 'string' },
    { name: 'itemsWidth', type: 'string' },
    { name: 'settings', type: 'object', fields: [] },
    { name: 'styles', type: 'object', fields: [] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
