import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { Entry } from 'contentful';
import resolveLocalizedField from './utils/resolveLocalizedField';
export const typeMappings = {};

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

const pageContentsResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  // Get the PAge contents
  const contents = (await resolveLocalizedField(page.fields, 'contents', ctx)) as Entry<any>[];

  // Map the Page contents (if not a Section wrap it)
  return contents?.map((content) => {
    const variant = getLocalizedField(content.fields, 'variant', ctx);
    const contentType = content?.sys?.contentType?.sys?.id;
    return contentType === 'section'
      ? content
      : createType('Section', {
          contents: [content],
          variant: `${contentType}_${variant ?? 'default'}_section-wrapper`
        });
  });
};

export const mappers = {
  Page: {
    Link: {
      href: 'slug',
      text: 'title'
    },
    Page: {
      header: headerResolver,
      footer: footerResolver,
      contents: pageContentsResolver
    }
  },
  Blog: {
    Blog: {
      header: headerResolver,
      footer: footerResolver
    }
  },
  CategoryBlog: {
    CategoryBlog: {
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

  extend type CategoryBlog {
    header: Header
    footer: Content
    contents: [Content]
    hero: Hero
  }
`;
