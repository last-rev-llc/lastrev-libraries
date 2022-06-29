import DataLoader, { Options } from 'dataloader';
import { Entry, Asset, createClient, ContentfulClientApi } from 'contentful';
import { find, map, partition } from 'lodash';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { ItemKey, ContentfulLoaders, FVLKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { chunk, makeContentfulRequest } from './helpers';
import { LOG_PREFIX } from './constants';

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

const isFulFilled = <T>(p: PromiseSettledResult<T>): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): ContentfulLoaders => {
  const prodClient = createClient({
    accessToken: config.contentful.contentDeliveryToken,
    space: config.contentful.spaceId,
    environment: config.contentful.env,
    host: 'cdn.contentful.com',
    resolveLinks: false
  });

  const previewClient = createClient({
    accessToken: config.contentful.contentPreviewToken,
    space: config.contentful.spaceId,
    environment: config.contentful.env,
    host: 'preview.contentful.com',
    resolveLinks: false
  });

  const maxBatchSize = config.contentful.maxBatchSize || 1000;

  logger.debug(`${LOG_PREFIX} createLoaders() maxBatchSize: ${maxBatchSize}`);

  const fetchBatchItems = async (
    ids: string[],
    command: 'getEntries' | 'getAssets',
    client: ContentfulClientApi,
    maxBatchSize: number
  ) => {
    const commandString = command.substring(3).toLowerCase();
    logger.debug(`${LOG_PREFIX} fetchBatchItems() Attempting to fetch ${ids.length} ${commandString} from Contentful`);
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
          `${LOG_PREFIX} fetchBatchItems(). Unable to fetch ${batchSize} ${commandString}. Reason: ${
            p.reason.message
          } ${(p.reason.details?.errors || []).map((e: any) => `${e.name}: ${e.value}`)}`
        );
        return [];
      }
      return p.value || [];
    });

    logger.debug(
      `${LOG_PREFIX} fetchBatchItems() Found ${results.length} ${command.substring(3).toLowerCase()} in Contentful`
    );
    return results;
  };

  const getBatchItemFetcher = <T extends Entry<any> | Asset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<ItemKey, T | null> => {
    return async (keys): Promise<(T | null)[]> => {
      const timer = new Timer(`Fetched ${dirname} from CMS`);
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
            return preview && (item as Entry<any> | Asset).sys.id === id;
          }) ||
          find(prodItems, (item) => {
            return !preview && (item as Entry<any> | Asset).sys.id === id;
          }) ||
          null
        );
      }) as T[];

      logger.trace(`${LOG_PREFIX} ${timer.end()}`);
      return items;
    };
  };

  const getBatchEntriesByFieldValueFetcher = (): DataLoader.BatchLoadFn<FVLKey, Entry<any> | null> => {
    return async (keys) => {
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
              locale: '*',
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
              locale: '*',
              include: 0,
              [`fields.${field}[in]`]: values
            });
            return items;
          })
        )
      ]);

      const collectedPreview = collectedPreviewSettled.filter(isFulFilled);
      const collectedProd = collectedProdSettled.filter(isFulFilled);

      const prev = collectedPreview.flatMap((p) => p.value || []);
      const prod = collectedProd.flatMap((p) => p.value || []);

      const result = keys.map(({ preview, field, value, contentType }) => {
        const arr = preview ? prev : prod;
        return (
          arr.find((i: Entry<any>) => {
            return i.sys.contentType.sys.id === contentType && i.fields[field]?.[defaultLocale] === value;
          }) || null
        );
      });

      return result;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> => {
    return async (keys) => {
      logger.debug(
        `${LOG_PREFIX} getBatchEntriesByContentTypeFetcher() Attempting to fetch entries for ${keys.length} content types from Contentful`
      );
      const timer = new Timer(`Fetched entries by contentType from CMS`);
      const out = await Promise.allSettled(
        map(keys, (key) =>
          (async () => {
            const { preview, id } = key;
            return (await makeContentfulRequest(preview ? previewClient : prodClient, 'getEntries', maxBatchSize, {
              content_type: id,
              include: 0,
              locale: '*'
            })) as Entry<any>[];
          })()
        )
      );
      logger.trace(`${LOG_PREFIX} ${timer.end()}`);

      let numSuccessfulTypes = 0;
      let numSuccessfulEntries = 0;

      const finalOut = out.map((settledArrOfEntries, idx) => {
        if (settledArrOfEntries.status === 'rejected') {
          logger.error(
            `${LOG_PREFIX} getBatchEntriesByContentTypeFetcher(). Unable to fetch content type ${
              keys[idx].id
            }. Reason: ${settledArrOfEntries.reason.message} ${(settledArrOfEntries.reason.details?.errors || []).map(
              (e: any) => `${e.name}: ${e.value}`
            )}`
          );
          return [];
        }
        numSuccessfulTypes++;
        numSuccessfulEntries += (settledArrOfEntries.value || []).length;
        return settledArrOfEntries.value;
      });

      logger.debug(
        `${LOG_PREFIX} getBatchEntriesByContentTypeFetcher() Fetched ${numSuccessfulEntries} entries for ${numSuccessfulTypes} content types from Contentful`
      );

      return finalOut;
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(), options);
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer('Fetched all content types from CMS');
      const result = await (preview ? previewClient : prodClient).getContentTypes();
      logger.trace(`${LOG_PREFIX} ${timer.end()}`);
      return result.items;
    } catch (err: any) {
      logger.error(`${LOG_PREFIX} Unable to fetch content types : ${err.message}`);
      return [];
    }
  };

  const entryByFieldValueLoader = new DataLoader(getBatchEntriesByFieldValueFetcher(), fvlOptions);

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    entryByFieldValueLoader,
    fetchAllContentTypes
  };
};

export default createLoaders;
