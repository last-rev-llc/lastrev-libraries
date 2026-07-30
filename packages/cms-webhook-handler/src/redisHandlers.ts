import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import Redis from 'ioredis';
import { updateAllPaths } from '@last-rev/cms-path-util';
import { createContext } from '@last-rev/graphql-cms-helpers';
import { getWinstonLogger } from '@last-rev/logging';
import { assetHasUrl, stringify, stringifySanityDocument } from './helpers';

const logger = getWinstonLogger({
  package: 'cms-webhook-handler',
  module: 'redisHandlers'
});

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

  // Draft webhook bodies carry a `drafts.`-prefixed _id, but every reader looks
  // documents up by the bare id: the preview client queries with
  // `perspective: 'drafts'`, which returns the published _id.
  const toBaseId = (id: string) => (id.startsWith('drafts.') ? id.slice(7) : id);

  // A delete carries no document body, so the type is only recoverable from the copy
  // we are about to evict. Must run before any eviction.
  const readCachedTypeName = async (keys: string[]): Promise<string | undefined> => {
    for (const key of keys) {
      try {
        const cached = await redis.get(key);
        const parsed = cached ? JSON.parse(cached) : null;
        if (parsed?._type) return parsed._type;
      } catch (err: any) {
        logger.error(`Could not read cached document ${key}: ${err.message}`, {
          caller: 'readCachedTypeName',
          stack: err.stack
        });
      }
    }
    return undefined;
  };

  /**
   * Handle Sanity document webhook (unified document model)
   * Sanity data has _id and _type instead of sys.id and sys.contentType.sys.id
   */
  const handleDocument = async (command: any) => {
    const { data, isPreview, itemId } = command;

    // Sanity delete webhooks have no document body, so fall back to the id the
    // parser took from the `sanity-document-id` header.
    const rawId = data?._id || itemId;

    if (!rawId) {
      logger.error('Sanity webhook has no document id, nothing to invalidate', {
        caller: 'handleDocument',
        action: command.action,
        isPreview
      });
      return;
    }

    const baseId = toBaseId(rawId);
    const previewKey = `preview:documents:${baseId}`;
    const productionKey = `production:documents:${baseId}`;

    const typeName =
      data?._type || (await readCachedTypeName(isPreview ? [previewKey, productionKey] : [productionKey, previewKey]));

    if (command.action === 'update') {
      if (isPreview) {
        // A Sanity draft is a full copy of the document, not a diff, so the body is
        // exactly what the drafts perspective would return. Priming here also means
        // preview does not depend on a later re-fetch of the draft succeeding.
        const val = stringifySanityDocument({ ...data, _id: baseId }, previewKey);
        if (val) {
          await redis.set(previewKey, val, 'EX', ttlSeconds);
        }
      } else {
        const val = stringifySanityDocument({ ...data, _id: baseId }, productionKey);
        if (val) {
          await redis.set(productionKey, val, 'EX', ttlSeconds);
        }
        // Publishing removes the draft, so the drafts perspective now resolves to
        // this document — the preview entry is stale.
        await redis.del(previewKey);
      }
    } else if (command.action === 'delete') {
      // A discarded draft must not leave preview pinned to discarded content.
      await redis.del(previewKey);
      if (!isPreview) {
        await redis.del(productionKey);
      }
    }

    if (!typeName) {
      // Nothing left to identify the type. The stale id survives in the set until it
      // is next rebuilt; readers already skip ids that resolve to nothing.
      logger.warn('Could not determine Sanity document type; document_ids_by_type left untouched', {
        caller: 'handleDocument',
        action: command.action,
        isPreview,
        baseId
      });
      return;
    }

    // Invalidate the document_ids_by_type set for this type
    await deleteDocumentIdsByType(typeName, isPreview);
    if (command.action === 'delete') {
      // A deleted document leaves both perspectives, so the other id list is stale too.
      await deleteDocumentIdsByType(typeName, !isPreview);
    }
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
