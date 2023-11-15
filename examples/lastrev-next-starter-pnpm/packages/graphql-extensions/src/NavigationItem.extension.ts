import gql from 'graphql-tag';

import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';

import { createPath } from './utils/createPath';
import { pascalCase } from './utils/pascalCase';
import { defaultResolver } from './utils/defaultResolver';
import { siteAddressResolver } from './utils/siteAddressResolver';
import { siteEmailResolver } from './utils/siteEmailResolver';
import { sitePhoneResolver } from './utils/sitePhoneResolver';

const SUB_NAVIGATION_ITEM_TYPES = ['Link', 'NavigationItem', 'Page', 'Person', 'Blog', 'PageProperty'];

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

export const mappers = {
  NavigationItem: {
    NavigationItem: {
      variant: defaultResolver('variant'),
      href: hrefUrlResolver,
      text: async (navItem: any, args: any, ctx: ApolloContext) => {
        const variantFn = defaultResolver('variant');
        const variant = variantFn(navItem, args, ctx);

        if (variant === 'footerContactDetails') {
          const address = await siteAddressResolver(navItem, args, ctx);
          const email = await siteEmailResolver(navItem, args, ctx);
          const phone = await sitePhoneResolver(navItem, args, ctx);

          const parts: (string | null | undefined)[] = [
            address.streetAddress,
            address.streetAddress2,
            `${address.city ? (address.state ? `${address.city},` : `${address.city}`) : null} ${address.state} ${
              address.postalCode
            }`,
            phone.phoneNumber,
            email
          ];

          return parts.filter((part) => part != null && part !== '').join('\n');
        }

        return getLocalizedField(navItem.fields, 'text', ctx);
      }
    },
    Link: {
      href: hrefUrlResolver,
      variant: defaultResolver('variant')
      // text: async (navItem: any, args: any, ctx: ApolloContext) => {
      //   const variantFn = defaultResolver('variant');
      //   const variant = variantFn(navItem, args, ctx);

      //   console.log('match', variant, variant === 'footerContactDetails');

      //   if (variant === 'footerContactDetails') {
      //     const address = await siteAddressResolver(navItem, args, ctx);
      //     const email = await siteEmailResolver(navItem, args, ctx);
      //     const phone = await sitePhoneResolver(navItem, args, ctx);

      //     const parts: (string | null | undefined)[] = [
      //       address.streetAddress,
      //       address.streetAddress2,
      //       `
      //         ${address.city ? (address.state ? `${address.city},` : `${address.city}`) : null}
      //         ${address.state}
      //         ${address.postalCode}
      //       `,
      //       phone.phoneNumber,
      //       email
      //     ];

      //     console.log('parts', parts);

      //     return parts
      //       .filter((part) => part != null && part !== '')
      //       .join('<br/>')
      //       .trim();
      //   }

      //   return getLocalizedField(navItem.fields, 'text', ctx);
      // }
    }
  }
};

const ITEM_MAPPING: { [key: string]: string } = {
  NavigationItem: 'NavigationItem',
  Link: 'Link',
  Page: 'Link',
  Person: 'Link',
  PageProperty: 'Link',
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
