import gql from 'graphql-tag';

import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { Mappers, ApolloContext } from '@last-rev/types';

import { createPath } from './utils/createPath';
import { defaultResolver } from './utils/defaultResolver';
import { pathResolver } from './utils/pathResolver';

type TargetMapping = {
  'New Window': string;
  'Current Window': string;
};

const TARGET_MAPPING: TargetMapping = {
  'New Window': '_blank',
  'Current Window': '_self'
};

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
      }
      const slug = getLocalizedField(content?.fields, 'slug', ctx);
      if (slug) return createPath(getLocalizedField(content?.fields, 'slug', ctx));
    }
  }
  return '#';
};

const targetResolver = async (link: any, _: never, ctx: ApolloContext) => {
  const target = getLocalizedField(link.fields, 'target', ctx);
  return TARGET_MAPPING[target as keyof TargetMapping] ?? '_self';
};

export const mappers: Mappers = {
  Link: {
    Link: {
      href: pathResolver,
      target: targetResolver,
      variant: defaultResolver('variant')
    },
    NavigationItem: {
      link: (x: any) => ({ ...x, fieldName: 'link' }),
      children: () => [],
      variant: defaultResolver('variant')
    }
  }
};

export const typeDefs = gql`
  extend type Link {
    href: String!
    icon: String
    iconPosition: String
  }
`;
