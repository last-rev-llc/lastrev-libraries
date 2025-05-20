export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'jobTitle', type: 'string' },
    { name: 'image', type: 'reference', to: [{ type: 'media' }] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
