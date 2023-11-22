import { createRichText } from '@last-rev/graphql-contentful-core';

import { checkAndWrapArray } from './checkAndWrapArray';

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

export const generateCard = ({
  id,
  overline,
  title,
  subtitle,
  summary,
  link,
  media,
  entries = []
}: GenerateCardProps) => {
  return {
    __typename: 'Card',
    id,
    overline,
    title,
    subtitle,
    body: summary ? createRichText(summary) : null,
    media: checkAndWrapArray(media),
    link,
    actions: [link]
  };
};
