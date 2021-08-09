import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';

import * as Card from './Card';
import * as Collection from './Collection';
// import * as Categories from './Categories';
// import * as GlobalSettings from './GlobalSettings';
import * as Header from './Header';
import * as Hero from './Hero';
import * as Link from './Link';
import * as NavigationItem from './NavigationItem';
import * as MailchimpForm from './MailchimpForm';
import * as Page from './Page';
import * as Section from './Section';
// import * as Quote from './Quote';
import * as RichText from './RichText';
// import * as SplitColumn from './SplitColumn';

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
  // Categories,
  // GlobalSettings,
  Hero,
  Header,
  Link,
  NavigationItem,
  MailchimpForm,
  Page,
  Section,
  // Quote,
  RichText
  // SplitColumn
];

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers')));
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
