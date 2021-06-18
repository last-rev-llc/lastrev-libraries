import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { readJSON } from 'fs-extra';
import { chain, filter, get, identity, pickBy, values } from 'lodash';
import { join } from 'path';

export type PageKey = {
  slug: string;
  contentTypeId: string;
};

export type ContentfulFsLoaders = {
  entryLoader: DataLoader<string, Entry<any> | null>;
  assetLoader: DataLoader<string, Asset | null>;
  entriesByContentTypeLoader: DataLoader<string, Entry<any>[]>;
  fetchAllPages: () => Promise<(Entry<any> | null)[]>;
  fetchAllContentTypes: () => Promise<ContentType[]>;
};

const createLoaders = async (
  rootDir: string,
  spaceId: string,
  env: string,
  previewOrProd: 'preview' | 'production'
): Promise<ContentfulFsLoaders> => {
  let slugContentTypeToIdLookup: Record<string, string>;
  try {
    slugContentTypeToIdLookup = await readJSON(
      join(rootDir, spaceId, env, previewOrProd, 'content_type_slug_lookup.json')
    );
  } catch (e) {
    throw Error('No content type slug lookup found!');
  }

  let contentTypeToIdsLookup: Record<string, string[]>;
  try {
    contentTypeToIdsLookup = await readJSON(
      join(rootDir, spaceId, env, previewOrProd, 'entry_ids_by_content_type_lookup.json')
    );
  } catch (e) {
    throw Error('No content type to entry ids lookup found!');
  }

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

  const getBatchEntriesByContentTypeFetcher = (
    loader: DataLoader<string, Entry<any> | null>
  ): DataLoader.BatchLoadFn<string, Entry<any>[]> => {
    return async (keys) => {
      const filteredMapping = pickBy(contentTypeToIdsLookup, (_, key) => {
        return keys.indexOf(key) > -1;
      });

      return Promise.all(
        chain(keys)
          .map((k) => get(filteredMapping, k, []))
          .map((ids) =>
            (async () => {
              const entries = await loader.loadMany(ids);
              return filter(entries, identity) as Entry<any>[];
            })()
          )
          .value()
      );
    };
  };

  const getAllPagesFetcher = (loader: DataLoader<string, Entry<any> | null>) => {
    return async () => {
      return await Promise.all(
        values(slugContentTypeToIdLookup).map((id) =>
          (async () => {
            return await loader.load(id);
          })()
        )
      );
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(entryLoader));
  const fetchAllPages = getAllPagesFetcher(entryLoader);
  const fetchAllContentTypes = async () => {
    try {
      return await readJSON(join(rootDir, spaceId, env, previewOrProd, 'content_types.json'));
    } catch (err) {
      console.error('Unable to fetch content types:', err.message);
      return [];
    }
  };

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllPages,
    fetchAllContentTypes
  };
};

export default createLoaders;
