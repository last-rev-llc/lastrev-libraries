import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';

export const getMedia = async (imageRef: any, ctx: ApolloContext) => {
  if (!imageRef?.sys?.id) return null;

  const image = await ctx.loaders.assetLoader.load({
    id: imageRef?.sys?.id,
    preview: !!ctx.preview
  });

  if (!image?.fields) return null;

  const imageObj = {
    __typename: 'Media',
    title: getLocalizedField(image.fields, 'title', ctx),
    file: getLocalizedField(image.fields, 'file', ctx),
    description: getLocalizedField(image.fields, 'description', ctx)
  };

  return imageObj;
};
