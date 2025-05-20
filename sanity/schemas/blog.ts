export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'author', type: 'reference', to: [{ type: 'person' }] },
    { name: 'body', type: 'richText' },
    { name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'categoryBlog' }] }] },
    { name: 'contents', type: 'array', of: [{ type: 'reference', to: [{ type: 'content' }] }] },
    { name: 'disableBackToTop', type: 'boolean' },
    { name: 'featuredMedia', type: 'reference', to: [{ type: 'media' }] },
    { name: 'footer', type: 'reference', to: [{ type: 'content' }] },
    { name: 'header', type: 'reference', to: [{ type: 'header' }] },
    { name: 'pubDate', type: 'datetime' },
    { name: 'relatedLinks', type: 'array', of: [{ type: 'reference', to: [{ type: 'link' }] }] },
    { name: 'seo', type: 'object', fields: [] },
    { name: 'summary', type: 'text' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'theme', type: 'array', of: [{ type: 'reference', to: [{ type: 'theme' }] }] }
  ]
}
