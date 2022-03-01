import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

const SITE = process.env.SITE;
const ROOT_CATEGORY_ID = process.env.ROOT_CATEGORY_ID || '1d36wf7VTxu5K8BxjJHEY4';

const topicNavHorizontalResolver = async (_item: any, _args: any, ctx: ApolloContext) => {
  if (!ctx?.path) return null;

  const rootCategoryId = ROOT_CATEGORY_ID;
  const rootCategory = await ctx.loaders.entryLoader.load({ id: rootCategoryId ?? SITE, preview: !!ctx.preview });

  if (!rootCategory) return null;

  const levelOneCategories = getLocalizedField(rootCategory.fields, 'categoryItems', ctx);

  return levelOneCategories;
};

export default topicNavHorizontalResolver;
