import { ApolloContext } from '@last-rev/types';

export const pathResolver = async (content: any, _args: any, ctx: ApolloContext) => {
  const id = content.sys.id;
  const pathReader = !!ctx.preview ? ctx.pathReaders?.preview : ctx.pathReaders?.prod;
  if (id) {
    const path = await pathReader?.getPathsByContentId(id, undefined, process.env.SITE);
    // TODO: Do we need to support more paths?
    if (!!path?.length) return path[0];
  }
};

export default pathResolver;
