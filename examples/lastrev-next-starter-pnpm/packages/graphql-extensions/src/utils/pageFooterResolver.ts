import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import { resolveField } from './resolveField';

export const pageFooterResolver = resolveField([
  'footerOverride',
  'site.footer',
  (_root: any, _args: any, ctx: ApolloContext) => getLocalizedField(ctx.siteSettings?.fields, 'footer', ctx)
]);
