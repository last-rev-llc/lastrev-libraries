import { ApolloContext, iPathReader } from '@last-rev/types';

const pathReaders = (ctx: ApolloContext): iPathReader | undefined => {
  return !!ctx.preview ? ctx.pathReaders?.preview : ctx.pathReaders?.prod;
};

export default pathReaders;
