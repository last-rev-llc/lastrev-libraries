import { ApolloContext, ItemKey, PathInfo, RefByKey, BaseEntry } from '@last-rev/types';

export type ContentToPathTreeStaticNode = {
  type: 'static';
  value: string;
  segmentIndex: number;
};

export type ContentToPathTreeFieldNode = {
  type: 'field';
  field: string;
  segmentIndex: number;
};

export type ContentToPathTreeRefNode = {
  type: 'ref';
  field: string;
  contentType: string;
  segmentIndex: number;
  children: ContentToPathTreeRefChildNode[];
};

export type ContentToPathTreeRefByNode = {
  type: 'refBy';
  field: string;
  contentType: string;
  segmentIndex: number;
  children: ContentToPathTreeRefChildNode[];
};

export type ContentToPathTreeRootNode = {
  children: ContentToPathTreeRootChildNode[];
};

type RefNodeKeyObject = { key: ItemKey; node: ContentToPathTreeRefNode };
type RefByNodeKeyObject = { key: RefByKey; node: ContentToPathTreeRefByNode };

const isRefNode = (node: any): node is ContentToPathTreeRefNode => node.type === 'ref';
const isRefByNode = (node: any): node is ContentToPathTreeRefByNode => node.type === 'refBy';
const isStaticNode = (node: any): node is ContentToPathTreeStaticNode => node.type === 'static';
const isFieldNode = (node: any): node is ContentToPathTreeFieldNode => node.type === 'field';
const isRootNode = (node: any): node is ContentToPathTreeRootNode => !node.type;

const getRefNodeKeyObjects = (
  nodes: ContentToPathTreeRefNode[],
  entries: BaseEntry[],
  ctx: ApolloContext
): RefNodeKeyObject[] => {
  return entries
    .map((entry) => {
      return nodes
        .map((node) => {
          const refFieldName = node.field;
          let ref = (entry.fields as any)[refFieldName]?.[ctx.defaultLocale];
          if (!ref) return [];
          if (!Array.isArray(ref)) {
            ref = [ref];
          }
          return ref.map(
            (r: any): RefNodeKeyObject => ({
              key: {
                id: r.sys.id,
                preview: !!ctx.preview
              },
              node
            })
          );
        })
        .flat();
    })
    .flat();
};

const getRefByNodeKeyObjects = (
  nodes: ContentToPathTreeRefByNode[],
  entries: BaseEntry[],
  ctx: ApolloContext
): RefByNodeKeyObject[] => {
  return entries
    .map((entry) => {
      return nodes.map((node): RefByNodeKeyObject => {
        const { field, contentType } = node;

        return {
          key: {
            id: entry.sys.id,
            field,
            contentType,
            preview: !!ctx.preview
          },
          node
        };
      });
    })
    .flat();
};

export type ContentToPathTreeRefChildNode =
  | ContentToPathTreeFieldNode
  | ContentToPathTreeRefNode
  | ContentToPathTreeRefByNode;

export type ContentToPathTreeRootChildNode = ContentToPathTreeRefChildNode | ContentToPathTreeStaticNode;

export type ContentToPathsHasChildrenNode =
  | ContentToPathTreeRootNode
  | ContentToPathTreeRefNode
  | ContentToPathTreeRefByNode;

export type SegmentInfo = {
  value: string;
  entry: BaseEntry | null;
};

/**
 * recursively loads each level of the tree
 */
const deepLoad = async ({
  node,
  resolvedSlugs,
  entry,
  ctx,
  delayedFields
}: {
  node: ContentToPathTreeRefNode | ContentToPathTreeRefByNode;
  entry: BaseEntry;
  ctx: ApolloContext;
  resolvedSlugs: (SegmentInfo | null)[][];
  delayedFields: { info: SegmentInfo; segmentIndex: number }[];
}): Promise<void> => {
  const refChildren = node.children.filter(isRefNode);
  const refByChildren = node.children.filter(isRefByNode);

  const refNodeKeyObjects = getRefNodeKeyObjects(refChildren, [entry], ctx);
  const refByNodeKeyObjects = getRefByNodeKeyObjects(refByChildren, [entry], ctx);

  const [loadedRefEntries, loadedRefByEntries] = await Promise.all([
    ctx.loaders.entryLoader.loadMany(refNodeKeyObjects.map(({ key }) => key)),
    ctx.loaders.entriesRefByLoader.loadMany(refByNodeKeyObjects.map(({ key }) => key))
  ]);

  const loadedRefNodes: { node: ContentToPathTreeRefNode; entry: BaseEntry }[] = [];
  const loadedRefByNodes: {
    node: ContentToPathTreeRefByNode;
    entry: BaseEntry;
  }[] = [];

  refNodeKeyObjects.forEach(({ node }, i) => {
    const entry = loadedRefEntries[i];
    if (entry && (entry as BaseEntry).sys.contentType.sys.id === node.contentType) {
      loadedRefNodes.push({ node, entry: entry as BaseEntry });
    }
  });

  refByNodeKeyObjects.forEach(({ node }, i) => {
    const entries = (loadedRefByEntries[i] as BaseEntry[]) || [];
    entries.forEach((entry) => {
      loadedRefByNodes.push({ node, entry });
    });
  });

  if (loadedRefNodes.length) {
    await Promise.all(
      loadedRefNodes.map(async ({ node, entry: e }) => deepLoad({ node, resolvedSlugs, entry: e, ctx, delayedFields }))
    );
  }

  if (loadedRefByNodes.length) {
    await Promise.all(
      loadedRefByNodes.map(async ({ node, entry: e }) =>
        deepLoad({ node, resolvedSlugs, entry: e, ctx, delayedFields })
      )
    );
  }

  const isFinal = isRootNode(node) || !(refChildren.length > 0 || refByChildren.length > 0);

  if (refChildren.length > 0 && loadedRefNodes.length === 0) {
    delayedFields = [];
  }

  if (refByChildren.length > 0 && loadedRefByNodes.length === 0) {
    delayedFields = [];
  }

  node.children.filter(isFieldNode).forEach(({ segmentIndex, field }) => {
    const fieldValue = (entry.fields as any)[field]?.[ctx.defaultLocale];
    if (fieldValue) {
      if (isFinal) {
        resolvedSlugs[segmentIndex]!.push({
          value: fieldValue,
          entry
        });

        delayedFields.forEach((f) => {
          resolvedSlugs[f.segmentIndex]!.push(f.info);
        });
        delayedFields = [];
      } else {
        delayedFields.push({
          info: {
            value: fieldValue,
            entry
          },
          segmentIndex
        });
      }
    }
  });
};

const removeNull = (arr: any[]) => {
  return arr.filter((x) => x !== null);
};

const cartesian = (args: (SegmentInfo | null)[][]) => {
  var r: SegmentInfo[][] = [],
    max = args.length - 1;

  const helper = (arr: SegmentInfo[], i: number) => {
    const arg = removeNull(args[i]);
    for (var j = 0, l = arg.length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(arg[j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  };

  helper([], 0);
  return r;
};

/**
 * This tree is a representation of the segments of the path, structured in the order in which they entries to be loaded.
 * For example if entry1 has a reference field, then entry1 must be loaded prior to loading its references.
 * Each loaded entry will have metadata associating it back to the segment it belongs to, in order for the path to be reconstructed.
 */
export default class ContentToPathsFetcherTree {
  private readonly _root: ContentToPathTreeRootNode = { children: [] };
  private _numSegments: number = 0;

  async fetch(entry: BaseEntry, ctx: ApolloContext): Promise<PathInfo[]> {
    const resolvedSlugs: (SegmentInfo | null)[][] = new Array(this._numSegments);

    for (var i = 0; i < resolvedSlugs.length; i++) {
      resolvedSlugs[i] = [];
    }

    this._root.children.filter(isStaticNode).forEach(({ segmentIndex, value }) => {
      resolvedSlugs[segmentIndex].push({
        value,
        entry: null
      });
    });

    await deepLoad({
      node: this._root as unknown as ContentToPathTreeRefNode | ContentToPathTreeRefByNode,
      resolvedSlugs,
      entry,
      ctx,
      delayedFields: []
    });

    const filtered = cartesian(resolvedSlugs);

    return filtered.reduce((pathInfos, segmentInfoArray) => {
      const path = `/${segmentInfoArray.map(({ value }) => value).join('/')}`;
      const pathEntries = segmentInfoArray.map(({ entry }) => entry);
      pathInfos.push({ path, pathEntries });
      return pathInfos;
    }, [] as PathInfo[]);
  }

  incrementNumSegments() {
    this._numSegments++;
  }

  appendStatic(value: string, segmentIndex: number) {
    this._root.children.push({ type: 'static', value, segmentIndex });
  }

  get root() {
    return this._root;
  }
}
