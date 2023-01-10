import DataLoader, { Options } from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import Redis from 'ioredis';
import { ItemKey, ContentfulLoaders, FVLKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { getKey, isError, isNil, parse, stringify } from './helpers';
import { primeRedisEntriesByContentType, primeRedisEntriesOrAssets } from './primers';

const logger = getWinstonLogger({ package: 'contentful-redis-loader', module: 'index', strategy: 'Redis' });

const clients: Record<string, Redis> = {};

const getOptions = (maxBatchSize: number): Options<ItemKey, any, string> => ({
  maxBatchSize,
  cacheKeyFn: (key: ItemKey) => {
    return key.preview ? `${key.id}-preview` : `${key.id}-prod`;
  }
});

const flvOptions: Options<FVLKey, any, string> = {
  cacheKeyFn: (key: FVLKey) => {
    const baseKey = `${key.contentType}-${key.field}-${key.value}`;
    return key.preview ? `${baseKey}-preview` : `${baseKey}-prod`;
  }
};

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

const createLoaders = (config: LastRevAppConfig, fallbackLoaders: ContentfulLoaders): ContentfulLoaders => {
  const client = getClient(config);

  const maxBatchSize = config.redis.maxBatchSize || 1000;
  const ttlSeconds = config.redis.ttlSeconds;

  const fetchAndSet = async <T>(
    keys: readonly ItemKey[],
    fallbackLoader: DataLoader<ItemKey, T>,
    dirname: string
  ): Promise<(T | null)[]> => {
    let timer = new Timer();
    const redisKeys = keys.map((key) => getKey(key, dirname));

    let unparsed: (string | null)[] = [];

    try {
      unparsed = await client.mget(...redisKeys);
    } catch (err: any) {
      logger.error(`mget() ${err.message}`, {
        caller: 'fetchAndSet',
        stack: err.stack
      });
      unparsed = redisKeys.map(() => null);
    }

    const results = unparsed.map(parse);

    logger.debug(`Fetched ${dirname}`, {
      caller: 'fetchAndSet',
      elapsedMs: timer.end().millis,
      itemsSuccessful: results.length,
      itemsAttempted: redisKeys.length
    });

    const cacheMissIds: ItemKey[] = [];

    results.forEach((result, index) => {
      if (isNil(result)) {
        cacheMissIds.push(keys[index]);
      }
    });

    if (cacheMissIds.length) {
      const sourceResults = await fallbackLoader.loadMany(cacheMissIds);

      primeRedisEntriesOrAssets<T>(client, cacheMissIds, dirname, sourceResults, maxBatchSize, ttlSeconds);

      keys.forEach((key, index) => {
        if (isNil(results[index])) {
          const cacheMissIndex = cacheMissIds.indexOf(key);
          if (cacheMissIndex !== -1) {
            results[index] = sourceResults[cacheMissIndex];
          }
        }
      });
    }

    return results as (T | null)[];
  };

  const getBatchItemFetcher =
    <T extends Entry<any> | Asset>(dirname: 'entries' | 'assets'): DataLoader.BatchLoadFn<ItemKey, T | null> =>
    async (keys) =>
      fetchAndSet<T>(
        keys,
        fallbackLoaders[dirname === 'entries' ? 'entryLoader' : 'assetLoader'] as DataLoader<ItemKey, T>,
        dirname
      );

  const getBatchEntriesByContentTypeFetcher =
    ({ entryLoader }: { entryLoader: DataLoader<ItemKey, any> }): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> =>
    async (keys) => {
      // keys are content types [{ id: 'contentTypeId', preview: true}]
      if (!keys.length) return [];
      logger.debug(`attempting to load ${keys.length} content types`, {
        caller: 'getBatchEntriesByContentTypeFetcher'
      });
      let timer = new Timer();

      // Map of contentTypeId -> entries to be used as return
      const out: { [contentType: string]: Entry<any>[] } = {};
      // Content type ids for which we don't have Redis data
      const cacheMissContentTypeIds: ItemKey[] = [];
      // Entry ids from Redis that are ready to load
      const entryIdsToRequest: ItemKey[] = [];

      const redisKeys = keys.map(
        (key) => `${key.preview ? 'preview' : 'production'}:entry_ids_by_content_type:${key.id}`
      );

      const multi = client.multi();

      // Get me all the ids inside Redis for every contentType in redisKeys
      redisKeys.forEach((k) => multi.smembers(k));

      let multiResults: [Error | null, unknown][] | null;

      try {
        // Array of arrays of ids for each contentType
        multiResults = (await multi.exec()) || [];
      } catch (err: any) {
        logger.error(`multi.exec() ${err.message}`, {
          caller: 'getBatchEntriesByContentTypeFetcher',
          stack: err.stack
        });
        return [];
      }

      timer.end();

      // Fill entryIdsToRequest with Redis data
      let successfulContentTypeCount = 0;
      multiResults.forEach(([err, arrayOfIds], index) => {
        if (err || !arrayOfIds || !(arrayOfIds as any[]).length) {
          // We don't have any ids for this contentType in Redis or there was an error
          // Save for fallback
          cacheMissContentTypeIds.push(keys[index]);
        } else {
          successfulContentTypeCount++;
          // Aggregate all the entry ids of each content type
          entryIdsToRequest.push(
            ...(arrayOfIds as any[]).filter((x) => !!x).map((id) => ({ id, preview: keys[index].preview }))
          );
        }
      });

      logger.debug(`Fetched entry IDs by contentType`, {
        caller: 'getBatchEntriesByContentTypeFetcher',
        elapsedMs: timer.millis,
        itemsAttempted: keys.length,
        itemsSuccessful: successfulContentTypeCount
      });

      // for every entry id that was found in Redis
      // Use loader to get the entries
      if (entryIdsToRequest.length) {
        const entryResults = await entryLoader.loadMany(entryIdsToRequest);

        entryResults.forEach((entry) => {
          if (isNil(entry) || isError(entry)) return;
          const contentType = entry.sys.contentType.sys.id;
          out[contentType] = out[contentType] || [];
          out[contentType].push(entry);
        });
      }

      // Use the fallback loader for every missing content types in Redis
      // Leverage getting the full entries + id to prime Redis
      if (cacheMissContentTypeIds.length) {
        const sourceResults = await fallbackLoaders.entriesByContentTypeLoader.loadMany(cacheMissContentTypeIds);

        // Clean all errors and nulls
        const filtered = sourceResults.filter((result) => !isError(result) && !isNil(result));

        primeRedisEntriesByContentType(client, filtered, cacheMissContentTypeIds, maxBatchSize, ttlSeconds);

        // Add all the fallback results in the out map
        (filtered as Entry<any>[][]).forEach((entryArray, idx) => {
          const { id: contentType } = cacheMissContentTypeIds[idx];
          out[contentType] = entryArray;
        });
      }

      // build return array from out map
      const outArray = keys.map(({ id: contentType }) => out[contentType] || []);
      return outArray;
    };

  const getBatchEntriesByFieldValueFetcher = (): DataLoader.BatchLoadFn<FVLKey, Entry<any> | null> => {
    return async (keys) => fallbackLoaders.entryByFieldValueLoader.loadMany(keys);
  };

  const options = getOptions(maxBatchSize);

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher({ entryLoader }), options);
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      let timer = new Timer();

      const key = `${preview ? 'preview' : 'production'}:content_types`;
      const results: (ContentType | null)[] = Object.values(await client.hgetall(key)).map(parse);

      logger.debug('Fetched all content types', {
        caller: 'fetchAllContentTypes',
        elapsedMs: timer.end().millis,
        itemsSuccessful: results.length
      });

      if (!results.length || results.some(isNil)) {
        timer = new Timer();
        const contentTypes = await fallbackLoaders.fetchAllContentTypes(preview);
        const contentTypeIds = contentTypes.map((v) => v?.sys?.id);
        if (contentTypeIds.length) {
          const zipped: Record<string, string> = {};

          for (let i = 0; i < contentTypeIds.length; i++) {
            const val = stringify(contentTypes[i], contentTypeIds[i]);
            if (val) {
              zipped[contentTypeIds[i]] = val;
            }
          }

          // don't block
          const hsetMulti = client.multi();
          hsetMulti
            .hset(key, zipped)
            .expire(key, ttlSeconds)
            .exec()
            .catch((e: any) => {
              logger.error(`Error calling hset: ${e.message}`, { caller: 'fetchAllContentTypes', stack: e.stack });
            })
            .finally(() =>
              logger.debug('Primed all content types', {
                caller: 'fetchAllContentTypes',
                itemsAttempted: contentTypeIds.length,
                elapsedMs: timer.end().millis
              })
            );
        }
        return contentTypes;
      }
      return results as ContentType[];
    } catch (err: any) {
      logger.error(`Unable to fetch content types: ${err.message}`, {
        caller: 'fetchAllContentTypes',
        stack: err.stack
      });
      return [];
    }
  };

  const entryByFieldValueLoader = new DataLoader(getBatchEntriesByFieldValueFetcher(), flvOptions);

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    entryByFieldValueLoader,
    fetchAllContentTypes,
    entriesRefByLoader: fallbackLoaders.entriesRefByLoader
  };
};

export default createLoaders;
