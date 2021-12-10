import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

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
  RichText,
} from '@last-rev/graphql-contentful-extensions';

import * as Text from './Text';
import * as Quote from './Quote';
import * as Person from './Person';
import * as Header from './Header';
import * as Footer from './Footer';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
};

// @ts-ignore: Unreachable code error
Media.mappers.Media.Card.media = async (media: any, _args: any, ctx: ApolloContext) => {
  const featuredMedia: any = getLocalizedField(media.fields, 'asset', ctx);
  if (featuredMedia) return [featuredMedia];
};

Page.mappers.Page.Page.contents = async (page: any, _args: any, ctx: ApolloContext) => {
  // Get the PAge contents
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
  Card,
  Collection,
  Blog,
  Hero,
  Header,
  Footer,
  Link,
  NavigationItem,
  Page,
  Section,
  Quote,
  Person,
  Media,
  RichText,
  Text,
];

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers'))) as Record<string, any>;
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
