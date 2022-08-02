import createFsLoaders from '@last-rev/contentful-fs-loader';
import createCmsLoaders from '@last-rev/contentful-cms-loader';
import createRedisLoaders from '@last-rev/contentful-redis-loader';
import createDynamoDbLoaders from '@last-rev/contentful-dynamodb-loader';

import { ContentfulLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): ContentfulLoaders => {
  let loaders;

  const cmsLoaders = createCmsLoaders(config, defaultLocale);
  if (config.strategy === 'fs') {
    loaders = createFsLoaders(config, cmsLoaders);
  } else {
    if (config.strategy === 'redis') {
      loaders = createRedisLoaders(config, cmsLoaders);
    } else if (config.strategy === 'dynamodb') {
      loaders = createDynamoDbLoaders(config, cmsLoaders);
    }
  }

  if (!loaders) {
    throw new Error('No loaders found');
  }

  return loaders;
};
export default createLoaders;
