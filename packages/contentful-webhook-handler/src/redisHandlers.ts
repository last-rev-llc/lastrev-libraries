import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext } from '@last-rev/graphql-contentful-helpers';
import { assetHasUrl, stringify } from './helpers';

const clients: Record<string, Redis> = {};

const getClient = (config: LastRevAppConfig) => {
  const key = JSON.stringify([config.redis, config.contentful.spaceId, config.contentful.env]);
  if (!clients[key]) {
    clients[key] = new Redis({
      ...config.redis,
      keyPrefix: `${config.contentful.spaceId}:${config.contentful.env}:`
    });
  }
  return clients[key];
};

export const createRedisHandlers = (config: LastRevAppConfig): Handlers => {
  const redis = getClient(config);
  const { ttlSeconds } = config.redis;

  const deleteEntriesByContentType = async (contentTypeId: string, isPreview: boolean) => {
    const setKey = `${isPreview ? 'preview' : 'production'}:entry_ids_by_content_type:${contentTypeId}`;

    await redis.del(setKey);
  };

  return {
    entry: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:entries:${data.sys.id}`;
      if (command.action === 'update') {
        const val = stringify(data, key);
        if (val) {
          await redis.set(key, val, 'EX', ttlSeconds);
        }
      } else if (command.action === 'delete') {
        await redis.del(key);
      }

      // simply deleting these as it removes an unnecessary call to contentful and makes the subsequent call more efficient
      await deleteEntriesByContentType(data.sys.contentType.sys.id, isPreview);
    },
    asset: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:assets:${data.sys.id}`;
      if (command.action === 'update') {
        if (assetHasUrl(data)) {
          const val = stringify(data, key);
          if (val) {
            await redis.set(key, val, 'EX', ttlSeconds);
          }
        } else {
          // Asset must be deleted because the content was not ready in contentful
          await redis.del(key);
        }
      } else if (command.action === 'delete') {
        await redis.del(key);
      }
    },
    contentType: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:content_types`;
      if (command.action === 'update') {
        const val = stringify(data, data.sys.id);
        if (val) {
          const multi = redis.multi();
          await multi
            .hset(key, {
              [data.sys.id]: val
            })
            .expire(key, ttlSeconds)
            .exec();
        }
      } else if (command.action === 'delete') {
        await redis.hdel(key, data.sys.id);
      }
    },
    paths: async (updateForPreview, updateForProd) => {
      const context = await createContext({ config });
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};
