import { Context } from 'apollo-server-core';
import { ContentfulFsLoaders } from '@last-rev/contentful-fs-loader';
import { Entry } from 'contentful';

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

export type ApolloContext = Context<{
  loaders: ContentfulFsLoaders;
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
  loaders: ContentfulFsLoaders,
  defaultLocale: string,
  locales: string[]
) => Promise<PathToIdMapping>;

export type ContentfulPathsConfig = string | ContentfulPathsGenerator;

export type ContentfulPathsConfigs = {
  [contentTypeId: string]: ContentfulPathsConfig;
};
