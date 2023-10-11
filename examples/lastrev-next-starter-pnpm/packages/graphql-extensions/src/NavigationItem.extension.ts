import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';
import { pathResolver } from './utils/pathResolver';
import { pascalCase } from './utils/pascalCase';

import type { ApolloContext, Mappers, PathInfo } from '@last-rev/types';
import { createPath } from './utils/createPath';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

const SUB_NAVIGATION_ITEM_TYPES = ['Link', 'NavigationItem'];

export const typeDefs = gql`
  extend type NavigationItem {
    actions: [Link]
    navMedia: Media
    subNavigation: [SubNavigationItem]
    href: String!
    summary: RichText,
    icon: String
    iconPosition: String
  }

  union SubNavigationItem = ${SUB_NAVIGATION_ITEM_TYPES.join('| ')}
`;

// const hrefUrlResolver = async (link: any, _: never, ctx: ApolloContext) => {
//   // console.log({ link });
//   const href = getLocalizedField(link.fields, 'href', ctx);
//   const manualUrl = getLocalizedField(link.fields, 'manualUrl', ctx);
//   if (href || manualUrl) {
//     console.log({ href, manualUrl, link });
//     return createPath(href ?? manualUrl);
//   }

//   console.log({ 'not found': true, link });

//   const contentRef = getLocalizedField(link.fields, 'linkedContent', ctx);
//   if (contentRef) {
//     const content = await ctx.loaders.entryLoader.load({ id: contentRef.sys.id, preview: !!ctx.preview });
//     if (content) {
//       if (content?.sys?.contentType?.sys?.id === 'media') {
//         const assetRef = getLocalizedField(content.fields, 'asset', ctx);
//         const asset = await ctx.loaders.assetLoader.load({ id: assetRef.sys.id, preview: !!ctx.preview });
//         if (asset) {
//           return `https:${getLocalizedField(asset.fields, 'file', ctx)?.url}`;
//         }
//       }
//       const pathInfos: PathInfo[] = await ctx.loadPathsForContent(content, ctx, process.env.SITE);
//       console.log({ pathInfos, content });

//       let path: string | null = null;

//       for (let pathInfo of pathInfos) {
//         if (!path) path = pathInfo.path;
//       }
//       return path;
//       // return '/#test';
//       // const slug = getLocalizedField(content?.fields, 'slug', ctx);
//       // if (slug) return createPath(getLocalizedField(content?.fields, 'slug', ctx));
//     }
//   }
//   return '#';
// };

export const mappers: Mappers = {
  NavigationItem: {
    NavigationItem: {
      variant: defaultResolver('variant'),
      // image: (item: any, _args: any, ctx: ApolloContext) => {
      //   const mediaRef: any = getLocalizedField(item.fields, 'media', ctx);
      //   return mediaRef;
      // },
      href: pathResolver
    }
  }
};

const ITEM_MAPPING: { [key: string]: string } = {
  NavigationItem: 'NavigationItem',
  Link: 'Link',
  Page: 'Link',
  Person: 'Link',
  Blog: 'Link'
};

export const resolvers = {
  SubNavigationItem: {
    __resolveType: (item: any) => {
      const type =
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ?? pascalCase(item?.sys?.contentType?.sys?.id);
      if (SUB_NAVIGATION_ITEM_TYPES.includes(type)) return type;

      return 'Link';
    }
  }
};
