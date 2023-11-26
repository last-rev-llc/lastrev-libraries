import { Node, Block, Inline } from '@contentful/rich-text-types';
import INLINES from '../INLINES';
import BLOCKS from '../BLOCKS';
import { TextNode } from '../types';

/**
 * Tiny replacement for Object.values(object).includes(key) to
 * avoid including CoreJS polyfills
 */
function hasValue(obj: Record<string, unknown>, value: unknown) {
  for (const key of Object.keys(obj)) {
    if (value === obj[key]) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if the node is an instance of Inline.
 */
export function isInline(node: Node): node is Inline {
  return hasValue(INLINES, node.nodeType);
}

/**
 * Checks if the node is an instance of Block.
 */
export function isBlock(node: Node): node is Block {
  return hasValue(BLOCKS, node.nodeType);
}

/**
 * Checks if the node is an instance of TextNode.
 */
export function isText(node: Node): node is TextNode {
  return node.nodeType === 'text';
}
