import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { compact, dropWhile, each, isEmpty, isError, isNil, isString, map, some, values, zipObject } from 'lodash';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import Redis from 'ioredis';
import { ItemKey, ContentfulLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const parse = (r: string | Error | null): any => {
  if (isString(r) && r.length) {
    return JSON.parse(r);
  }
  return null;
};

const stringify = (r: any) => {
  if (!isNil(r) && !isError(r)) {
    return JSON.stringify(r);
  }
  return '';
};

const createLoaders = (config: LastRevAppConfig, fallbackLoaders: ContentfulLoaders): ContentfulLoaders => {
  const client = new Redis({
    ...config.redis,
    keyPrefix: `${config.contentful.spaceId}:${config.contentful.env}`
  });

  const getKey = (itemKey: ItemKey, dir: string) => {
    return [itemKey.preview ? 'preview' : 'production', dir, itemKey.id].join(':');
  };

  // client.flushall();

  const fetchAndSet = async <T>(
    keys: readonly ItemKey[],
    fallbackLoader: DataLoader<ItemKey, T>,
    dirname: string
  ): Promise<(T | null)[]> => {
    let timer = new Timer(`Fetched ${keys.length} ${dirname} from redis`);
    const redisKeys = keys.map((key) => getKey(key, dirname));

    const unparsed = await client.mget(...redisKeys);

    const results = map(unparsed, parse);

    logger.debug(timer.end());

    const cacheMissIds: ItemKey[] = [];

    each(results, (result, index) => {
      if (isNil(result)) {
        cacheMissIds.push(keys[index]);
      }
    });

    if (cacheMissIds.length) {
      logger.debug(`${dirname} cache misses: ${cacheMissIds.length}. Fetching from fallback`);
      timer = new Timer(`set ${cacheMissIds.length} ${dirname} in redis`);
      const sourceResults = await fallbackLoader.loadMany(cacheMissIds);

      const toSet = zipObject(
        cacheMissIds.map((key) => getKey(key, dirname)),
        sourceResults.map(stringify)
      );

      // don't block
      client.mset(toSet).then(() => logger.debug(timer.end()));

      each(keys, (key, index) => {
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

    const redisKeys = map(
      keys,
      (key) => `${key.preview ? 'preview' : 'production'}:entry_ids_by_content_type:${key.id}`
    );

    const multi = client.multi();

    each(redisKeys, (k) => multi.smembers(k));

    const multiResults = await multi.exec();

    logger.debug(timer.end());

    const cacheMissIds: ItemKey[] = [];
    const entryIdsToRequest: ItemKey[] = [];

    each(multiResults, ([err, arrayOfIds], index) => {
      if (err || !arrayOfIds || !arrayOfIds.length) {
        cacheMissIds.push(keys[index]);
      } else {
        entryIdsToRequest.push(...map(compact(arrayOfIds as string[]), (id) => ({ id, preview: keys[index].preview })));
      }
    });

    const out: { [contentType: string]: Entry<any>[] } = {};

    if (cacheMissIds.length) {
      const sourceResults = await fallbackLoaders.entriesByContentTypeLoader.loadMany(cacheMissIds);

      const filtered = dropWhile(sourceResults, isError);

      timer = new Timer(`Set ${filtered.length} entries in redis`);

      const msetKeys: Record<string, string> = {};
      const saddKeys: Record<string, string[]> = {};

      each(filtered as Entry<any>[][], (value, index) => {
        const { id: contentType, preview } = cacheMissIds[index];
        const rootKey = getKey({ preview, id: contentType }, 'entry_ids_by_content_type');

        saddKeys[rootKey] = map(value, 'sys.id');

        each(value, (entry) => {
          msetKeys[getKey({ preview, id: entry.sys.id }, 'entries')] = stringify(entry);
        });
      });

      // don't block
      const multi = client.multi();
      multi.mset(msetKeys);
      each(saddKeys, (v, k) => multi.sadd(k, ...v));
      multi.exec().then(() => logger.debug(timer.end()));

      each(filtered as Entry<any>[][], (entryArray, idx) => {
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

      each(entryResults, (entry) => {
        if (isNil(entry)) return;
        const contentType = entry.sys.contentType.sys.id;
        out[contentType] = out[contentType] || [];
        out[contentType].push(entry);
      });
    }

    const outArray = map(keys, ({ id: contentType }) => out[contentType] || []);

    return outArray;
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher());
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      let timer = new Timer('Fetched all content types from redis');

      const key = `${preview ? 'preview' : 'production'}:content_types`;
      const results: (ContentType | null)[] = map(values(await client.hgetall(key)), parse);

      logger.debug(timer.end());

      if (isEmpty(results) || some(results, (result) => isNil(result))) {
        timer = new Timer('Set all content types in redis');
        const contentTypes = await fallbackLoaders.fetchAllContentTypes(preview);
        const contentTypeIds = map(contentTypes, 'sys.id');
        const zipped = zipObject(contentTypeIds, map(contentTypes, stringify));

        // don't block
        client.hset(key, zipped).then(() => logger.debug(timer.end()));
        return contentTypes;
      }
      return results as ContentType[];
    } catch (err: any) {
      logger.error('Unable to fetch content types using redis loader:', err.message);
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
