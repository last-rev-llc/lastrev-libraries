import LastRevAppConfig from 'packages/app-config/dist';
import { join } from 'path';

export const getGetUriFunction =
  (config: LastRevAppConfig) =>
  (...args: string[]) => {
    if (config.cms === 'Sanity') {
      return join(config.fs.contentDir, config.sanity.projectId, config.sanity.dataset, ...args);
    }
    return join(config.fs.contentDir, config.contentful.spaceId, config.contentful.env, ...args);
  };
