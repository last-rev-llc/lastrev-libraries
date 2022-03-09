import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import getPathReader from '../utils/getPathReader';

const SITE = process.env.SITE;

const articleLinkResolver = async (article: any, _args: any, ctx: ApolloContext) => {
  // Get all article paths
  const paths = await getPathReader(ctx)?.getPathsByContentId(article.sys.id, undefined, SITE);
  if (!paths || !paths.length) return '#';

  // Check if the current path is on the topics section at all.   If not, get the first path from path reader
  if (!ctx?.path || !ctx.path.startsWith('/topics')) return paths[0];

  const currentCategoryPath = await getPathReader(ctx)?.getNodeByPath(ctx.path, SITE);
  if (!currentCategoryPath) return '#';

  const articleSlug = await getLocalizedField(article?.fields, 'slug', ctx);

  if (!articleSlug) return '#';

  // What the slug could be, but we're not sure if the current path has that article as a child
  const potentialArticlePath = `${ctx.path}${articleSlug}}`;

  const foundPaths = paths.filter((path) => path === potentialArticlePath);

  // There should only be one path found, so if there any issues arise, check if multiple paths are being returned.
  // This should never be possible though since the paths are deduplicated.
  if (foundPaths.length) return foundPaths[0];

  // If here, then we're on a topics page that has a link to an article, but that article is not categorized to the current category URL
  // Will find the deepest path in the article paths that is a child of the current category and is the deepest.
  const currentCategoriesPaths = paths
    .filter((path) => ctx.path && path.startsWith(ctx.path))
    .sort((a: any, b: any) => {
      const aPath = a?.data?.fullPath || '';
      const bPath = b?.data?.fullPath || '';

      // Shortcut to find deepest path based on number of slashes.
      // If there are two equal ones at this point then it's a tossup as to which one will be returned first
      return (bPath.match(new RegExp('/', 'g')) || []).length - (aPath.match(new RegExp('/', 'g')) || []).length;
    });

  if (currentCategoriesPaths.length) return currentCategoriesPaths[0];

  // Couldn't find a path, so returning canonical path of article
  return paths[0];
};

export default articleLinkResolver;
