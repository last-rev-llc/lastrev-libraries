import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { type ContentfulLoaders, type ContentfulPathsGenerator } from '@last-rev/types';
import { createPath } from './utils/createPath';

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

export const pathsConfigs = {
  page: generatePaths,
  blog: generatePaths,
  person: generatePaths,
  pageProperty: generatePaths,
  categoryBlog: generatePaths
};
