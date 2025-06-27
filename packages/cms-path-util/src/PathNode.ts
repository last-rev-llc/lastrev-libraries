import { ApolloContext, BaseEntry, iPathNode, ItemKey, PathData, PathEntries } from '@last-rev/types';
export class PathNode implements iPathNode {
  data?: PathData;
  key: string;
  parent?: PathNode;
  children: Map<string, PathNode> = new Map();

  constructor(key: string, data?: PathData) {
    this.key = key;
    this.data = data;
  }

  hasChildren() {
    return this.children.size > 0;
  }

  async getPathEntries(ctx: ApolloContext): Promise<PathEntries> {
    const entries: PathEntries = [];

    let node: PathNode = this;

    if (!node.data?.contentId) {
      return entries;
    }

    entries.push(await ctx.loaders.entryLoader.load({ id: node.data.contentId, preview: !!ctx.preview }));

    const keysToFetch: ItemKey[] = [];

    // while node is not root
    while (node.parent) {
      if (node.data?.contentId) {
        keysToFetch.push({ id: node.data.contentId, preview: !!ctx.preview });
      }
      node = node.parent;
    }

    const fetchedEntries = await ctx.loaders.entryLoader.loadMany(keysToFetch);
    const entriesById = fetchedEntries.reduce((acc: any, entry: any) => {
      if (entry) {
        acc[(entry as BaseEntry).sys.id] = entry as BaseEntry;
      }
      return acc;
    }, {} as Record<string, BaseEntry>);

    node = this;

    while (node.parent) {
      entries.unshift(node.data?.contentId ? entriesById[node.data.contentId] : null);
      node = node.parent;
    }

    return entries;
  }
}
