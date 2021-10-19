import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { createClient } from 'contentful';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext, createLoaders } from '@last-rev/graphql-contentful-helpers';
import { Entry } from 'contentful';
import { each } from 'lodash';

export const createRedisHandlers = (config: LastRevAppConfig): Handlers => {
  const redis = new Redis({
    ...config.redis,
    keyPrefix: `${config.contentful.spaceId}:${config.contentful.env}:`
  });

  const contentfulPreviewClient = createClient({
    space: config.contentful.spaceId,
    accessToken: config.contentful.contentPreviewToken,
    environment: config.contentful.env,
    host: 'preview.contentful.com'
  });

  const contentfulProdClient = createClient({
    space: config.contentful.spaceId,
    accessToken: config.contentful.contentDeliveryToken,
    environment: config.contentful.env,
    host: 'cdn.contentful.com'
  });

  const assetHasUrl = (asset: any): boolean => {
    const file = asset.fields.file;

    try {
      // loop through locales. They should all have url
      each(file, (val) => {
        if (!val.url) {
          throw Error();
        }
      });
    } catch (err) {
      return false;
    }

    return true;
  };

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

    console.log('deleting', setKey);
    console.log('adding', entryIds);

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

export const createHandlers = (config: LastRevAppConfig): Handlers => {
  switch (config.strategy) {
    case 'redis':
      return createRedisHandlers(config);
    default:
      throw new Error(`Unknown or unsuported strategy ${config.strategy}`);
  }
};
