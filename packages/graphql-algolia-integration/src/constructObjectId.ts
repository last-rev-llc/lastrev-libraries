import { ApolloContext } from 'packages/types';

const constructObjectId = (item: any, ctx: ApolloContext, ...additional: any[]) => {
  const previewString = ctx.preview ? 'preview' : 'prod';
  const base = `${item.sys.id}_${ctx.locale || ctx.defaultLocale}_${previewString}`;

  return additional.length ? `${base}_${additional.join('_')}` : base;
};

export default constructObjectId;
