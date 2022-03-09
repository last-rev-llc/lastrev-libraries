// import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import getPathReader from '../utils/getPathReader';

const SITE = process.env.SITE;

// Loops through category hierarchy tree to find the Level 1 category for any given category
// Opted to not use path reader to future proof changes to how paths are generated.
const getCategoryArticleParentResolver = async (category: any, _args: any, ctx: ApolloContext) => {
  if (!ctx?.path) return null;

  const paths = await getPathReader(ctx)?.getPathsByContentId(category.sys.id, undefined, SITE);

  if (!paths || !paths.length) return null;

  const parentCategoryPath = paths[0].split('/').slice(-1, 1).join('/');

  const parentCategoryNode = await getPathReader(ctx)?.getNodeByPath(parentCategoryPath, SITE);

  if (!parentCategoryNode || !parentCategoryNode?.data?.contentId) return null;

  const parentCategory = await ctx.loaders.entryLoader.load({
    id: parentCategoryNode.data.contentId,
    preview: !!ctx.preview
  });

  return parentCategory;
};

export default getCategoryArticleParentResolver;
