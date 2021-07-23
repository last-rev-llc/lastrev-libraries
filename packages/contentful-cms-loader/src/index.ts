import DataLoader from 'dataloader';
import { Entry, Asset, ContentType, createClient } from 'contentful';
import { find, map } from 'lodash';
import logger from 'loglevel';
import Timer from '@last-rev/timer';

export type ContentfulCmsLoaders = {
  entryLoader: DataLoader<string, Entry<any> | null>;
  assetLoader: DataLoader<string, Asset | null>;
  entriesByContentTypeLoader: DataLoader<string, Entry<any>[]>;
  fetchAllContentTypes: () => Promise<ContentType[]>;
};

const createLoaders = (
  accessToken: string,
  space: string,
  environment: string,
  isPreview: boolean
): ContentfulCmsLoaders => {
  const client = createClient({
    accessToken,
    space,
    environment,
    host: `${isPreview ? 'preview' : 'cdn'}.contentful.com`
  });

  const getBatchItemFetcher = <T extends Entry<any> | Asset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<string, T | null> => {
    return async (ids): Promise<(T | null)[]> => {
      const timer = new Timer(`Fetched ${dirname} from CMS`);
      const query = { 'sys.id[in]': ids.join(','), 'include': 0, 'locale': '*' };
      const command = dirname === 'entries' ? 'getEntries' : 'getAssets';
      const result = await client[command]<any>(query);
      logger.debug(timer.end());
      // need to return items in same order as list of ids, replacing items not found with null values
      return ids.map((id) => find(result.items, (item) => (item as Entry<any> | Asset).sys.id === id) || null) as T[];
    };
  };

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<string, Entry<any>[]> => {
    return async (contentTypeIds) => {
      const timer = new Timer(`Fetched entries by contentType from CMS`);
      const out = await Promise.all(
        map(contentTypeIds, (contentTypeId) =>
          (async () => {
            const result = await client.getEntries({
              content_type: contentTypeId,
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
  const fetchAllContentTypes = async () => {
    try {
      const timer = new Timer('Fetched all content types from CMS');
      const result = await client.getContentTypes();
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
