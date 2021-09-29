import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';

import {
  Card,
  Collection,
  Header,
  Blog,
  Hero,
  Link,
  NavigationItem,
  Page,
  Section,
  Media,
  Quote,
  RichText
} from '@last-rev/graphql-contentful-extensions';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
};

const extensions: GraphQlExtension[] = [
  Card,
  Collection,
  Blog,
  Hero,
  Header,
  Link,
  NavigationItem,
  Page,
  Section,
  Quote,
  Media,
  RichText
];

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers'))) as Record<string, any>;
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
