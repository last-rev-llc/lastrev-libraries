import gql from 'graphql-tag';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext, ContentfulPathsGenerator } from '@last-rev/types';
import { ContentfulLoaders } from '@last-rev/types';
import { isNull } from 'lodash';
import { Entry } from 'contentful';
export const typeMappings = {};

// TODO: Move to env variables
const DEFAULT_SITE_ID = process.env.DEFAULT_SITE_ID;

const headerResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  // TODO: Make getting a localized resolved link a single function
  const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
  const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? DEFAULT_SITE_ID, preview: !!ctx.preview });
  const siteHeader: any = getLocalizedField(site?.fields, 'header', ctx);

  const header: any = getLocalizedField(page?.fields, 'header', ctx);
  return header ?? siteHeader;
};

const footerResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  // TODO Improve redirecting to a field inside a referenced field
  const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
  const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? DEFAULT_SITE_ID, preview: !!ctx.preview });
  const siteFooter: any = getLocalizedField(site?.fields, 'footer', ctx);

  const footer: any = getLocalizedField(page?.fields, 'footer', ctx);
  return footer ?? siteFooter;
};

export const mappers = {
  Page: {
    Link: {
      href: 'slug',
      text: 'internalTitle'
    },
    Page: {
      header: headerResolver,
      footer: footerResolver
    }
  },
  Blog: {
    Blog: {
      header: headerResolver,
      footer: footerResolver
    }
  }
};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Content
    hero: Hero
    contents: [Content]
  }

  extend type Blog {
    header: Header
    footer: Content
  }
`;

const validateSite = async ({
  item,
  loaders,
  preview,
  site,
  defaultLocale
}: {
  item: Entry<any>;
  loaders: ContentfulLoaders;
  defaultLocale: string;
  locales: string[];
  preview: boolean;
  site?: string;
}) => {
  const siteRef = getDefaultFieldValue(item, 'site', defaultLocale);
  if (!siteRef) {
    // page not published to a site
    return false;
  }

  const siteKey = { id: siteRef.sys.id, preview };
  const resolvedSite = await loaders.entryLoader.load(siteKey);

  if (isNull(resolvedSite)) {
    // site item may have been deleted
    return false;
  }

  const resolvedSiteName = getDefaultFieldValue(resolvedSite, 'internalTitle', defaultLocale);

  if (site !== resolvedSiteName) {
    // page not published to this site
    return false;
  }
  return true;
};

// Path generation

export const createPath = (...slug: string[]) => {
  let path = slug.join('/').replace(/\/\//g, '/');
  if (path[0] !== '/') path = '/' + path;

  if (path != '/' && path[path.length - 1] === '/') path = path.slice(0, -1);
  return path;
};

const page: ContentfulPathsGenerator = async (pageItem, loaders, defaultLocale, locales, preview = false, site) => {
  if (await validateSite({ item: pageItem, loaders, preview, site, defaultLocale, locales })) {
    const slug = getDefaultFieldValue(pageItem, 'slug', defaultLocale);
    const fullPath = createPath(slug);
    return {
      [fullPath]: {
        fullPath,
        isPrimary: true,
        contentId: pageItem.sys.id,
        excludedLocales: []
      }
    };
  }
  return {};
};

// TODO: Move this function to utilities

const blog: ContentfulPathsGenerator = async (blogItem, _loaders, defaultLocale) => {
  const slug = getDefaultFieldValue(blogItem, 'slug', defaultLocale);
  const fullPath = createPath('blogs', slug);
  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: blogItem.sys.id,
      excludedLocales: []
    }
  };
};

export const pathsConfigs = {
  page,
  blog
};
