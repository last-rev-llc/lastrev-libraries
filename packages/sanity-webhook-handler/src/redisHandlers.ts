import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { stringify } from './helpers';
import { createContext } from '@last-rev/graphql-contentful-helpers';
import { updateAllPaths } from '@last-rev/contentful-path-util';

const clients: Record<string, Redis> = {};

const getClient = (config: LastRevAppConfig) => {
  const key = JSON.stringify([config.redis, config.sanity.projectId, config.sanity.dataset]);
  if (!clients[key]) {
    clients[key] = new Redis({
      ...config.redis,
      keyPrefix: `${config.sanity.projectId}:${config.sanity.dataset}:`
    });
  }
  return clients[key];
};

export const createRedisHandlers = (config: LastRevAppConfig): Handlers => {
  const redis = getClient(config);
  const { ttlSeconds } = config.redis;

  return {
    entry: async (command) => {
      const { data } = command;
      const key = `production:entries:${data._id}`;
      if (command.action === 'update') {
        const val = stringify(data);
        if (val) await redis.set(key, val, 'EX', ttlSeconds);
      } else if (command.action === 'delete') {
        await redis.del(key);
      }
    },
    asset: async () => {},
    contentType: async () => {},
    paths: async (updateForPreview, updateForProd) => {
      const context = await createContext({ config });
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};
