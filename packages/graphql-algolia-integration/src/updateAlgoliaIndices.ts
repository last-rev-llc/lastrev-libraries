import { SearchClient } from 'algoliasearch';
import LastRevAppConfig from '@last-rev/app-config';
import { AlgoliaObjectsByIndex } from './types';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'updateAlgoliaIndices'
});

const updateAlgoliaIndices = async (
  algoliaClient: SearchClient,
  algoliaObjectsByIndex: AlgoliaObjectsByIndex,
  config: LastRevAppConfig
): Promise<any[]> => {
  const timer = new Timer();
  const toProcess = Object.keys(algoliaObjectsByIndex).map((index) => ({
    objects: algoliaObjectsByIndex[index],
    index
  }));

  const finalResults = await Promise.allSettled(
    toProcess.map(async ({ objects, index }) => {
      const indexObject = algoliaClient.initIndex(index);
      await indexObject.replaceAllObjects(objects, { batchSize: config.algolia.maxBatchSize ?? 200 });
    })
  );

  const successfulResults = finalResults
    .filter((result) => result.status === 'rejected')
    .map((result) => (result as PromiseRejectedResult).reason);

  logger.debug(`Updated Algolia indices`, {
    caller: 'updateAlgoliaIndices',
    elapsedMs: timer.end().millis,
    itemsSuccessful: successfulResults.length
  });

  return successfulResults;
};

export default updateAlgoliaIndices;
