import DataLoader, { Options } from 'dataloader';
import { createClient, SanityClient } from '@sanity/client';
import { map, partition } from 'lodash';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { ItemKey, CmsLoaders, FVLKey, RefByKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { convertSanityDoc, mapSanityTypesToContentfulTypes } from '@last-rev/sanity-mapper';

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

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): CmsLoaders => {
  const locales = config.sanity.supportedLanguages.map((locale) => locale.id);
  const sanity = (config as any).sanity || {};

  const prodClient = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion || '2021-10-21',
    token: sanity.token,
    useCdn: true
  });

  const previewClient = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion || '2021-10-21',
    token: sanity.token,
    useCdn: false,
    perspective: 'drafts'
  });

  const fetchBatchItems = async (ids: string[], client: SanityClient) => {
    if (!ids.length) return [] as any[];
    const query = `*[_id in $ids && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
      ...,
      "_translations": *[
        _type == "translation.metadata" &&
        references(^._id)
      ].translations[]{
        "doc": value->{
          ...
        }
      }[doc.__i18n_lang != $defaultLocale && defined(doc)]
    }`;
    return client.fetch(query, { ids, defaultLocale });
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
      const items = keys.map(({ id }) =>
        convertSanityDoc(
          all.find((d) => d && d._id === id),
          defaultLocale,
          locales
        )
      );
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
          const query = `*[_type == $type && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
            ...,
            "_translations": *[
              _type == "translation.metadata" &&
              references(^._id)
            ].translations[]{
              "doc": value->{
                ...
              }
            }[doc.__i18n_lang != $defaultLocale && defined(doc)]
          }`;
          const docs = await client.fetch(query, { type: id, defaultLocale });
          return docs.map((doc: any) => convertSanityDoc(doc, defaultLocale, locales)) as any[];
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
          const query = `*[_type == $type && ${field} == $value && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
            ...,
            "_translations": *[
              _type == "translation.metadata" &&
              references(^._id)
            ].translations[]{
              "doc": value->{
                ...
              }
            }[doc.__i18n_lang != $defaultLocale && defined(doc)]
          }[0]`;
          const doc = await client.fetch(query, { type: contentType, value, defaultLocale });
          return convertSanityDoc(doc, defaultLocale, locales);
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
          const query = `*[_type == $type && (${field}._ref == $id || $id in ${field}[]._ref) && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
            ...,
            "_translations": *[
              _type == "translation.metadata" &&
              references(^._id)
            ].translations[]{
              "doc": value->{
                ...
              }
            }[doc.__i18n_lang != $defaultLocale && defined(doc)]
          }`;
          const docs = await client.fetch(query, { type: contentType, id, defaultLocale });
          return docs.map((doc: any) => convertSanityDoc(doc, defaultLocale, locales)) as any[];
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
    try {
      const timer = new Timer();

      try {
        const types = mapSanityTypesToContentfulTypes(config.sanity.schemaTypes);
        logger.debug('Fetched all content types from local schemas', {
          caller: 'fetchAllContentTypes',
          elapsedMs: timer.end().millis,
          itemsSuccessful: types.length
        });
        return types;
      } catch (err: any) {
        console.log('Error fetching content types from local schemas', err.message);
        console.log(JSON.stringify(config.sanity.schemaTypes, null, 2));
        throw err;
      }
    } catch (err: any) {
      logger.error(`Unable to fetch content types: ${err.message}`, {
        caller: 'fetchAllContentTypes',
        stack: err.stack
      });
      return [];
    }
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
