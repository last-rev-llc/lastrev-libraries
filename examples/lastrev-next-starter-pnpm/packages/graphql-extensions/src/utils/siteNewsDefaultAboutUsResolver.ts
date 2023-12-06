import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';

export const siteNewsDefaultAboutUsResolver = async (_root: any, _args: any, ctx: ApolloContext) =>
  getLocalizedField(ctx.siteSettings.fields, 'newsDefaultAboutUs', ctx);
