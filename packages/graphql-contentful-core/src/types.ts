import { Context } from 'apollo-server-core';
import { Entry, ContentfulClientApi } from 'contentful';
import { GraphQLSchema, Source, DocumentNode } from 'graphql';
import { LogLevelDesc } from 'loglevel';
import PathToIdLookup from './utils/PathToIdLookup';
import { ContentfulLoaders } from '@last-rev/types';

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

export type PathData =
  | {
      id: string;
      blockedLocales: string[];
    }
  | string;

export type PathToIdMapping = {
  [path: string]: PathData;
};

export type SitePathMapping = {
  [site: string]: PathToIdMapping;
};

export type ApolloContext = Context<{
  loaders: ContentfulLoaders;
  mappers: Mappers;
  defaultLocale: string;
  typeMappings: TypeMappings;
  pathToIdLookup: PathToIdLookup;
  locale?: string;
  preview?: boolean;
  contentful: {
    prod: ContentfulClientApi;
    preview: ContentfulClientApi;
  };
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
  locales: string[],
  preview?: boolean,
  site?: string
) => Promise<PathToIdMapping>;

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

export type BaseServerProps = {
  cms: 'Contentful';
  extensions?: Extensions;
  environment: string;
  spaceId: string;
  contentDeliveryToken: string;
  contentPreviewToken: string;
  logLevel: LogLevelDesc;
  useCache?: boolean;
  redisConfig?: {
    host: string;
    port: number;
    password: string;
  };
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
