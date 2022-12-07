import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';
import { typeDefs as algoliaTypeDefs } from '@last-rev/graphql-algolia-integration';

import {
  Blog,
  Card,
  Collection,
  Header,
  Hero,
  Link,
  Media,
  NavigationItem,
  Page,
  Preview,
  RichText,
  Section,
  Theme
} from '@last-rev/graphql-contentful-extensions';

// Uncomment if using Algolia, else delete the related file
// import * as Algolia from './Algolia';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
};

const extensions: GraphQlExtension[] = [
  { typeDefs: algoliaTypeDefs },
  // Algolia,
  Blog,
  Card,
  Collection,
  Header,
  Hero,
  Link,
  Media,
  NavigationItem,
  Page,
  Preview,
  RichText,
  Section,
  Theme
];

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers'))) as Record<string, any>;
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
