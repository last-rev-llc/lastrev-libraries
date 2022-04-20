import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext, createLoaders } from '@last-rev/graphql-contentful-helpers';
import { Asset, ContentType, Entry } from 'contentful';
import { assetHasUrl, createContentfulClients } from './helpers';
import logger from 'loglevel';

const logPrefix = '[contentful-webhook-handler]';

const isError = (x: any): x is Error => x instanceof Error;
// using coersion on purpose here (== instead of ===)
const isNil = (x: any): x is null | undefined => x == null;

const isContentfulError = (item: any) => {
  return item?.sys?.type === 'Error';
};

const isContentfulObject = (item: any): item is Entry<any> | Asset | ContentType => {
  return item?.sys?.type === 'Entry' || item?.sys?.type === 'Asset' || item?.sys?.type === 'ContentType';
};

const enhanceContentfulObjectWithMetadata = (item: any) => {
  return {
    ...item,
    lastrev_metadata: {
      insert_date: new Date().toISOString(),
      source: 'contentfulWebhook'
    }
  };
};

const stringify = (r: any, errorKey: string) => {
  if (isNil(r)) {
    logger.error(`${logPrefix} Error stringifying ${errorKey}: nil`);
    return undefined;
  }

  if (isError(r)) {
    logger.error(`${logPrefix} Error stringifying ${errorKey}: ${r.message}`);
    return undefined;
  }

  if (isContentfulError(r)) {
    logger.error(`${logPrefix} Error stringifying ${errorKey}: ${r.sys.id}`);
    return undefined;
  }

  if (!isContentfulObject(r)) {
    logger.error(`${logPrefix} Error stringifying ${errorKey}: Not contentful Object: ${r}`);
    return undefined;
  }

  try {
    return JSON.stringify(enhanceContentfulObjectWithMetadata(r));
  } catch (err: any) {
    logger.error(`${logPrefix} Error stringifying ${errorKey}: ${err.message}`);
    return undefined;
  }
};

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
        const val = stringify(data, key);
        if (val) {
          await redis.set(key, val);
        }
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
          const val = stringify(data, key);
          if (val) {
            await redis.set(key, val);
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
          await redis.hset(key, {
            [data.sys.id]: val
          });
        }
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
