import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext, PathInfo } from '@last-rev/types';

import { resolveField } from './resolveField';

export const pathResolver = async (content: any, _args: any, ctx: ApolloContext) => {
  const manualUrl = resolveField(['manualUrl', 'href']);
  if (manualUrl) return manualUrl;

  let linkedContent = getLocalizedField(content.fields, 'linkedContent', ctx);
  const curContent = linkedContent
    ? await ctx.loaders.entryLoader.load({ id: linkedContent?.sys?.id, preview: !!ctx.preview })
    : content;

  if (curContent?.sys?.contentType?.sys?.id === 'media') {
    const assetRef = getLocalizedField(curContent.fields, 'asset', ctx);
    const asset = await ctx.loaders.assetLoader.load({ id: assetRef.sys.id, preview: !!ctx.preview });
    if (asset) {
      return `https:${getLocalizedField(asset.fields, 'file', ctx)?.url}`;
    }
  }

  const pathInfos: PathInfo[] = await ctx.loadPathsForContent(curContent, ctx, process.env.SITE);

  let path: string | null = null;

  for (let pathInfo of pathInfos) {
    if (!path) path = pathInfo.path;
  }

  return path || '#';
};
