import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { blogV1, categoryBlogV1, pageV1 } from './PathsConfigs.extension';
import pathResolver from './utils/pathResolver';
import resolveField from './utils/resolveField';
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

const headerResolver = resolveField([
  'header',
  'site.header',
  (_root: any, _args: any, ctx: ApolloContext) =>
    ctx.loaders.entryLoader
      .load({ id: SITE_ID!, preview: !!ctx.preview })
      .then((site: any) => getLocalizedField(site?.fields, 'header', ctx))
]);

const footerResolver = resolveField([
  'footer',
  'site.footer',
  (_root: any, _args: any, ctx: ApolloContext) =>
    ctx.loaders.entryLoader
      .load({ id: SITE_ID!, preview: !!ctx.preview })
      .then((site: any) => getLocalizedField(site?.fields, 'footer', ctx))
]);

export const mappers = {
  Page: {
    Link: {
      href: 'slug',
      text: 'title'
    },
    Page: {
      path: pathResolver,
      header: headerResolver,
      footer: footerResolver
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
