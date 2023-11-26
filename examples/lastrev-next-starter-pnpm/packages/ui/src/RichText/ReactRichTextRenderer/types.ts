import { ReactNode } from 'react';
import BLOCKS from './BLOCKS';
import INLINES from './INLINES';

import { TopLevelBlockEnum, ListItemBlockEnum } from './schemaConstraints';
import { Node } from '@contentful/rich-text-types';

export interface Block extends Node {
  nodeType: BLOCKS;
  content: Array<Block | Inline | TextNode>;
}
export interface Inline extends Node {
  nodeType: INLINES;
  content: Array<Inline | TextNode>;
}
export interface TopLevelBlock extends Block {
  nodeType: TopLevelBlockEnum;
}
export interface Document extends Node {
  nodeType: BLOCKS.DOCUMENT;
  content: TopLevelBlock[];
}
export interface TextNode extends Node {
  nodeType: 'text';
  value: string;
  marks: Mark[];
}

export interface ListItemBlock extends Block {
  nodeType: ListItemBlockEnum;
}

export interface Mark {
  type: string;
  value: string;
}

export type CommonNode = TextNode | Block | Inline;

export interface NodeRenderer {
  (node: Block | Inline, children: ReactNode): ReactNode;
}

export interface RenderNode {
  [k: string]: NodeRenderer;
}

export interface RenderMark {
  [k: string]: (text: ReactNode, mark: Mark) => ReactNode;
}

export interface RenderText {
  (text: string): ReactNode;
}

export interface Options {
  /**
   * Node renderers
   */
  renderNode?: RenderNode;
  /**
   * Mark renderers
   */
  renderMark?: RenderMark;
  /**
   * Text renderer
   */
  renderText?: RenderText;
}
