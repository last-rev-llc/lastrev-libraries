import { find, get, map } from 'lodash';
import { createClient } from 'contentful';
import { createClient as createSanityClient } from '@sanity/client';
import { ApolloContext } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import createLoaders from './createLoaders';
import createPathReaders from './createPathReaders';

import { PathToContentLoader, ContentToPathsLoader } from '@last-rev/cms-path-rules-engine';

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
  let loaders;
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

    locales = config.sanity.supportedLanguages.map((l) => l.id);
    defaultLocale = locales[0] || 'en-US';
    clients = { prod: prodClient, preview: previewClient };
    loaders = createLoaders(config, defaultLocale);
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
    loaders = createLoaders(config, defaultLocale);
  }

  const pathToContentLoader = config.features.enablePathsV2
    ? new PathToContentLoader(config.extensions.pathsConfigs)
    : null;

  const contentToPathsLoader = config.features.enablePathsV2
    ? new ContentToPathsLoader(config.extensions.pathsConfigs)
    : null;

  return {
    cms: config.cms,
    contentful: isSanity ? undefined : clients,
    sanity: isSanity ? clients : undefined,
    loadEntriesForPath: async (path: any, ctx: any, site: any) => {
      if (pathToContentLoader) {
        return pathToContentLoader.getItemsForPath(path, ctx, site);
      } else if (pathReaders) {
        const node = await pathReaders[ctx.preview ? 'preview' : 'prod'].getNodeByPath(path, site);
        if (!node) return [];
        return node.getPathEntries(ctx);
      }
      return [];
    },
    loadPathsForContent: async (entry: any, ctx: any, site: any) => {
      if (contentToPathsLoader) {
        return contentToPathsLoader.loadPathsFromContent(entry, ctx, site);
      } else if (pathReaders) {
        return pathReaders[ctx.preview ? 'preview' : 'prod'].getPathInfosByContentId(entry.sys.id, ctx, site);
      }
      return [];
    },
    locales,
    loaders,
    mappers: config.extensions.mappers,
    defaultLocale,
    pathReaders,
    typeMappings: config.extensions.typeMappings
  };
};

export default createContext;
