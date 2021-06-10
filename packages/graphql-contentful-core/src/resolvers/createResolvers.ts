import { ContentfulDataLoader } from '../createLoader';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { ContentType, Entry, Asset } from 'contentful';
import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash/merge';
import mapValues from 'lodash/mapValues';
import getContentResolvers from './getContentResolvers';
import fieldResolver from './fieldResolver';
import { ApolloContext, Mappers, TypeMappings } from '../types';
import EntryFetcher from '../EntryFetcher';
import getPageResolvers from './getPageResolvers';
import capitalizeFirst from '../utils/capitalizeFirst';
import { some } from 'lodash';

export interface Loaders {
  entries: ContentfulDataLoader<Entry<any>>;
  pages: ContentfulDataLoader<Entry<{ slug: string }>>;
  assets: ContentfulDataLoader<Asset>;
}

export const fieldsResolver = (type: string, fields: string[], mappers: Mappers, typeMappings: TypeMappings) =>
  fields.reduce((accum: any, field: string) => {
    const additional =
      mappers && mappers[type] && mappers[type][type]
        ? mapValues(mappers[type][type], (_v, k) => fieldResolver(type, k, typeMappings))
        : {};
    return { ...accum, [field]: fieldResolver(type, field, typeMappings), ...additional };
  }, {});

const createResolvers = ({
  contentTypes,
  mappers = {},
  typeMappings = {},
  entryFetcher
}: {
  contentTypes: ContentType[];
  mappers?: Mappers;
  typeMappings?: TypeMappings;
  entryFetcher: EntryFetcher;
}) =>
  merge(
    getPageResolvers({
      contentTypes: contentTypes.filter((t) => some(t.fields, (f) => f.id === 'slug')),
      typeMappings
    }),
    getContentResolvers({ contentTypes, mappers, typeMappings }),
    {
      Query: {
        me: () => {},
        page: async (_: any, { slug }: { slug?: string; locale?: string }, { loaders }: ApolloContext) => {
          if (!slug) throw new Error('MissingArgumentSlug');
          return loaders.pages.load(slug);
        },
        pages: async (_: any, { locale }: { locale?: string }) => {
          return entryFetcher.fetchPages();
        },
        content: async (_: any, { id }: { id?: string; locale?: string }, { loaders }: ApolloContext) =>
          !!id ? loaders.entries.load(id) : Promise.reject(new Error('MissingArgument'))
      },
      Media: fieldsResolver('Media', ['file', 'title', 'description'], mappers, typeMappings),
      RichText: fieldsResolver('RichText', ['raw', 'parsed'], mappers, typeMappings),
      Theme: fieldsResolver('Theme', ['variant'], mappers, typeMappings),
      PathParams: fieldsResolver('PathParams', ['params'], mappers, typeMappings),

      // Content type resolver
      Content: {
        __resolveType: (content: any) => {
          const contentTypeId = content.sys.contentType.sys.id;
          return capitalizeFirst(typeMappings[contentTypeId] ? typeMappings[contentTypeId] : contentTypeId);
        }
      },
      // resolve href and path params
      Page: {
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
    }
  );

export default createResolvers;
