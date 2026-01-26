import createFsLoaders from '@last-rev/cms-fs-loader';
import createContentfulCmsLoaders from '@last-rev/contentful-cms-loader';
import createRedisLoaders from '@last-rev/cms-redis-loader';
import createDynamoDbLoaders from '@last-rev/cms-dynamodb-loader';
import createSanityLoaders from '@last-rev/sanity-cms-loader';

import { ContentfulLoaders, SanityLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

export type LoadersResult = {
  loaders: ContentfulLoaders | SanityLoaders;
  sanityLoaders?: SanityLoaders;
  contentfulLoaders?: ContentfulLoaders;
};

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): LoadersResult => {
  const isSanity = config.cms === 'Sanity';

  let baseLoaders: ContentfulLoaders | SanityLoaders;

  if (isSanity) {
    baseLoaders = createSanityLoaders(config, defaultLocale);
  } else {
    baseLoaders = createContentfulCmsLoaders(config, defaultLocale);
  }

  let loaders = baseLoaders;

  // Cache strategies currently only support Contentful loaders
  // TODO: Add Sanity support for fs/redis/dynamodb strategies
  if (!isSanity) {
    if (config.contentStrategy === 'fs') {
      loaders = createFsLoaders(config, baseLoaders as ContentfulLoaders);
    } else {
      if (config.cmsCacheStrategy === 'redis') {
        loaders = createRedisLoaders(config, baseLoaders as ContentfulLoaders);
      } else if (config.cmsCacheStrategy === 'dynamodb') {
        loaders = createDynamoDbLoaders(config, baseLoaders as ContentfulLoaders);
      } else if (config.cmsCacheStrategy === 'none') {
        loaders = baseLoaders;
      }
    }
  }

  if (!loaders) {
    throw new Error('No loaders found');
  }

  return {
    loaders,
    sanityLoaders: isSanity ? (loaders as SanityLoaders) : undefined,
    contentfulLoaders: isSanity ? undefined : (loaders as ContentfulLoaders)
  };
};

export default createLoaders;
