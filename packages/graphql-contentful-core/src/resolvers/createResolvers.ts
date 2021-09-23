import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { ContentType } from 'contentful';
import GraphQLJSON from 'graphql-type-json';
import getContentResolvers from './getContentResolvers';
import fieldResolver from './fieldResolver';
import capitalizeFirst from '../utils/capitalizeFirst';
import { merge, mapValues } from 'lodash';
import { ApolloContext, Mappers, TypeMappings } from '@last-rev/types';

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
      page: async (
        _: any,
        { path, locale, preview = false, site }: { path?: string; locale?: string; preview?: boolean; site?: string },
        ctx: ApolloContext
      ) => {
        if (!path) throw new Error('MissingArgumentPath');
        ctx.locale = locale || ctx.defaultLocale;
        ctx.preview = preview;

        if (!ctx.pathReaders) return null;

        const pathReader = ctx.pathReaders[preview ? 'preview' : 'prod'];

        const node = await pathReader.getNodeByPath(path, site);
        if (!node || !node.data) return null;

        const id = node.data.contentId;

        return ctx.loaders.entryLoader.load({ id, preview });
      },
      paths: async (
        _: any,
        { locales, preview = false, site }: { locales?: string[]; preview?: boolean; site?: string },
        ctx: ApolloContext
      ) => {
        if (!locales) throw new Error('MissingArgumentLocales');
        ctx.preview = preview;
        if (!ctx.pathReaders) return null;

        const pathReader = ctx.pathReaders[preview ? 'preview' : 'prod'];

        return await pathReader.getAllPaths(locales, site);
      },
      content: async (
        _: any,
        { id, locale, preview = false }: { id?: string; locale?: string; preview?: boolean },
        ctx: ApolloContext
      ) => {
        if (!id) throw new Error('MissingArgumentId');
        ctx.preview = preview;
        ctx.locale = locale || ctx.defaultLocale;
        // not locale specific. fieldsResolver handles that
        return ctx.loaders.entryLoader.load({ id, preview });
      }
    },
    Media: fieldsResolver('Media', ['file', 'title', 'description'], mappers),
    RichText: fieldsResolver('RichText', ['json', 'parsed'], mappers),
    Theme: fieldsResolver('Theme', ['variant'], mappers),

    // Content type resolver
    Content: {
      __resolveType: (content: any) => {
        // console.log('ResolveType', content);
        if (content.sys && (content.sys.linkType == 'Asset' || content.sys.type === 'Asset')) return 'Media';
        const contentTypeId = content.__typename ? content.__typename : content.sys.contentType.sys.id;
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
