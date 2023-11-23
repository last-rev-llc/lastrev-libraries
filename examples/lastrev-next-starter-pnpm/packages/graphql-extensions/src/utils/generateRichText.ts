import { createRichText } from '@last-rev/graphql-contentful-core';

import { mappers as richTextMappers } from '../RichText.extension';

import { isString } from './isString';

import { type ApolloContext } from '../types';

type GenerateRichTextProps = {
  data: string | any | undefined;
  ctx: ApolloContext;
};

export const generateRichText = async ({ data, ctx }: GenerateRichTextProps) => {
  if (!!data || !isString(data)) return null;

  const raw = createRichText(data);

  return {
    json: await (richTextMappers.RichText.RichText.json as Function)(raw),
    links: await (richTextMappers.RichText.RichText.links as Function)(raw, null, ctx)
  };
};
