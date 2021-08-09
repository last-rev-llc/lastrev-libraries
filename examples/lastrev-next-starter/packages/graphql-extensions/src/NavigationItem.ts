import { Mappers, getLocalizedField, ApolloContext } from '@last-rev/graphql-contentful-core';
import gql from 'graphql-tag';
import { camelCase, toUpper } from 'lodash';

const pascalCase = (str: string) => camelCase(str).replace(/^(.)/, toUpper);

const hrefUrlResolver = async (link: any, _: never, ctx: ApolloContext) => {
  // const { loaders } = ctx;
  //TODO document this use case for adapting theme fields without updating content model
  //TODO document migrating old fields to new component standards
  const manualUrl = getLocalizedField(link.fields, 'manualUrl', ctx);
  if (manualUrl) return manualUrl ?? '#';

  // const pageAnchor = getLocalizedField(link, 'pageAnchor', ctx);
  // if (pageAnchor) return pageAnchor;

  // const contentRef = getLocalizedField(link, 'content', ctx);
  // if (contentRef) {
  //   const content = await loaders.entryLoader.load(contentRef.sys.id);
  //   return content && getLocalizedField(content?.fields, 'slug', ctx);
  // }
  return '#';
};

export const mappers: Mappers = {
  // The Header navigation expects NavigationItem that have a link and a children collection
  // Here we setup a mapper for displaying a link as a NavigationItem
  // This allows to use existant links and reduce the amount of nesting
  NavigationItem: {
    NavigationItem: {
      href: hrefUrlResolver
      // children: 'items'
    }
  }
};
export const typeDefs = gql`
  union SubnavigationItem = Link
  extend type NavigationItem {
    href: String!
    subNavigation: [SubnavigationItem]
  }
`;

export const resolvers = {
  SubnavigationItem: {
    __resolveType: (item: any) => {
      return pascalCase(item?.sys?.contentType?.sys?.id);
    }
  }
};
