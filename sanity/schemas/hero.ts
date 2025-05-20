export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'overline', type: 'string' },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'array', of: [{ type: 'reference', to: [{ type: 'media' }] }] },
    { name: 'background', type: 'reference', to: [{ type: 'media' }] },
    { name: 'backgroundAsset', type: 'reference', to: [{ type: 'media' }] },
    { name: 'backgroundColor', type: 'string' },
    { name: 'contentHeight', type: 'string' },
    { name: 'contentWidth', type: 'string' },
    { name: 'actions', type: 'array', of: [{ type: 'reference', to: [{ type: 'link' }] }] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
