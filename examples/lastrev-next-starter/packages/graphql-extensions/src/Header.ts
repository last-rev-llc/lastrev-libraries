import gql from 'graphql-tag';
import { ApolloContext, getLocalizedField } from '@last-rev/graphql-contentful-core';

export const mappers = {
  Page: {
    Page: {
      header: async (page: any, _args: any, ctx: ApolloContext) => {
        // TODO: Make getting a localized resolved link a single function
        const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
        const site = await ctx.loaders.entryLoader.load({ id: siteRef.sys.id, preview: !!ctx.preview });
        const siteHeader: any = getLocalizedField(site?.fields, 'header', ctx);

        const header: any = getLocalizedField(page?.fields, 'header', ctx);
        return header ?? siteHeader;
      }
    }
  }
};

export const typeDefs = gql`
  extend type Header {
    navigationItems: [Collection]
  }
`;
