import gql from 'graphql-tag';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext, ContentfulPathsGenerator } from '@last-rev/types';
import { ContentfulLoaders } from '@last-rev/types';
import { Entry } from 'contentful';
export const typeMappings = {};

// TODO: Move to env variables
const SITE_ID = process.env.SITE_ID;
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

// Used to generate the path for Blog topics and blog posts
const blogsLandingSlug = async (loaders: ContentfulLoaders, defaultLocale: string, preview?: boolean) => {
  if (BLOGS_LANDING_ID) {
    const blogsLanding = await loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!preview });
    if (blogsLanding) {
      return getDefaultFieldValue(blogsLanding, 'slug', defaultLocale);
    }
  }
  return 'blogs';
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
  const contentsRef = getLocalizedField(page.fields, 'contents', ctx);
  // Load the Page contents
  let contents;
  if (contentsRef?.length) {
    contents = await ctx.loaders.entryLoader.loadMany(
      contentsRef?.map((content: any) => ({ id: content?.sys.id, preview: !!ctx.preview }))
    );
  }

  // Map the Page contents (if not a Section wrap it)
  return contents?.map((content: any) => {
    const variant = getLocalizedField(content.fields, 'variant', ctx);
    const contentType = content?.sys?.contentType?.sys?.id;
    return contentType === 'section'
      ? content
      : createType('Section', {
          contents: [content],
          variant: `${contentType}_${variant ?? 'default'}_section-wrapper`,
          contentWidth: 'xl',
          contentSpacing: 4
        });
  });
};

export const mappers = {
  Page: {
    Link: {
      href: 'slug',
      text: 'internalTitle'
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
// Path generation
const validateSite = async (_args: {
  item: Entry<any>;
  loaders: ContentfulLoaders;
  defaultLocale: string;
  locales: string[];
  preview: boolean;
  site?: string;
}) => {
  // Uncomment to require siteRef
  // const { item, loaders, preview, site, defaultLocale } = _args;

  // const siteRef = getDefaultFieldValue(item, 'site', defaultLocale);
  // if (!siteRef) {
  //   // page not published to a site
  //   return false;
  // }

  // const siteKey = { id: siteRef.sys.id, preview };
  // const resolvedSite = await loaders.entryLoader.load(siteKey);

  // if (!resolvedSite) {
  //   // site item may have been deleted
  //   return false;
  // }

  // const resolvedSiteName = getDefaultFieldValue(resolvedSite, 'internalTitle', defaultLocale);

  // if (site !== resolvedSiteName) {
  //   // page not published to this site
  //   return false;
  // }
  return true;
};
// TODO: Move this function to utilities
export const createPath = (...slug: string[]) => {
  let path = slug
    .map((segment) => segment?.trim())
    .join('/')
    .replace(/\/\//g, '/');
  console.log('CreatePath', { slug, path });
  if (path.startsWith('http://')) {
    return path.replace('http://', 'https://');
  }
  if (path.startsWith('https://')) {
    return path;
  }
  if (path != '/' && path[0] !== '/') path = '/' + path;

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

const blog: ContentfulPathsGenerator = async (blogItem, loaders, defaultLocale, _locales, preview) => {
  const slug = getDefaultFieldValue(blogItem, 'slug', defaultLocale);
  const blogLandingSlug = await blogsLandingSlug(loaders, defaultLocale, preview);
  const fullPath = createPath(blogLandingSlug, slug);
  console.log('Blog', { slug, blogLandingSlug, fullPath });
  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: blogItem.sys.id,
      excludedLocales: []
    }
  };
};

const categoryBlog: ContentfulPathsGenerator = async (categoryBlogItem, loaders, defaultLocale, _locales, preview) => {
  const slug = getDefaultFieldValue(categoryBlogItem, 'slug', defaultLocale);
  const blogLandingSlug = await blogsLandingSlug(loaders, defaultLocale, preview);

  // Here you can change the base path of the Blog categoryBlogs
  const fullPath = createPath(blogLandingSlug, slug);
  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: categoryBlogItem.sys.id,
      excludedLocales: []
    }
  };
};

export const pathsConfigs = {
  page,
  blog,
  categoryBlog
};
