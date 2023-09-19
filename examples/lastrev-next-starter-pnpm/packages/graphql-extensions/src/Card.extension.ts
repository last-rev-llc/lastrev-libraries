import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';
import { createType } from './utils/createType';
import { getSlug } from './utils/getSlug';
import { getThumbnailURL } from './utils/getVideoEmbedUrl';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Card {
    # Unccoment if using Media reference
    # media: [Media]
    actions: [Link]
    link: Link
    variant: String
  }
`;

export const mappers: any = {
  Media: {
    media: async (media: any, _args: any, ctx: ApolloContext) => {
      const featuredMedia: any = getLocalizedField(media.fields, 'asset', ctx);
      if (featuredMedia) return [featuredMedia];
      return;
    },
    variant: () => 'media'
  }

  // Blog: {
  //   body: async (blog: any, _args: any, ctx: ApolloContext) => {
  //     // TODO: Maybe abstract this two steps into one i.e mapFieldToType
  //     const summary: any = getLocalizedField(blog.fields, 'promoSummary', ctx);
  //     const cardBody = createRichText(summary);
  //     (cardBody as any).__fieldName__ = 'summary';
  //     return cardBody;
  //   },
  //   media: async (blog: any, _args: any, ctx: ApolloContext) => {
  //     // When resolving the Blog card media we need to consider video and images
  //     // If the featuredMedia is a video we'll us the video thumbnail or generate one
  //     // If the featuredMedia is an image we'll use the image asset
  //     const featuredMediaRef: any = getLocalizedField(blog?.fields, 'featuredMedia', ctx);
  //     if (featuredMediaRef?.length) {
  //       const featuredMedia = await ctx.loaders.entryLoader.loadMany(
  //         featuredMediaRef?.map((media: any) => ({ id: media.sys.id, preview: !!ctx.preview }))
  //       );

  //       if (featuredMedia) {
  //         return Promise.all(
  //           featuredMedia?.map(async (media: any) => {
  //             // If its a Contentful asset use that as the card media
  //             const assetRef = getLocalizedField(media?.fields, 'asset', ctx);
  //             const asset = assetRef
  //               ? await ctx.loaders.assetLoader.load({ id: assetRef?.sys?.id, preview: !!ctx.preview })
  //               : null;
  //             if (asset) return asset;

  //             // If it has a thumbnail Contentful asset use that as the card media
  //             const thumbnailRef = getLocalizedField(media?.fields, 'thumbnail', ctx);
  //             const thumbnail = thumbnailRef
  //               ? await ctx.loaders.assetLoader.load({ id: thumbnailRef?.sys.id, preview: !!ctx.preview })
  //               : null;
  //             if (thumbnail) return thumbnail;

  //             // If it has an assetURL use the a generated poster image
  //             const assetURL: any = getLocalizedField(media?.fields, 'assetURL', ctx);
  //             if (assetURL) {
  //               return {
  //                 file: {
  //                   url: getThumbnailURL(assetURL) ?? assetURL
  //                 }
  //               };
  //             }
  //             // Use a default Blog image
  //             return {
  //               file: {
  //                 url: 'https://placehold.co/500x300/random/random'
  //               }
  //             };
  //           })
  //         );
  //       }
  //     }
  //     // TODO: Use Site default image
  //     return [
  //       {
  //         file: {
  //           url: 'https://placehold.co/500x300/random/random'
  //         }
  //       }
  //     ];
  //   },
  //   variant: () => 'default-blog',
  //   link: async (blog: any) => blog,
  //   actions: async (blog: any, _args: any, ctx: ApolloContext) => {
  //     // Get all categoryBlogs from this blog and convert them into links
  //     const categoriesLinks: any = getLocalizedField(blog.fields, 'categories', ctx);
  //     if (categoriesLinks?.length) {
  //       const categories = await ctx.loaders.entryLoader.loadMany(
  //         categoriesLinks?.map((categoryBlog: any) => ({ id: categoryBlog?.sys?.id, preview: !!ctx.preview }))
  //       );

  //       const actions = categories?.map((categoryBlog: any) =>
  //         !!categoryBlog
  //           ? createType('Link', {
  //               id: categoryBlog?.sys?.id,
  //               text: getLocalizedField(categoryBlog.fields, 'title', ctx),
  //               href: `/blogs/${getSlug(categoryBlog, ctx)}`
  //             })
  //           : null
  //       ) as any; // any used to allow adding __fieldName__
  //       actions.__fieldName__ = 'categories';
  //       return actions;
  //     }
  //   }
  // }
};
