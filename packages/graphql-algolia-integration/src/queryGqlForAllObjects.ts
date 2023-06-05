import { ApolloClient } from '@apollo/client';
import LastRevAppConfig from '@last-rev/app-config';
import { algoliaQuery, avaliableLocalesQuery } from './gql/queries';
import { AlgoliaRecord, QueryConfig, StateType } from './types';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'performAlgoliaQuery'
});

const queryGqlForAllObjects = async (
  client: ApolloClient<any>,
  config: LastRevAppConfig,
  stateTypes: StateType[]
): Promise<AlgoliaRecord[]> => {
  let timer = new Timer();
  const {
    data: {
      availableLocales: { available: locales }
    }
  } = await client.query({ query: avaliableLocalesQuery });

  const queryConfigs: QueryConfig[] = (locales as string[]).flatMap((locale) =>
    stateTypes.flatMap((env) =>
      config.algolia.contentTypeIds.flatMap((contentType) => ({
        preview: env === 'preview',
        locale,
        contentTypes: [contentType]
      }))
    )
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

        logger.debug('queryGqlForAllObjects (query)', {
          caller: 'queryGqlForAllObjects',
          emapsedMs: timerQuery.end().millis,
          itemsSuccessful: result.data.contents.length,
          query: JSON.stringify(filter)
        });

        const {
          data: { contents: algoliaResults }
        } = result;

        return algoliaResults;
      })
    )
  ).flat();

  logger.debug('queryGqlForAllObjects', {
    caller: 'queryGqlForAllObjects',
    elapsedMs: timer.end().millis,
    itemsSuccessful: results.length
  });

  (results.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).forEach((r) => {
    logger.error(r.reason.message, {
      caller: 'queryGqlForAllObjects',
      stack: r.reason.stack
    });
  });

  return (results.filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<AlgoliaRecord[]>[])
    .map((r) => r.value)
    .flat();
};

export default queryGqlForAllObjects;
