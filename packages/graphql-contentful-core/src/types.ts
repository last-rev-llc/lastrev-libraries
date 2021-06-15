import { Context } from 'apollo-server-core';
import { Loaders } from '@last-rev/contentful-fs-loader';

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

export type ApolloContext = Context<{
  loaders: Loaders;
  mappers: Mappers;
  defaultLocale: string;
  locale?: string;
  typeMappings: TypeMappings;
}>;
