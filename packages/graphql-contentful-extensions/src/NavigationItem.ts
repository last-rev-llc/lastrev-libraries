import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { Mappers, ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';
import createPath from './utils/createPath';

const hrefUrlResolver = async (link: any, _: never, ctx: ApolloContext) => {
  const manualUrl = getLocalizedField(link.fields, 'manualUrl', ctx);
  if (manualUrl) return createPath(manualUrl) ?? '#';

  const contentRef = getLocalizedField(link.fields, 'linkedContent', ctx);
  if (contentRef) {
    const content = await ctx.loaders.entryLoader.load({ id: contentRef.sys.id, preview: !!ctx.preview });
    return content && createPath(getLocalizedField(content?.fields, 'slug', ctx));
  }

  return '#';
};

export const mappers: Mappers = {
  NavigationItem: {
    NavigationItem: {
      href: hrefUrlResolver,
      image: 'media'
    }
  }
};

export const typeDefs = gql`
  union SubnavigationItem = Link | NavigationItem
  extend type NavigationItem {
    href: String!
    subNavigation: [SubnavigationItem]
    image: Media
  }
`;

export const resolvers = {
  SubnavigationItem: {
    __resolveType: (item: any) => {
      if (item?.sys?.contentType?.sys?.id === 'navigationItem') return 'NavigationItem';
      return 'Link';
    }
  }
};
