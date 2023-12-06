import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import { kebabCase } from './kebabCase';

export const getSlug = (item: any, ctx: ApolloContext) => {
  const slug = getLocalizedField(item.fields, 'slug', ctx);
  if (slug) return slug;

  const title = getLocalizedField(item.fields, 'title', ctx);
  return kebabCase(title);
};
