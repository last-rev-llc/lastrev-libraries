import { SearchClient } from 'algoliasearch';
import { AlgoliaInstructions } from './types';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'performTargetedReindex'
});

/**
 *
 * @param instructions
 * @param algoliaClient
 * @returns
 *
 * Takes the instructions and performs the targeted reindex
 */
const performTargetedReindex = async (
  instructions: AlgoliaInstructions,
  algoliaClient: SearchClient
): Promise<void> => {
  const timer = new Timer();

  await algoliaClient.multipleBatch(instructions).wait();
  logger.debug('performed targeted reindex', {
    caller: 'performTargetedReindex',
    elapsedMs: timer.end().millis
  });
};

export default performTargetedReindex;
