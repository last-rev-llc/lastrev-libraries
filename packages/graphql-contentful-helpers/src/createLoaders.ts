import createFsLoaders from '@last-rev/contentful-fs-loader';
import createContentfulCmsLoaders from '@last-rev/contentful-cms-loader';
import createRedisLoaders from '@last-rev/contentful-redis-loader';
import createDynamoDbLoaders from '@last-rev/contentful-dynamodb-loader';
import createSanityLoaders from '@last-rev/sanity-cms-loader';

import { CmsLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): CmsLoaders => {
  let loaders;

  let cmsLoaders: CmsLoaders;
  switch (config.cms) {
    case 'Sanity':
      cmsLoaders = createSanityLoaders(config, defaultLocale);
      break;
    case 'Contentful':
    default:
      cmsLoaders = createContentfulCmsLoaders(config, defaultLocale);
      break;
  }

  if (config.contentStrategy === 'fs') {
    loaders = createFsLoaders(config, cmsLoaders);
  } else {
    if (config.cmsCacheStrategy === 'redis') {
      loaders = createRedisLoaders(config, cmsLoaders);
    } else if (config.cmsCacheStrategy === 'dynamodb') {
      loaders = createDynamoDbLoaders(config, cmsLoaders);
    } else if (config.cmsCacheStrategy === 'none') {
      loaders = cmsLoaders;
    }
  }

  if (!loaders) {
    throw new Error('No loaders found');
  }

  return loaders;
};
export default createLoaders;
