import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { Mappers, ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';

const hrefUrlResolver = async (link: any, _: never, ctx: ApolloContext) => {
  const href = getLocalizedField(link.fields, 'href', ctx);
  const manualUrl = getLocalizedField(link.fields, 'manualUrl', ctx);
  if (href || manualUrl) return href ?? manualUrl;

  const contentRef = getLocalizedField(link.fields, 'linkedContent', ctx);
  if (contentRef) {
    const content = await ctx.loaders.entryLoader.load({ id: contentRef.sys.id, preview: !!ctx.preview });
    return content && getLocalizedField(content?.fields, 'slug', ctx);
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
  }
`;
