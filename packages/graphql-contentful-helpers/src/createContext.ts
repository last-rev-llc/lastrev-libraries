import { find, get, map } from 'lodash';
import { createClient } from 'contentful';
import { ApolloContext, PathReaders, PathRuleConfig } from '@last-rev/types';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import LastRevAppConfig from '@last-rev/app-config';
import querystring from 'querystring';
import url from 'url';
import createLoaders from './createLoaders';
import express from 'express';
import { PathToContentLoader, ContentToPathsLoader } from '@last-rev/contentful-path-rules-engine';

const isString = (value: any): value is string => typeof value === 'string' || value instanceof String;

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

type CreateContextProps = {
  config: LastRevAppConfig;
  expressReq?: express.Request;
  microReq?: MicroRequest;
  pathReaders?: PathReaders;
};

const createContext = async ({
  config,
  expressReq,
  microReq,
  pathReaders
}: CreateContextProps): Promise<ApolloContext> => {
  let overrideEnv: string | undefined;

  if (expressReq) {
    const env = expressReq.query.environment;
    overrideEnv = env && isString(env) ? env : undefined;
  }

  if (microReq) {
    const env = querystring.parse(new url.URL(microReq.url || '').search).environment;
    overrideEnv = env && isString(env) ? env : undefined;
  }

  if (overrideEnv) {
    config = new LastRevAppConfig({
      ...config,
      contentful: {
        ...config.contentful,
        env: overrideEnv
      }
    });
  }

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

  const isNewPathsConfig = (pathsConfig: any): pathsConfig is PathRuleConfig =>
    Object.values(pathsConfig || {}).some((x: any) => !!x.rules);

  const pathToContentLoader = isNewPathsConfig(config.extensions?.pathsConfigs)
    ? new PathToContentLoader(config.extensions.pathsConfigs)
    : null;

  const contentToPathsLoader = isNewPathsConfig(config.extensions?.pathsConfigs)
    ? new ContentToPathsLoader(config.extensions.pathsConfigs)
    : null;

  return {
    contentful,
    loadEntriesForPath: async (path, ctx, site) => {
      if (pathToContentLoader) {
        return pathToContentLoader.getItemsForPath(path, ctx, site);
      }
      return null;
    },
    loadPathsForContent: async (entry, ctx, site) => {
      if (contentToPathsLoader) {
        return contentToPathsLoader.loadPathsFromContent(entry, ctx, site);
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
