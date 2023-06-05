import { SearchClient } from 'algoliasearch';
import LastRevAppConfig from '@last-rev/app-config';
import { stringifyObejctFromAlgolia } from './utils';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'queryAlgoliaForAllObjects'
});

const getObjectEntryTripletsForIndex = async ({
  algoliaClient,
  indexName,
  stringifiedToObjectIdMap
}: {
  algoliaClient: SearchClient;
  indexName: string;
  stringifiedToObjectIdMap: Map<string, string>;
}): Promise<void> => {
  const timer = new Timer();

  const index = algoliaClient.initIndex(indexName);

  await index.browseObjects<{ entryId: string }>({
    batch: (batch) => {
      batch.forEach((hit) => {
        const stringified = stringifyObejctFromAlgolia(indexName, hit);
        stringifiedToObjectIdMap.set(stringified, hit.objectID);
      });
    }
  });

  logger.debug('got Object entry triplets for index', {
    caller: 'getObjectEntryTripletsForIndex',
    elapsedMs: timer.end().millis
  });
};

const queryAlgoliaForAllObjects = async ({
  algoliaClient,
  config
}: {
  algoliaClient: SearchClient;
  config: LastRevAppConfig;
}): Promise<Map<string, string>> => {
  const timer = new Timer();
  const { indices } = config.algolia;

  const stringifiedToObjectIdMap = new Map<string, string>();

  const results = await Promise.allSettled(
    indices.map(
      async (indexName) => await getObjectEntryTripletsForIndex({ algoliaClient, indexName, stringifiedToObjectIdMap })
    )
  );

  logger.debug('Queried Algolia for all objects', {
    caller: 'queryAlgoliaForAllObjects',
    elapsedMs: timer.end().millis,
    itemsSuccessful: Object.keys(stringifiedToObjectIdMap).length
  });

  (results.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).forEach((r) => {
    logger.error(r.reason.message, {
      caller: 'queryAlgoliaForAllObjects',
      stack: r.reason.stack
    });
  });

  return stringifiedToObjectIdMap;
};

export default queryAlgoliaForAllObjects;
