import { Context } from 'apollo-server-core';
import { Asset, Entry } from 'contentful';
import DataLoader from 'dataloader';

export type Item<T> = Entry<T> | Asset;
export type FetchFunction<T> = (keys?: readonly string[]) => Promise<Array<Item<T>>>;
export type ContentfulDataLoader<T> = DataLoader<string, Item<T>> & { primeAll: () => Promise<any> };

export interface Loaders {
  entries: ContentfulDataLoader<Entry<any>>;
  pages: ContentfulDataLoader<Entry<{ slug: string }>>;
  assets: ContentfulDataLoader<Asset>;
}

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
