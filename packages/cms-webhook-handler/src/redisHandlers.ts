import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { updateAllPaths } from '@last-rev/cms-path-util';
import { createContext } from '@last-rev/graphql-cms-helpers';
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
      const multi = redis.multi();

      const deleteObj = (data.items || []).reduce((acc, item) => {
        acc[item.sys.id] = stringify(item, item.sys.id) || '';
        return acc;
      }, {} as Record<string, string>);

      await multi.del(key).hset(key, deleteObj).expire(key, ttlSeconds).exec();
    },
    paths: async (updateForPreview, updateForProd) => {
      const context = await createContext({ config });
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};
