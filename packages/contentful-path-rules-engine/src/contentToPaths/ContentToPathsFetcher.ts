import { Entry } from 'contentful';
import { ApolloContext, PathInfo } from '@last-rev/types';
import traversePathRule, { PathVisitor } from '../core/traversePathRule';
import {
  AstNode,
  Field,
  PathRule,
  RefByExpression,
  ReferenceExpression,
  SegmentReference,
  StaticSegment
} from '../types';
import ContentToPathsFetcherTree, {
  ContentToPathsHasChildrenNode,
  ContentToPathTreeRefByNode,
  ContentToPathTreeRefChildNode,
  ContentToPathTreeRefNode
} from './ContentToPathsFetcherTree';
import RelationShipValidator from '../core/RelationshipValidator';

type ContentToPathsFetcherContext = {
  currentSegmentIndex: number;
  tree: ContentToPathsFetcherTree;
  segmentRefChainIndex: number | null;
  currentTreeNode: ContentToPathsHasChildrenNode;
  nodesToBeAppendedToSegment: Map<number, ContentToPathTreeRefChildNode[]>;
  completedSegments: Map<number, ContentToPathsHasChildrenNode>;
};

const appendNodeToSegmentOrCurrent = ({
  treeNode,
  parent,
  context
}: {
  treeNode: ContentToPathTreeRefNode | ContentToPathTreeRefByNode;
  parent: AstNode;
  context: ContentToPathsFetcherContext;
}) => {
  const { completedSegments, segmentRefChainIndex, nodesToBeAppendedToSegment, currentTreeNode } = context;
  if (parent.type === 'SegmentReference' && segmentRefChainIndex !== null) {
    if (completedSegments.get(segmentRefChainIndex)) {
      const completedSegment = completedSegments.get(segmentRefChainIndex)!;
      completedSegment.children.push(treeNode);
    } else {
      if (!nodesToBeAppendedToSegment.get(segmentRefChainIndex)) {
        nodesToBeAppendedToSegment.set(segmentRefChainIndex, []);
      }
      nodesToBeAppendedToSegment.get(segmentRefChainIndex)!.push(treeNode);
    }
  } else {
    currentTreeNode.children.push(treeNode);
  }
};

const ContentToPathsFetcherVisitor: PathVisitor<ContentToPathsFetcherContext> = {
  StaticSegment: {
    exit: (node, _parent, context) => {
      const { value } = node as StaticSegment;
      const { tree, currentSegmentIndex } = context;

      tree.appendStatic(value, currentSegmentIndex);
      // segment ended, increment segment index
      context.currentSegmentIndex++;
      tree.incrementNumSegments();
    }
  },
  DynamicSegment: {
    enter: (_node, _parent, context) => {
      const { tree } = context;
      context.currentTreeNode = tree.root;
    },
    exit: (_node, _parent, context) => {
      const { tree, currentTreeNode, completedSegments, currentSegmentIndex, nodesToBeAppendedToSegment } = context;

      completedSegments.set(currentSegmentIndex, currentTreeNode);

      const toAppend = nodesToBeAppendedToSegment.get(currentSegmentIndex);
      if (toAppend) {
        currentTreeNode.children.push(...toAppend);
      }

      context.currentSegmentIndex++;
      tree.incrementNumSegments();
    }
  },
  SegmentReference: {
    enter: (node, _parent, context) => {
      const { index } = node as SegmentReference;
      context.segmentRefChainIndex = index;
    },
    exit: (_node, _parent, context) => {
      context.segmentRefChainIndex = null;
    }
  },
  ReferenceExpression: {
    enter: (node, parent, context) => {
      const { field, contentType } = node as ReferenceExpression;
      const { currentSegmentIndex } = context;

      const treeNode: ContentToPathTreeRefNode = {
        type: 'ref',
        field,
        contentType,
        segmentIndex: currentSegmentIndex,
        children: []
      };

      appendNodeToSegmentOrCurrent({ treeNode, parent: parent!, context });

      context.currentTreeNode = treeNode;
    }
  },
  RefByExpression: {
    enter: (node, parent, context) => {
      const { refByField, contentType } = node as RefByExpression;
      const { currentSegmentIndex } = context;

      const treeNode: ContentToPathTreeRefByNode = {
        type: 'refBy',
        field: refByField,
        contentType,
        segmentIndex: currentSegmentIndex,
        children: []
      };

      appendNodeToSegmentOrCurrent({ treeNode, parent: parent!, context });

      context.currentTreeNode = treeNode;
    }
  },
  Field: {
    enter: (node, _parent, context) => {
      const { name: field } = node as Field;
      const { currentSegmentIndex, currentTreeNode } = context;
      currentTreeNode.children.push({
        type: 'field',
        field,
        segmentIndex: currentSegmentIndex
      });
    }
  }
};

/**
 * Builds a ContentToPathsFetcherTree from a Path Rule, and then calls fetch on it.
 */
export default class ContentToPathsFetcher {
  private readonly _tree: ContentToPathsFetcherTree = new ContentToPathsFetcherTree();
  private readonly _validator: RelationShipValidator;

  constructor({ pathRule }: { pathRule: PathRule }) {
    const context: ContentToPathsFetcherContext = {
      currentSegmentIndex: 0,
      tree: this._tree,
      nodesToBeAppendedToSegment: new Map(),
      completedSegments: new Map(),
      currentTreeNode: this._tree.root,
      segmentRefChainIndex: null
    };

    traversePathRule(pathRule, ContentToPathsFetcherVisitor, context);

    this._validator = new RelationShipValidator(pathRule);
  }

  get logPrefix() {
    return `[${this.constructor.name}]`;
  }

  async fetch({ entry, apolloContext }: { entry: Entry<any>; apolloContext: ApolloContext }): Promise<PathInfo[]> {
    const pathInfos = await this._tree.fetch(entry, apolloContext);
    const validator = this._validator;
    return asyncFilter(pathInfos, async (pathInfo) => {
      const errors = await validator.validate(pathInfo.pathEntries, apolloContext);
      return errors.length === 0;
    });
  }
}

const asyncFilter = async <T>(arr: T[], predicate: (t: T) => Promise<boolean>) =>
  Promise.all(arr.map(predicate)).then((results) => arr.filter((_v, index) => results[index]));
