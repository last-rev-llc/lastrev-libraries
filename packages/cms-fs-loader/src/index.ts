import DataLoader, { Options } from 'dataloader';
import { BaseEntry, BaseAsset } from '@last-rev/types';
import { readJSON, readdir } from 'fs-extra';
import { filter, identity, isNil } from 'lodash';
import { join } from 'path';
import { getWinstonLogger } from '@last-rev/logging';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { ItemKey, CmsLoaders, FVLKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { getGetUriFunction } from './utils';

const logger = getWinstonLogger({
  package: 'cms-fs-loader',
  module: 'index',
  strategy: 'Filesystem'
});

const options: Options<ItemKey, any, string> = {
  cacheKeyFn: (key: ItemKey) => {
    return key.preview ? `${key.id}-preview` : `${key.id}-prod`;
  }
};

const flvOptions: Options<FVLKey, any, string> = {
  cacheKeyFn: (key: FVLKey) => {
    const baseKey = `${key.contentType}-${key.field}-${key.value}`;
    return key.preview ? `${baseKey}-preview` : `${baseKey}-prod`;
  }
};

const createLoaders = (config: LastRevAppConfig, fallbackLoaders: CmsLoaders): CmsLoaders => {
  const getUri = getGetUriFunction(config);

  const getBatchItemFetcher = <T extends BaseEntry | BaseAsset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<ItemKey, T | null> => {
    return async (keys): Promise<(T | null)[]> => {
      const timer = new Timer();
      const out = await Promise.all(
        keys.map((key) =>
          (async () => {
            const { id, preview } = key;
            try {
              return await readJSON(getUri(preview ? 'preview' : 'production', dirname, `${id}.json`));
            } catch (err) {
              return null;
            }
          })()
        )
      );
      logger.debug(`Fetched ${dirname}`, {
        caller: 'getBatchItemFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: filter(out, identity).length
      });
      return out;
    };
  };

  const getBatchEntryIdsByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, string[]> => {
    return async (keys) => {
      const timer = new Timer();
      const out = Promise.all(
        keys.map((key) =>
          (async () => {
            try {
              const { id, preview } = key;
              const dir = getUri(preview ? 'preview' : 'production', 'entry_ids_by_content_type', id);
              return await readdir(dir);
            } catch (err) {
              return [];
            }
          })()
        )
      );
      logger.debug(`Fetched entry IDs by contentType`, {
        caller: 'getBatchEntryIdsByContentTypeFetcher',
        elapsedMs: timer.end().millis,
        count: keys.length
      });
      return out;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (
    eLoader: DataLoader<ItemKey, BaseEntry | null>,
    idsLoader: DataLoader<ItemKey, (string | null)[]>
  ): DataLoader.BatchLoadFn<ItemKey, BaseEntry[]> => {
    return async (keys) => {
      const idsArrays = await idsLoader.loadMany(keys);

      const keysArray: ItemKey[][] = idsArrays.map((ids, index) =>
        isNil(ids) ? [] : (ids as string[]).map((id) => ({ id, preview: keys[index].preview }))
      );

      return Promise.all(
        keysArray.map((entryKeys) =>
          (async () => {
            const entries = await eLoader.loadMany(entryKeys);
            return filter(entries, identity) as BaseEntry[];
          })()
        )
      );
    };
  };

  const getBatchEntriesByFieldValueFetcher = (): DataLoader.BatchLoadFn<FVLKey, BaseEntry | null> => {
    return async (keys) => fallbackLoaders.entryByFieldValueLoader.loadMany(keys);
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<BaseEntry>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<BaseAsset>('assets'), options);
  const entryIdsByContentTypeLoader = new DataLoader(getBatchEntryIdsByContentTypeFetcher(), options);
  const entriesByContentTypeLoader = new DataLoader(
    getBatchEntriesByContentTypeFetcher(entryLoader, entryIdsByContentTypeLoader),
    options
  );
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer();
      const dir = getUri(preview ? 'preview' : 'production', 'content_types');
      const contentTypeFilenames = await readdir(dir);
      const out = await Promise.all(
        contentTypeFilenames.map(async (filename) => {
          try {
            return readJSON(join(dir, filename));
          } catch (err) {
            return null;
          }
        })
      );
      logger.debug('Fetched all content types', {
        caller: 'fetchAllContentTypes',
        elapsedMs: timer.end().millis,
        itemsAttempted: contentTypeFilenames.length,
        itemsSuccessful: filter(out, identity).length
      });
      return out;
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
