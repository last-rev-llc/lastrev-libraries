import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { typeDefs as algoliaTypeDefs } from '@last-rev/graphql-algolia-integration';

import {
  Card,
  Collection,
  Blog,
  Hero,
  Link,
  NavigationItem,
  Page,
  Section,
  Media,
  RichText
} from '@last-rev/graphql-contentful-extensions';

import * as Text from './Text';
import * as Quote from './Quote';
import * as Person from './Person';
import * as Header from './Header';
import * as CustomBlog from './Blog';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
};

// @ts-ignore: Unreachable code error
// Example of how to diasable/override the wrapping of the page contents in a section
Page.mappers.Page.Page.contents = async (page: any, _args: any, ctx: ApolloContext) => {
  // Get the Page contents
  const contentsRef = getLocalizedField(page.fields, 'contents', ctx);
  if (contentsRef?.length) {
    // Load the Page contents
    const contents = await ctx.loaders.entryLoader.loadMany(
      contentsRef.map((content: any) => ({ id: content?.sys.id, preview: !!ctx.preview }))
    );
    return contents;
  }
  return [];
};

const extensions: GraphQlExtension[] = [
  { typeDefs: algoliaTypeDefs },
  Card,
  Collection,
  Blog,
  CustomBlog,
  Hero,
  Header,
  Link,
  NavigationItem,
  Page,
  Section,
  Quote,
  Person,
  Media,
  RichText,
  Text
];

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers'))) as Record<string, any>;
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
