import { ApolloClient } from '@apollo/client';
import { algoliaQuery, avaliableLocalesQuery } from './gql/queries';
import { AlgoliaRecord, QueryConfig } from './types';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'queryGqlForObjectsToIndexByEntryIds'
});

const queryGqlForObjectsToIndexByEntryIds = async (
  client: ApolloClient<any>,
  envs: ('preview' | 'production')[],
  ids: string[]
): Promise<AlgoliaRecord[]> => {
  let timer = new Timer();
  const {
    data: {
      availableLocales: { available: locales }
    }
  } = await client.query({ query: avaliableLocalesQuery });

  const queryConfigs: QueryConfig[] = (locales as string[]).flatMap((locale) =>
    envs.flatMap((env) => ({
      preview: env === 'preview',
      locale,
      ids
    }))
  );

  const results = (
    await Promise.allSettled(
      queryConfigs.map(async (queryConfig) => {
        const filter = {
          displayType: 'AlgoliaRecord',
          ...queryConfig
        };
        const timerQuery = new Timer();
        const result = await client.query({
          query: algoliaQuery,
          variables: {
            filter
          }
        });

        const {
          data: { contents: algoliaResults }
        } = result;

        logger.debug('Queried contentful for Algolia Records', {
          elapsedMs: timerQuery.end().millis,
          caller: 'queryGqlForObjectsToIndexByEntryIds',
          query: JSON.stringify(filter),
          itemsSuccessful: algoliaResults.length
        });

        return algoliaResults;
      })
    )
  ).flat();

  const result = (results.filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<any>[])
    .map((r) => r.value)
    .flat();

  logger.debug('Queried Contentful for Algolia records', {
    elapsedms: timer.end().millis,
    caller: 'queryGqlForObjectsToIndexByEntryIds',
    itemsSuccessful: result.length
  });

  (results.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).forEach((r) => {
    logger.error(r.reason.message, {
      caller: 'queryGqlForObjectsToIndexByEntryIds',
      stack: r.reason.stack
    });
  });

  return result;
};

export default queryGqlForObjectsToIndexByEntryIds;
