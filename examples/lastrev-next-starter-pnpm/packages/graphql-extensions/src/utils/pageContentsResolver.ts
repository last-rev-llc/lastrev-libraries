import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '../types';

export const pageContentsResolver = async (entry: any, _args: any, ctx: ApolloContext) => {
  const contentType = entry?.sys?.contentType?.sys?.id;
  const contents = getLocalizedField(entry.fields, 'contents', ctx) ?? [];
  const pageType = getLocalizedField(entry.fields, 'pageType', ctx);
  if (pageType?.toLowerCase() === 'blog' || contentType === 'blog') {
    const defaultFeaturedCollection = getLocalizedField(ctx.siteSettings?.fields, 'defaultFeaturedCollection', ctx);
    const relatedItems = getLocalizedField(entry.fields, 'featuredCollection', ctx);
    if (contentType === 'blog' && relatedItems) {
      contents.push(relatedItems);
    } else if (defaultFeaturedCollection) contents.push(defaultFeaturedCollection);

    const defaultBlogDisclaimer = getLocalizedField(ctx.siteSettings?.fields, 'defaultBlogDisclaimer', ctx);
    if (defaultBlogDisclaimer) contents.push(defaultBlogDisclaimer);

    const defaultBlogNewsletter = getLocalizedField(ctx.siteSettings?.fields, 'defaultBlogNewsletterBottom', ctx);
    if (defaultBlogNewsletter) contents.push(defaultBlogNewsletter);
  }
  return contents;
};
