import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext, createLoaders } from '@last-rev/graphql-contentful-helpers';
import { Entry } from 'contentful';
import { assetHasUrl, createContentfulClients } from './helpers';

export const createRedisHandlers = (config: LastRevAppConfig): Handlers => {
  const redis = new Redis({
    ...config.redis,
    keyPrefix: `${config.contentful.spaceId}:${config.contentful.env}:`
  });

  const { contentfulPreviewClient, contentfulProdClient } = createContentfulClients(config);

  const refreshEntriesByContentType = async (contentTypeId: string, isPreview: boolean) => {
    const client = isPreview ? contentfulPreviewClient : contentfulProdClient;
    const setKey = `${isPreview ? 'preview' : 'production'}:entry_ids_by_content_type:${contentTypeId}`;

    const makeRequest = async (skip: number = 0, existing: Entry<any>[] = []): Promise<Entry<any>[]> => {
      const results = await client.getEntries({
        content_type: contentTypeId,
        skip,
        limit: 1000,
        select: 'sys.id'
      });

      const { items = [], total } = results;

      existing.push(...items);
      if (existing.length === total) {
        return existing;
      }
      return makeRequest(skip + 1000, existing);
    };

    const entries = await makeRequest();
    const entryIds = entries.map((entry) => entry.sys.id);

    await redis
      .multi()
      .del(setKey)
      .sadd(setKey, ...entryIds)
      .exec();
  };

  return {
    entry: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:entries:${data.sys.id}`;
      if (command.action === 'update') {
        await redis.set(key, JSON.stringify(data));
      } else if (command.action === 'delete') {
        await redis.del(key);
      }
      await refreshEntriesByContentType(data.sys.contentType.sys.id, isPreview);
    },
    asset: async (command) => {
      const { data, isPreview } = command;
      const key = `${isPreview ? 'preview' : 'production'}:assets:${data.sys.id}`;
      if (command.action === 'update') {
        if (assetHasUrl(data)) {
          await redis.set(key, JSON.stringify(data));
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
        await redis.hset(key, {
          [data.sys.id]: JSON.stringify(data)
        });
      } else if (command.action === 'delete') {
        await redis.hdel(key, data.sys.id);
      }
    },
    paths: async (updateForPreview, updateForProd) => {
      const loaders = createLoaders(config);
      const context = await createContext(config, loaders);
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};
