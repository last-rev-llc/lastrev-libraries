import createFsLoaders from '@last-rev/cms-fs-loader';
import createContentfulCmsLoaders from '@last-rev/contentful-cms-loader';
import createRedisLoaders from '@last-rev/cms-redis-loader';
import createDynamoDbLoaders from '@last-rev/cms-dynamodb-loader';
import createSanityLoaders from '@last-rev/sanity-cms-loader';

import { ContentfulLoaders, SanityLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { createUnavailableLoaderProxy } from './loaderProxy';

export type LoadersResult = {
  loaders: ContentfulLoaders;
  sanityLoaders: SanityLoaders;
  contentfulLoaders: ContentfulLoaders;
};

/**
 * Apply cache strategy to Sanity loaders
 * Note: DynamoDB cache is not yet supported for Sanity
 */
const applySanityCacheStrategy = (config: LastRevAppConfig, baseLoaders: SanityLoaders): SanityLoaders => {
  if (config.contentStrategy === 'fs') {
    return createFsLoaders(config, baseLoaders);
  }
  if (config.cmsCacheStrategy === 'redis') {
    return createRedisLoaders(config, baseLoaders);
  }
  // DynamoDB not yet supported for Sanity - use base loaders
  return baseLoaders;
};

/**
 * Apply cache strategy to Contentful loaders
 */
const applyContentfulCacheStrategy = (config: LastRevAppConfig, baseLoaders: ContentfulLoaders): ContentfulLoaders => {
  if (config.contentStrategy === 'fs') {
    return createFsLoaders(config, baseLoaders);
  }
  if (config.cmsCacheStrategy === 'redis') {
    return createRedisLoaders(config, baseLoaders);
  }
  if (config.cmsCacheStrategy === 'dynamodb') {
    return createDynamoDbLoaders(config, baseLoaders);
  }
  return baseLoaders;
};

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): LoadersResult => {
  const isSanity = config.cms === 'Sanity';

  // Create proxies that throw helpful errors for inactive CMS loaders
  const contentfulProxy = createUnavailableLoaderProxy<ContentfulLoaders>('Contentful');
  const sanityProxy = createUnavailableLoaderProxy<SanityLoaders>('Sanity');

  if (isSanity) {
    const baseLoaders = createSanityLoaders(config, defaultLocale);
    const loaders = applySanityCacheStrategy(config, baseLoaders);

    return {
      loaders: contentfulProxy,
      sanityLoaders: loaders,
      contentfulLoaders: contentfulProxy
    };
  }

  const baseLoaders = createContentfulCmsLoaders(config, defaultLocale);
  const loaders = applyContentfulCacheStrategy(config, baseLoaders);

  return {
    loaders,
    sanityLoaders: sanityProxy,
    contentfulLoaders: loaders
  };
};

export default createLoaders;
