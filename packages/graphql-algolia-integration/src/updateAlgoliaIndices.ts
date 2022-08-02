import { SearchClient } from 'algoliasearch';
import { AlgoliaObjectsByIndex } from './types';
import logger from 'loglevel';
import Timer from '@last-rev/timer';

const updateAlgoliaIndices = async (
  algoliaClient: SearchClient,
  algoliaObjectsByIndex: AlgoliaObjectsByIndex,
  maxRecords?: number
): Promise<any[]> => {
  const timer = new Timer(`Updated Algolia indices`);
  const toProcess = Object.keys(algoliaObjectsByIndex).map((index) => ({
    objects: algoliaObjectsByIndex[index],
    index
  }));

  const finalResults = await Promise.allSettled(
    toProcess.map(async ({ objects, index }) => {
      const indexObject = await algoliaClient.initIndex(index);
      await indexObject.replaceAllObjects(maxRecords ? objects.slice(0, maxRecords) : objects);
    })
  );

  logger.trace(timer.end());

  return finalResults
    .filter((result) => result.status === 'rejected')
    .map((result) => (result as PromiseRejectedResult).reason);
};

export default updateAlgoliaIndices;
