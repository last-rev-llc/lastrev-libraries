import DataLoader, { Options } from 'dataloader';
import { createClient, SanityClient } from '@sanity/client';
import { map, partition } from 'lodash';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { ItemKey, ContentfulLoaders, FVLKey, RefByKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const logger = getWinstonLogger({ package: 'sanity-cms-loader', module: 'index', strategy: 'Cms' });

const options: Options<ItemKey, any, string> = {
  cacheKeyFn: (key: ItemKey) => {
    return key.preview ? `${key.id}-preview` : `${key.id}-prod`;
  }
};

const fvlOptions: Options<FVLKey, any, string> = {
  cacheKeyFn: (key: FVLKey) => {
    const baseKey = `${key.contentType}-${key.field}-${key.value}`;
    return key.preview ? `${baseKey}-preview` : `${baseKey}-prod`;
  }
};

const refByOptions: Options<RefByKey, any, string> = {
  cacheKeyFn: (key: RefByKey) => {
    const baseKey = `${key.contentType}-${key.field}-${key.id}`;
    return key.preview ? `${baseKey}-preview` : `${baseKey}-prod`;
  }
};

const createLoaders = (config: LastRevAppConfig): ContentfulLoaders => {
  const sanity = (config as any).sanity || {};

  const prodClient = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion || '2021-10-21',
    useCdn: true
  });

  const previewClient = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion || '2021-10-21',
    token: sanity.previewToken,
    useCdn: false
  });

  const fetchBatchItems = async (ids: string[], client: SanityClient) => {
    if (!ids.length) return [] as any[];
    const query = '*[_id in $ids]';
    return client.fetch(query, { ids });
  };

  const getBatchItemFetcher = (): DataLoader.BatchLoadFn<ItemKey, any | null> => {
    return async (keys) => {
      const timer = new Timer();
      const [previewKeys, prodKeys] = partition(keys, (k) => k.preview);
      const [previewDocs, prodDocs] = await Promise.all([
        fetchBatchItems(map(previewKeys, 'id'), previewClient),
        fetchBatchItems(map(prodKeys, 'id'), prodClient)
      ]);
      const all = [...previewDocs, ...prodDocs];
      const items = keys.map(({ id }) => all.find((d) => d && d._id === id) || null);
      logger.debug('Fetched docs', {
        caller: 'getBatchItemFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: items.filter((x) => x).length
      });
      return items;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, any[]> => {
    return async (keys) => {
      const timer = new Timer();
      const results = await Promise.all(
        keys.map(async ({ id, preview }) => {
          const client = preview ? previewClient : prodClient;
          const query = '*[_type == $type]';
          const docs = await client.fetch(query, { type: id });
          return docs as any[];
        })
      );
      logger.debug('Fetched docs by type', {
        caller: 'getBatchEntriesByContentTypeFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: results.reduce((a, c) => a + c.length, 0)
      });
      return results;
    };
  };

  const getBatchEntriesByFieldValueFetcher = (): DataLoader.BatchLoadFn<FVLKey, any | null> => {
    return async (keys) => {
      const timer = new Timer();
      const results = await Promise.all(
        keys.map(async ({ contentType, field, value, preview }) => {
          const client = preview ? previewClient : prodClient;
          const query = `*[_type == $type && ${field} == $value][0]`;
          const doc = await client.fetch(query, { type: contentType, value });
          return doc || null;
        })
      );
      logger.debug('Fetched doc by field value', {
        caller: 'getBatchEntriesByFieldValueFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: results.filter((x) => x).length
      });
      return results;
    };
  };

  const getBatchEntriesRefByFetcher = (): DataLoader.BatchLoadFn<RefByKey, any[]> => {
    return async (keys) => {
      const timer = new Timer();
      const results = await Promise.all(
        keys.map(async ({ contentType, field, id, preview }) => {
          const client = preview ? previewClient : prodClient;
          const query = `*[_type == $type && (${field}._ref == $id || $id in ${field}[]._ref)]`;
          const docs = await client.fetch(query, { type: contentType, id });
          return docs as any[];
        })
      );
      logger.debug('Fetched docs ref by', {
        caller: 'getBatchEntriesRefByFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: results.reduce((a, c) => a + c.length, 0)
      });
      return results;
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher(), options);
  const assetLoader = new DataLoader(getBatchItemFetcher(), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(), options);
  const entryByFieldValueLoader = new DataLoader(getBatchEntriesByFieldValueFetcher(), fvlOptions);
  const entriesRefByLoader = new DataLoader(getBatchEntriesRefByFetcher(), refByOptions);

  const fetchAllContentTypes = async (_preview: boolean) => {
    logger.warn('fetchAllContentTypes not implemented for Sanity');
    return [] as any[];
  };

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    entryByFieldValueLoader,
    entriesRefByLoader,
    fetchAllContentTypes
  };
};

export default createLoaders;
