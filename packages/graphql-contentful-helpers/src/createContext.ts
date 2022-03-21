import { find, get, map } from 'lodash';
import { createClient } from 'contentful';
import { ApolloContext, ContentfulLoaders, PathReaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

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

const createContext = async (
  config: LastRevAppConfig,
  loaders: ContentfulLoaders,
  pathReaders?: PathReaders
): Promise<ApolloContext> => {
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
    loaders,
    mappers: config.extensions.mappers,
    defaultLocale,
    pathReaders,
    typeMappings: config.extensions.typeMappings
  };
};

export default createContext;
