import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import getCategoryArticleLevelOneResolver from './getCategoryArticleLevelOneResolver';
import { Entry } from 'contentful';

// const SITE = process.env.SITE;

const categoryArticleHeroResolver = async (category:any, _args: any, ctx: ApolloContext):Promise<Entry<any>|null> => {
  if (!ctx?.path) return null;
  
  const hero = getLocalizedField(category.fields, 'hero', ctx);

  if (hero) return hero;

  const topLevelCategory = await getCategoryArticleLevelOneResolver(category, _args, ctx);

  if (!topLevelCategory) return null;

  const parentHero = getLocalizedField(topLevelCategory.fields, 'hero', ctx);

  return parentHero;
}

export default categoryArticleHeroResolver;
