import { find, get, map } from 'lodash';
import { createClient } from 'contentful';
import { ApolloContext } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import createLoaders from './createLoaders';
import createPathReaders from './createPathReaders';

import { PathToContentLoader, ContentToPathsLoader } from '@last-rev/contentful-path-rules-engine';

const getLocales = async (space: string, environment: string, accessToken: string) => {
  const client = createClient({
    space,
    environment,
    accessToken,
    host: 'cdn.contentful.com',
    resolveLinks: false
  });
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

  const locales = await getLocales(
    config.contentful.spaceId,
    config.contentful.env,
    config.contentful.contentDeliveryToken
  );

  const defaultLocale = get(
    find(locales, (locale) => locale.default),
    'code',
    'en-US'
  );

  const contentful = {
    prod: createClient({
      accessToken: config.contentful.contentDeliveryToken,
      space: config.contentful.spaceId,
      environment: config.contentful.env,
      host: 'cdn.contentful.com',
      resolveLinks: false
    }),
    preview: createClient({
      accessToken: config.contentful.contentPreviewToken,
      space: config.contentful.spaceId,
      environment: config.contentful.env,
      host: 'preview.contentful.com',
      resolveLinks: false
    })
  };

  const pathToContentLoader = config.features.enablePathsV2
    ? new PathToContentLoader(config.extensions.pathsConfigs)
    : null;

  const contentToPathsLoader = config.features.enablePathsV2
    ? new ContentToPathsLoader(config.extensions.pathsConfigs)
    : null;

  return {
    contentful,
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
    locales: map(locales, 'code'),
    loaders: createLoaders(config, defaultLocale),
    mappers: config.extensions.mappers,
    defaultLocale,
    pathReaders,
    typeMappings: config.extensions.typeMappings
  };
};

export default createContext;
