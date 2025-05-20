export default {
  name: 'categoryBlog',
  title: 'Category Blog',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'header', type: 'reference', to: [{ type: 'header' }] },
    { name: 'footer', type: 'reference', to: [{ type: 'content' }] },
    { name: 'hero', type: 'reference', to: [{ type: 'hero' }] },
    { name: 'contents', type: 'array', of: [{ type: 'reference', to: [{ type: 'content' }] }] },
    { name: 'seo', type: 'object', fields: [] },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
