import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { blogV1, categoryBlogV1, pageV1 } from './PathsConfigs.extension';
import pathResolver from './utils/pathResolver';
export const typeMappings = {};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Content
    hero: Hero
    contents: [Content]
    path: String
  }

  extend type Blog {
    header: Header
    footer: Content
    path: String
  }

  extend type CategoryBlog {
    header: Header
    footer: Content
    contents: [Content]
    hero: Hero
    path: String
  }
`;
// TODO: Move to env variables
const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;
const BLOGS_LANDING_ID = process.env.BLOGS_LANDING_ID;

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

const createType = (type: string, content: any) => ({
  sys: { id: content?.id, contentType: { sys: { id: type } } },
  fields: Object.keys(content).reduce(
    (accum, key) => ({
      ...accum,
      [key]: {
        'en-US': content[key]
      }
    }),
    {}
  )
});

export const mappers = {
  Page: {
    Link: {
      href: 'slug',
      text: 'title'
    },
    Page: {
      path: pathResolver,
      seo: async (page: any, _args: any, ctx: ApolloContext) => {
        const seo: any = getLocalizedField(page.fields, 'seo', ctx);
        return {
          ...seo
        };
      },
      header: headerResolver,
      footer: footerResolver
      // contents: pageContentsResolver
    }
  },
  Blog: {
    Blog: {
      path: pathResolver,
      header: headerResolver,
      footer: footerResolver
    }
  },
  CategoryBlog: {
    CategoryBlog: {
      path: pathResolver,
      header: headerResolver,
      footer: footerResolver,
      contents: async (_: any, _args: any, ctx: ApolloContext) => {
        // TODO: Update once path lookup is implemented to remove dependency on env ID
        if (BLOGS_LANDING_ID) {
          const blogsLanding = await ctx.loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!ctx.preview });
          return getLocalizedField(blogsLanding?.fields, 'contents', ctx);
        }
      }
    }
  }
};

/*
@Deprecated
PathsConfigs have been moved to the PathsConfigs.ts file and are now individually exported.
Preserving this export for backwards compatibility.
*/
export const pathsConfigs = {
  ...pageV1,
  ...blogV1,
  ...categoryBlogV1
};
