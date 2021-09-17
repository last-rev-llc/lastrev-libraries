import createFsLoaders from '@last-rev/contentful-fs-loader';
import createCmsLoaders from '@last-rev/contentful-cms-loader';
import createRedisLoaders from '@last-rev/contentful-redis-loader';

import { ContentfulLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const createLoaders = (config: LastRevAppConfig): ContentfulLoaders => {
  let loaders;

  if (config.strategy === 'fs') {
    loaders = createFsLoaders(config);
  } else {
    const cmsLoaders = createCmsLoaders(config);
    loaders = createRedisLoaders(config, cmsLoaders);
  }

  if (!loaders) {
    throw new Error('No loaders found');
  }

  return loaders;
};
export default createLoaders;
