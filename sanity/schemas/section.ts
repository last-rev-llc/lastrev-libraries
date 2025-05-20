export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    { name: 'internalTitle', type: 'string' },
    { name: 'contents', type: 'array', of: [{ type: 'reference', to: [{ type: 'content' }] }] },
    { name: 'background', type: 'reference', to: [{ type: 'media' }] },
    { name: 'backgroundColor', type: 'string' },
    { name: 'contentAlignment', type: 'string' },
    { name: 'contentDirection', type: 'string' },
    { name: 'contentSpacing', type: 'number' },
    { name: 'contentWidth', type: 'string' },
    { name: 'paddingTop', type: 'number' },
    { name: 'paddingBottom', type: 'number' },
    { name: 'paddingLeft', type: 'number' },
    { name: 'paddingRight', type: 'number' },
    { name: 'styles', type: 'object', fields: [] },
    { name: 'settings', type: 'object', fields: [] },
    { name: 'variant', type: 'string' },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
