import { checkAndWrapArray } from './checkAndWrapArray';
import { pruneEmpty } from './pruneEmpty';
import { generateRichText } from './generateRichText';

import { type ApolloContext } from '../types';

type GenerateCardProps = {
  id: string;
  overline?: string;
  title?: string;
  subtitle?: string;
  summary?: string | any | undefined;
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
}: GenerateCardProps) =>
  pruneEmpty({
    __typename: 'Card',
    id,
    overline,
    title,
    subtitle,
    body: await generateRichText({ data: summary, ctx }),
    media: checkAndWrapArray(media),
    link,
    actions: [link]
  });
