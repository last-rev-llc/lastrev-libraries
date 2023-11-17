import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '../types';
import { createType } from './createType';

export const pageContentsResolver = async (entry: any, _args: any, ctx: ApolloContext) => {
  const contentType = entry?.sys?.contentType?.sys?.id;
  let contents = getLocalizedField(entry.fields, 'contents', ctx) ?? [];
  const pageType = getLocalizedField(entry.fields, 'pageType', ctx);

  if (contentType == 'categoryBlog' && entry?.sys?.id) {
    const categoryId = entry?.sys?.id;
    const collection = createType('Collection', {
      id: 'random',
      // introText: createType('Text', { title: 'Latest articles', align: 'center' }),
      showFilters: true,
      settings: {
        contentType: 'blog',
        filter: {
          'fields.categories.sys.id': categoryId
        }
      },
      variant: 'Three Per Row',
      itemsVariant: 'media'
    });
    console.log({ collection });
    contents.push(collection);
  }
  if (pageType?.toLowerCase() === 'blog' || contentType === 'blog' || contentType === 'categoryBlog') {
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
  contents = await Promise.all(
    contents?.map((entry: any) =>
      entry?.fields ? entry : ctx.loaders.entryLoader.load({ id: entry.sys.id, preview: ctx.preview! })
    )
  );
  return contents;
};
