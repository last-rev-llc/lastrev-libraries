import { ApolloContext } from '@last-rev/types';

const getPathUrl = async (content: any, ctx: ApolloContext) => {
  const previewString = ctx.preview ? 'preview' : 'prod';
  const pathReader = ctx.pathReaders?.[previewString];

  const tree = await pathReader?.getTree(process.env.SITE);
  if (!tree) return undefined;

  const nodes = tree.getNodesById(content.sys.id);
  if (!nodes.length) return undefined;

  const node = nodes.find((n) => (n.data as any).isCanonical) || nodes[0];
  return node.data?.fullPath;
};

export default getPathUrl;
