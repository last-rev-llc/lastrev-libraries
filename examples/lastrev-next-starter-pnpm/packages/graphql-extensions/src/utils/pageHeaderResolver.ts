import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import resolveField from './resolveField';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

const pageHeaderResolver = resolveField([
  'overrideHeader',
  'site.header',
  (_root: any, _args: any, ctx: ApolloContext) =>
    ctx.loaders.entryLoader
      .load({ id: SITE_ID!, preview: !!ctx.preview })
      .then((site: any) => getLocalizedField(site?.fields, 'header', ctx))
]);

export default pageHeaderResolver;
