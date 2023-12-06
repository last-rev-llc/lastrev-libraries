import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { type ApolloContext } from '../types';
import { getSysContentTypeName } from './getSysContentTypeName';

export const getDefaultCtaText = async (item: any, _args: any, ctx: ApolloContext) => {
  const text = getLocalizedField(item.fields, 'promoLinkText', ctx);

  if (text) return text;

  const contentType = getSysContentTypeName(item);

  switch (contentType) {
    case 'Blog':
      const textArray = [getLocalizedField(item.fields, 'promoLinkText', ctx) ?? 'Read Article'];

      const categoriesRef = getLocalizedField(item?.fields, 'categories', ctx);
      const categoriesIds =
        categoriesRef?.map((content: any) => {
          return { id: content?.sys.id, preview: !!ctx.preview };
        }) ?? [];

      const categories: any[] = (await ctx.loaders.entryLoader.loadMany(categoriesIds))
        .filter(Boolean)
        .map((category: any) => {
          return getLocalizedField(category?.fields, 'title', ctx);
        });

      if (categories.length) textArray.push(categories.join(', '));

      const pubDate = getLocalizedField(item.fields, 'pubDate', ctx);
      if (pubDate) textArray.push(pubDate);
      return textArray.join(' • ');
    default:
      return 'Read More';
  }
};
