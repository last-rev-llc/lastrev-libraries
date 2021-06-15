import DataLoader from 'dataloader';
import { Entry, Asset } from 'contentful';
import { readJSON } from 'fs-extra';
import { get, values } from 'lodash';
import { join } from 'path';

export type PageKey = {
  slug: string;
  contentTypeId: string;
};

export type Loaders = {
  entryLoader: DataLoader<string, Entry<any> | null>;
  assetLoader: DataLoader<string, Asset | null>;
  pageLoader: DataLoader<PageKey, Entry<any> | null>;
  fetchAllPages: () => Promise<(Entry<any> | null)[]>;
};

const createLoaders = async (
  rootDir: string,
  spaceId: string,
  env: string,
  previewOrProd: 'preview' | 'production'
): Promise<Loaders> => {
  let lookup: Record<string, string>;
  try {
    lookup = await readJSON(join(rootDir, spaceId, env, previewOrProd, 'content_type_slug_lookup.json'));
  } catch (e) {
    throw Error('No content type slug lookup found!');
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

  const getBatchPageFetcher = (
    loader: DataLoader<string, Entry<any> | null>
  ): DataLoader.BatchLoadFn<PageKey, Entry<any> | null> => {
    return async (keys) => {
      const ids = keys.map((key) => get(lookup, `${key.contentTypeId}:${key.slug}`, null));

      return Promise.all(ids.map((id) => (id ? loader.load(id) : null)));
    };
  };

  const getAllPagesFetcher = (loader: DataLoader<string, Entry<any> | null>) => {
    return async () => {
      return await Promise.all(values(lookup).map(loader.load));
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const pageLoader = new DataLoader(getBatchPageFetcher(entryLoader));
  const fetchAllPages = getAllPagesFetcher(entryLoader);

  return {
    entryLoader,
    assetLoader,
    pageLoader,
    fetchAllPages
  };
};

export default createLoaders;
