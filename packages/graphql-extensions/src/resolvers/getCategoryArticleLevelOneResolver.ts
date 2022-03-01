// import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import getPathReader from '../utils/getPathReader';

const SITE = process.env.SITE;

// Loops through category hierarchy tree to find the Level 1 category for any given category
// Opted to not use path reader to future proof changes to how paths are generated.
const getCategoryArticleLevelOneResolver = async (category: any, _args: any, ctx: ApolloContext) => {
  if (!ctx?.path) return null;

  const paths = await getPathReader(ctx)?.getPathsByContentId(category.sys.id, undefined, SITE);
  
  if (!paths || !paths.length) return null;

  const topLevelCategoryPath = paths[0].split("/").slice(0, 3).join("/");

  const topLevelCategoryNode = await getPathReader(ctx)?.getNodeByPath(topLevelCategoryPath, SITE);

  if (!topLevelCategoryNode || !topLevelCategoryNode?.data?.contentId) return null;

  const topLevelCategory = await ctx.loaders.entryLoader.load({
    id: topLevelCategoryNode.data.contentId,
    preview: !!ctx.preview
  }); 

  return topLevelCategory;
};

export default getCategoryArticleLevelOneResolver;
