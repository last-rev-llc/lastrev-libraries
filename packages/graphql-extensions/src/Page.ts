import gql from 'graphql-tag';
import { getLocalizedField, getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { ApolloContext, ContentfulPathsGenerator } from '@last-rev/types';
import topicNavHorizontalResolver from './resolvers/topicNavHorizontalResolver';
import createPath from './utils/createPath';
import createType from './utils/createType';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const typeDefs = gql`
  enum Auth {
    None
    Legacy
    Okta
  }

  extend type Page {
    topicNavItems: [NavigationItem]
    breadcrumbs: [Link]
    indexName: String
    auth: Auth
  }
`;

export const mappers: any = {
  Page: {
    Page: {
      topicNavItems: async (page: any, _args: any, ctx: ApolloContext) => {
        const disableTopicNav: any = await getLocalizedField(page.fields, 'disableTopicNav', ctx);
        if (disableTopicNav) return undefined;
        return topicNavHorizontalResolver(page, _args, ctx);
      },
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
      },
      indexName: async () => {
        return process.env.ALGOLIA_INDEX_NAME;
      },
      auth: async (page: any, _args: any, ctx: ApolloContext) => {
        const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
        const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? SITE_ID, preview: !!ctx.preview });
        const auth: any = getLocalizedField(site?.fields, 'auth', ctx);
        return auth;
      }
    }
  }
};

const page: ContentfulPathsGenerator = async (pageItem, _loaders, defaultLocale, _locales, _preview = false, _site) => {
  const slug = getDefaultFieldValue(pageItem, 'slug', defaultLocale);
  const fullPath = createPath('', slug);

  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: pageItem?.sys?.id,
      excludedLocales: [],
      contentType: pageItem.sys.contentType.sys.id
    }
  };
};

export const pathsConfigs = {
  page
};