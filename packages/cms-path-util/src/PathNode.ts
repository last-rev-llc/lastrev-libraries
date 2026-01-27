import { ApolloContext, iPathNode, ItemKey, PathData, PathEntries } from '@last-rev/types';

/**
 * Get entry ID based on CMS type
 */
const getEntryId = (entry: any, ctx: ApolloContext): string | undefined => {
  return ctx.cms === 'Sanity' ? entry?._id : entry?.sys?.id;
};

/**
 * CMS-agnostic loadDocument utility
 */
const loadDocument = async (ctx: ApolloContext, id: string, preview: boolean): Promise<any> => {
  if (ctx.cms === 'Sanity') {
    return ctx.sanityLoaders!.documentLoader.load({ id, preview });
  }
  return ctx.loaders.entryLoader.load({ id, preview });
};

/**
 * CMS-agnostic loadDocuments utility
 */
const loadDocuments = async (ctx: ApolloContext, keys: ItemKey[]): Promise<any[]> => {
  if (ctx.cms === 'Sanity') {
    const results = await ctx.sanityLoaders!.documentLoader.loadMany(keys);
    return results.filter((r) => r !== null && !(r instanceof Error));
  }
  const results = await ctx.loaders.entryLoader.loadMany(keys);
  return results.filter((r) => r !== null && !(r instanceof Error));
};

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

    // Use CMS-agnostic loadDocument
    entries.push(await loadDocument(ctx, node.data.contentId, !!ctx.preview));

    const keysToFetch: ItemKey[] = [];

    // while node is not root
    while (node.parent) {
      if (node.data?.contentId) {
        keysToFetch.push({ id: node.data.contentId, preview: !!ctx.preview });
      }
      node = node.parent;
    }

    // Use CMS-agnostic loadDocuments
    const fetchedEntries = await loadDocuments(ctx, keysToFetch);
    const entriesById = fetchedEntries.reduce((acc: any, entry: any) => {
      if (entry) {
        // Use CMS-agnostic ID access
        const id = getEntryId(entry, ctx);
        if (id) acc[id] = entry;
      }
      return acc;
    }, {} as Record<string, any>);

    node = this;

    while (node.parent) {
      entries.unshift(node.data?.contentId ? entriesById[node.data.contentId] : null);
      node = node.parent;
    }

    return entries;
  }
}
