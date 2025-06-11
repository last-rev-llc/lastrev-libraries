import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-cms-core';
import { ApolloContext } from '@last-rev/types';
import fetch from 'node-fetch';
import { getVideoEmbedUrl } from './getVideoEmbedUrl';
import { cleanSVG } from './utils/cleanSVG';

export const typeMappings = {};

const mediaFieldResolver = async ({ fields, field, assetField, ctx }: any) => {
  // TODO: Make getting a localized resolved link a single function
  const value: any = getLocalizedField(fields, assetField, ctx);
  if (value) return value;

  const assetRef: any = getLocalizedField(fields, field, ctx);
  if (!assetRef) return null;

  const asset = await ctx.loaders.assetLoader.load({ id: assetRef?.sys?.id, preview: !!ctx.preview });
  const fieldValue: any = getLocalizedField(asset?.fields, assetField, ctx);

  return fieldValue;
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

export const resolvers = {
  Asset: {
    url: (asset: any) => (asset?.url?.startsWith('//') ? `https:${asset?.url}` : asset?.url)
  }
};

export const mappers = {
  Asset: {
    Asset: {
      url: (asset: any) => (asset?.url?.startsWith('//') ? `https:${asset?.url}` : asset?.url),
      width: (asset: any) => asset?.details?.image?.width,
      height: (asset: any) => asset?.details?.image?.height,
      svgContent: async (asset: any, _args: any, _ctx: ApolloContext) => {
        // We load the SVG content and clean it up for use as inline element
        // We remove the SVG width and height and instead use the one from the content
        const url: string = asset?.url?.startsWith('//') ? `https:${asset?.url}` : asset?.url;
        if (url?.endsWith('.svg')) {
          try {
            const svgContent = await fetch(url).then((res) => res.text());
            let cleaned = cleanSVG(svgContent);
            return cleaned;
          } catch (err) {
            return null;
          }
        }
        return null;
      }
    }
  },
  Media: {
    Media: {
      // TODO: enable this in fieldResolver
      // title: 'media.title',
      // asset: 'media.asset'
      variant: async (media: any, _args: any, ctx: ApolloContext) => {
        let assetURL: any = getLocalizedField(media?.fields, 'assetURL', ctx);
        const file = await mediaFieldResolver({ fields: media?.fields, field: 'asset', assetField: 'file', ctx });

        // Asset reference will be used if set
        //TODO: Support other ways to control priority
        if (file?.url) assetURL = file?.url;

        if (assetURL) {
          if (assetURL.split('.')[assetURL.split('.').length - 1] === 'pdf') {
            return 'embed';
          }
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
      file: resolveFile,
      fileTablet: async (media: any, _args: any, ctx: ApolloContext) => {
        let file: any;
        const assetFile = await mediaFieldResolver({ fields: media?.fields, field: 'tablet', assetField: 'file', ctx });
        if (assetFile) {
          file = assetFile;
        }
        return file;
      },
      fileMobile: async (media: any, _args: any, ctx: ApolloContext) => {
        let file: any;
        const assetFile = await mediaFieldResolver({ fields: media?.fields, field: 'mobile', assetField: 'file', ctx });
        if (assetFile) {
          file = assetFile;
        }
        return file;
      }
    },
    Card: {
      media: async (media: any, _args: any, ctx: ApolloContext) => {
        const featuredMedia: any = getLocalizedField(media.fields, 'asset', ctx);
        if (featuredMedia) return [featuredMedia];
        return;
      },
      variant: () => 'media'
    }
  }
};

export const typeDefs = gql`
  extend type Media {
    variant: String
    fileTablet: Asset
    fileMobile: Asset
  }
  extend type Asset {
    # SVG may access content for inline rendering
    svgContent: String
  }
`;
