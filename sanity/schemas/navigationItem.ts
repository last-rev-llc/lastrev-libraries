export default {
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'text', type: 'string' },
    { name: 'summary', type: 'text' },
    { name: 'href', type: 'url' },
    { name: 'manualUrl', type: 'url' },
    { name: 'image', type: 'reference', to: [{ type: 'media' }] },
    { name: 'media', type: 'reference', to: [{ type: 'media' }] },
    { name: 'subNavigation', type: 'array', of: [{ type: 'reference', to: [{ type: 'navigationItem' }, { type: 'link' }] }] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
