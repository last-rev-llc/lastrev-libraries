import { createRichText } from '@last-rev/graphql-contentful-core';

import { checkAndWrapArray } from './checkAndWrapArray';

import { mappers as richTextMappers } from '../RichText.extension';
import { pruneEmpty } from './pruneEmpty';
import { type ApolloContext } from '@last-rev/types';

type GenerateCardProps = {
  id: string;
  overline?: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  link?: any; // You should specify a proper type for link
  media?: any; // You should specify a proper type for media
  entries?: any[];
  ctx: ApolloContext;
};

export const generateCard = async ({
  id,
  overline,
  title,
  subtitle,
  summary,
  link,
  media,
  entries = [],
  ctx
}: GenerateCardProps) => {
  let foundSummary = !!summary;
  let richText: any = {};
  if (foundSummary && summary) {
    const raw = createRichText(summary);
    richText = {
      json: await (richTextMappers.RichText.RichText.json as Function)(raw),
      links: await (richTextMappers.RichText.RichText.links as Function)(raw, null, ctx)
    };
  }

  return pruneEmpty({
    __typename: 'Card',
    id,
    overline,
    title,
    subtitle,
    body: foundSummary ? richText : null,
    media: checkAndWrapArray(media),
    link,
    actions: [link]
  });
};
