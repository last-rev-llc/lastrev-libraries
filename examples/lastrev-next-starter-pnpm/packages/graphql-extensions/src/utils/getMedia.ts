import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import { pruneEmpty } from './pruneEmpty';

export const getMedia = async (imageRef: any, ctx: ApolloContext) => {
  if (!imageRef?.sys?.id) return null;

  const image = await ctx.loaders.assetLoader.load({
    id: imageRef?.sys?.id,
    preview: !!ctx.preview
  });

  if (!image?.fields) return null;

  const file = getLocalizedField(image.fields, 'file', ctx);
  if (!file) return null;

  return pruneEmpty({
    __typename: 'Media',
    title: getLocalizedField(image.fields, 'title', ctx),
    file: {
      url: file?.url?.startsWith('//') ? `https:${file.url}` : file?.url,
      ...file?.details?.image
    },
    description: getLocalizedField(image.fields, 'description', ctx)
  });
};
