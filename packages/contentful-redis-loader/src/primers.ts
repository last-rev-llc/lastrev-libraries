import Redis from 'ioredis';
import Timer from '@last-rev/timer';
import { ItemKey } from '@last-rev/types';
import { getKey, isNil, isRejected, stringify } from './helpers';
import { getWinstonLogger } from '@last-rev/logging';
import { CmsEntry } from '@last-rev/types';

const logger = getWinstonLogger({ package: 'contentful-redis-loader', module: 'primers' });

export const primeRedisEntriesOrAssets = async <T>(
  client: Redis,
  cacheMissIds: ItemKey[],
  dirname: string,
  sourceResults: (T | Error)[],
  maxBatchSize: number,
  ttlSeconds: number
) => {
  try {
    const timer = new Timer();
    const toSetArr: Record<string, any>[] = [];
    let toSet: Record<string, any> = {};
    let count = 0;

    for (let i = 0; i < cacheMissIds.length; i++) {
      const key = getKey(cacheMissIds[i], dirname);
      const value = stringify(sourceResults[i], key);
      // const value = isNil(sourceResults[i]) ? null : stringify(sourceResults[i], key);
      if (key && value) {
        toSet[key] = value;
        if (count++ % maxBatchSize === 0) {
          toSetArr.push(toSet);
          toSet = {};
        }
      }
    }

    if (Object.keys(toSet).length) {
      toSetArr.push(toSet);
    }

    const results = await Promise.allSettled(
      toSetArr.map(async (toSet) => {
        await client.mset(toSet);
        await Promise.all(Object.keys(toSet).map(async (key) => client.expire(key, ttlSeconds)));
      })
    );

    logger.debug(`Primed ${dirname} in redis`, {
      caller: 'primeRedisEntriesOrAssets',
      elapsedMs: timer.end().millis,
      itemsAttempted: cacheMissIds.length,
      itemsSuccessful: cacheMissIds.length - results.filter(isRejected).length
    });

    let totalSuccessful = 0;

    results.forEach((r, i) => {
      if (isRejected(r)) {
        const numNotPrimed = Object.keys(toSetArr[i]).length;
        logger.error(`mset() unable to prime ${numNotPrimed} ${dirname} in Redis. Reason: ${r.reason?.message}`, {
          caller: 'primeRedisEntriesOrAssets',
          stack: r.reason?.stack
        });
      } else {
        totalSuccessful += Object.keys(toSetArr[i]).length;
      }
    });

    logger.debug(`Primed ${totalSuccessful} entries in Redis`, {
      caller: 'primeRedisEntriesOrAssets'
    });
  } catch (err: any) {
    logger.error(`unexpected: ${err.message}`, { caller: 'primeRedisEntriesOrAssets', stack: err.stack });
  }
};

export const primeRedisEntriesByContentType = async (
  client: Redis,
  filtered: (CmsEntry<any>[] | Error)[],
  cacheMissContentTypeIds: ItemKey[],
  maxBatchSize: number,
  ttlSeconds: number
) => {
  try {
    const timer = new Timer();
    const msetKeysArr: Record<string, string>[] = [];
    const saddKeys: Record<string, string[]> = {};

    let count = 0;
    let msetKeys: Record<string, string> = {};

    (filtered as CmsEntry<any>[][]).forEach((entries, index) => {
      const { id: contentType, preview } = cacheMissContentTypeIds[index];
      const rootKey = getKey({ preview, id: contentType }, 'entry_ids_by_content_type');

      if (entries.length) {
        saddKeys[rootKey] = entries.map((v) => v.sys.id);
      }

      entries.forEach((entry) => {
        const v = isNil(entry) ? null : stringify(entry, entry.sys.id);
        if (v) {
          msetKeys[getKey({ preview, id: entry.sys.id }, 'entries')] = v;
          // chunking to maxBatchSize
          if (count++ % maxBatchSize === 0) {
            msetKeysArr.push(msetKeys);
            msetKeys = {};
          }
        }
      });
    });

    if (Object.keys(msetKeys).length) {
      msetKeysArr.push(msetKeys);
    }

    const totalToPrime = msetKeysArr.reduce((acc, curr) => acc + Object.keys(curr).length, 0);
    logger.debug(`Attempting to prime ${totalToPrime} entries in Redis`, {
      caller: 'primeRedisEntriesByContentType'
    });

    if (Object.keys(saddKeys).length) {
      // Wait to store entry ids by contenType
      const multiSadd = client.multi();
      Object.keys(saddKeys).forEach((k) => {
        multiSadd.sadd(k, ...saddKeys[k]);
        multiSadd.expire(k, ttlSeconds);
      });

      try {
        await multiSadd.exec();
        logger.debug(`Primed ${Object.keys(saddKeys).length} entry IDs in Redis`, {
          caller: 'primeRedisEntriesByContentType'
        });
      } catch (e: any) {
        logger.error(`multi.sadd().exec(), setting missed cache data: ${e.message}`, {
          caller: 'primeRedisEntriesByContentType',
          stack: e.stack
        });
      }
    }

    if (msetKeysArr.length) {
      Promise.allSettled(
        msetKeysArr.map(async (msetKeys) => {
          // don't block
          const multi = client.multi();
          // Store entryId -> entry
          // Danger ! Object size varies and will make everything go boom
          multi.mset(msetKeys);

          // Set expiration for each entry
          Object.keys(msetKeys).forEach((key) => multi.expire(key, ttlSeconds));

          multi.exec().catch((e: any) => {
            logger.error(`multi.mset().exec(), setting missed cache data: ${e.message}`, {
              caller: 'primeRedisEntriesByContentType',
              stack: e.stack
            });
          });
        })
      ).then((results) => {
        let totalSuccessful = 0;
        results.forEach((r, i) => {
          if (isRejected(r)) {
            const numNotPrimed = Object.keys(msetKeysArr[i]).length;
            logger.error(
              `multi.mset().exec(), Unable to prime ${numNotPrimed} entries in Redis. Reason: ${r.reason?.message}`,
              {
                caller: 'primeRedisEntriesByContentType',
                stack: r.reason?.stack
              }
            );
          } else {
            totalSuccessful += Object.keys(msetKeysArr[i]).length;
          }
        });

        logger.debug(`Primed Entries in Redis`, {
          caller: 'primeRedisEntriesByContentType',
          elapsedMs: timer.end().millis,
          itemsAttempted: totalToPrime,
          itemsSuccessful: totalSuccessful
        });
      });
    }
  } catch (e: any) {
    logger.error(`Unexpected error: ${e.message}`, { caller: 'primeRedisEntriesByContentType', stack: e.stack });
  }
};
