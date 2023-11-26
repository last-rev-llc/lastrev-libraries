import React, { ReactNode } from 'react';
import { appendKeyToValidElement } from './appendKeyToValidElement';
import { CommonNode, Options } from '../types';
import { isText } from './helpers';

export function nodeListToReactComponents(nodes: CommonNode[], options: Options): ReactNode {
  return nodes.map((node: CommonNode, index: number): ReactNode => {
    return appendKeyToValidElement(nodeToReactComponent(node, options), index);
  });
}

export function nodeToReactComponent(node: CommonNode, options: Options): ReactNode {
  const { renderNode, renderMark, renderText } = options;
  if (isText(node)) {
    return node.marks.reduce((value, mark) => {
      if (!renderMark?.[mark.type]) {
        return value;
      }
      // This was a change to support marks with values. Passing the whole mark as the 2nd argument to function
      return renderMark[mark.type](value, mark) as ReactNode;
    }, (renderText ? renderText(node.value) : node.value) as ReactNode);
  } else {
    const children: ReactNode = nodeListToReactComponents(node.content, options);
    if (!node.nodeType || !renderNode?.[node.nodeType]) {
      return <>{children}</>;
    }
    return renderNode[node.nodeType](node, children);
  }
}
