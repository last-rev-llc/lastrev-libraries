import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { ContentType } from 'contentful';
import GraphQLJSON from 'graphql-type-json';
import getContentResolvers from './getContentResolvers';
import { ApolloContext, Mappers, TypeMappings } from '../types';
import fieldResolver from './fieldResolver';
import capitalizeFirst from '../utils/capitalizeFirst';
import { merge, mapValues, isString } from 'lodash';
import generatePathParams from '../utils/generatePathParams';

export const fieldsResolver = (type: string, fields: string[], mappers: Mappers) =>
  fields.reduce((accum: any, field: string) => {
    const additional =
      mappers && mappers[type] && mappers[type][type] ? mapValues(mappers[type][type], () => fieldResolver(type)) : {};
    return { ...accum, [field]: fieldResolver(type), ...additional };
  }, {});

const createResolvers = ({
  contentTypes,
  mappers = {},
  typeMappings = {}
}: {
  contentTypes: ContentType[];
  mappers?: Mappers;
  typeMappings?: TypeMappings;
}) =>
  merge(getContentResolvers({ contentTypes, mappers, typeMappings }), {
    Query: {
      me: () => {},
      page: async (_: any, { path, locale }: { path?: string; locale?: string }, ctx: ApolloContext) => {
        if (!path) throw new Error('MissingArgumentPath');
        ctx.locale = locale || ctx.defaultLocale;
        const idOrObj = ctx.pathToIdMapping[path];
        if (!idOrObj) {
          return null;
        }
        const { id, blockedLocales } = isString(idOrObj) ? { id: idOrObj, blockedLocales: [] } : idOrObj;
        if (!id || blockedLocales.indexOf(ctx.locale) > -1) {
          return null;
        }
        return {
          ...(await ctx.loaders.entryLoader.load(id)),
          lr__path__: path
        };
      },
      paths: async (_: any, { locales }: { locales?: string[] }, ctx: ApolloContext) => {
        if (!locales) throw new Error('MissingArgumentLocales');
        return generatePathParams(ctx.pathToIdMapping, locales);
      },
      content: async (_: any, { id, locale }: { id?: string; locale?: string }, ctx: ApolloContext) => {
        if (!id) throw new Error('MissingArgumentId');
        ctx.locale = locale || ctx.defaultLocale;
        // not locale specific. fieldsResolver handles that
        return ctx.loaders.entryLoader.load(id);
      }
    },
    Media: fieldsResolver('Media', ['file', 'title', 'description'], mappers),
    RichText: fieldsResolver('RichText', ['raw', 'parsed'], mappers),
    Theme: fieldsResolver('Theme', ['variant'], mappers),

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
  });

export default createResolvers;
