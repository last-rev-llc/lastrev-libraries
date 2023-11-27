import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { type ApolloContext } from '../types';
import { getSysContentTypeName } from './getSysContentTypeName';

export const getDefaultCtaText = async (item: any, _args: any, ctx: ApolloContext) => {
  const text = getLocalizedField(item.fields, 'promoLinkText', ctx);

  if (text) return text;

  const contentType = getSysContentTypeName(item);

  switch (contentType) {
    case 'Blog':
      return 'Read Article';
    default:
      return 'Read More';
  }
};
