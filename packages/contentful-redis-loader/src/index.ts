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

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> => async (keys) => {
    let timer = new Timer(`Fetched ${keys.length} entry IDs by contentType from redis`);

    if (!keys.length) return [];

    const redisKeys = keys.map(
      (key) => `${key.preview ? 'preview' : 'production'}:entry_ids_by_content_type:${key.id}`
    );

    const multi = client.multi();

    redisKeys.forEach((k) => multi.smembers(k));

    let multiResults: [Error | null, unknown][] | null;

    try {
      multiResults = (await multi.exec()) || [];
    } catch (err: any) {
      logger.error(`${logPrefix} getBatchEntriesByContentTypeFetcher(), multi.exec()`, err.message || err);
      return [];
    }

    logger.trace(`${logPrefix} ${timer.end()}`);

    const cacheMissIds: ItemKey[] = [];
    const entryIdsToRequest: ItemKey[] = [];

    multiResults.forEach(([err, arrayOfIds], index) => {
      if (err || !arrayOfIds || !(arrayOfIds as any[]).length) {
        cacheMissIds.push(keys[index]);
      } else {
        entryIdsToRequest.push(
          ...(arrayOfIds as any[]).filter((x) => !!x).map((id) => ({ id, preview: keys[index].preview }))
        );
      }
    });

    const out: { [contentType: string]: Entry<any>[] } = {};

    if (cacheMissIds.length) {
      const sourceResults = await fallbackLoaders.entriesByContentTypeLoader.loadMany(cacheMissIds);

      const filtered = sourceResults.filter((result) => !isError(result) && !isNil(result));

      timer = new Timer(`Set ${filtered.length} entries in redis`);

      const msetKeys: Record<string, string> = {};
      const saddKeys: Record<string, string[]> = {};

      (filtered as Entry<any>[][]).forEach((value, index) => {
        const { id: contentType, preview } = cacheMissIds[index];
        const rootKey = getKey({ preview, id: contentType }, 'entry_ids_by_content_type');

        saddKeys[rootKey] = value.map((v) => v.sys.id);

        value.forEach((entry) => {
          const v = stringify(entry, entry.sys.id);
          if (v) {
            msetKeys[getKey({ preview, id: entry.sys.id }, 'entries')] = v;
          }
        });
      });

      if (saddKeys.length) {
        // don't block
        const multi = client.multi();
        multi.mset(msetKeys);
        Object.keys(saddKeys).forEach((k) => multi.sadd(k, ...saddKeys[k]));
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

      (filtered as Entry<any>[][]).forEach((entryArray, idx) => {
        const { id: contentType } = cacheMissIds[idx];
        out[contentType] = entryArray;
      });
    }

    if (entryIdsToRequest.length) {
      const entryResults = await fetchAndSet<Entry<any>>(
        entryIdsToRequest,
        fallbackLoaders.entryLoader as DataLoader<ItemKey, Entry<any>>,
        'entries'
      );

      entryResults.forEach((entry) => {
        if (isNil(entry)) return;
        const contentType = entry.sys.contentType.sys.id;
        out[contentType] = out[contentType] || [];
        out[contentType].push(entry);
      });
    }

    const outArray = keys.map(({ id: contentType }) => out[contentType] || []);

    return outArray;
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(), options);
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
