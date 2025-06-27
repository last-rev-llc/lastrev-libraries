import { ApolloContext, iPathNode } from '@last-rev/types';

export const pathNodeResolver = async (id: string, ctx: ApolloContext): Promise<iPathNode | null> => {
  if (!id) return null;

  const pathReader = !!ctx.preview ? ctx.pathReaders?.preview : ctx.pathReaders?.prod;
  const pathTree = await pathReader?.getTree(process.env.SITE);
  const pathNodes = pathTree?.getNodesById(id);

  // Check if pathNodes is undefined or empty array
  if (!pathNodes || pathNodes.length === 0) return null;

  // Assuming pathNodes[0] is always of type iPathNode
  return pathNodes[0] as iPathNode;
};
