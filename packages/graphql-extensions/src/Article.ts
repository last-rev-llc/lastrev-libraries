import gql from 'graphql-tag';
import { ApolloContext } from '@last-rev/types';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator } from '@last-rev/types';
import * as types from '@contentful/rich-text-types';

import createType from './utils/createType';

interface Heading {
  [key: string]: number;
}

const HEADINGS: Heading = {
  [types.BLOCKS.HEADING_1]: 1,
  [types.BLOCKS.HEADING_2]: 2,
  [types.BLOCKS.HEADING_3]: 3,
  [types.BLOCKS.HEADING_4]: 4,
  [types.BLOCKS.HEADING_5]: 5,
  [types.BLOCKS.HEADING_6]: 6
};

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
    sideNav: [Link]
  }
`;

export const mappers = {
  Article: {
    Article: {
      header: headerResolver,
      footer: footerResolver,
      sideNav: async (page: any, _args: any, ctx: ApolloContext) => {
        const body: any = getLocalizedField(page.fields, 'body', ctx);
        if (!body || !body.content) return [];
        const links = [];

        for (let item of body.content) {
          const headingLevel = HEADINGS[item.nodeType];

          if (!headingLevel || headingLevel !== 2) continue;
          const value = item.content[0]?.value?.trim() as string;
          if (!value || value === '') continue;

          const href = value
            // reference: https://gist.github.com/codeguy/6684588
            .normalize('NFKD')
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[-\s]+/g, '-');

          links.push(
            createType('Link', {
              id: href,
              // TODO, this is adding a slash to the beginning of the link
              href: `#${href}`,
              text: value
            })
          );
        }
        return links;
      },
      body: async (page: any, _args: any, ctx: ApolloContext) => {
        const body = await getLocalizedField(page?.fields, 'body', ctx);
        if (!body || !body.content) return;

        for (let item of body.content) {
          const headingLevel = HEADINGS[item.nodeType];

          if (!headingLevel || headingLevel !== 2) continue;
          const value = item.content[0]?.value?.trim() as string;
          if (!value || value === '') continue;

          const href = value
            // reference: https://gist.github.com/codeguy/6684588
            .normalize('NFKD')
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[-\s]+/g, '-');

          item.data.id = href;
        }
        return body;
      },
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
