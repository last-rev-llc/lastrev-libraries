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
import generatePathToIdMapping from './utils/generatePathToIdMapping';
import { FsServerProps, S3ServerProps, ServerProps } from './types';

function isFsServer(props: ServerProps): props is FsServerProps {
  return props.loaderType === 'fs';
}

function isS3Server(props: ServerProps): props is S3ServerProps {
  return props.loaderType === 's3';
}

const getLocales = async (space: string, environment: string, accessToken: string, isPreview: boolean) => {
  const client = createClient({
    space,
    environment,
    accessToken,
    host: `${isPreview ? 'preview' : 'cdn'}.contentful.com`
  });
  const locales = await client.getLocales();
  return locales.items;
};

const prepare = async (props: ServerProps) => {
  const { environment, isPreview, cms, extensions, spaceId, accessToken } = props;
  let loaders;
  if (isS3Server(props)) {
    const { apiUrl, apiKey } = props;
    loaders = createS3Loaders(apiUrl, apiKey, environment, isPreview);
  } else if (isFsServer(props)) {
    const { contentDir } = props;
    loaders = createFsLoaders(
      resolve(process.cwd(), contentDir),
      spaceId,
      environment,
      isPreview ? 'preview' : 'production'
    );
  } else {
    loaders = createCmsLoaders(accessToken, spaceId, environment, isPreview);
  }

  if (!loaders) {
    throw new Error('No loaders found');
  }

  const baseTypeDefs = await generateSchema({
    source: cms,
    typeMappings: extensions?.typeMappings || {},
    contentTypes: await loaders.fetchAllContentTypes(),
    logLevel: props.logLevel
  });

  const [contentTypes, locales] = await Promise.all([
    loaders.fetchAllContentTypes(),
    getLocales(spaceId, environment, accessToken, isPreview)
  ]);

  const defaultLocale = get(
    find(locales, (locale) => locale.default),
    'code',
    'en-US'
  );

  const pathToIdMapping = await generatePathToIdMapping(
    extensions?.pathsConfigs || {},
    loaders,
    defaultLocale,
    map(locales, 'code'),
    extensions?.typeMappings
  );

  const defaultResolvers = createResolvers({
    contentTypes,
    mappers: extensions?.mappers,
    typeMappings: extensions?.typeMappings
  });

  const typeDefs = mergeTypeDefs([lastRevTypeDefs, baseTypeDefs, extensions?.typeDefs || ''], {
    // ignoreFieldConflicts: true
  });
  const resolvers = mergeResolvers([defaultResolvers, extensions?.resolvers || {}]);

  return {
    resolvers,
    typeDefs,
    loaders,
    defaultLocale,
    pathToIdMapping
  };
};

export default prepare;
