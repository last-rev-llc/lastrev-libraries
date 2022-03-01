import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import getCategoryArticleLevelOneResolver from './getCategoryArticleLevelOneResolver';

const categoryArticleFeaturedArticlesResolver = async (category:any, _args: any, ctx: ApolloContext) => {
  if (!ctx?.path) return null;
  
  const featuredItems = getLocalizedField(category.fields, 'featuredItems', ctx);

  if (featuredItems) return featuredItems;

  const topLevelCategory = await getCategoryArticleLevelOneResolver(category, _args, ctx);

  if (!topLevelCategory) return null;

  const parentFeaturedItems = getLocalizedField(topLevelCategory.fields, 'featuredItems', ctx);

  return parentFeaturedItems;
}

export default categoryArticleFeaturedArticlesResolver;
