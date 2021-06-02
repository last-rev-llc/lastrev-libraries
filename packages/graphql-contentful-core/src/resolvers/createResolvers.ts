import { ContentfulDataLoader } from '../createLoader';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { ContentType, Entry, Asset } from 'contentful';
import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash/merge';
import mapValues from 'lodash/mapValues';
import { Context } from 'apollo-server-core';
import { fetchAllPages } from '../server';
import { typeMappings } from '../typeMappings';
import getContentResolvers from './getContentResolvers';
import fieldResolver from './fieldResolver';
import { Mappers } from 'types';

export interface Loaders {
  entries: ContentfulDataLoader<Entry<any>>;
  pages: ContentfulDataLoader<Entry<{ slug: string }>>;
  assets: ContentfulDataLoader<Asset>;
}

export type ApolloContext = Context<{ loaders: Loaders; mappers: Mappers }>;

export const fieldsResolver = (type: string, fields: string[], mappers?: Mappers) =>
  fields.reduce((accum: any, field: string) => {
    const additional =
      mappers && mappers[type] && mappers[type][type]
        ? mapValues(mappers[type][type], (_v, k) => fieldResolver(type, k))
        : {};
    return { ...accum, [field]: fieldResolver(type, field), ...additional };
  }, {});

export const capitalizeFirst = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const createResolvers = ({ contentTypes, mappers = {} }: { contentTypes: ContentType[]; mappers?: Mappers }) =>
  merge(getContentResolvers({ contentTypes, mappers }), {
    Query: {
      me: () => {},
      page: async (_: any, { slug }: { slug?: string; locale?: string }, { loaders }: ApolloContext) => {
        if (!slug) throw new Error('MissingArgumentSlug');
        return loaders.pages.load(slug);
      },
      pages: async () => {
        return fetchAllPages();
      },
      content: async (_: any, { id }: { id?: string; locale?: string }, { loaders }: ApolloContext) =>
        !!id ? loaders.entries.load(id) : Promise.reject(new Error('MissingArgument'))
    },
    Page: fieldsResolver('Page', ['contents']),
    Media: fieldsResolver('Media', ['file', 'title', 'description']),
    // NavigationItem: fieldsResolver('NavigationItem', ['link']),
    // Link: fieldsResolver('Link', ['url', 'theme']),
    // CardCollection: fieldsResolver('CardCollection', ['cards']),
    RichText: fieldsResolver('RichText', ['raw', 'parsed']),
    // Content type resolver
    Content: {
      __resolveType: (content: any) => {
        const contentTypeId = content.sys.contentType.sys.id;
        return capitalizeFirst(typeMappings[contentTypeId] ? typeMappings[contentTypeId] : contentTypeId);
      }
    },
    // Scalars
    JSON: GraphQLJSON,
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'Date custom scalar type',
      parseValue(value: string) {
        return new Date(value); // value from the client
      },
      serialize(value: Date) {
        return value.toString(); // value sent to the client
      },
      parseLiteral(ast: any) {
        if (ast.kind === Kind.INT) {
          return new Date(ast.value); // ast value is always in string format
        }
        return null;
      }
    })
  });

export default createResolvers;
