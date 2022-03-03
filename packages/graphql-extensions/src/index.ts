import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { typeDefs as algoliaTypeDefs } from '@last-rev/graphql-algolia-integration';

import {
  Card,
  Collection,
  Hero,
  // Link,
  Page,
  // NavigationItem,
  Section,
  Media,
  RichText
} from '@last-rev/graphql-contentful-extensions';

import * as IasCard from './Card';
import * as IasMedia from './Media';
import * as IasPage from './Page';
import * as Text from './Text';
import * as Table from './Table';
import * as CustomHero from './Hero';
import * as CustomSection from './Section';
import * as Quote from './Quote';
import * as Header from './Header';
import * as Footer from './Footer';
import * as Article from './Article';
import * as NavigationItem from './NavigationItem';
import * as Link from './Link';
import * as CategoryArticle from './CategoryArticle';
import * as CategoryArticleLinkHierarchyNode from './CategoryArticleLinkHierarchyNode';
import * as ModuleIntegration from './ModuleIntegration';

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
  Header,
  Footer,
  Link,
  NavigationItem,
  Page,
  Section,
  CustomSection,
  IasCard,
  IasMedia,
  IasPage,
  Quote,
  Media,
  RichText,
  Text,
  Table,
  Hero,
  CustomHero,
  Article,
  CategoryArticle,
  CategoryArticleLinkHierarchyNode,
  ModuleIntegration
];

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers'))) as Record<string, any>;
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
