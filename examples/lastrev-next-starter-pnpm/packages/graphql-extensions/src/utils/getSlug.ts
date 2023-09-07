import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import kebabCase from 'lodash/kebabCase';

export const getSlug = (item: any, ctx: ApolloContext) => {
  const title = getLocalizedField(item.fields, 'title', ctx);
  const slug = getLocalizedField(item.fields, 'slug', ctx);
  return slug ?? kebabCase(title);
};
