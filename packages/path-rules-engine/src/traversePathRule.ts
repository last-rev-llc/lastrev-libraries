import {
  AstNode,
  PathRule /*, RefByExpression, ReferenceExpression, StaticSegment, DynamicSegment, Field, */
} from './types';

export type PathVisitor<C> = {
  [key in AstNode['type']]?: {
    enter?: (node: AstNode, parent: AstNode | null, context: C) => void;
    exit?: (node: AstNode, parent: AstNode | null, context: C) => void;
  };
  // PathRule?: {
  //   enter?: (node: PathRule, parent: AstNode | null, context: C) => void;
  //   exit?: (node: PathRule, parent: AstNode | null, context: C) => void;
  // };
  // DynamicSegment?: {
  //   enter?: (node: DynamicSegment, parent: AstNode | null, context: C) => void;
  //   exit?: (node: DynamicSegment, parent: AstNode | null, context: C) => void;
  // };
  // StaticSegment?: {
  //   enter?: (node: StaticSegment, parent: AstNode | null, context: C) => void;
  //   exit?: (node: StaticSegment, parent: AstNode | null, context: C) => void;
  // };
  // RefByExpression?: {
  //   enter?: (node: RefByExpression, parent: AstNode | null, context: C) => void;
  //   exit?: (node: RefByExpression, parent: AstNode | null, context: C) => void;
  // };
  // ReferenceExpression?: {
  //   enter?: (node: ReferenceExpression, parent: AstNode | null, context: C) => void;
  //   exit?: (node: ReferenceExpression, parent: AstNode | null, context: C) => void;
  // }
  // Field?: {
  //   enter?: (node: Field, parent: AstNode | null, context: C) => void;
  //   exit?: (node: Field, parent: AstNode | null, context: C) => void;
  // }
};

const traversePathRule = <T>(root: PathRule, visitor: PathVisitor<T>, ctx: T) => {
  const traverseNode = (node: AstNode, parent: AstNode | null, context: T) => {
    const methods = visitor[node.type];

    if (methods?.enter) {
      methods.enter(node, parent, context);
    }

    switch (node.type) {
      case 'PathRule':
        traverseArray(node.segments, node, context);
        break;
      case 'DynamicSegment':
        traverseNode(node.body, node, context);
        break;
      case 'RefByExpression':
      case 'ReferenceExpression':
      case 'SegmentReference':
        traverseNode(node.property, node, context);
        break;
      case 'Field':
      case 'StaticSegment':
        break;

      default:
        throw TypeError(`Unsupported node type: ${(node as any).type}`);
    }

    if (methods?.exit) {
      methods.exit(node, parent, context);
    }
  };

  const traverseArray = (arr: AstNode[], parent: AstNode, context: T) => {
    arr.forEach((child: AstNode) => {
      traverseNode(child, parent, context);
    });
  };

  traverseNode(root, null, ctx);
};

export default traversePathRule;
