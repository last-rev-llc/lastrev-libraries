import { find, get, map } from 'lodash';
import { createClient } from 'contentful';
import { createClient as createSanityClient } from '@sanity/client';
import { ApolloContext, ContentfulLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import createLoaders from './createLoaders';
import createPathReaders from './createPathReaders';

/**
 * Get entry ID based on CMS type
 */
const getEntryId = (entry: any, isSanity: boolean): string | undefined => {
  return isSanity ? entry?._id : entry?.sys?.id;
};

const getLocales = async (space: string, environment: string, accessToken: string) => {
  const client = createClient({
    space,
    environment,
    accessToken,
    host: 'cdn.contentful.com'
  }).withoutLinkResolution.withAllLocales;
  const locales = await client.getLocales();
  return locales.items;
};

export type ExtraContextData = {
  environment?: string;
};

export type ExtractFromArgs<T extends any[]> = (...args: T) => ExtraContextData;

export type CreateContextFuncProps<T extends any[]> = {
  config: LastRevAppConfig;
  extractFromArgs: ExtractFromArgs<T>;
};

export type CreateContextProps = {
  config: LastRevAppConfig;
};

const createContext = async ({ config }: CreateContextProps): Promise<ApolloContext> => {
  const pathReaders = createPathReaders(config);

  let locales: string[] = [];
  let defaultLocale: string = 'en-US';
  let clients: { prod: any; preview: any };
  const isSanity = config.cms === 'Sanity';

  if (isSanity) {
    const sanityCfg = (config as any).sanity || {};
    const prodClient = createSanityClient({
      projectId: sanityCfg.projectId,
      dataset: sanityCfg.dataset,
      apiVersion: sanityCfg.apiVersion || '2021-03-25',
      token: sanityCfg.token,
      useCdn: true
    });
    const previewClient = createSanityClient({
      projectId: sanityCfg.projectId,
      dataset: sanityCfg.dataset,
      apiVersion: sanityCfg.apiVersion || '2021-03-25',
      token: sanityCfg.token,
      useCdn: false,
      perspective: 'drafts'
    });

    locales = config.sanity.supportedLanguages.map((l: any) => l.id);
    defaultLocale = locales[0] || 'en-US';
    clients = { prod: prodClient, preview: previewClient };
  } else {
    const cLocales = await getLocales(
      config.contentful.spaceId,
      config.contentful.env,
      config.contentful.contentDeliveryToken
    );

    locales = map(cLocales, 'code');
    defaultLocale = get(
      find(cLocales, (locale) => locale.default),
      'code',
      'en-US'
    );

    clients = {
      prod: createClient({
        accessToken: config.contentful.contentDeliveryToken,
        space: config.contentful.spaceId,
        environment: config.contentful.env,
        host: 'cdn.contentful.com'
      }).withoutLinkResolution.withAllLocales,
      preview: createClient({
        accessToken: config.contentful.contentPreviewToken,
        space: config.contentful.spaceId,
        environment: config.contentful.env,
        host: 'preview.contentful.com'
      }).withoutLinkResolution.withAllLocales
    };
  }

  // Create loaders after determining default locale
  const { loaders, sanityLoaders, contentfulLoaders } = createLoaders(config, defaultLocale);

  return {
    cms: config.cms,
    contentful: isSanity ? undefined : clients,
    sanity: isSanity ? clients : undefined,

    // Legacy loaders field (for backward compat)
    loaders: loaders as ContentfulLoaders,

    // CMS-specific loaders
    sanityLoaders,
    contentfulLoaders,

    // Sanity config for utilities (i18n strategy, etc.)
    sanityConfig: isSanity
      ? {
          useInternationalizedArrays: config.sanity.useInternationalizedArrays,
          fallbackToDefaultLocale: config.sanity.fallbackToDefaultLocale
        }
      : undefined,

    loadEntriesForPath: async (path: any, ctx: any, site: any) => {
      if (pathReaders) {
        const node = await pathReaders[ctx.preview ? 'preview' : 'prod'].getNodeByPath(path, site);
        if (!node) return [];
        return node.getPathEntries(ctx);
      }
      return [];
    },
    loadPathsForContent: async (entry: any, ctx: any, site: any) => {
      // Use CMS-agnostic ID access
      const entryId = getEntryId(entry, isSanity);
      if (pathReaders && entryId) {
        return pathReaders[ctx.preview ? 'preview' : 'prod'].getPathInfosByContentId(entryId, ctx, site);
      }
      return [];
    },
    locales,
    mappers: config.extensions.mappers,
    defaultLocale,
    pathReaders,
    typeMappings: config.extensions.typeMappings
  };
};

export default createContext;
