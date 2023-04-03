import DataLoader, { Options } from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { transform, omitBy, filter, negate, isEmpty, isError, isNil, map, some } from 'lodash';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { ItemKey, ContentfulLoaders, FVLKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { keyBy, partition } from 'lodash';
import { zipObject } from 'lodash';

const logger = getWinstonLogger({ package: 'contentful-dynamodb-loader', module: 'index', strategy: 'dynamodb' });

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
  const dynamoDB = DynamoDBDocument.from(
    new DynamoDB({
      region: config.dynamodb.region,
      credentials: {
        accessKeyId: config.dynamodb.accessKeyId,
        secretAccessKey: config.dynamodb.secretAccessKey
      }
    })
  );

  const pk = (preview: boolean) =>
    `${config.contentful.spaceId}:${config.contentful.env}:${preview ? 'preview' : 'production'}`;

  const getAll = async ({
    params,
    results = []
  }: {
    params: any;
    results?: any[];
  }): Promise<QueryCommandOutput['Items']> => {
    const data = await dynamoDB.query(params);
    if (data.LastEvaluatedKey) {
      return await getAll({
        params: { ...params, ExclusiveStartKey: data.LastEvaluatedKey },
        results: [...results, ...(data.Items || [])]
      });
    }
    return [...results, ...(data.Items || [])];
  };

  const fetchAndSet = async <T>(
    keys: readonly ItemKey[],
    fallbackLoader: DataLoader<ItemKey, T>,
    dirname: string
  ): Promise<(T | null)[]> => {
    let timer = new Timer();

    const results: (Entry<any> | Asset)[] = map(
      await Promise.all(
        keys.map(({ preview, id }) =>
          dynamoDB.get({
            TableName: config.dynamodb.tableName,
            AttributesToGet: ['data'],
            Key: {
              pk: pk(preview),
              sk: `${dirname}:${id}`
            }
          })
        )
      ),
      ({ Item }) => Item?.data
    );

    logger.debug(`Fetched ${dirname}`, {
      caller: 'fetchAndSet',
      elapsedMs: timer.end().millis,
      itemsSuccessful: results.length,
      itemsAttempted: keys.length
    });

    let keyedResults = keyBy(results, 'sys.id');

    const cacheMissIds: ItemKey[] = filter(keys, (key) => !keyedResults[key.id]);

    if (cacheMissIds.length) {
      timer = new Timer();
      const sourceResults = filter(await fallbackLoader.loadMany(cacheMissIds), (r) => {
        return r && !isError(r);
      }) as unknown as (Entry<any> | Asset)[];

      keyedResults = {
        ...keyedResults,
        ...keyBy(sourceResults, 'sys.id')
      };

      await Promise.all(
        sourceResults.map((result, i) =>
          dynamoDB.put({
            TableName: config.dynamodb.tableName,
            Item: {
              // items returned from fallback loader are guaranteed to be in the same order as the keys
              pk: pk(cacheMissIds[i].preview),
              sk: `${dirname}:${result.sys.id}`,
              ...(result.sys.type === 'Entry' ? { type: result.sys.contentType.sys.id } : {}),
              data: result
            }
          })
        )
      ).finally(() =>
        logger.debug(`Primed ${dirname}`, {
          caller: 'fetchAndSet',
          elapsedMs: timer.end().millis,
          itemsAttempted: cacheMissIds.length
        })
      );
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
    let timer = new Timer();

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
      const entries = map(itemList, 'data') as unknown as Entry<any>[];
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

    logger.debug(`Fetch entries by contentType`, {
      caller: 'getBatchEntriesByContentTypeFetcher',
      elapsedMs: timer.end().millis,
      itemsSuccessful: results.length,
      itemsAttempted: keys.length
    });

    const cacheMissIds = filter(keys, (key) => !keyedResults[`${key.id}::${key.preview}`]);

    if (cacheMissIds.length) {
      const sourceResults = await fallbackLoaders.entriesByContentTypeLoader.loadMany(cacheMissIds);
      const keyedSourceResults = zipObject(
        map(cacheMissIds, ({ id, preview }) => `${id}::${preview}`),
        sourceResults
      );

      timer = new Timer();

      const filtered = filter(sourceResults, negate(isError)) as Entry<any>[][];

      await Promise.all(
        map(filtered, async (entries: Entry<any>[], i) => {
          const key = cacheMissIds[i];
          return await Promise.all(
            map(entries, async (entry) =>
              dynamoDB.put({
                TableName: config.dynamodb.tableName,
                Item: {
                  // items returned from fallback loader are guaranteed to be in the same order as the keys
                  pk: pk(key.preview),
                  sk: `entries:${entry.sys.id}`,
                  type: entry.sys.contentType.sys.id,
                  data: entry
                }
              })
            )
          );
        })
      ).finally(() =>
        logger.debug(`Primed content type entry lists`, {
          caller: 'getBatchEntriesByContentTypeFetcher',
          elapsedMs: timer.end().millis,
          itemsAttempted: cacheMissIds.length
        })
      );

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
  const fetchAllContentTypes = async (preview: boolean): Promise<ContentType[]> => {
    try {
      let timer = new Timer();

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

      logger.debug('Fetched all content types', {
        caller: 'fetchAllContentTypes',
        elapsedMs: timer.end().millis,
        itemsSuccessful: results.length
      });

      if (isEmpty(results) || some(results, (result) => isNil(result))) {
        timer = new Timer();
        const contentTypes = await fallbackLoaders.fetchAllContentTypes(preview);

        if (contentTypes.length) {
          await Promise.all(
            map(contentTypes, async (contentType) =>
              dynamoDB.put({
                TableName: config.dynamodb.tableName,
                Item: {
                  pk: pk(preview),
                  sk: `content_types:${contentType.sys.id}`,
                  data: contentType
                }
              })
            )
          ).finally(() =>
            logger.debug('Prime all content types', {
              caller: 'fetchAllContentTypes',
              elapsedMs: timer.end().millis,
              itemsAttempted: contentTypes.length
            })
          );
        }
        return contentTypes;
      }
      return results as unknown as ContentType[];
    } catch (err: any) {
      logger.error(`Unable to fetch content types: ${err.message}`, {
        caller: 'fetchAllContentTypes',
        stack: err.stack
      });
      return [];
    }
  };

  const entryByFieldValueLoader = new DataLoader(getBatchEntriesByFieldValueFetcher(), flvOptions);

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllContentTypes,
    entryByFieldValueLoader,
    entriesRefByLoader: fallbackLoaders.entriesRefByLoader
  };
};

export default createLoaders;
