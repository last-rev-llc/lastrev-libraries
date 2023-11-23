import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import { pathResolver } from './pathResolver';
import { pruneEmpty } from './pruneEmpty';

export const getLink = async (item: any, _args: any, ctx: ApolloContext) => {
  return {
    __typename: 'Link',
    id: item.sys.id,
    text: getLocalizedField(item.fields, 'promoLinkText', ctx) ?? 'Read More',
    icon: 'logo',
    iconPosition: 'Left',
    href: await pathResolver(item, _args, ctx),
    variant: 'buttonText'
  };
};
