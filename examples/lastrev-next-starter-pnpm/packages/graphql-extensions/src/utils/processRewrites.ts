import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

export async function processRewrites(rewrites: any[], ctx: ApolloContext, preview: boolean) {
  const items: any[] = [];
  for (const rewrite of rewrites) {
    const contentType = rewrite?.sys?.contentType?.sys?.id;
    let source;
    let destination;

    if (contentType === 'redirect') {
      source = getLocalizedField(rewrite?.fields, 'source', ctx);
      destination = getLocalizedField(rewrite?.fields, 'destination', ctx);
    } else if (contentType === 'document') {
      source = getLocalizedField(rewrite?.fields, 'slug', ctx);
      if (!source) continue;
      if (!source.startsWith('/')) source = `/${source}`;
      const documentRef = getLocalizedField(rewrite?.fields, 'document', ctx);
      if (!documentRef) continue;
      const document = await ctx.loaders.assetLoader.load({ id: documentRef?.sys?.id, preview });
      if (!document) continue;
      const file = getLocalizedField(document?.fields, 'file', ctx);
      if (!file) continue;
      destination = file?.url;
      if (!destination) continue;
      if (destination.startsWith('//')) destination = `https:${destination}`;
    }

    if (source && source.trim() !== '' && destination && destination.trim() !== '') items.push({ source, destination });
  }
  return items;
}

export default processRewrites;
