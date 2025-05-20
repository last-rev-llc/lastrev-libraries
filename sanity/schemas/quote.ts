export default {
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'quote', type: 'text' },
    { name: 'authorName', type: 'string' },
    { name: 'authorTitle', type: 'string' },
    { name: 'image', type: 'reference', to: [{ type: 'media' }] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
