import DataLoader, { Options } from 'dataloader';
import { createClient, ContentfulClientApi } from 'contentful';
import { BaseAsset, BaseEntry } from '@last-rev/types';
import { find, map, partition } from 'lodash';
import { getWinstonLogger } from '@last-rev/logging';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { ItemKey, CmsLoaders, FVLKey, RefByKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { chunk, makeContentfulRequest } from './helpers';

const logger = getWinstonLogger({ package: 'contentful-cms-loader', module: 'index', strategy: 'Cms' });

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

const isFulFilled = <T>(p: PromiseSettledResult<T>): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): CmsLoaders => {
  const prodClient = createClient({
    accessToken: config.contentful.contentDeliveryToken,
    space: config.contentful.spaceId,
    environment: config.contentful.env,
    host: 'cdn.contentful.com'
  }).withoutLinkResolution.withAllLocales;

  const previewClient = createClient({
    accessToken: config.contentful.contentPreviewToken,
    space: config.contentful.spaceId,
    environment: config.contentful.env,
    host: 'preview.contentful.com'
  }).withoutLinkResolution.withAllLocales;

  const maxBatchSize = config.contentful.maxBatchSize || 1000;

  const fetchBatchItems = async (
    ids: string[],
    command: 'getEntries' | 'getAssets',
    client: ContentfulClientApi<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES'>,
    maxBatchSize: number
  ) => {
    const timer = new Timer();
    const commandString = command.substring(3).toLowerCase();
    const chunks = chunk(ids, maxBatchSize);
    const settled = await Promise.allSettled(
      chunks.map(async (idz) => {
        const query = { 'sys.id[in]': idz.join(','), 'include': 0, 'locale': '*' };
        return await makeContentfulRequest(client, command, maxBatchSize, query);
      })
    );

    const results = settled.flatMap((p, idx) => {
      if (p.status === 'rejected') {
        const batchSize = chunks[idx].length;
        logger.error(
          `Unable to fetch ${batchSize} ${commandString}. Reason: ${p.reason.message} ${(
            p.reason.details?.errors || []
          ).map((e: any) => `${e.name}: ${e.value}`)}`,
          { caller: 'fetchBatchItems' }
        );
        return [];
      }
      return p.value || [];
    });

    logger.debug(`Fetched ${command.substring(3).toLowerCase()}`, {
      caller: 'fetchBatchItems',
      elapesedMs: timer.end().millis,
      itemsAttempted: ids.length,
      itemsSuccessful: results.length
    });
    return results;
  };

  const getBatchItemFetcher = <T extends BaseEntry | BaseAsset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<ItemKey, T | null> => {
    return async (keys): Promise<(T | null)[]> => {
      const timer = new Timer();
      const [previewKeys, prodKeys] = partition(keys, (k) => k.preview);
      const command = dirname === 'entries' ? 'getEntries' : 'getAssets';
      const [previewItems, prodItems] = await Promise.all([
        fetchBatchItems(map(previewKeys, 'id'), command, previewClient, maxBatchSize),
        fetchBatchItems(map(prodKeys, 'id'), command, prodClient, maxBatchSize)
      ]);

      // need to return items in same order as list of ids, replacing items not found with null values
      const items = keys.map(({ id, preview }) => {
        return (
          find(previewItems, (item) => {
            return preview && (item as BaseEntry | BaseAsset).sys.id === id;
          }) ||
          find(prodItems, (item) => {
            return !preview && (item as BaseEntry | BaseAsset).sys.id === id;
          }) ||
          null
        );
      }) as T[];

      logger.debug(`Fetched ${dirname}`, {
        caller: 'getBatchItemFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: items.length
      });
      return items;
    };
  };

  const getBatchEntriesByFieldValueFetcher = (): DataLoader.BatchLoadFn<FVLKey, BaseEntry | null> => {
    return async (keys) => {
      const timer = new Timer();
      const fvlRequests = keys.reduce((acc, { contentType, field, value, preview }) => {
        const clientType = preview ? 'preview' : 'prod';
        if (!acc[clientType]) {
          acc[clientType] = {};
        }
        if (!acc[clientType][contentType]) {
          acc[clientType][contentType] = {};
        }
        if (!acc[clientType][contentType][field]) {
          acc[clientType][contentType][field] = [];
        }
        acc[clientType][contentType][field].push(value);
        return acc;
      }, {} as { [clientType: string]: { [contentType: string]: { [field: string]: string[] } } });

      const requests = Object.entries(fvlRequests).reduce(
        (acc, [clientType, requestObject]) => {
          const requestObjects = Object.entries(requestObject).reduce((acc, [content_type, fieldValues]) => {
            Object.entries(fieldValues).forEach(([field, values]) => {
              acc.push({
                content_type,
                field,
                values: values.join(',')
              });
            });
            return acc;
          }, [] as { content_type: string; field: string; values: string }[]);

          if (clientType === 'preview') {
            acc.preview.push(...requestObjects);
          } else if (clientType === 'prod') {
            acc.prod.push(...requestObjects);
          }
          return acc;
        },
        { prod: [], preview: [] } as {
          prod: { content_type: string; field: string; values: string }[];
          preview: { content_type: string; field: string; values: string }[];
        }
      );

      const [collectedProdSettled, collectedPreviewSettled] = await Promise.all([
        Promise.allSettled(
          requests.prod.map(async ({ content_type, field, values }) => {
            const { items } = await prodClient.getEntries<any>({
              content_type,
              include: 0,
              [`fields.${field}[in]`]: values
            });
            return items;
          })
        ),
        Promise.allSettled(
          requests.preview.map(async ({ content_type, field, values }) => {
            const { items } = await previewClient.getEntries<any>({
              content_type,
              include: 0,
              [`fields.${field}[in]`]: values
            });
            return items;
          })
        )
      ]);

      timer.end();

      const collectedPreview = collectedPreviewSettled.filter(isFulFilled);
      const collectedProd = collectedProdSettled.filter(isFulFilled);

      const prev = collectedPreview.flatMap((p) => p.value || []);
      const prod = collectedProd.flatMap((p) => p.value || []);

      logger.debug('Fetched entries by field value', {
        caller: 'getBatchEntriesByFieldValueFetcher',
        elapsedMs: timer.millis,
        itemsAttempted: keys.length,
        itemsSuccessful: prev.length + prod.length
      });

      const result = keys.map(({ preview, field, value, contentType }) => {
        const arr = preview ? prev : prod;
        return (
          arr.find((i: BaseEntry) => {
            return i.sys.contentType.sys.id === contentType && (i.fields as any)[field]?.[defaultLocale] === value;
          }) || null
        );
      });

      return result;
    };
  };

  const getBatchEntriesRefByFetcher = (): DataLoader.BatchLoadFn<RefByKey, BaseEntry[]> => {
    return async (keys) => {
      const timer = new Timer();
      const refByRequests = keys.reduce((acc, { contentType, field, id, preview }) => {
        const clientType = preview ? 'preview' : 'prod';
        if (!acc[clientType]) {
          acc[clientType] = {};
        }
        if (!acc[clientType][contentType]) {
          acc[clientType][contentType] = {};
        }
        if (!acc[clientType][contentType][field]) {
          acc[clientType][contentType][field] = [];
        }
        acc[clientType][contentType][field].push(id);
        return acc;
      }, {} as { [clientType: string]: { [contentType: string]: { [field: string]: string[] } } });

      const requests = Object.entries(refByRequests).reduce(
        (acc, [clientType, requestObject]) => {
          const requestObjects = Object.entries(requestObject).reduce((acc, [content_type, fieldValues]) => {
            Object.entries(fieldValues).forEach(([field, ids]) => {
              acc.push({
                content_type,
                field,
                ids: ids.join(',')
              });
            });
            return acc;
          }, [] as { content_type: string; field: string; ids: string }[]);

          if (clientType === 'preview') {
            acc.preview.push(...requestObjects);
          } else if (clientType === 'prod') {
            acc.prod.push(...requestObjects);
          }
          return acc;
        },
        { prod: [], preview: [] } as {
          prod: { content_type: string; field: string; ids: string }[];
          preview: { content_type: string; field: string; ids: string }[];
        }
      );

      const [collectedProdSettled, collectedPreviewSettled] = await Promise.all([
        Promise.allSettled(
          requests.prod.map(async ({ content_type, field, ids }) => {
            const { items } = await prodClient.getEntries<any>({
              content_type,
              include: 0,
              [`fields.${field}.sys.id[in]`]: ids
            });
            return items;
          })
        ),
        Promise.allSettled(
          requests.preview.map(async ({ content_type, field, ids }) => {
            const { items } = await previewClient.getEntries<any>({
              content_type,
              include: 0,
              [`fields.${field}.sys.id[in]`]: ids
            });
            return items;
          })
        )
      ]);

      timer.end();

      const collectedPreview = collectedPreviewSettled.filter(isFulFilled);
      const collectedProd = collectedProdSettled.filter(isFulFilled);

      const prev = collectedPreview.flatMap((p) => p.value || []);
      const prod = collectedProd.flatMap((p) => p.value || []);

      const result = keys.map(({ preview, field, id, contentType }) => {
        const arr = preview ? prev : prod;
        return arr.reduce((acc, x) => {
          if (x.sys.contentType.sys.id === contentType) {
            const fieldValue = x.fields[field]?.[defaultLocale];
            if (Array.isArray(fieldValue)) {
              if (fieldValue.some((f) => (f as any)?.sys?.type === 'Link' && (f as any)?.sys?.id === id)) {
                acc.push(x);
              }
            } else if ((fieldValue as any)?.sys?.type === 'Link' && (fieldValue as any)?.sys?.id === id) {
              acc.push(x);
            }
          }
          return acc;
        }, [] as BaseEntry[]);
      });

      logger.debug('Fetched entries by ref by', {
        caller: 'getBatchEntriesRefByFetcher',
        elapsedMs: timer.millis,
        itemsAttempted: keys.length,
        itemsSuccessful: prev.length + prod.length
      });

      return result;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, BaseEntry[]> => {
    return async (keys) => {
      const timer = new Timer();
      const out = await Promise.allSettled(
        map(keys, (key) =>
          (async () => {
            const { preview, id } = key;
            return (await makeContentfulRequest(preview ? previewClient : prodClient, 'getEntries', maxBatchSize, {
              content_type: id,
              include: 0,
              locale: '*'
            })) as BaseEntry[];
          })()
        )
      );

      timer.end();

      let numSuccessfulTypes = 0;
      let numSuccessfulEntries = 0;

      const finalOut = out.map((settledArrOfEntries, idx) => {
        if (settledArrOfEntries.status === 'rejected') {
          logger.error(
            `Unable to fetch content type ${keys[idx].id}. Reason: ${settledArrOfEntries.reason.message} ${(
              settledArrOfEntries.reason.details?.errors || []
            ).map((e: any) => `${e.name}: ${e.value}`)}`,
            {
              caller: 'getBatchEntriesByContentTypeFetcher'
            }
          );
          return [];
        }
        numSuccessfulTypes++;
        numSuccessfulEntries += (settledArrOfEntries.value || []).length;
        return settledArrOfEntries.value;
      });

      logger.debug(`Fetched entries for contenttypes (types)`, {
        caller: 'getBatchEntriesByContentTypeFetcher',
        elapsedMs: timer.millis,
        itemsSuccessful: numSuccessfulTypes,
        itemsAttempted: keys.length
      });

      logger.debug(`Fetched entries by contentType (entries)`, {
        caller: 'getBatchEntriesByContentTypeFetcher',
        elapsedMs: timer.millis,
        itemsSuccessful: numSuccessfulEntries
      });

      return finalOut;
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<BaseEntry>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<BaseAsset>('assets'), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(), options);
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer();
      const result = await (preview ? previewClient : prodClient).getContentTypes();
      logger.debug('Fetched all content types', {
        caller: 'fetchAllContentTypes',
        elapsedMs: timer.end().millis,
        itemsSuccessful: result.items.length
      });
      return result.items;
    } catch (err: any) {
      logger.error(`Unable to fetch content types : ${err.message}`, {
        caller: 'fetchAllContentTypes',
        stack: err.stack
      });
      return [];
    }
  };

  const entryByFieldValueLoader = new DataLoader(getBatchEntriesByFieldValueFetcher(), fvlOptions);
  const entriesRefByLoader = new DataLoader(getBatchEntriesRefByFetcher(), refByOptions);

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
