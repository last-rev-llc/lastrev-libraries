import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { updateAllPaths } from '@last-rev/cms-path-util';
import { createContext } from '@last-rev/graphql-cms-helpers';
import { assetHasUrl, stringify, stringifySanityDocument } from './helpers';

const clients: Record<string, Redis> = {};

const getClient = (config: LastRevAppConfig) => {
  const key =
    config.cms === 'Sanity'
      ? JSON.stringify([config.redis, config.sanity.projectId, config.sanity.dataset])
      : JSON.stringify([config.redis, config.contentful.spaceId, config.contentful.env]);
  if (!clients[key]) {
    clients[key] = new Redis({
      ...config.redis,
      keyPrefix: `${config.cms === 'Sanity' ? config.sanity.projectId : config.contentful.spaceId}:${
        config.cms === 'Sanity' ? config.sanity.dataset : config.contentful.env
      }:`
    });
  }
  return clients[key];
};

/**
 * Create Sanity-specific Redis handlers using unified documents key
 */
const createSanityRedisHandlers = (config: LastRevAppConfig): Handlers => {
  const redis = getClient(config);
  const { ttlSeconds } = config.redis;

  const deleteDocumentIdsByType = async (typeName: string, isPreview: boolean) => {
    const setKey = `${isPreview ? 'preview' : 'production'}:document_ids_by_type:${typeName}`;
    await redis.del(setKey);
  };

  /**
   * Handle Sanity document webhook (unified document model)
   * Sanity data has _id and _type instead of sys.id and sys.contentType.sys.id
   */
  const handleDocument = async (command: any) => {
    const { data, isPreview } = command;
    const docId = data._id;
    const typeName = data._type;
    const key = `${isPreview ? 'preview' : 'production'}:documents:${docId}`;

    if (command.action === 'update') {
      const val = stringifySanityDocument(data, key);
      if (val) {
        await redis.set(key, val, 'EX', ttlSeconds);
      }
    } else if (command.action === 'delete') {
      await redis.del(key);
    }

    // Invalidate the document_ids_by_type set for this type
    await deleteDocumentIdsByType(typeName, isPreview);
  };

  return {
    // For Sanity, entry and asset both route to the unified document handler
    entry: handleDocument,
    asset: handleDocument,
    // No-op for Sanity - schemas come from config, not stored in Redis
    contentType: async () => {},
    paths: async (updateForPreview, updateForProd) => {
      const context = await createContext({ config });
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};

/**
 * Create Contentful-specific Redis handlers using separate entries/assets keys
 */
const createContentfulRedisHandlers = (config: LastRevAppConfig): Handlers => {
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

/**
 * Create Redis handlers based on CMS type
 */
export const createRedisHandlers = (config: LastRevAppConfig): Handlers => {
  if (config.cms === 'Sanity') {
    return createSanityRedisHandlers(config);
  }
  return createContentfulRedisHandlers(config);
};
