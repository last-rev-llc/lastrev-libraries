import { SearchClient } from 'algoliasearch';
import Timer from '@last-rev/timer';
import LastRevAppConfig from 'packages/app-config/dist';
import queryAlgoliaForAllObjects from './queryAlgoliaForAllObjects';
// import axios from 'axios';
import { successResponse } from './utils';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { StateType } from './types';
import queryGqlForAllObjects from './queryGqlForAllObjects';
import generateAlgoliaInstructions from './generateAlgoliaInstructions';
import performTargetedReindex from './performTargetedReindex';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'reindexFull'
});

// const chunk = <T>(arr: T[], chunkSize: number, cache: T[][] = []) => {
//   const tmp = [...arr];
//   if (chunkSize <= 0) return cache;
//   while (tmp.length) cache.push(tmp.splice(0, chunkSize));
//   return cache;
// };

const reindexFull = async ({
  config,
  algoliaClient,
  apolloClient
}: {
  algoliaClient: SearchClient;
  config: LastRevAppConfig;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  /* , endpointUrl: string */
}) => {
  const timer = new Timer();

  const stateTypes: StateType[] = config.algolia.indexDraftContent ? ['preview', 'production'] : ['production'];

  const [algoliaRecords, stringifiedToObjectIdMap] = await Promise.all([
    queryGqlForAllObjects(apolloClient, config, stateTypes),
    queryAlgoliaForAllObjects({
      algoliaClient,
      config
    })
  ]);

  const instructions = generateAlgoliaInstructions(stringifiedToObjectIdMap, algoliaRecords);

  // TODO: still unsure of best way to batch this, or if it is needed.
  // if batching is needed, we should get all IDs of objects to be indexed, and batch these requests
  // to the targeted Indexer lambda function.
  await performTargetedReindex(instructions, algoliaClient);

  logger.debug('Performed full reindex to algolia', {
    elapsedMs: timer.end().millis,
    caller: 'reindexFull'
  });

  return successResponse(`Successfully queued full reindex`);
};

export default reindexFull;
