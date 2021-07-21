import { Context } from 'apollo-server-core';
import { Asset, ContentType, Entry } from 'contentful';
import { GraphQLSchema, Source, DocumentNode } from 'graphql';
import { GraphQLResolverMap } from 'apollo-graphql';
import DataLoader from 'dataloader';

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

export type ContentfulLoaders = {
  entryLoader: DataLoader<string, Entry<any> | null>;
  assetLoader: DataLoader<string, Asset | null>;
  entriesByContentTypeLoader: DataLoader<string, Entry<any>[]>;
  fetchAllContentTypes: () => Promise<ContentType[]>;
};

export type ApolloContext = Context<{
  loaders: ContentfulLoaders;
  mappers: Mappers;
  defaultLocale: string;
  locale?: string;
  typeMappings: TypeMappings;
  pathToIdMapping: PathToIdMapping;
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
  isPreview: boolean;
  spaceId: string;
  accessToken: string;
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

export type ServerProps = FsServerProps | S3ServerProps;
