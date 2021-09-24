import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext, createLoaders } from '@last-rev/graphql-contentful-helpers';

export const createRedisHandlers = (config: LastRevAppConfig): Handlers => {
  const client = new Redis({
    ...config.redis,
    keyPrefix: `${config.contentful.spaceId}:${config.contentful.env}:`
  });

  return {
    entry: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:entries:${data.sys.id}`;
      const setKey = `${isPreview ? 'preview' : 'production'}:entry_ids_by_content_type:${data.sys.contentType.sys.id}`;
      if (command.action === 'update') {
        await client.set(key, JSON.stringify(data));
        await client.sadd(setKey, data.sys.id);
      } else if (command.action === 'delete') {
        await client.del(key);
        await client.srem(setKey);
      }
    },
    asset: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:assets:${data.sys.id}`;
      if (command.action === 'update') {
        await client.set(key, JSON.stringify(data));
      } else if (command.action === 'delete') {
        await client.del(key);
      }
    },
    contentType: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:content_types`;
      if (command.action === 'update') {
        await client.hset(key, {
          [data.sys.id]: JSON.stringify(data)
        });
      } else if (command.action === 'delete') {
        await client.hdel(key, data.sys.id);
      }
    },
    paths: async (updateForPreview, updateForProd) => {
      const loaders = createLoaders(config);
      const context = await createContext(config, loaders);
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};

export const createHandlers = (config: LastRevAppConfig): Handlers => {
  switch (config.strategy) {
    case 'redis':
      return createRedisHandlers(config);
    default:
      throw new Error(`Unknown or unsuported strategy ${config.strategy}`);
  }
};
