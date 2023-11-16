import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '../types';

export const pageSubNavigationResolver = async (entry: any, _args: any, ctx: ApolloContext) => {
  const contentType = entry?.sys?.contentType?.sys?.id;

  const pageType = getLocalizedField(entry.fields, 'pageType', ctx);

  if (pageType?.toLowerCase() === 'blog' || contentType === 'blog') {
    const allBlogCategories = await ctx.loaders.entriesByContentTypeLoader.load({
      id: 'categoryBlog',
      preview: !!ctx.preview
    });

    console.log({ allBlogCategories });
    return allBlogCategories?.sort((a: any, b: any) => {
      const aTitle = getLocalizedField(a.fields, 'title', ctx);
      const bTitle = getLocalizedField(b.fields, 'title', ctx);
      if (aTitle > bTitle) return 1;
      if (aTitle < bTitle) return -1;
      return 0;
    });
  }
};
