import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import generateSchema from '@last-rev/graphql-schema-gen';
import createFsLoaders from '@last-rev/contentful-fs-loader';
import createS3Loaders from '@last-rev/contentful-s3-loader';
import createCmsLoaders from '@last-rev/contentful-cms-loader';
import { find, get, map } from 'lodash';
import { resolve } from 'path';
import { createClient } from 'contentful';

import lastRevTypeDefs from './typeDefs';
import createResolvers from './resolvers/createResolvers';
import { ContentfulLoaders, FsServerProps, S3ServerProps, ServerProps } from './types';
import PathToIdLookup from './utils/PathToIdLookup';

function isFsServer(props: ServerProps): props is FsServerProps {
  return props.loaderType === 'fs';
}

function isS3Server(props: ServerProps): props is S3ServerProps {
  return props.loaderType === 's3';
}

const getLocales = async (space: string, environment: string, accessToken: string) => {
  const client = createClient({
    space,
    environment,
    accessToken,
    host: 'cdn.contentful.com'
  });
  const locales = await client.getLocales();
  return locales.items;
};

const fetchAllContentTypes = async (loaders: ContentfulLoaders) => {
  // may not have production content, if none there, use preview
  const contentTypes = await loaders.fetchAllContentTypes(false);
  if (!contentTypes || !contentTypes.length) {
    return loaders.fetchAllContentTypes(true);
  }
  return contentTypes;
};

const prepare = async (props: ServerProps) => {
  const { environment, cms, extensions, spaceId, contentDeliveryToken, contentPreviewToken } = props;
  let loaders;
  if (isS3Server(props)) {
    const { apiUrl, apiKey } = props;
    loaders = createS3Loaders(apiUrl, apiKey, environment);
  } else if (isFsServer(props)) {
    const { contentDir } = props;
    loaders = createFsLoaders(resolve(process.cwd(), contentDir), spaceId, environment);
  } else {
    loaders = createCmsLoaders(contentDeliveryToken, contentPreviewToken, spaceId, environment);
  }

  if (!loaders) {
    throw new Error('No loaders found');
  }

  const [contentTypes, locales] = await Promise.all([
    fetchAllContentTypes(loaders),
    getLocales(spaceId, environment, contentDeliveryToken)
  ]);

  const baseTypeDefs = await generateSchema({
    source: cms,
    typeMappings: extensions?.typeMappings || {},
    contentTypes,
    logLevel: props.logLevel
  });

  const defaultLocale = get(
    find(locales, (locale) => locale.default),
    'code',
    'en-US'
  );

  const defaultResolvers = createResolvers({
    contentTypes,
    mappers: extensions?.mappers,
    typeMappings: extensions?.typeMappings
  });

  const typeDefs = mergeTypeDefs([lastRevTypeDefs, baseTypeDefs, extensions?.typeDefs || '']);
  const resolvers = mergeResolvers([defaultResolvers, extensions?.resolvers || {}]);

  const pathToIdLookup = new PathToIdLookup(
    extensions?.pathsConfigs || {},
    loaders,
    defaultLocale,
    map(locales, 'code'),
    extensions?.typeMappings || {}
  );

  return {
    resolvers,
    typeDefs,
    loaders,
    defaultLocale,
    pathToIdLookup
  };
};

export default prepare;
