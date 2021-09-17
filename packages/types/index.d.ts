import DataLoader from 'dataloader';
import { Entry, Asset, ContentType, ContentfulClientApi } from 'contentful';
import { GraphQLSchema, Source, DocumentNode } from 'graphql';
import { Context } from 'apollo-server-core';

export type ItemKey = {
  id: string;
  preview: boolean;
};

export type PathData = {
  fullPath: string;
  isPrimary: boolean;
  contentId: string;
  excludedLocales: string[];
};

export type PathDataMap = {
  [path: string]: PathData;
};

export type ContentfulLoaders = {
  entryLoader: DataLoader<ItemKey, Entry<any> | null>;
  assetLoader: DataLoader<ItemKey, Asset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, Entry<any>[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};

export type TypeMappings = {
  [contentfulType: string]: string;
};

export type ContentfulPathsGenerator = (
  resolvedItem: Entry<any>,
  loaders: ContentfulLoaders,
  defaultLocale: string,
  locales: string[],
  preview?: boolean,
  site?: string
) => Promise<PathDataMap>;

export type ContentfulPathsConfig = string | ContentfulPathsGenerator;

export type ContentfulPathsConfigs = {
  [contentTypeId: string]: ContentfulPathsConfig;
};

export type Extensions = {
  typeDefs: string | DocumentNode | Source | GraphQLSchema;
  resolvers: Record<string, any>;
  mappers: Mappers;
  typeMappings: { [contentfulType: string]: string };
  pathsConfigs: ContentfulPathsConfigs;
};

export type ContentfulClients = {
  prod: ContentfulClientApi;
  preview: ContentfulClientApi;
};

export type ApolloContext = Context<{
  loaders: ContentfulLoaders;
  mappers: Mappers;
  defaultLocale: string;
  typeMappings: TypeMappings;
  locale?: string;
  locales: string[];
  preview?: boolean;
  contentful: ContentfulClients;
}>;

export type TypeMapper = {
  [fieldName: string]: string | Function;
};

export type Mappers = {
  [typeName: string]: {
    [displayType: string]: TypeMapper;
  };
};

export type PagePathsParam = {
  params: {
    slug: string[];
    locale: string;
  };
};
