import { GraphQLScalarType } from 'graphql';
import { ContentType, ApolloContext, BaseEntry } from '@last-rev/types';
import GraphQLJSON from 'graphql-type-json';
import getContentResolvers from './getContentResolvers';
import fieldsResolver from './fieldsResolver';
import getTypeName from '../utils/getTypeName';
import merge from 'lodash/merge';
import isError from 'lodash/isError';
import LastRevAppConfig from '@last-rev/app-config';
import buildSitemapFromEntries from '../utils/buildSitemapFromEntries';
import { getWinstonLogger } from '@last-rev/logging';
import getLocalizedField from '../utils/getLocalizedField';
import { pathNodeResolver } from '../utils/pathNodeResolver';

const logger = getWinstonLogger({
  package: 'graphql-cms-core',
  module: 'createResolvers'
});

const createResolvers = ({ contentTypes, config }: { contentTypes: ContentType[]; config: LastRevAppConfig }) =>
  merge(
    getContentResolvers({
      contentTypes,
      config
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
            return pathEntries.reduce((acc: any, curr: any) => (curr ? curr : acc), null as any);
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
          const content = await ctx.loaders.entryLoader.load({ id, preview });
          // Add this to the content to be used by mappers and other resolvers
          if (content) {
            (content as any).displayType = displayType;
          }
          return content;
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
            logger.error('Contents query missing one of contentTypes or ids', {
              caller: 'conntents'
            });
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
            ).filter((r: any) => !isError(r)) as unknown as BaseEntry[];

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
          ctx.preview = !!preview;
          if (!ctx.pathReaders) return null;
          const pathReader = ctx.pathReaders[preview ? 'preview' : 'prod'];
          const entries = await pathReader.getSitemap(locales, site);
          const sitemap = await buildSitemapFromEntries(root, entries, !!preview, ctx);
          return sitemap;
        },
        sitemapIndex: async (_: never, { preview = false }: { preview?: boolean }, ctx: ApolloContext) => {
          ctx.preview = !!preview;
          const isSanity = config.cms === 'Sanity';
          const pages: any[] = [];
          const pathPageTypes = Object.keys(config.extensions?.pathsConfigs || {});
          if (isSanity) {
            const client = ctx.sanity![preview ? 'preview' : 'prod'];
            await Promise.all(
              pathPageTypes.map(async (contentType) => {
                const items = await client.fetch(
                  `*[_type == $contentType] | order(_updatedAt desc)[0...1] { 
                      _id,
                      _updatedAt
                    }`,
                  { contentType }
                );
                if (!items.length) return;
                const lastmod = items[0]._updatedAt;
                const numPages = Math.ceil(items.length / config.sitemap.maxPageSize);
                for (const locale of ctx.locales) {
                  for (let i = 1; i <= numPages; i++) {
                    // returning each of these instead of a constructed path allows the
                    // consumer to construct the path however they want
                    pages.push({
                      contentType,
                      page: i,
                      locale,
                      lastmod
                    });
                  }
                }
              })
            );
          } else {
            const client = ctx.contentful![preview ? 'preview' : 'prod'];
            await Promise.all(
              pathPageTypes.map(async (contentType) => {
                const { total, items } = await client.getEntries({
                  content_type: contentType,
                  select: `sys.id,sys.updatedAt`,
                  limit: 1,
                  skip: 0,
                  order: 'sys.updatedAt'
                });
                if (!total || !items.length) return;
                const lastmod = items[0].sys.updatedAt;
                const numPages = Math.ceil(total / config.sitemap.maxPageSize);
                for (const locale of ctx.locales) {
                  for (let i = 1; i <= numPages; i++) {
                    // returning each of these instead of a constructed path allows the
                    // consumer to construct the path however they want
                    pages.push({
                      contentType,
                      page: i,
                      locale,
                      lastmod
                    });
                  }
                }
              })
            );
          }

          return { pages };
        },
        sitemapPage: async (
          _: never,
          {
            contentType,
            locale,
            preview = false,
            site,
            page
          }: {
            contentType: string;
            locale: string;
            preview?: boolean;
            site: string;
            page: number;
          },
          ctx: ApolloContext
        ) => {
          ctx.preview = !!preview;

          const maxPageSize = config.sitemap.maxPageSize;

          const buildSitemapPath = (path: string) =>
            `${locale === ctx.defaultLocale ? '' : `${locale}/`}${path.replace(/^\//, '')}`;

          let ids: string[] = [];

          switch (config.cms) {
            case 'Sanity': {
              const items = await ctx.sanity![preview ? 'preview' : 'prod'].fetch(
                `*[_type == $contentType] | order(_updatedAt desc)[$skip...$limit] {
            _id
          }`,
                {
                  contentType,
                  skip: (page - 1) * maxPageSize,
                  limit: maxPageSize
                }
              );
              ids = items.map((item: any) => item._id);
              break;
            }
            case 'Contentful': {
              const { items } = await ctx.contentful![preview ? 'preview' : 'prod'].getEntries({
                content_type: contentType,
                select: `sys.id`,
                limit: maxPageSize,
                skip: (page - 1) * maxPageSize,
                order: 'sys.updatedAt'
              });
              ids = items.map((item: any) => item.sys.id);
              break;
            }
          }

          const entries = (await ctx.loaders.entryLoader.loadMany(ids.map((id: string) => ({ id, preview })))).filter(
            (e: any) => !!e && !isError(e)
          ) as BaseEntry[];

          const sitemapEntries = (
            await Promise.all(
              entries.map(async (entry) => {
                // Filter out entries with seo.robots starting with 'noindex'
                const seo = getLocalizedField(entry.fields, 'seo', ctx);
                if (seo?.['robots']?.value?.startsWith('noindex')) {
                  return [];
                }

                const pathNode = await pathNodeResolver(entry.sys.id, ctx);

                if (pathNode?.data?.excludedLocales?.includes(locale)) {
                  return [];
                }

                const paths = await ctx.loadPathsForContent(entry, ctx, site);

                return paths.map((p: any) => ({
                  loc: buildSitemapPath(p.path),
                  lastmod: entry.sys.updatedAt
                }));
              })
            )
          ).flat();

          return {
            entries: sitemapEntries
          };
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
        parseValue(value) {
          return new Date(value as string); // value from the client
        },
        serialize(value) {
          return (value as Date).toString(); // value sent to the client
        },
        parseLiteral(ast: any) {
          return new Date(ast.value); // ast value is always in string format
        }
      })
    }
  );

export default createResolvers;
