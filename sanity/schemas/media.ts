export default {
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'assetURL', type: 'url' },
    { name: 'file', type: 'file' },
    { name: 'fileMobile', type: 'file' },
    { name: 'fileTablet', type: 'file' },
    { name: 'mobile', type: 'reference', to: [{ type: 'media' }] },
    { name: 'tablet', type: 'reference', to: [{ type: 'media' }] },
    { name: 'placeholder', type: 'reference', to: [{ type: 'media' }] },
    { name: 'source', type: 'string' },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
