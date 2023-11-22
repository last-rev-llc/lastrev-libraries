import { createRichText } from '@last-rev/graphql-contentful-core';

import { checkAndWrapArray } from './checkAndWrapArray';

import { mappers as richtextMappers } from '../RichText.extension';
import { pruneEmpty } from './pruneEmpty';

type GenerateCardProps = {
  id: string;
  overline?: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  link?: any; // You should specify a proper type for link
  media?: any; // You should specify a proper type for media
  entries?: any[];
};

export const generateCard = async ({
  id,
  overline,
  title,
  subtitle,
  summary,
  link,
  media,
  entries = []
}: GenerateCardProps) => {
  let foundSummary = !!summary;
  let richText: any = {};
  if (foundSummary && summary) {
    const raw = createRichText(summary);
    richText = {
      json: await (richtextMappers.RichText.RichText.body as Function)(raw),
      links: await (richtextMappers.RichText.RichText.links as Function)(raw)
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
