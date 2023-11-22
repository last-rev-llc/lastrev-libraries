import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import { pathResolver } from './pathResolver';

export const getLink = async (item: any, _args: any, ctx: ApolloContext) => {
  const text = getLocalizedField(item.fields, 'promoLinkText', ctx) ?? 'Read More';

  const link = {
    __typename: 'Link',
    id: item.sys.id,
    text,
    icon: 'logo',
    iconPosition: 'Left',
    href: await pathResolver(item, _args, ctx),
    variant: 'buttonText'
  };

  return link;
};
