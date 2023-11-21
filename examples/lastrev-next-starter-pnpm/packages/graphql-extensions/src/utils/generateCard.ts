import { createRichText } from '@last-rev/graphql-contentful-core';

import { checkAndWrapArray } from './checkAndWrapArray';

type GenerateCardProps = {
  id: string;
  title?: string;
  summary?: string;
  link?: any; // You should specify a proper type for link
  media?: any; // You should specify a proper type for media
  entries?: any[];
  category?: any;
};

export const generateCard = ({ id, title, summary, link, media, entries = [], category }: GenerateCardProps) => {
  return {
    __typename: 'Card',
    id,
    title,
    body: summary ? createRichText(summary) : null,
    media: checkAndWrapArray(media),
    link,
    actions: [link]
  };
};
