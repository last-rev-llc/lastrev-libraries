import DataLoader, { Options } from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import Redis from 'ioredis';
import { ItemKey, ContentfulLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const isString = (x: any): x is string => typeof x === 'string' || x instanceof String;
const isError = (x: any): x is Error => x instanceof Error;
// using coersion on purpose here (== instead of ===)
const isNil = (x: any): x is null | undefined => x == null;

const clients: Record<string, Redis> = {};
const logPrefix = '[contentful-redis-loader]';

const isContentfulError = (item: any) => {
  return item?.sys?.type === 'Error';
};

const options: Options<ItemKey, any, string> = {
  cacheKeyFn: (key: ItemKey) => {
    return key.preview ? `${key.id}-preview` : `${key.id}-prod`;
  }
};

const parse = (r: string | Error | null): any => {
  if (isString(r) && r.length) {
    try {
      return JSON.parse(r);
    } catch (err) {
      logger.error(`${logPrefix} unable to parse: ${r}`);
      return null;
    }
  }
  return null;
};

const enhanceContentfulObjectWithMetadata = (item: any) => {
  return {
    ...item,
    lastrev_metadata: {
      insert_date: new Date().toISOString(),
      source: 'RedisLoader'
    }
  };
};

const isContentfulObject = (item: any) => {
  return item?.sys?.type === 'Entry' || item?.sys?.type === 'Asset' || item?.sys?.type === 'ContentType';
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

  const getKey = (itemKey: ItemKey, dir: string) => {
    return [itemKey.preview ? 'preview' : 'production', dir, itemKey.id].join(':');
  };

  const fetchAndSet = async <T>(
    keys: readonly ItemKey[],
    fallbackLoader: DataLoader<ItemKey, T>,
    dirname: string
  ): Promise<(T | null)[]> => {
    let timer = new Timer(`Fetched ${keys.length} ${dirname} from redis`);
    const redisKeys = keys.map((key) => getKey(key, dirname));

    let unparsed: (string | null)[] = [];

    try {
      unparsed = await client.mget(...redisKeys);
    } catch (err: any) {
      logger.error(`${logPrefix} fetchAndSet(), mget()`, err.message || err, err.stack);
      return [];
    }

    const results = unparsed.map(parse);

    logger.trace(`${logPrefix} ${timer.end()}`);

    const cacheMissIds: ItemKey[] = [];

    results.forEach((result, index) => {
      if (isNil(result)) {
        cacheMissIds.push(keys[index]);
      }
    });

    if (cacheMissIds.length) {
      logger.debug(`${logPrefix} ${dirname} cache misses: ${cacheMissIds.length}. Fetching from fallback`);
      timer = new Timer(`set ${cacheMissIds.length} ${dirname} in redis`);
      const sourceResults = await fallbackLoader.loadMany(cacheMissIds);

      const toSet: Record<string, any> = {};

      for (let i = 0; i < cacheMissIds.length; i++) {
        const key = getKey(cacheMissIds[i], dirname);
        const value = stringify(sourceResults[i], key);
        if (key && value) {
          toSet[key] = value;
        }
      }

      // don't block
      client
        .mset(toSet)
        .then(() => logger.trace(`${logPrefix}  ${timer.end()}`))
        .catch((err) => logger.error(`${logPrefix} fetchAndSet(), mset()`, err.message || err));

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
      let timer = new Timer(`Fetched ${keys.length} entry IDs by contentType from redis`);

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
        logger.error(`${logPrefix} getBatchEntriesByContentTypeFetcher(), multi.exec()`, err.message || err);
        return [];
      }

      logger.trace(`${logPrefix} ${timer.end()}`);

      // Fill entryIdsToRequest with Redis data
      multiResults.forEach(([err, arrayOfIds], index) => {
        if (err || !arrayOfIds || !(arrayOfIds as any[]).length) {
          // We don't have any ids for this contentType in Redis or there was an error
          // Save for fallback
          cacheMissContentTypeIds.push(keys[index]);
        } else {
          // Aggregate all the entry ids of each content type
          entryIdsToRequest.push(
            ...(arrayOfIds as any[]).filter((x) => !!x).map((id) => ({ id, preview: keys[index].preview }))
          );
        }
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

        primeRedisEntriesByContentType(filtered, cacheMissContentTypeIds, getKey, client);

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

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher({ entryLoader }), options);
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      let timer = new Timer('Fetched all content types from redis');

      const key = `${preview ? 'preview' : 'production'}:content_types`;
      const results: (ContentType | null)[] = Object.values(await client.hgetall(key)).map(parse);

      logger.trace(`${logPrefix} ${timer.end()}`);

      if (!results.length || results.some(isNil)) {
        timer = new Timer('Set all content types in redis');
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
          client
            .hset(key, zipped)
            .catch((e: any) => {
              logger.error(`${logPrefix} error hsetting: ${e}`);
            })
            .then(() => logger.trace(`${logPrefix} ${timer.end()}`));
        }
        return contentTypes;
      }
      return results as ContentType[];
    } catch (err: any) {
      logger.error(`${logPrefix} Unable to fetch content types: ${err.message}`);
      return [];
    }
  };

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllContentTypes
  };
};

export default createLoaders;

async function primeRedisEntriesByContentType(
  filtered: (Entry<any>[] | Error)[],
  cacheMissContentTypeIds: ItemKey[],
  getKey: (itemKey: ItemKey, dir: string) => string,
  client: Redis
) {
  try {
    const timer = new Timer(`Set ${filtered.length} entries in redis`);
    const msetKeys: Record<string, string> = {};
    const saddKeys: Record<string, string[]> = {};

    (filtered as Entry<any>[][]).forEach((entries, index) => {
      // Entries can be any number of entries > 1000
      const { id: contentType, preview } = cacheMissContentTypeIds[index];
      const rootKey = getKey({ preview, id: contentType }, 'entry_ids_by_content_type');

      saddKeys[rootKey] = entries.map((v) => v.sys.id);

      entries.forEach((entry) => {
        const v = stringify(entry, entry.sys.id);
        if (v) {
          msetKeys[getKey({ preview, id: entry.sys.id }, 'entries')] = v;
        }
      });
    });

    // Needs manual chunking when sending to Redis to avoid limits
    // split SADD
    // Split every MSET into chunks that wont surpass the limit of payload size
    if (saddKeys.length) {
      // Wait to store entry ids by contenType
      const multiSadd = client.multi();
      Object.keys(saddKeys).forEach((k) => multiSadd.sadd(k, ...saddKeys[k]));
      try {
        await multiSadd.exec();
      } catch (e: any) {
        logger.error(
          `${logPrefix} getBatchEntriesByContentTypeFetcher(), multiSadd.exec(), setting missed cache data`,
          e.message || e,
          e.stack
        );
      }

      // don't block
      const multi = client.multi();
      // Store entryId -> entry
      // Danger ! Object size varies and will make everything go boom
      multi.mset(msetKeys);

      multi
        .exec()
        .catch((e: any) => {
          logger.error(
            `${logPrefix} getBatchEntriesByContentTypeFetcher(), multi.exec(), setting missed cache data`,
            e.message || e,
            e.stack
          );
        })
        .then(() => logger.trace(`${logPrefix} ${timer.end()}`));
    }
  } catch (e: any) {
    logger.error(
      `${logPrefix} getBatchEntriesByContentTypeFetcher(), primeRedisEntriesByContentType(), Unexpected error`,
      e.message || e,
      e.stack
    );
  }
}
