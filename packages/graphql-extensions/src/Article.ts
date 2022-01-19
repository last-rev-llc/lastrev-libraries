import gql from 'graphql-tag';
import { ApolloContext } from '@last-rev/types';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator } from '@last-rev/types';

export const typeMappings = {};

// TODO: Move to env variables
const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

// TODO: Move this function to utilities
export const createPath = (...slug: string[]) => {
  const path = slug.join('/').replace(/\/\//g, '/');
  if (path[0] === '/') return path;
  else return '/' + path;
};

const headerResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  // TODO: Make getting a localized resolved link a single function
  const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
  const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? SITE_ID, preview: !!ctx.preview });
  const siteHeader: any = getLocalizedField(site?.fields, 'header', ctx);

  const header: any = getLocalizedField(page?.fields, 'header', ctx);
  return header ?? siteHeader;
};

const footerResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  // TODO Improve redirecting to a field inside a referenced field
  const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
  const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? SITE_ID, preview: !!ctx.preview });
  const siteFooter: any = getLocalizedField(site?.fields, 'footer', ctx);

  const footer: any = getLocalizedField(page?.fields, 'footer', ctx);
  return footer ?? siteFooter;
};

export const typeDefs = gql`
  extend type Article {
    header: Header
    footer: Content
    categories: [Link]
    relatedLinks: [Link]
  }
`;

export const mappers = {
  Article: {
    Article: {
      header: headerResolver,
      footer: footerResolver
    },
    Link: {
      href: async (item: any, _args: any, ctx: ApolloContext) => {
        const slug: any = await getLocalizedField(item.fields, 'slug', ctx);
        const fullPath = createPath('article', slug);
        return fullPath;
      },
      text: 'title'
    }
  }
};

const article: ContentfulPathsGenerator = async (
  articleItem,
  _loaders,
  defaultLocale,
  _locales,
  _preview = false,
  _site
) => {
  const slug = getDefaultFieldValue(articleItem, 'slug', defaultLocale);
  const fullPath = createPath('article', slug);

  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: articleItem?.sys?.id,
      excludedLocales: []
    }
  };
};

export const pathsConfigs = {
  article
};
