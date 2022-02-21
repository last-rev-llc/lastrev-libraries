import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

import createType from './utils/createType';

export const typeDefs = gql`
  extend type Page {
    breadcrumbs: [Link]
  }
`;

export const mappers: any = {
  Page: {
    Page: {
      breadcrumbs: async (page: any, _args: any, ctx: ApolloContext) => {
        const disableBreadcrumbs: any = await getLocalizedField(page.fields, 'disableBreadcrumbs', ctx);
        if (disableBreadcrumbs) return undefined;
        const title: any = await getLocalizedField(page.fields, 'title', ctx);
        const slug: any = await getLocalizedField(page.fields, 'slug', ctx);
        const links = [];
        if (title && slug) {
          links.push(
            createType('Link', {
              id: page.sys.id,
              href: slug,
              text: title
            })
          );
        }
        if (!links.length) return undefined;
        return links;
      }
    }
  }
};
