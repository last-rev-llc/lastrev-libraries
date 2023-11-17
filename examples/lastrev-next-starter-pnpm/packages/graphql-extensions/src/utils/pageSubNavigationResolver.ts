import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '../types';
import { createType } from './createType';

export const pageSubNavigationResolver = async (entry: any, _args: any, ctx: ApolloContext) => {
  const contentType = entry?.sys?.contentType?.sys?.id;

  const pageType = getLocalizedField(entry.fields, 'pageType', ctx);

  if (pageType?.toLowerCase() === 'blog' || contentType === 'blog' || contentType == 'categoryBlog') {
    let allBlogCategories = await ctx.loaders.entriesByContentTypeLoader.load({
      id: 'categoryBlog',
      preview: !!ctx.preview
    });

    allBlogCategories = allBlogCategories?.sort((a: any, b: any) => {
      const aTitle = getLocalizedField(a.fields, 'title', ctx);
      const bTitle = getLocalizedField(b.fields, 'title', ctx);
      if (aTitle > bTitle) return 1;
      if (aTitle < bTitle) return -1;
      return 0;
    });

    return createType('NavigationItem', {
      variant: 'inlineNavigation',
      // overline: getLocalizedField(blog.fields, 'pubDate', ctx),
      // title: getLocalizedField(blog.fields, 'title', ctx)
      // title: 'The Lively Blog',
      // backgroundColor: 'blueLight'
      subNavigation: allBlogCategories
    });
  }
};
