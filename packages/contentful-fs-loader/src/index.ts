import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { readJSON, readdir } from 'fs-extra';
import { filter, identity, isNull } from 'lodash';
import { join } from 'path';
import logger from 'loglevel';
import Timer from '@last-rev/timer';

export type ItemKey = {
  id: string;
  preview?: boolean;
};

export type ContentfulFsLoaders = {
  entryLoader: DataLoader<ItemKey, Entry<any> | null>;
  assetLoader: DataLoader<ItemKey, Asset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, Entry<any>[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};

const createLoaders = (rootDir: string, spaceId: string, env: string): ContentfulFsLoaders => {
  const getUri = (...args: string[]) => {
    return join(rootDir, spaceId, env, ...args);
  };

  const getBatchItemFetcher = <T extends Entry<any> | Asset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<ItemKey, T | null> => {
    return async (keys): Promise<(T | null)[]> => {
      const timer = new Timer(`Fetched ${dirname} from file system`);
      const out = Promise.all(
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
      logger.debug(timer.end());
      return out;
    };
  };

  const getBatchEntryIdsByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, string[]> => {
    return async (keys) => {
      const timer = new Timer(`Fetched entry IDs by contentType from file system`);
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
      logger.debug(timer.end());
      return out;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (
    eLoader: DataLoader<ItemKey, Entry<any> | null>,
    idsLoader: DataLoader<ItemKey, (string | null)[]>
  ): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> => {
    return async (keys) => {
      const idsArrays = await idsLoader.loadMany(keys);

      const keysArray: ItemKey[][] = idsArrays.map((ids, index) =>
        isNull(ids) ? [] : (ids as string[]).map((id) => ({ id, preview: keys[index].preview }))
      );

      return Promise.all(
        keysArray.map((entryKeys) =>
          (async () => {
            const entries = await eLoader.loadMany(entryKeys);
            return filter(entries, identity) as Entry<any>[];
          })()
        )
      );
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entryIdsByContentTypeLoader = new DataLoader(getBatchEntryIdsByContentTypeFetcher());
  const entriesByContentTypeLoader = new DataLoader(
    getBatchEntriesByContentTypeFetcher(entryLoader, entryIdsByContentTypeLoader)
  );
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer('Fetched all content types from file system');
      const dir = getUri(preview ? 'preview' : 'production', 'content_types');
      const contentTypeFilenames = await readdir(dir);
      const out = Promise.all(
        contentTypeFilenames.map(async (filename) => {
          try {
            return readJSON(join(dir, filename));
          } catch (err) {
            return null;
          }
        })
      );
      logger.debug(timer.end());
      return out;
    } catch (err) {
      console.error('Unable to fetch content types using FS loader:', err.message, env);
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
