import type { ApolloContext } from '../types';
import { pathResolver } from './pathResolver';

export const getLink = async (item: any, _args: any, ctx: ApolloContext) => {
  const link = {
    __typename: 'Link',
    id: item.sys.id,
    text: 'Read More',
    icon: 'logo',
    iconPosition: 'Left',
    href: await pathResolver(item, _args, ctx),
    variant: 'buttonText'
  };

  return link;
};
