export default {
  name: 'link',
  title: 'Link',
  type: 'document',
  fields: [
    { name: 'text', type: 'string' },
    { name: 'href', type: 'url' },
    { name: 'manualUrl', type: 'url' },
    { name: 'icon', type: 'string' },
    { name: 'iconPosition', type: 'string' },
    { name: 'color', type: 'string' },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
