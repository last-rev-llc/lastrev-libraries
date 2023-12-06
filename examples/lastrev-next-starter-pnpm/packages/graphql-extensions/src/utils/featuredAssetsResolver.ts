import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import { resolveField } from './resolveField';

export const featuredAssetsResolver = resolveField([
  'featuredAssets',
  (_root: any, _args: any, ctx: ApolloContext) => getLocalizedField(ctx.siteSettings?.fields, 'featuredAssets', ctx)
]);
