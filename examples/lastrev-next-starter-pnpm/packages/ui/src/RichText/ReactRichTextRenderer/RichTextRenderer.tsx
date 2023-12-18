import React, { ReactNode } from 'react';
import { Document, Inline } from '@contentful/rich-text-types';
import { nodeToReactComponent } from './util/nodeListToReactComponents';
import BLOCKS from './BLOCKS';
import INLINES from './INLINES';
import MARKS from './MARKS';
import { Options, RenderMark, RenderNode } from './types';

const defaultNodeRenderers: RenderNode = {
  [BLOCKS.DOCUMENT]: (_node, children) => children,
  [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
  [BLOCKS.HEADING_1]: (_node, children) => <h1>{children}</h1>,
  [BLOCKS.HEADING_2]: (_node, children) => <h2>{children}</h2>,
  [BLOCKS.HEADING_3]: (_node, children) => <h3>{children}</h3>,
  [BLOCKS.HEADING_4]: (_node, children) => <h4>{children}</h4>,
  [BLOCKS.HEADING_5]: (_node, children) => <h5>{children}</h5>,
  [BLOCKS.HEADING_6]: (_node, children) => <h6>{children}</h6>,
  [BLOCKS.EMBEDDED_ENTRY]: (_node, children) => <div>{children}</div>,
  [BLOCKS.UL_LIST]: (_node, children) => <ul>{children}</ul>,
  [BLOCKS.OL_LIST]: (_node, children) => <ol>{children}</ol>,
  [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
  [BLOCKS.QUOTE]: (_node, children) => <blockquote>{children}</blockquote>,
  [BLOCKS.HR]: () => <hr />,
  [BLOCKS.TABLE]: (_node, children) => (
    <table>
      <tbody>{children}</tbody>
    </table>
  ),
  [BLOCKS.TABLE_ROW]: (_node, children) => <tr>{children}</tr>,
  [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => <th>{children}</th>,
  [BLOCKS.TABLE_CELL]: (_node, children) => <td>{children}</td>,
  [INLINES.ASSET_HYPERLINK]: (node) => defaultInline(INLINES.ASSET_HYPERLINK, node as Inline),
  [INLINES.ENTRY_HYPERLINK]: (node) => defaultInline(INLINES.ENTRY_HYPERLINK, node as Inline),
  [INLINES.EMBEDDED_ENTRY]: (node) => defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline),
  [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri}>{children}</a>
};

const defaultMarkRenderers: RenderMark = {
  [MARKS.BOLD]: (text) => <b>{text}</b>,
  [MARKS.ITALIC]: (text) => <i>{text}</i>,
  [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
  [MARKS.CODE]: (text) => <code>{text}</code>,
  [MARKS.SUPERSCRIPT]: (text) => <sup>{text}</sup>,
  [MARKS.SUBSCRIPT]: (text) => <sub>{text}</sub>
};

function defaultInline(_type: string, node: Inline): ReactNode {
  return (
    <span key={node.data.target.sys.id}>
      type: {node.nodeType} id: {node.data.target.sys.id}
    </span>
  );
}

/**
 * Serialize a Contentful Rich Text `document` to React tree
 */
export function documentToReactComponents(richTextDocument: Document, options: Options = {}): ReactNode {
  if (!richTextDocument) {
    return null;
  }

  return nodeToReactComponent(richTextDocument, {
    renderNode: {
      ...defaultNodeRenderers,
      ...options.renderNode
    },
    renderMark: {
      ...defaultMarkRenderers,
      ...options.renderMark
    },
    renderText: options.renderText
  });
}
