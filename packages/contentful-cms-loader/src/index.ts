import DataLoader, { Options } from 'dataloader';
import { Entry, Asset, createClient, ContentfulClientApi } from 'contentful';
import { find, map, partition } from 'lodash';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { ItemKey, ContentfulLoaders } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const options: Options<ItemKey, any, string> = {
  cacheKeyFn: (key: ItemKey) => {
    return key.preview ? `${key.id}-preview` : `${key.id}-prod`;
  }
};

const createLoaders = (config: LastRevAppConfig): ContentfulLoaders => {
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

  const fetchBatchItems = async (ids: string[], command: 'getEntries' | 'getAssets', client: ContentfulClientApi) => {
    const query = { 'sys.id[in]': ids.join(','), 'include': 0, 'locale': '*' };
    return (await client[command]<any>(query)).items;
  };

  const getBatchItemFetcher = <T extends Entry<any> | Asset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<ItemKey, T | null> => {
    return async (keys): Promise<(T | null)[]> => {
      const timer = new Timer(`Fetched ${dirname} from CMS`);
      const [previewKeys, prodKeys] = partition(keys, (k) => k.preview);
      const command = dirname === 'entries' ? 'getEntries' : 'getAssets';
      const [previewItems, prodItems] = await Promise.all([
        fetchBatchItems(map(previewKeys, 'id'), command, previewClient),
        fetchBatchItems(map(prodKeys, 'id'), command, prodClient)
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

      logger.trace(timer.end());
      return items;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> => {
    return async (keys) => {
      const timer = new Timer(`Fetched entries by contentType from CMS`);
      const out = await Promise.allSettled(
        map(keys, (key) =>
          (async () => {
            const { preview, id } = key;
            const result = await (preview ? previewClient : prodClient).getEntries({
              content_type: id,
              include: 0,
              locale: '*'
            });
            return (result.items || []) as Entry<any>[];
          })()
        )
      );
      logger.trace(timer.end());

      return out.map((p, idx) => {
        if (p.status === 'rejected') {
          logger.error(
            `Error in Cms Loader. entriesByContentTypeLoader. Type: ${keys[idx].id}, ${p.reason.message} ${(
              p.reason.details?.errors || []
            ).map((e: any) => `${e.name}: ${e.value}`)}`
          );
          return [];
        }
        return p.value;
      });
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(), options);
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer('Fetched all content types from CMS');
      const result = await (preview ? previewClient : prodClient).getContentTypes();
      logger.trace(timer.end());
      return result.items;
    } catch (err: any) {
      logger.error('Unable to fetch content types using cms loader:', err.message);
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
