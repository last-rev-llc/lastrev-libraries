import { ApolloContext, iPathNode, PathData, PathEntries } from '@last-rev/types';

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

    console.log('node -> ', JSON.stringify(node, null, 2));

    entries.push(await ctx.loaders.entryLoader.load({ id: node.data.contentId, preview: !!ctx.preview }));

    // while node has a parent, and parent is not root
    while (node.parent?.parent) {
      node = node.parent;
      entries.unshift(
        node.data?.contentId
          ? await ctx.loaders.entryLoader.load({ id: node.data.contentId, preview: !!ctx.preview })
          : null
      );
    }

    return entries;
  }
}
