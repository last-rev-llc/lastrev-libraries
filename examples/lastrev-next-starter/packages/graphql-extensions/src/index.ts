import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';

import * as Card from './Card';
import * as Collection from './Collection';
import * as Header from './Header';
import * as Blog from './Blog';
import * as Hero from './Hero';
import * as Link from './Link';
import * as NavigationItem from './NavigationItem';
import * as Page from './Page';
import * as Section from './Section';
import * as Media from './Media';
import * as Quote from './Quote';
import * as RichText from './RichText';

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
