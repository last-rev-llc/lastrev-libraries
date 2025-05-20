export default {
  name: 'card',
  title: 'Card',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'internalTitle', type: 'string' },
    { name: 'body', type: 'richText' },
    { name: 'media', type: 'array', of: [{ type: 'reference', to: [{ type: 'media' }] }] },
    { name: 'actions', type: 'array', of: [{ type: 'reference', to: [{ type: 'link' }] }] },
    { name: 'link', type: 'reference', to: [{ type: 'link' }] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
