import { Context } from 'apollo-server-core';
import { Asset, ContentType, Entry } from 'contentful';
import { GraphQLSchema, Source, DocumentNode } from 'graphql';
import { GraphQLResolverMap } from 'apollo-graphql';
import DataLoader from 'dataloader';
import { LogLevelDesc } from 'loglevel';
import PathToIdLookup from 'utils/PathToIdLookup';

export type TypeMapper = {
  [fieldName: string]: string | Function;
};

export type Mappers = {
  [typeName: string]: {
    [displayType: string]: TypeMapper;
  };
};

export type TypeMappings = {
  [contentfulType: string]: string;
};

export type PathToIdMapping = {
  [path: string]:
    | {
        id: string;
        blockedLocales: string[];
      }
    | string;
};

export type ItemKey = {
  id: string;
  preview: boolean;
};

export type PageKey = {
  path: string;
  preview: boolean;
};

export type ContentfulLoaders = {
  entryLoader: DataLoader<ItemKey, Entry<any> | null>;
  assetLoader: DataLoader<ItemKey, Asset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, Entry<any>[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};

export type ApolloContext = Context<{
  loaders: ContentfulLoaders;
  mappers: Mappers;
  defaultLocale: string;
  typeMappings: TypeMappings;
  pathToIdLookup: PathToIdLookup;
  locale?: string;
  preview?: boolean;
}>;

export type PagePathsParam = {
  params: {
    slug: string[];
    locale: string;
  };
};

export type ContentfulPathsGenerator = (
  resolvedItem: Entry<any>,
  loaders: ContentfulLoaders,
  defaultLocale: string,
  locales: string[]
) => Promise<PathToIdMapping>;

export type ContentfulPathsConfig = string | ContentfulPathsGenerator;

export type ContentfulPathsConfigs = {
  [contentTypeId: string]: ContentfulPathsConfig;
};

export type Extensions = {
  typeDefs: string | DocumentNode | Source | GraphQLSchema;
  resolvers: GraphQLResolverMap<any>;
  mappers: Mappers;
  typeMappings: { [contentfulType: string]: string };
  pathsConfigs: ContentfulPathsConfigs;
};

export type BaseServerProps = {
  cms: 'Contentful';
  extensions?: Extensions;
  environment: string;
  spaceId: string;
  contentDeliveryToken: string;
  contentPreviewToken: string;
  logLevel: LogLevelDesc;
};

export type FsServerProps = BaseServerProps & {
  contentDir: string;
  loaderType: 'fs';
};

export type S3ServerProps = BaseServerProps & {
  apiUrl: string;
  apiKey: string;
  loaderType: 's3';
};

export type CmsServerProps = BaseServerProps & {
  loaderType: 'cms';
};

export type ServerProps = FsServerProps | S3ServerProps;
