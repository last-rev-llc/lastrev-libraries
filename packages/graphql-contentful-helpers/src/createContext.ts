import { find, get, map } from 'lodash';
import { createClient } from 'contentful';
import { ApolloContext, PathReaders } from '@last-rev/types';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import LastRevAppConfig from '@last-rev/app-config';
import querystring from 'querystring';
import url from 'url';
import createLoaders from './createLoaders';

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

export type BasicRequest = { query: { string: string | string[] } };

const isBasicRequest = (value: any): value is BasicRequest => !!value?.query;

const createContext = async (
  config: LastRevAppConfig,
  req: BasicRequest | MicroRequest,
  pathReaders?: PathReaders
): Promise<ApolloContext> => {
  const query = isBasicRequest(req) ? req.query : querystring.parse(new url.URL(req.url || '').search);
  const overrideEnv = query.environment && isString(query.environment) ? query.environment : undefined;

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

  return {
    contentful,
    locales: map(locales, 'code'),
    loaders: createLoaders(config),
    mappers: config.extensions.mappers,
    defaultLocale,
    pathReaders,
    typeMappings: config.extensions.typeMappings
  };
};

export default createContext;
