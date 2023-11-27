import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import { pathResolver } from './pathResolver';
import { getSysContentTypeName } from './getSysContentTypeName';

export const getLink = async (item: any, _args: any, ctx: ApolloContext) => {
  const contentType = getSysContentTypeName(item);
  const text =
    getLocalizedField(item.fields, 'promoLinkText', ctx) ?? contentType === 'Blog' ? 'Read Article' : 'Read More';
  return {
    __typename: 'Link',
    id: item.sys.id,
    text,
    icon: 'logo',
    iconPosition: 'Left',
    href: await pathResolver(item, _args, ctx),
    variant: 'buttonText'
  };
};
