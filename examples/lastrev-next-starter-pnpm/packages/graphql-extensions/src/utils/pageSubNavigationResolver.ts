import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '../types';
import { createType } from './createType';
import parseRichTextHeadings from './parseRichTextHeadings';

export const pageSubNavigationResolver = async (entry: any, _args: any, ctx: ApolloContext) => {
  const contentType = entry?.sys?.contentType?.sys?.id;

  const pageType = getLocalizedField(entry.fields, 'pageType', ctx);
  const subNavigation = getLocalizedField(entry.fields, 'subNavigation', ctx);

  if (subNavigation) return subNavigation;

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

  if (contentType === 'pageResource') {
    const resourceType = getLocalizedField(entry.fields, 'resourceType', ctx);

    if (resourceType?.toLowerCase() === 'guide') {
      const includeTocTableOfContents = getLocalizedField(entry.fields, 'includeTocTableOfContents', ctx);

      if (!includeTocTableOfContents) return null;
      const content = getLocalizedField(entry.fields, 'body', ctx);
      // Parse throught the RichText to find heading elements and create a subNavigation from them
      const headings = parseRichTextHeadings(content);
      const subNavigationItems = headings.map((heading) =>
        createType('Link', {
          text: heading.text,
          href:
            '#' +
            heading.text
              // reference: https://gist.github.com/codeguy/6684588
              .normalize('NFKD')
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .trim()
              .replace(/[-\s]+/g, '-')
          // Other properties as needed, e.g., link to the section
        })
      );

      return createType('NavigationItem', {
        text: 'Jump to',
        variant: 'tableOfContents',
        subNavigation: subNavigationItems
      });
    }
  }
};
