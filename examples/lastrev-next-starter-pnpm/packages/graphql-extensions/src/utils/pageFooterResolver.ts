import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '@last-rev/types';
import { resolveField } from './resolveField';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const pageFooterResolver = resolveField([
  'overrideFooter',
  'site.footer',
  (_root: any, _args: any, ctx: ApolloContext) =>
    ctx.loaders.entryLoader
      .load({ id: SITE_ID!, preview: !!ctx.preview })
      .then((site: any) => getLocalizedField(site?.fields, 'footer', ctx))
]);
