import { createRichText } from '@last-rev/graphql-contentful-core';

import { checkAndWrapArray } from './checkAndWrapArray';

type GenerateCardProps = {
  id: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  link?: any; // You should specify a proper type for link
  media?: any; // You should specify a proper type for media
  entries?: any[];
};

export const generateCard = ({ id, title, subtitle, summary, link, media, entries = [] }: GenerateCardProps) => {
  return {
    __typename: 'Card',
    id,
    title,
    subtitle,
    body: summary ? createRichText(summary) : null,
    media: checkAndWrapArray(media),
    link,
    actions: [link]
  };
};
