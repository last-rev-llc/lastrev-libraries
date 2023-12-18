/**
 * Map of all Contentful mark types. Marks contain inline nodes.
 */
enum MARKS {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINE = 'underline',
  CODE = 'code',
  SUPERSCRIPT = 'superscript',
  SUBSCRIPT = 'subscript',
  // special for LR RTE
  COLOR = 'color',
  TYPOGRAPHY = 'typography',
  HIGHLIGHT = 'highlight'
}

export default MARKS;
