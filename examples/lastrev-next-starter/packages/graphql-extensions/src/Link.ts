import { Mappers, getLocalizedField, ApolloContext, getFieldDataFetcher } from '@last-rev/graphql-contentful-core';
import gql from 'graphql-tag';

const linkUrlResolver = async (link: any, _: never, ctx: ApolloContext) => {
  const { loaders, locale } = ctx;
  //TODO document this use case for adapting theme fields without updating content model
  //TODO document migrating old fields to new component standards
  const url = getLocalizedField(locale, link, 'url');
  if (url) return url;

  const pageAnchor = getLocalizedField(locale, link, 'pageAnchor');
  if (pageAnchor) return pageAnchor;

  const contentRef = getLocalizedField(locale, link, 'content');
  if (contentRef) {
    const content = await loaders.entryLoader.load(contentRef.sys.id);
    return content && getLocalizedField(content?.fields, 'slug', ctx);
  }
};

export const mappers: Mappers = {
  // The Header navigation expects NavigationItem that have a link and a children collection
  // Here we setup a mapper for displaying a link as a NavigationItem
  // This allows to use existant links and reduce the amount of nesting
  Link: {
    Link: {
      url: linkUrlResolver,
      theme: async (link: any, args: any, ctx: any, info: any) => {
        //TODO document this use case for adapting theme fields without updating content model
        //TODO document migrating old fields to new component standards
        // This logic used to be in the ElementCTA component
        const dataFetcher = getFieldDataFetcher('Link', 'Link', 'modal', ctx.mappers);
        const { fieldValue: modal } = await dataFetcher(link, args, ctx, info);
        if (modal) {
          return { variant: 'button' };
        }
        return {
          variant: 'link'
        };
      }
    },
    NavigationItem: {
      link: (x: any) => ({ ...x, fieldName: 'link' }),
      children: () => []
    }
  }
};

export const typeDefs = gql`
  extend type Link {
    connectLinkTo: [Page]
    modal: Modal
  }
`;
