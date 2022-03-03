import { ApolloContext } from '@last-rev/types';

const getPathUrl = async (content: any, ctx: ApolloContext) => {
  const previewString = ctx.preview ? 'preview' : 'prod';
  const pathReader = ctx.pathReaders?.[previewString];

  const paths = await pathReader?.getPathsByContentId(
    content.sys.id,
    ctx.locale || ctx.defaultLocale,
    process.env.SITE
  );

  return paths?.length ? paths[0] : undefined;
};

export default getPathUrl;
