import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { readJSON, readdir } from 'fs-extra';
import { chain, filter, identity, isNull } from 'lodash';
import { join } from 'path';

export type PageKey = {
  slug: string;
  contentTypeId: string;
};

export type ContentfulFsLoaders = {
  entryLoader: DataLoader<string, Entry<any> | null>;
  assetLoader: DataLoader<string, Asset | null>;
  entriesByContentTypeLoader: DataLoader<string, Entry<any>[]>;
  fetchAllContentTypes: () => Promise<ContentType[]>;
};

const createLoaders = (
  rootDir: string,
  spaceId: string,
  env: string,
  previewOrProd: 'preview' | 'production'
): ContentfulFsLoaders => {
  const getBatchItemFetcher = <T extends Entry<any> | Asset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<string, T | null> => {
    return async (ids): Promise<(T | null)[]> => {
      return Promise.all(
        ids.map((id) =>
          (async () => {
            try {
              return await readJSON(join(rootDir, spaceId, env, previewOrProd, dirname, `${id}.json`));
            } catch (err) {
              return null;
            }
          })()
        )
      );
    };
  };

  const getBatchEntryIdsByContentTypeFetcher = (): DataLoader.BatchLoadFn<string, string[]> => {
    return async (contentTypeIds) => {
      return Promise.all(
        contentTypeIds.map((contentTypeId) =>
          (async () => {
            try {
              const dir = join(rootDir, spaceId, env, previewOrProd, 'entry_ids_by_content_type', contentTypeId);
              return await readdir(dir);
            } catch (err) {
              return [];
            }
          })()
        )
      );
    };
  };

  const getBatchEntriesByContentTypeFetcher = (
    eLoader: DataLoader<string, Entry<any> | null>,
    idsLoader: DataLoader<string, (string | null)[]>
  ): DataLoader.BatchLoadFn<string, Entry<any>[]> => {
    return async (keys) => {
      const idsArrays = await idsLoader.loadMany(keys);
      return Promise.all(
        chain(idsArrays)
          .map((ids) =>
            (async () => {
              const entries = await eLoader.loadMany(filter(ids, (id) => !isNull(id)));
              return filter(entries, identity) as Entry<any>[];
            })()
          )
          .value()
      );
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entryIdsByContentTypeLoader = new DataLoader(getBatchEntryIdsByContentTypeFetcher());
  const entriesByContentTypeLoader = new DataLoader(
    getBatchEntriesByContentTypeFetcher(entryLoader, entryIdsByContentTypeLoader)
  );
  const fetchAllContentTypes = async () => {
    try {
      const dir = join(rootDir, spaceId, env, previewOrProd, 'content_types');
      const contentTypeFilenames = await readdir(dir);
      return Promise.all(
        contentTypeFilenames.map(async (filename) => {
          try {
            return readJSON(join(dir, filename));
          } catch (err) {
            return null;
          }
        })
      );
    } catch (err) {
      console.error('Unable to fetch content types:', err.message);
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
