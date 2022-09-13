import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { ContentType, Entry } from 'contentful';
import GraphQLJSON from 'graphql-type-json';
import getContentResolvers from './getContentResolvers';
import fieldsResolver from './fieldsResolver';
import getTypeName from '../utils/getTypeName';

import merge from 'lodash/merge';
import isError from 'lodash/isError';

import { ApolloContext } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import buildSitemapFromEntries from '../utils/buildSitemapFromEntries';
import logger from 'loglevel';

const createResolvers = ({ contentTypes, config }: { contentTypes: ContentType[]; config: LastRevAppConfig }) =>
  merge(
    getContentResolvers({
      contentTypes,
      mappers: config.extensions.mappers,
      typeMappings: config.extensions.typeMappings
    }),
    {
      Query: {
        page: async (
          _: any,
          { path, locale, preview = false, site }: { path?: string; locale?: string; preview?: boolean; site?: string },
          ctx: ApolloContext
        ) => {
          if (!path) throw new Error('MissingArgumentPath');
          ctx.locale = locale || ctx.defaultLocale;
          ctx.preview = preview;
          ctx.path = path;

          const pathEntries = await ctx.loadEntriesForPath(path, ctx, site);

          if (pathEntries) {
            ctx.pathEntries = pathEntries;
            return pathEntries.reduce((acc, curr) => (curr ? curr : acc), null as any);
          }

          return null;
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

          return pathReader.getAllPaths(locales, site);
        },
        content: async (
          _: any,
          {
            id,
            locale,
            preview = false,
            displayType
          }: { id?: string; locale?: string; preview?: boolean; displayType?: string },
          ctx: ApolloContext
        ) => {
          if (!id) throw new Error('MissingArgumentId');
          ctx.preview = preview;
          ctx.locale = locale || ctx.defaultLocale;
          ctx.displayType = displayType;
          // not locale specific. fieldsResolver handles that
          return ctx.loaders.entryLoader.load({ id, preview });
        },
        contents: async (
          _: never,
          {
            filter: { contentTypes = [], ids = [], locale, preview = false, displayType }
          }: {
            filter: { contentTypes: string[]; ids: string[]; locale: string; preview: boolean; displayType: string };
          },
          ctx: ApolloContext
        ) => {
          if (!contentTypes.length && !ids.length) {
            logger.error('contents query missing one of contentTypes or ids');
            return null;
          }
          ctx.preview = preview;
          ctx.locale = locale || ctx.defaultLocale;
          ctx.displayType = displayType;

          if (ids.length) {
            return ctx.loaders.entryLoader.loadMany(ids.map((id) => ({ id, preview })));
          }

          if (contentTypes.length) {
            const results = (
              await ctx.loaders.entriesByContentTypeLoader.loadMany(contentTypes.map((type) => ({ id: type, preview })))
            ).filter((r) => !isError(r)) as unknown as Entry<any>[];

            return results.flat();
          }

          return null;
        },
        sitemap: async (
          _: any,
          {
            root,
            locales,
            preview = false,
            site
          }: { root: string; locales: string[]; preview?: boolean; site?: string },
          ctx: ApolloContext
        ) => {
          if (!ctx.pathReaders) return null;
          const pathReader = ctx.pathReaders[preview ? 'preview' : 'prod'];
          const entries = await pathReader.getSitemap(locales, site);
          const sitemap = await buildSitemapFromEntries(root, entries, !!preview, ctx);
          return sitemap;
        },
        availableLocales: async (_: never, __: never, ctx: ApolloContext) => {
          const defaultLocale = ctx.defaultLocale || 'en-US';
          return { default: defaultLocale, available: ctx.locales || [defaultLocale] };
        }
      },
      Media: fieldsResolver('Media', ['file', 'title', 'description']),
      RichText: fieldsResolver('RichText', ['json']),
      Theme: fieldsResolver('Theme', ['variant']),

      // Content type resolver
      Content: {
        __resolveType: (content: any, ctx: ApolloContext) => {
          if (ctx.displayType) return ctx.displayType;
          if (content.sys && (content.sys.linkType == 'Asset' || content.sys.type === 'Asset')) return 'Media';
          const contentTypeId = content.__typename ? content.__typename : content.sys.contentType.sys.id;
          return getTypeName(contentTypeId, config.extensions.typeMappings);
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
