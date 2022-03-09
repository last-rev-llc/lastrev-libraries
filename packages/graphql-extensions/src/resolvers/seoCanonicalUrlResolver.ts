import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import getPathReader from '../utils/getPathReader';

const SITE = process.env.SITE;
const DOMAIN = process.env.DOMAIN;

const seoCanonicalUrlResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  const pageSEO = getLocalizedField(page.fields, 'seo', ctx) || {};

  const pagePaths = await getPathReader(ctx)?.getPathsByContentId(page.sys.id, undefined, SITE);
  if (!pagePaths || !pagePaths.length) return pageSEO;

  let canonicalPath;

  for (let path of pagePaths) {
    if (canonicalPath) break;
    const node = await getPathReader(ctx)?.getNodeByPath(path, SITE);
    if (node && (node as any)?.data?.isCanonical && node?.data?.fullPath) canonicalPath = node.data.fullPath;
  }

  canonicalPath = canonicalPath || pagePaths[0];
  if (!canonicalPath) return null;

  return `${DOMAIN}${canonicalPath}`;
};

export default seoCanonicalUrlResolver;
