export default {
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'color', type: 'string' },
    { name: 'colorScheme', type: 'string' },
    { name: 'logo', type: 'reference', to: [{ type: 'media' }] },
    { name: 'logoUrl', type: 'url' },
    { name: 'navigationItems', type: 'array', of: [{ type: 'reference', to: [{ type: 'collection' }] }] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
