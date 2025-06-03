import {
  mapSanityPortableTextMarkToContentfulRichTextMark,
  mapSanityBlockToContentfulRichTextNode,
  mapSanityPortableTextNodeToContentfulRichTextNode,
  mapSanityPortableTextArrayToContentfulRichText
} from './richTextHelpers';

describe('mapSanityPortableTextMarkToContentfulRichTextMark', () => {
  it('maps known marks correctly', () => {
    expect(mapSanityPortableTextMarkToContentfulRichTextMark('strong')).toEqual({ type: 'bold' });
    expect(mapSanityPortableTextMarkToContentfulRichTextMark('em')).toEqual({ type: 'italic' });
    expect(mapSanityPortableTextMarkToContentfulRichTextMark('underline')).toEqual({ type: 'underline' });
    expect(mapSanityPortableTextMarkToContentfulRichTextMark('code')).toEqual({ type: 'code' });
  });
  it('returns the mark as type for unknown marks', () => {
    expect(mapSanityPortableTextMarkToContentfulRichTextMark('custom')).toEqual({ type: 'custom' });
  });
});

describe('mapSanityBlockToContentfulRichTextNode', () => {
  it('maps heading styles', () => {
    const styles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'];
    styles.forEach((style) => {
      const block = { style, children: [{ _type: 'span', text: 'Test' }] };
      const node = mapSanityBlockToContentfulRichTextNode(block);
      expect(node.nodeType).toBe(style === 'blockquote' ? 'blockquote' : style.replace('h', 'heading-'));
      expect(node.content[0].nodeType).toBe('text');
    });
  });
  it('defaults to paragraph for unknown style', () => {
    const block = { style: 'foo', children: [{ _type: 'span', text: 'Test' }] };
    const node = mapSanityBlockToContentfulRichTextNode(block);
    expect(node.nodeType).toBe('paragraph');
  });
});

describe('mapSanityPortableTextNodeToContentfulRichTextNode', () => {
  it('wraps node in type if wrapInType is provided', () => {
    const node = { _type: 'span', text: 'Test' };
    const wrapped = mapSanityPortableTextNodeToContentfulRichTextNode(node, 'custom-type');
    expect(wrapped.nodeType).toBe('custom-type');
    expect(wrapped.content[0].nodeType).toBe('text');
  });

  it('maps block node', () => {
    const block = { _type: 'block', style: 'h1', children: [{ _type: 'span', text: 'Test' }] };
    const node = mapSanityPortableTextNodeToContentfulRichTextNode(block);
    expect(node.nodeType).toBe('heading-1');
  });

  it('maps break node', () => {
    const node = mapSanityPortableTextNodeToContentfulRichTextNode({ _type: 'break' });
    expect(node.nodeType).toBe('paragraph');
    expect(node.content).toEqual([]);
  });

  it('maps span node with no marks', () => {
    const node = mapSanityPortableTextNodeToContentfulRichTextNode({ _type: 'span', text: 'abc' });
    expect(node).toEqual({ nodeType: 'text', value: 'abc', marks: [] });
  });

  it('maps span node with strong mark', () => {
    const node = mapSanityPortableTextNodeToContentfulRichTextNode({ _type: 'span', text: 'abc', marks: ['strong'] });
    expect(node.nodeType).toBe('text');
    expect(node.marks).toContainEqual({ type: 'bold' });
  });

  it('maps span node with link markDef', () => {
    const markDefs = [{ _key: 'a', _type: 'link', href: 'https://x.com' }];
    const node = mapSanityPortableTextNodeToContentfulRichTextNode(
      { _type: 'span', text: 'abc', marks: ['a'] },
      undefined,
      markDefs
    );
    expect(node.nodeType).toBe('hyperlink');
    expect(node.data).toEqual({ uri: 'https://x.com' });
    expect(node.content[0].nodeType).toBe('text');
  });

  it('maps span node with entry reference markDef', () => {
    const markDefs = [{ _key: 'a', _type: 'reference', _ref: 'entry123' }];
    const node = mapSanityPortableTextNodeToContentfulRichTextNode(
      { _type: 'span', text: 'abc', marks: ['a'] },
      undefined,
      markDefs
    );
    expect(node.nodeType).toBe('entry-hyperlink');
    expect(node.data.target.sys.id).toBe('entry123');
  });

  it('maps span node with asset markDef', () => {
    const markDefs = [{ _key: 'a', sys: { id: 'asset123', linkType: 'Asset' } }];
    const node = mapSanityPortableTextNodeToContentfulRichTextNode(
      { _type: 'span', text: 'abc', marks: ['a'] },
      undefined,
      markDefs
    );
    expect(node.nodeType).toBe('asset-hyperlink');
    expect(node.data.target.sys.id).toBe('asset123');
  });

  it('maps reference node as embedded-entry-inline', () => {
    const node = mapSanityPortableTextNodeToContentfulRichTextNode({ _type: 'reference', _ref: 'entry456' });
    expect(node.nodeType).toBe('embedded-entry-inline');
    expect(node.data.target.sys.id).toBe('entry456');
  });

  it('maps reference node as embedded-asset-inline', () => {
    const node = mapSanityPortableTextNodeToContentfulRichTextNode({
      _type: 'reference',
      sys: { id: 'asset456', linkType: 'Asset' }
    });
    expect(node.nodeType).toBe('embedded-asset-inline');
    expect(node.data.target.sys.id).toBe('asset456');
  });

  it('throws on unsupported node type', () => {
    expect(() => mapSanityPortableTextNodeToContentfulRichTextNode({ _type: 'foo' })).toThrow(
      'Unsupported node type: foo'
    );
  });
});

describe('mapSanityPortableTextArrayToContentfulRichText', () => {
  it('wraps content in document node', () => {
    const content = [
      { _type: 'block', style: 'h1', children: [{ _type: 'span', text: 'Title' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Body' }] }
    ];
    const doc = mapSanityPortableTextArrayToContentfulRichText(content);
    expect(doc.nodeType).toBe('document');
    expect(doc.content.length).toBe(2);
  });

  it('handles lists and nested lists', () => {
    const content = [
      { _type: 'block', listItem: 'bullet', level: 1, children: [{ _type: 'span', text: 'Item 1' }] },
      { _type: 'block', listItem: 'bullet', level: 2, children: [{ _type: 'span', text: 'Subitem 1' }] },
      { _type: 'block', listItem: 'bullet', level: 1, children: [{ _type: 'span', text: 'Item 2' }] }
    ];
    const doc = mapSanityPortableTextArrayToContentfulRichText(content);
    expect(doc.content[0].nodeType).toBe('unordered-list');
    expect(doc.content[0].content.length).toBe(2);
    expect(doc.content[0].content[0].content[1].nodeType).toBe('unordered-list');
  });

  it('handles embedded asset and entry blocks', () => {
    const content = [
      { _type: 'image', asset: { _ref: 'asset789' } },
      { _type: 'reference', _ref: 'entry789' }
    ];
    const doc = mapSanityPortableTextArrayToContentfulRichText(content);
    expect(doc.content[0].nodeType).toBe('embedded-asset-block');
    expect(doc.content[0].data.target.sys.id).toBe('asset789');
    expect(doc.content[1].nodeType).toBe('embedded-entry-block');
    expect(doc.content[1].data.target.sys.id).toBe('entry789');
  });
});

describe('normalizeSanityId', () => {
  it('removes draft. prefix from id', () => {
    // Block-level entry
    const content = [
      { _type: 'reference', _ref: 'draft.entry123' },
      { _type: 'image', asset: { _ref: 'draft.asset456' } }
    ];
    const doc = mapSanityPortableTextArrayToContentfulRichText(content);
    expect(doc.content[0].data.target.sys.id).toBe('entry123');
    expect(doc.content[1].data.target.sys.id).toBe('asset456');
  });

  it('removes draft. prefix from inline entry and asset hyperlinks', () => {
    // Inline entry hyperlink
    const markDefs = [{ _key: 'a', _type: 'reference', _ref: 'draft.entry789' }];
    const node = mapSanityPortableTextNodeToContentfulRichTextNode(
      { _type: 'span', text: 'abc', marks: ['a'] },
      undefined,
      markDefs
    );
    expect(node.nodeType).toBe('entry-hyperlink');
    expect(node.data.target.sys.id).toBe('entry789');

    // Inline asset hyperlink
    const markDefs2 = [{ _key: 'a', sys: { id: 'draft.asset789', linkType: 'Asset' } }];
    const node2 = mapSanityPortableTextNodeToContentfulRichTextNode(
      { _type: 'span', text: 'abc', marks: ['a'] },
      undefined,
      markDefs2
    );
    expect(node2.nodeType).toBe('asset-hyperlink');
    expect(node2.data.target.sys.id).toBe('asset789');
  });

  it('removes draft. prefix from embedded-entry-inline and embedded-asset-inline', () => {
    const entryNode = mapSanityPortableTextNodeToContentfulRichTextNode({ _type: 'reference', _ref: 'draft.entry456' });
    expect(entryNode.nodeType).toBe('embedded-entry-inline');
    expect(entryNode.data.target.sys.id).toBe('entry456');
    const assetNode = mapSanityPortableTextNodeToContentfulRichTextNode({
      _type: 'reference',
      sys: { id: 'draft.asset456', linkType: 'Asset' }
    });
    expect(assetNode.nodeType).toBe('embedded-asset-inline');
    expect(assetNode.data.target.sys.id).toBe('asset456');
  });
});
