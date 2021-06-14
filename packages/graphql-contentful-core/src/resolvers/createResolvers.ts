import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { ContentType } from 'contentful';
import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash/merge';
import mapValues from 'lodash/mapValues';
import getContentResolvers from './getContentResolvers';
import { ApolloContext, Mappers, TypeMappings } from '../types';
import fieldResolver from './fieldResolver';
import EntryFetcher from '../EntryFetcher';
import getPageResolvers from './getPageResolvers';
import capitalizeFirst from '../utils/capitalizeFirst';
import { some } from 'lodash';

export const fieldsResolver = (type: string, fields: string[], mappers: Mappers) =>
  fields.reduce((accum: any, field: string) => {
    const additional =
      mappers && mappers[type] && mappers[type][type] ? mapValues(mappers[type][type], () => fieldResolver(type)) : {};
    return { ...accum, [field]: fieldResolver(type), ...additional };
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
        page: async (_: any, { slug, locale }: { slug?: string; locale?: string }, ctx: ApolloContext) => {
          if (!slug) throw new Error('MissingArgumentSlug');
          ctx.locale = locale || ctx.defaultLocale;
          // not locale specific. fieldsResolver handles that
          return ctx.loaders.pages.load(slug);
        },
        // not locale specific
        pages: async (_: any) => {
          return entryFetcher.fetchPages();
        },
        content: async (_: any, { id, locale }: { id?: string; locale?: string }, ctx: ApolloContext) => {
          if (!id) throw new Error('MissingArgumentId');
          ctx.locale = locale || ctx.defaultLocale;
          // not locale specific. fieldsResolver handles that
          return ctx.loaders.entries.load(id);
        }
      },
      Media: fieldsResolver('Media', ['file', 'title', 'description'], mappers),
      RichText: fieldsResolver('RichText', ['raw', 'parsed'], mappers),
      Theme: fieldsResolver('Theme', ['variant'], mappers),
      PathParams: fieldsResolver('PathParams', ['params'], mappers),

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
