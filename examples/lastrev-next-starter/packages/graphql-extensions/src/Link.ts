import { Mappers, getLocalizedField, ApolloContext } from '@last-rev/graphql-contentful-core';
import gql from 'graphql-tag';

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
    # modal: Modal
  }
`;
