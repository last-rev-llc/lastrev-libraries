import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import kebabCase from 'lodash/kebabCase';
import { createPath } from './Page';
import { getThumbnailURL } from './Media';

// TODO: Move to env variables
const BLOGS_SITE_ID = '4KptbiI1F7S3d6R37fRh1z';

// TODO: Move this to utils
// TODO: Extract and document createRichText
const createRichText = (text: string) => ({
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: text,
          data: {},
          marks: []
        }
      ]
    }
  ]
});
// TODO: Extract and document createType
const createType = (type: string, content: any) => ({
  sys: { id: content?.id, contentType: { sys: { id: type } } },
  fields: Object.keys(content).reduce(
    (accum, key) => ({
      ...accum,
      [key]: {
        'en-US': content[key]
      }
    }),
    {}
  )
});

const getSlug = (topic: any, ctx: ApolloContext) => {
  const title = getLocalizedField(topic.fields, 'title', ctx);
  const slug = getLocalizedField(topic.fields, 'slug', ctx);
  return slug ?? kebabCase(title);
};

const blogGlobalContentsResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  // TODO: Make getting a localized resolved link a single function
  const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
  const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? BLOGS_SITE_ID, preview: !!ctx.preview });
  const siteblogGlobalContents: any = getLocalizedField(site?.fields, 'blogGlobalContents', ctx);
  return siteblogGlobalContents;
};

export const mappers: any = {
  Blog: {
    Blog: {
      contents: blogGlobalContentsResolver
    },
    Link: {
      // TODO: When pathLookup is implemented remove this in favour of Link generic resolver
      text: 'title',
      href: async (blog: any, _args: any, ctx: ApolloContext) =>
        createPath('blogs', getLocalizedField(blog.fields, 'slug', ctx))
    },
    Card: {
      body: async (blog: any, _args: any, ctx: ApolloContext) => {
        // TODO: Maybe abstract this two steps into one i.e mapFieldToType
        const quote: any = getLocalizedField(blog.fields, 'quote', ctx);
        const cardBody = createRichText(quote);
        (cardBody as any).__fieldName__ = 'quote';
        return cardBody;
      },
      media: async (blog: any, _args: any, ctx: ApolloContext) => {
        // When resolving the Blog card media we need to consider video and images
        // If the featuredMedia is a video we'll us the video thumbnail or generate one
        // If the featuredMedia is an image we'll use the image asset
        const featuredMediaRef: any = getLocalizedField(blog?.fields, 'featuredMedia', ctx);
        if (featuredMediaRef?.length) {
          const featuredMedia = await ctx.loaders.entryLoader.loadMany(
            featuredMediaRef?.map((media: any) => ({ id: media.sys.id, preview: !!ctx.preview }))
          );

          if (featuredMedia) {
            return Promise.all(
              featuredMedia?.map(async (media: any) => {
                // If its a Contentful asset use that as the card media
                const assetRef = getLocalizedField(media?.fields, 'asset', ctx);
                const asset = assetRef
                  ? await ctx.loaders.assetLoader.load({ id: assetRef?.sys?.id, preview: !!ctx.preview })
                  : null;
                if (asset) return asset;

                // If it has a thumbnail Contentful asset use that as the card media
                const thumbnailRef = getLocalizedField(media?.fields, 'thumbnail', ctx);
                const thumbnail = thumbnailRef
                  ? await ctx.loaders.assetLoader.load({ id: thumbnailRef?.sys.id, preview: !!ctx.preview })
                  : null;
                if (thumbnail) return thumbnail;

                // If it has an assetURL use the a generated poster image
                const assetURL: any = getLocalizedField(media?.fields, 'assetURL', ctx);
                if (assetURL) {
                  return {
                    file: {
                      url: getThumbnailURL(assetURL) ?? assetURL
                    }
                  };
                }
                // Use a default Blog image
                return {
                  file: {
                    url: 'https://placehold.co/500x300/random/random'
                  }
                };
              })
            );
          }
        }
        // TODO: Use Site default image
        return [
          {
            file: {
              url: 'https://placehold.co/500x300/random/random'
            }
          }
        ];
      },
      // media: 'featuredMedia',
      variant: () => 'standard-blog',
      link: async (blog: any) => blog,
      // actions: 'topics', // TODO: Test if this would work (as long as there's a mapping from Topic to Link)
      actions: async (blog: any, _args: any, ctx: ApolloContext) => {
        // Get all topics from this blog and convert them into links
        const topicsLinks: any = getLocalizedField(blog.fields, 'topics', ctx);
        if (topicsLinks) {
          const topics = await ctx.loaders.entryLoader.loadMany(
            topicsLinks?.map((topic: any) => ({ id: topic?.sys?.id, preview: !!ctx.preview }))
          );

          const actions = topics?.map((topic: any) =>
            !!topic
              ? createType('Link', {
                  id: topic?.sys?.id,
                  text: getLocalizedField(topic.fields, 'title', ctx),
                  href: `/blogs/${getSlug(topic, ctx)}`
                })
              : null
          ) as any; // any used to allow adding __fieldName__
          actions.__fieldName__ = 'topics';
          return actions;
        }
      }
    }
  }
};

export const typeDefs = gql`
  extend type Blog {
    relatedLinks: [Link]
    topics: [Topic]
    featuredMedia: [Media]
    contents: [Content]
  }
`;
