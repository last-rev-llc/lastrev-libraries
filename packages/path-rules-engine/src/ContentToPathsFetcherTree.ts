import { Entry } from 'contentful';
import { ApolloContext, ItemKey, PathEntries, RefByKey } from '@last-rev/types';

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

const getRefNodeKeyObjects = (
  nodes: ContentToPathTreeRefNode[],
  entries: Entry<any>[],
  ctx: ApolloContext
): RefNodeKeyObject[] => {
  return entries
    .map((entry) => {
      return nodes
        .map((node) => {
          const refFieldName = node.field;
          let ref = entry.fields[refFieldName]?.[ctx.defaultLocale];
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
  entries: Entry<any>[],
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

export type PathInfo = {
  path: string;
  pathEntries: PathEntries;
};

export type SegmentInfo = {
  value: string;
  entry: Entry<any> | null;
};

const deepLoad = async ({
  node,
  resolvedSlugs,
  entry,
  ctx
}: {
  node: ContentToPathTreeRefNode | ContentToPathTreeRefByNode;
  entry: Entry<any>;
  ctx: ApolloContext;
  resolvedSlugs: (SegmentInfo | null)[];
}): Promise<(SegmentInfo | null)[][]> => {
  const newResolvedSlugs = [...resolvedSlugs];
  node.children.filter(isFieldNode).forEach(({ segmentIndex, field }) => {
    const fieldValue = entry.fields[field]?.[ctx.defaultLocale];
    if (fieldValue) {
      newResolvedSlugs[segmentIndex] = { value: fieldValue, entry };
    }
  });

  const refNodeKeyObjects = getRefNodeKeyObjects(node.children.filter(isRefNode), [entry], ctx);
  const refByNodeKeyObjects = getRefByNodeKeyObjects(node.children.filter(isRefByNode), [entry], ctx);

  const [loadedRefEntries, loadedRefByEntries] = await Promise.all([
    ctx.loaders.entryLoader.loadMany(refNodeKeyObjects.map(({ key }) => key)),
    ctx.loaders.entriesRefByLoader.loadMany(refByNodeKeyObjects.map(({ key }) => key))
  ]);

  const loadedRefNodes: { node: ContentToPathTreeRefNode; entry: Entry<any>; resolvedSlugs: (SegmentInfo | null)[] }[] =
    [];
  const loadedRefByNodes: {
    node: ContentToPathTreeRefByNode;
    entry: Entry<any>;
    resolvedSlugs: (SegmentInfo | null)[];
  }[] = [];

  refNodeKeyObjects.forEach(({ node }, i) => {
    const entry = loadedRefEntries[i];
    if (entry) {
      loadedRefNodes.push({ node, entry: entry as Entry<any>, resolvedSlugs: newResolvedSlugs.slice() });
    }
  });

  refByNodeKeyObjects.forEach(({ node }, i) => {
    const entries = (loadedRefByEntries[i] as Entry<any>[]) || [];
    entries.forEach((entry) => {
      loadedRefByNodes.push({ node, entry, resolvedSlugs: newResolvedSlugs.slice() });
    });
  });

  if (!loadedRefNodes.length && !loadedRefByNodes.length) {
    return [newResolvedSlugs];
  }

  const slugsToReturn: (SegmentInfo | null)[][] = [];

  if (loadedRefNodes.length) {
    slugsToReturn.push(
      ...(
        await Promise.all(
          loadedRefNodes.map(async ({ node, entry: e, resolvedSlugs: r }) =>
            deepLoad({ node, resolvedSlugs: r, entry: e, ctx })
          )
        )
      ).flat()
    );
  }

  if (loadedRefByNodes.length) {
    slugsToReturn.push(
      ...(
        await Promise.all(
          loadedRefByNodes.map(async ({ node, entry: e, resolvedSlugs: r }) =>
            deepLoad({ node, resolvedSlugs: r, entry: e, ctx })
          )
        )
      ).flat()
    );
  }

  return slugsToReturn;
};

export default class ContentToPathsFetcherTree {
  private readonly _root: ContentToPathTreeRootNode = { children: [] };
  private _numSegments: number = 0;

  async fetch(entry: Entry<any>, ctx: ApolloContext): Promise<PathInfo[]> {
    const resolvedSlugs: (SegmentInfo | null)[] = new Array(this._numSegments).fill(null);

    this._root.children.filter(isStaticNode).forEach(({ segmentIndex, value }) => {
      resolvedSlugs[segmentIndex] = { value, entry: null };
    });

    const finalSlugs = await deepLoad({
      node: this._root as unknown as ContentToPathTreeRefNode | ContentToPathTreeRefByNode,
      resolvedSlugs,
      entry,
      ctx
    });

    const filtered = finalSlugs.filter((arr) => arr.every((seg) => seg !== null)) as SegmentInfo[][];

    return filtered.reduce((pathInfos, segmentInfoArray) => {
      const path = `'/${segmentInfoArray.map(({ value }) => value).join('/')}`;
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
