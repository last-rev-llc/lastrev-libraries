import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { Mappers, ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';
import createPath from './utils/createPath';
import getPathReader from './utils/getPathReader';
const SITE = process.env.SITE;

const hrefUrlResolver = async (link: any, _: never, ctx: ApolloContext) => {
  const href = getLocalizedField(link.fields, 'href', ctx);
  const manualUrl = getLocalizedField(link.fields, 'manualUrl', ctx);
  if (href || manualUrl) return createPath(href ?? manualUrl);

  const contentRef = getLocalizedField(link.fields, 'linkedContent', ctx);
  if (contentRef) {
    const content = await ctx.loaders.entryLoader.load({ id: contentRef.sys.id, preview: !!ctx.preview });
    if (content) {
      if (content?.sys?.contentType?.sys?.id === 'media') {
        const assetRef = getLocalizedField(content.fields, 'asset', ctx);
        const asset = await ctx.loaders.assetLoader.load({ id: assetRef.sys.id, preview: !!ctx.preview });
        if (asset) {
          return `https:${getLocalizedField(asset.fields, 'file', ctx)?.url}`;
        }
      } else {
        const paths = await getPathReader(ctx)?.getPathsByContentId(content.sys.id, undefined, SITE);
        if (paths && paths.length) return paths[0];

        const slug = getLocalizedField(content?.fields, 'slug', ctx);
        if (slug) return createPath(getLocalizedField(content?.fields, 'slug', ctx));
      }
    }
  }
  return '#';
};

export const mappers: Mappers = {
  Link: {
    Link: {
      href: hrefUrlResolver
    },
    NavigationItem: {
      link: (x: any) => ({ ...x, fieldName: 'link' }),
      children: () => []
    }
  }
};

export const typeDefs = gql`
  extend type Link {
    href: String!
    icon: String
    iconPosition: String
    isActive: Boolean
    requireLogin: Boolean
  }
`;
