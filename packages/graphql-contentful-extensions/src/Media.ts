import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
export const typeMappings = {};
const mediaFieldResolver = async ({ fields, field, assetField, ctx }: any) => {
  // TODO: Make getting a localized resolved link a single function
  const title: any = getLocalizedField(fields, assetField, ctx);
  if (title) return title;
  const assetRef: any = getLocalizedField(fields, field, ctx);
  if (!assetRef) return null;
  const asset = await ctx.loaders.assetLoader.load({ id: assetRef?.sys?.id, preview: !!ctx.preview });
  const assetTitle: any = getLocalizedField(asset?.fields, assetField, ctx);
  return assetTitle;
};

const resolveFile = async (media: any, _args: any, ctx: ApolloContext) => {
  let file: any = media?.file;
  const assetFile = await mediaFieldResolver({ fields: media?.fields, field: 'asset', assetField: 'file', ctx });
  if (assetFile) {
    file = assetFile;
  }
  const assetURL: any = getLocalizedField(media?.fields, 'assetURL', ctx);
  if (assetURL) {
    file = { url: getVideoEmbedUrl(assetURL) ?? assetURL };
  }
  return file;
};

export const mappers = {
  Media: {
    Media: {
      // TODO: enable this in fieldResolver
      // title: 'media.title',
      // asset: 'media.asset'
      variant: async (media: any, _args: any, ctx: ApolloContext) => {
        const assetURL: any = getLocalizedField(media?.fields, 'assetURL', ctx);
        if (assetURL) {
          if (getVideoEmbedUrl(assetURL)) {
            return 'embed';
          }
          if (assetURL?.split('.')[assetURL?.split('.').length - 1] === 'mp4') {
            return 'video';
          }
        }
        return 'image';
      },
      title: async (media: any, _args: any, ctx: ApolloContext) => {
        const title: any = getLocalizedField(media?.fields, 'title', ctx);
        const assetTitle: any = await mediaFieldResolver({
          fields: media?.fields,
          field: 'asset',
          assetField: 'title',
          ctx
        });
        return title ?? assetTitle;
      },
      file: resolveFile
    },
    Card: {
      media: async (media: any, args: any, ctx: ApolloContext) => {
        const file: any = resolveFile(media, args, ctx);
        return [file];
      },
      variant: () => 'media'
    }
  }
};

const getVideoEmbedUrl = (assetURL: string) => {
  if (typeof assetURL !== 'string') {
    return null;
  }
  if (assetURL?.includes('youtu.be/')) {
    const vidId = assetURL?.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${vidId}`;
  }
  //https://www.youtube.com/watch?v=xxxxxx
  if (assetURL?.includes('youtube.com/watch?v=')) {
    const vidId = assetURL?.split('youtube.com/watch?v=')[1];
    return `https://www.youtube.com/embed/${vidId}`;
  }
  //https://vimeo.com/xxxxxx
  if (assetURL?.includes('vimeo.com/')) {
    const vidId = assetURL?.split('vimeo.com/')[1];
    return `https://player.vimeo.com/video/${vidId}`;
  }
  //https://www.facebook.com/photo.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/photo.php?v=')) {
    const vidId = assetURL?.split('facebook.com/photo.php?v=')[1];
    return `https://www.facebook.com/video/${vidId}`;
  }
  //https://www.facebook.com/video/video.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/video/video.php?v=')) {
    const vidId = assetURL?.split('facebook.com/video/video.php?v=')[1];
    return `https://www.facebook.com/video/${vidId}`;
  }
  return null;
};
export const getThumbnailURL = (assetURL: string) => {
  if (typeof assetURL !== 'string') {
    return null;
  }
  if (assetURL?.includes('youtu.be/')) {
    const vidId = assetURL?.split('youtu.be/')[1];
    return `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
  }
  //https://www.youtube.com/watch?v=xxxxxx
  if (assetURL?.includes('youtube.com/watch?v=')) {
    const vidId = assetURL?.split('youtube.com/watch?v=')[1];
    return `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
  }
  //https://vimeo.com/xxxxxx
  if (assetURL?.includes('vimeo.com/')) {
    const vidId = assetURL?.split('vimeo.com/')[1];
    return `https://i.vimeocdn.com/video/${vidId}_640.jpg`;
  }
  //https://www.facebook.com/photo.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/photo.php?v=')) {
    const vidId = assetURL?.split('facebook.com/photo.php?v=')[1];
    return `https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/${vidId}.jpg`;
  }
  //https://www.facebook.com/video/video.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/video/video.php?v=')) {
    const vidId = assetURL?.split('facebook.com/video/video.php?v=')[1];
    return `https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/${vidId}.jpg`;
  }
  return null;
};
export const typeDefs = gql`
  extend type Media {
    variant: String
  }
`;
// A function to remove the opacity of an image
