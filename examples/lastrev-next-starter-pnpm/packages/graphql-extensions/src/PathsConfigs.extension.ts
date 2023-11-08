import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { type ContentfulLoaders, type ContentfulPathsGenerator } from '@last-rev/types';
import { type Entry } from 'contentful';
import { createPath } from './utils/createPath';

// Path generation
// const validateSite = async (_args: {
//   item: Entry<any>;
//   loaders: ContentfulLoaders;
//   defaultLocale: string;
//   locales: string[];
//   preview: boolean;
//   site?: string;
// }) => {
//   // Uncomment to require siteRef
//   // const { item, loaders, preview, site, defaultLocale } = _args;

//   // const siteRef = getDefaultFieldValue(item, 'site', defaultLocale);
//   // if (!siteRef) {
//   //   // page not published to a site
//   //   return false;
//   // }

//   // const siteKey = { id: siteRef.sys.id, preview };
//   // const resolvedSite = await loaders.entryLoader.load(siteKey);

//   // if (!resolvedSite) {
//   //   // site item may have been deleted
//   //   return false;
//   // }

//   // const resolvedSiteName = getDefaultFieldValue(resolvedSite, 'internalTitle', defaultLocale);

//   // if (site !== resolvedSiteName) {
//   //   // page not published to this site
//   //   return false;
//   // }
//   return true;
// };

// only checking for the first item
const generateParentPaths = async (
  content: any,
  loaders: ContentfulLoaders,
  defaultLocale: string,
  preview?: boolean,
  paths: string[] = []
): Promise<string[]> => {
  const parentPageRef = getDefaultFieldValue(content, 'parentPage', defaultLocale);

  if (parentPageRef) {
    const parentPage = await loaders.entryLoader.load({ id: parentPageRef.sys.id, preview: !!preview });
    if (parentPage) {
      const parentSlug = getDefaultFieldValue(parentPage as any, 'slug', defaultLocale);
      paths.push(parentSlug);
      return generateParentPaths(parentPage, loaders, defaultLocale, preview, paths);
    }
  }

  return paths;
};

const generatePaths: ContentfulPathsGenerator = async (
  contentItem,
  loaders,
  defaultLocale,
  _locales,
  preview = false,
  _site
) => {
  const slug = getDefaultFieldValue(contentItem, 'slug', defaultLocale);

  const paths = await generateParentPaths(contentItem, loaders, defaultLocale, preview);

  paths.reverse().push(slug);

  const fullPath = createPath(...paths);
  const excludedLocales = getDefaultFieldValue(contentItem, 'excludeFromLocale', defaultLocale) || [];

  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: contentItem?.sys?.id,
      excludedLocales
    }
  };
};

// // Used to generate the path for Blog topics and blog posts
// const blogsLandingSlug = async (loaders: ContentfulLoaders, defaultLocale: string, preview?: boolean) => {
//   if (BLOGS_LANDING_ID) {
//     const blogsLanding = await loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!preview });
//     if (blogsLanding) {
//       return getDefaultFieldValue(blogsLanding, 'slug', defaultLocale);
//     }
//   }
//   return 'blogs';
// };

export const pathsConfigs = {
  page: generatePaths,
  pageResource: generatePaths,
  blog: generatePaths,
  person: generatePaths,
  categoryBlog: generatePaths
};
