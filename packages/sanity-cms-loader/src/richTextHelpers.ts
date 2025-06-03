export const mapSanityPortableTextMarkToContentfulRichTextMark = (mark: any) => {
  switch (mark) {
    case 'strong':
      return { type: 'bold' };
    case 'em':
      return { type: 'italic' };
    case 'underline':
      return { type: 'underline' };
    case 'code':
      return { type: 'code' };
    default:
      return { type: mark };
  }
};

// Helper to find markDef by key
function findMarkDef(markDefs: any[], key: string) {
  return markDefs && markDefs.find((def: any) => def._key === key);
}

export const mapSanityBlockToContentfulRichTextNode = (block: any) => {
  if (!block || typeof block !== 'object' || !block._type) {
    throw new Error(`Invalid block passed to mapSanityBlockToContentfulRichTextNode: ${JSON.stringify(block)}`);
  }
  let nodeType = 'paragraph';
  let childrenNodeType: string | undefined;
  switch (block.style) {
    case 'h1':
      nodeType = 'heading-1';
      break;
    case 'h2':
      nodeType = 'heading-2';
      break;
    case 'h3':
      nodeType = 'heading-3';
      break;
    case 'h4':
      nodeType = 'heading-4';
      break;
    case 'h5':
      nodeType = 'heading-5';
      break;
    case 'h6':
      nodeType = 'heading-6';
      break;
    case 'blockquote':
      nodeType = 'blockquote';
      break;
    default:
      break;
  }
  return {
    nodeType,
    content: (block.children || []).map((node: any) =>
      mapSanityPortableTextNodeToContentfulRichTextNode(node, childrenNodeType, block.markDefs || [])
    )
  };
};

// Helper to normalize Sanity IDs (strip 'draft.' prefix if present)
function normalizeSanityId(id: string) {
  return id && id.startsWith('draft.') ? id.slice(6) : id;
}

export const mapSanityPortableTextNodeToContentfulRichTextNode = (
  node: any,
  wrapInType?: string,
  markDefs: any[] = []
): any => {
  if (!node || typeof node !== 'object' || !node._type) {
    throw new Error(
      `Invalid node passed to mapSanityPortableTextNodeToContentfulRichTextNode: ${JSON.stringify(node)}`
    );
  }
  if (wrapInType) {
    return {
      nodeType: wrapInType,
      content: [mapSanityPortableTextNodeToContentfulRichTextNode(node, undefined, markDefs)]
    };
  }
  switch (node._type) {
    case 'block':
      return mapSanityBlockToContentfulRichTextNode(node);
    case 'break':
      return {
        nodeType: 'paragraph',
        content: []
      };
    case 'span': {
      // Handle marks, including links and entry references
      if (node.marks && node.marks.length > 0) {
        // Start with a plain text node
        let innerNode: any = {
          nodeType: 'text',
          value: node.text,
          marks: [] as any[]
        };
        // Apply marks in reverse order (innermost first)
        for (let i = node.marks.length - 1; i >= 0; i--) {
          const mark = node.marks[i];
          const def = findMarkDef(markDefs, mark);
          if (def) {
            if (def._type === 'link' && def.href) {
              // External link
              innerNode = {
                nodeType: 'hyperlink',
                data: { uri: def.href },
                content: [innerNode]
              };
            } else if (def._type === 'reference' && def._ref) {
              // Entry hyperlink
              innerNode = {
                nodeType: 'entry-hyperlink',
                data: {
                  target: {
                    sys: {
                      id: normalizeSanityId(def._ref),
                      type: 'Link',
                      linkType: 'Entry'
                    }
                  }
                },
                content: [innerNode]
              };
            } else if (def.sys && def.sys.linkType === 'Asset') {
              // Asset hyperlink
              innerNode = {
                nodeType: 'asset-hyperlink',
                data: {
                  target: {
                    sys: {
                      id: normalizeSanityId(def.sys.id),
                      type: 'Link',
                      linkType: 'Asset'
                    }
                  }
                },
                content: [innerNode]
              };
            } else {
              // Regular mark (bold, italic, etc)
              if (innerNode.nodeType === 'text') {
                // Add the mark to the text node's marks array
                innerNode.marks = [mapSanityPortableTextMarkToContentfulRichTextMark(mark), ...(innerNode.marks || [])];
              } else if (
                innerNode.nodeType === 'hyperlink' ||
                innerNode.nodeType === 'entry-hyperlink' ||
                innerNode.nodeType === 'asset-hyperlink'
              ) {
                // If already wrapped (e.g., hyperlink), apply the mark to all text children
                innerNode = {
                  ...innerNode,
                  content: innerNode.content.map((child: any) => {
                    if (child.nodeType === 'text') {
                      return {
                        ...child,
                        marks: [mapSanityPortableTextMarkToContentfulRichTextMark(mark), ...(child.marks || [])]
                      };
                    }
                    return child;
                  })
                };
              }
            }
          } else {
            // Regular mark (bold, italic, etc) if not a markDef
            if (innerNode.nodeType === 'text') {
              innerNode.marks = [mapSanityPortableTextMarkToContentfulRichTextMark(mark), ...(innerNode.marks || [])];
            } else if (
              innerNode.nodeType === 'hyperlink' ||
              innerNode.nodeType === 'entry-hyperlink' ||
              innerNode.nodeType === 'asset-hyperlink'
            ) {
              innerNode = {
                ...innerNode,
                content: innerNode.content.map((child: any) => {
                  if (child.nodeType === 'text') {
                    return {
                      ...child,
                      marks: [mapSanityPortableTextMarkToContentfulRichTextMark(mark), ...(child.marks || [])]
                    };
                  }
                  return child;
                })
              };
            }
          }
        }
        return innerNode;
      } else {
        // No marks
        return {
          nodeType: 'text',
          value: node.text,
          marks: []
        };
      }
    }
    case 'reference':
      // Handle embedded entries and assets
      // If _ref is present, treat as embedded entry or asset
      if (node._ref) {
        // Default to embedded-entry-inline (could be block depending on context, but inline is safest for now)
        // If you want to distinguish between block/inline, you may need more context
        return {
          nodeType: 'embedded-entry-inline',
          data: {
            target: {
              sys: {
                id: normalizeSanityId(node._ref),
                type: 'Link',
                linkType: 'Entry'
              }
            }
          },
          content: []
        };
      }
      // If sys property exists and is an Asset, treat as embedded asset
      if (node.sys && node.sys.linkType === 'Asset') {
        return {
          nodeType: 'embedded-asset-inline',
          data: {
            target: {
              sys: {
                id: normalizeSanityId(node.sys.id),
                type: 'Link',
                linkType: 'Asset'
              }
            }
          },
          content: []
        };
      }
      return {};
    default:
      throw new Error(`Unsupported node type: ${node._type} (full node: ${JSON.stringify(node)})`);
  }
};

// Helper to group and nest Sanity blocks into Contentful's nested list structure
function groupBlocksToContentfulNodes(blocks: any[]): any[] {
  const result: any[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (!block || typeof block !== 'object' || !block._type) {
      throw new Error(`Invalid block in groupBlocksToContentfulNodes: ${JSON.stringify(block)}`);
    }
    if (block._type === 'block' && block.listItem) {
      const [listNode, nextIndex] = collectList(blocks, i);
      result.push(listNode);
      i = nextIndex;
    } else if (block._type === 'image' || block._type === 'file') {
      // Block-level asset embed
      // Assume block._id or block.asset?._ref or block._ref for asset id
      let assetId = block.asset?._ref || block._ref || block._id;
      assetId = normalizeSanityId(assetId);
      if (assetId) {
        result.push({
          nodeType: 'embedded-asset-block',
          data: {
            target: {
              sys: {
                id: assetId,
                type: 'Link',
                linkType: 'Asset'
              }
            }
          },
          content: []
        });
      }
      i++;
    } else if (block._type === 'reference' && (block._ref || (block.sys && block.sys.linkType === 'Entry'))) {
      // Block-level entry embed
      let entryId = block._ref || (block.sys && block.sys.id);
      entryId = normalizeSanityId(entryId);
      if (entryId) {
        result.push({
          nodeType: 'embedded-entry-block',
          data: {
            target: {
              sys: {
                id: entryId,
                type: 'Link',
                linkType: 'Entry'
              }
            }
          },
          content: []
        });
      }
      i++;
    } else {
      const mapped = mapSanityPortableTextNodeToContentfulRichTextNode(block, undefined, block.markDefs || []);
      result.push(mapped);
      i++;
    }
  }
  return result;
}

function collectList(blocks: any[], start: number): [any, number] {
  const firstBlock = blocks[start];
  if (!firstBlock || typeof firstBlock !== 'object' || !firstBlock._type) {
    throw new Error(`Invalid block in collectList: ${JSON.stringify(firstBlock)}`);
  }
  const listType = firstBlock.listItem === 'bullet' ? 'unordered-list' : 'ordered-list';
  const startLevel = firstBlock.level || 1;
  const items: any[] = [];
  let i = start;
  while (i < blocks.length) {
    const block = blocks[i];
    if (
      block &&
      block._type === 'block' &&
      block.listItem &&
      block.listItem === firstBlock.listItem &&
      (block.level || 1) === startLevel
    ) {
      // Check for nested list starting in the next block(s)
      let next = i + 1;
      const children: any[] = [
        ...(block.children || []).map((node: any) =>
          mapSanityPortableTextNodeToContentfulRichTextNode(node, undefined, block.markDefs || [])
        )
      ];
      // Check for nested lists (level + 1)
      while (
        next < blocks.length &&
        blocks[next] &&
        blocks[next]._type === 'block' &&
        blocks[next].listItem &&
        (blocks[next].level || 1) > startLevel
      ) {
        const [nestedList, afterNested] = collectList(blocks, next);
        children.push(nestedList);
        next = afterNested;
      }
      items.push({
        nodeType: 'list-item',
        content: children.length > 0 ? children : [{ nodeType: 'paragraph', content: [] }]
      });
      i = next;
    } else if (block && block._type === 'block' && block.listItem && (block.level || 1) < startLevel) {
      // End of this list level
      break;
    } else {
      // End of list
      break;
    }
  }
  return [
    {
      nodeType: listType,
      content: items
    },
    i
  ];
}

export const mapSanityPortableTextArrayToContentfulRichText = (content: any[]) => {
  return {
    nodeType: 'document',
    data: {},
    content: groupBlocksToContentfulNodes(content)
  };
};
