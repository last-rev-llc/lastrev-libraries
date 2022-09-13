import { ApolloContext, iPathNode, ItemKey, PathData, PathEntries } from '@last-rev/types';
import { Entry } from 'contentful';

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
    const entriesById = fetchedEntries.reduce((acc, entry) => {
      if (entry) {
        acc[(entry as Entry<any>).sys.id] = entry as Entry<any>;
      }
      return acc;
    }, {} as Record<string, Entry<any>>);

    node = this;

    while (node.parent) {
      entries.push(node.data?.contentId ? entriesById[node.data.contentId] : null);
      node = node.parent;
    }

    return entries;
  }
}
