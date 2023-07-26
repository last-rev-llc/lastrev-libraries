import gql from 'graphql-tag';
import { getLocalizedField, getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { ApolloContext, ContentfulPathsGenerator } from '@last-rev/types';
import topicNavHorizontalResolver from './resolvers/topicNavHorizontalResolver';
import createPath from './utils/createPath';
import createType from './utils/createType';

const SITE_ID = process.env.DEFAULT_SITE_ID;

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

  type AuthPage {
    auth: Auth
    seo: JSON
    isProtected: Boolean
  }

  extend type Query {
    authPage(path: String!, locale: String, preview: Boolean, site: String): AuthPage
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
  },
  Query: {
    Query: {
      authPage: async (
        _: any,
        { path, locale, preview = false, site }: { path?: string; locale?: string; preview?: boolean; site?: string },
        ctx: ApolloContext
      ) => {
        if (!path) throw new Error('MissingArgumentPath');
        ctx.locale = locale || ctx.defaultLocale;
        ctx.preview = preview;
        ctx.path = path;

        if (!ctx.pathReaders) return null;

        const pathReader = ctx.pathReaders[preview ? 'preview' : 'prod'];

        const node = await pathReader.getNodeByPath(path, site);
        if (!node || !node.data) return null;

        if (node.data.excludedLocales.includes(locale ?? '')) return null;

        const id = node.data.contentId;

        const page = await ctx.loaders.entryLoader.load({ id, preview });

        const siteRef: any = getLocalizedField(page?.fields, 'site', ctx);
        const siteEntry = await ctx.loaders.entryLoader.load({
          id: siteRef?.sys?.id ?? SITE_ID,
          preview: !!ctx.preview
        });

        const auth: any = getLocalizedField(siteEntry?.fields, 'auth', ctx);

        const contentTypeId = page?.sys?.contentType?.sys?.id;
        const requiredRoles = getLocalizedField(page?.fields, 'requiredRoles', ctx);
        const seo = getLocalizedField(page?.fields, 'seo', ctx);

        const isProtected =
          ((contentTypeId === 'article' && requiredRoles) || []).includes(
            process.env.PROTECTED_PAGE_REQUIRED_ROLE || 'loggedIn'
            // @ts-ignore
          ) || auth === 'Okta';

        return {
          auth,
          isProtected,
          seo
        };
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
