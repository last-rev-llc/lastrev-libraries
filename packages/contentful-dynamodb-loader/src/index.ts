import DataLoader, { Options } from 'dataloader';
import { Entry, Asset } from 'contentful';
import { transform, omitBy, filter, negate, isEmpty, isError, isNil, map, some } from 'lodash';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { ItemKey, ContentfulLoaders, FVLKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import AWS from 'aws-sdk';
import { keyBy, partition } from 'lodash';
import { zipObject } from 'lodash';

/*

  This loader assumes the following fields in dynamoDB:

  pk: "{spaceId}:{env}:{preview|production}"
  sk: "{entries|assets|content_types}:{id}"
  type: the content type of the entry, otherwise blank for other types
  data: the raw data of the object

*/

const options: Options<ItemKey, any, string> = {
  cacheKeyFn: (key: ItemKey) => {
    return key.preview ? `${key.id}-preview` : `${key.id}-prod`;
  }
};

const flvOptions: Options<FVLKey, any, string> = {
  cacheKeyFn: (key: FVLKey) => {
    const baseKey = `${key.contentType}-${key.field}-${key.value}`;
    return key.preview ? `${baseKey}-preview` : `${baseKey}-prod`;
  }
};

const createLoaders = (config: LastRevAppConfig, fallbackLoaders: ContentfulLoaders): ContentfulLoaders => {
  AWS.config.update({
    region: config.dynamodb.region,
    accessKeyId: config.dynamodb.accessKeyId,
    secretAccessKey: config.dynamodb.secretAccessKey
  });

  const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: config.dynamodb.region
  });

  const pk = (preview: boolean) =>
    `${config.contentful.spaceId}:${config.contentful.env}:${preview ? 'preview' : 'production'}`;

  const getAll = async ({
    params,
    results = []
  }: {
    params: any;
    results?: any[];
  }): Promise<AWS.DynamoDB.DocumentClient.ItemList> => {
    const data = await dynamoDB.query(params).promise();
    if (data.LastEvaluatedKey) {
      return await getAll({
        params: { ...params, ExclusiveStartKey: data.LastEvaluatedKey },
        results: [...results, ...(data.Items || [])]
      });
    }
    return [...results, ...(data.Items as [])];
  };

  const fetchAndSet = async <T>(
    keys: readonly ItemKey[],
    fallbackLoader: DataLoader<ItemKey, T>,
    dirname: string
  ): Promise<(T | null)[]> => {
    let timer = new Timer(`Fetched ${keys.length} ${dirname} from dynamodb`);

    const results: (Entry<any> | Asset)[] = map(
      await Promise.all(
        keys.map(({ preview, id }) =>
          dynamoDB
            .get({
              TableName: config.dynamodb.tableName,
              AttributesToGet: ['data'],
              Key: {
                pk: pk(preview),
                sk: `${dirname}:${id}`
              }
            })
            .promise()
        )
      ),
      ({ Item }) => Item?.data
    );

    logger.trace(timer.end());

    let keyedResults = keyBy(results, 'sys.id');

    const cacheMissIds: ItemKey[] = filter(keys, (key) => !keyedResults[key.id]);

    if (cacheMissIds.length) {
      logger.trace(`${dirname} cache misses: ${cacheMissIds.length}. Fetching from fallback`);
      timer = new Timer(`set ${cacheMissIds.length} ${dirname} in dynamodb`);
      const sourceResults = filter(await fallbackLoader.loadMany(cacheMissIds), (r) => {
        return r && !isError(r);
      }) as unknown as (Entry<any> | Asset)[];

      keyedResults = {
        ...keyedResults,
        ...keyBy(sourceResults, 'sys.id')
      };

      logger.trace('cacheMissIds', cacheMissIds);
      logger.trace('sourceResults', sourceResults);

      await Promise.all(
        sourceResults.map((result, i) =>
          dynamoDB
            .put({
              TableName: config.dynamodb.tableName,
              Item: {
                // items returned from fallback loader are guaranteed to be in the same order as the keys
                pk: pk(cacheMissIds[i].preview),
                sk: `${dirname}:${result.sys.id}`,
                ...(result.sys.type === 'Entry' ? { type: result.sys.contentType.sys.id } : {}),
                data: result
              }
            })
            // don't block
            .promise()
        )
      ).then(() => logger.trace(timer.end()));
    }
    return map(keys, (key) => {
      const result = keyedResults[key.id];
      return result ? result : null;
    }) as (T | null)[];
  };

  const getBatchItemFetcher =
    <T extends Entry<any> | Asset>(dirname: 'entries' | 'assets'): DataLoader.BatchLoadFn<ItemKey, T | null> =>
    async (keys) =>
      fetchAndSet<T>(
        keys,
        fallbackLoaders[dirname === 'entries' ? 'entryLoader' : 'assetLoader'] as DataLoader<ItemKey, T>,
        dirname
      );

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> => async (keys) => {
    let timer = new Timer(`Fetched ${keys.length} entries by contentType from dynamodb`);

    if (!keys.length) return [];

    const [previewKeys, productionKeys] = partition(keys, (key) => key.preview);

    const getAllEntriesByContentType = async (key: ItemKey) => {
      const itemList = await getAll({
        params: {
          TableName: config.dynamodb.tableName,
          KeyConditionExpression: '#pk = :pk and #type = :type',
          ExpressionAttributeNames: {
            '#pk': 'pk',
            '#type': 'type'
          },
          ExpressionAttributeValues: {
            ':pk': pk(key.preview),
            ':type': key.id
          },
          IndexName: 'pkTypeIndex'
        }
      });
      const entries: Entry<any>[] = map(itemList, 'data');
      return {
        entries,
        key
      };
    };

    const results = await Promise.all([
      ...map(previewKeys, (key) => getAllEntriesByContentType(key)),
      ...map(productionKeys, (key) => getAllEntriesByContentType(key))
    ]);

    let keyedResults = transform(
      results,
      (accum, v) => {
        accum[`${v.key.id}::${v.key.preview}`] = v.entries;
      },
      {} as Record<string, Entry<any>[]>
    );

    const cacheMissIds = filter(keys, (key) => !keyedResults[`${key.id}::${key.preview}`]);

    if (cacheMissIds.length) {
      const sourceResults = await fallbackLoaders.entriesByContentTypeLoader.loadMany(cacheMissIds);
      const keyedSourceResults = zipObject(
        map(cacheMissIds, ({ id, preview }) => `${id}::${preview}`),
        sourceResults
      );

      timer = new Timer(`Set ${sourceResults.length} content type entry lists in dynamodb`);

      const filtered = filter(sourceResults, negate(isError)) as Entry<any>[][];

      await Promise.all(
        map(filtered, async (entries: Entry<any>[], i) => {
          const key = cacheMissIds[i];
          return await Promise.all(
            map(entries, async (entry) =>
              dynamoDB
                .put({
                  TableName: config.dynamodb.tableName,
                  Item: {
                    // items returned from fallback loader are guaranteed to be in the same order as the keys
                    pk: pk(key.preview),
                    sk: `entries:${entry.sys.id}`,
                    type: entry.sys.contentType.sys.id,
                    data: entry
                  }
                })
                .promise()
            )
          );
        })
      ).then(() => logger.trace(timer.end()));

      keyedResults = {
        ...keyedResults,
        ...(omitBy(keyedSourceResults, (v) => isError(v)) as Record<string, Entry<any>[]>)
      };
    }

    return map(keys, (key) => keyedResults[`${key.id}::${key.preview}`] ?? []);
  };

  const getBatchEntriesByFieldValueFetcher = (): DataLoader.BatchLoadFn<FVLKey, Entry<any> | null> => {
    return async (keys) => fallbackLoaders.entryByFieldValueLoader.loadMany(keys);
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'), options);
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(), options);
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      let timer = new Timer('Fetched all content types from dynamodb');

      const itemList = await getAll({
        params: {
          TableName: config.dynamodb.tableName,
          KeyConditionExpression: '#pk = :pk and begins_with(#sk, :ct)',
          ExpressionAttributeNames: {
            '#pk': 'pk',
            '#sk': 'sk',
            '#data': 'data'
          },
          ProjectionExpression: ['#data'],
          ExpressionAttributeValues: {
            ':pk': pk(preview),
            ':ct': 'content_types'
          }
        }
      });

      const results = map(itemList, 'data');

      logger.trace(timer.end());

      if (isEmpty(results) || some(results, (result) => isNil(result))) {
        timer = new Timer('Set all content types in dynamodb');
        const contentTypes = await fallbackLoaders.fetchAllContentTypes(preview);

        if (contentTypes.length) {
          await Promise.all(
            map(contentTypes, async (contentType) =>
              dynamoDB
                .put({
                  TableName: config.dynamodb.tableName,
                  Item: {
                    pk: pk(preview),
                    sk: `content_types:${contentType.sys.id}`,
                    data: contentType
                  }
                })
                .promise()
            )
          ).then(() => logger.trace(timer.end()));
        }
        return contentTypes;
      }
      return results;
    } catch (err: any) {
      logger.error('Unable to fetch content types using dynamodb loader:', err.message);
      return [];
    }
  };

  const entryByFieldValueLoader = new DataLoader(getBatchEntriesByFieldValueFetcher(), flvOptions);

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllContentTypes,
    entryByFieldValueLoader
  };
};

export default createLoaders;
