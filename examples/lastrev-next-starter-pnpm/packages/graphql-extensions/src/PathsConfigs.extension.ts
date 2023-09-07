import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { ContentfulLoaders, ContentTypePathRuleConfig, LegacyContentfulPathsConfigs } from '@last-rev/types';
import { Entry } from 'contentful';
import createPath from './utils/createPath';

const BLOGS_LANDING_ID = process.env.BLOGS_LANDING_ID;

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

export const pageV1: LegacyContentfulPathsConfigs = {
  page: async (pageItem, loaders, defaultLocale, locales, preview = false, site) => {
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
  }
};

export const blogV1: LegacyContentfulPathsConfigs = {
  blog: async (blogItem, loaders, defaultLocale, _locales, preview) => {
    const slug = getDefaultFieldValue(blogItem, 'slug', defaultLocale);
    const blogLandingSlug = await blogsLandingSlug(loaders, defaultLocale, preview);
    const fullPath = createPath(blogLandingSlug, slug);
    return {
      [fullPath]: {
        fullPath,
        isPrimary: true,
        contentId: blogItem.sys.id,
        excludedLocales: []
      }
    };
  }
};

export const categoryBlogV1: LegacyContentfulPathsConfigs = {
  categoryBlog: async (categoryBlogItem, loaders, defaultLocale, _locales, preview) => {
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
  }
};

const page = {
  rules: [
    {
      rule: `/:slug`,
      allowFullPaths: true
    }
  ],
  root: { field: 'slug', value: '/' }
};

export const pagev2 = {
  pathsConfigs: {
    page
  }
};

const blog: ContentTypePathRuleConfig = {
  rules: [
    {
      rule: `/blogs/:slug`,
      allowFullPaths: true
    }
  ]
};

export const blogv2 = {
  pathsConfigs: {
    blog
  }
};

const categoryBlog: ContentTypePathRuleConfig = {
  rules: [
    {
      rule: `/blogs/:slug`,
      allowFullPaths: true
    }
  ]
};

export const categoryBlogV2 = {
  pathsConfigs: {
    categoryBlog
  }
};
