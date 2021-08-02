import DataLoader from 'dataloader';
import { Entry, Asset, ContentType, createClient, ContentfulClientApi } from 'contentful';
import { find, map, partition } from 'lodash';
import logger from 'loglevel';
import Timer from '@last-rev/timer';

export type ItemKey = {
  id: string;
  preview?: boolean;
};

export type ContentfulCmsLoaders = {
  entryLoader: DataLoader<ItemKey, Entry<any> | null>;
  assetLoader: DataLoader<ItemKey, Asset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, Entry<any>[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};

const createLoaders = (
  deliveryToken: string,
  previewToken: string,
  space: string,
  environment: string
): ContentfulCmsLoaders => {
  const prodClient = createClient({
    accessToken: deliveryToken,
    space,
    environment,
    host: 'cdn.contentful.com'
  });

  const previewClient = createClient({
    accessToken: previewToken,
    space,
    environment,
    host: 'preview.contentful.com'
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

      logger.debug(timer.end());
      return items;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> => {
    return async (keys) => {
      const timer = new Timer(`Fetched entries by contentType from CMS`);
      const out = await Promise.all(
        map(keys, (key) =>
          (async () => {
            const { preview, id } = key;
            const result = await (preview ? previewClient : prodClient).getEntries({
              content_type: id,
              include: 0,
              locale: '*'
            });
            return result.items || ([] as Entry<any>[]);
          })()
        )
      );
      logger.debug(timer.end());
      return out;
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher());
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer('Fetched all content types from CMS');
      const result = await (preview ? previewClient : prodClient).getContentTypes();
      logger.debug(timer.end());
      return result.items;
    } catch (err) {
      console.error('Unable to fetch content types using cms loader:', err.message);
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
