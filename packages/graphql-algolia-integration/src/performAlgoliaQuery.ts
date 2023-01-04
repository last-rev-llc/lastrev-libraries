import { ApolloClient } from '@apollo/client';
import LastRevAppConfig from '@last-rev/app-config';
import { algoliaQuery, avaliableLocalesQuery } from './queries';
import { AlgoliaRecord, QueryConfig } from './types';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'performAlgoliaQuery'
});

const performAlgoliaQuery = async (
  client: ApolloClient<any>,
  config: LastRevAppConfig,
  envs: ('preview' | 'production')[]
): Promise<{ errors: any[]; results: AlgoliaRecord[][] }> => {
  let timer = new Timer();
  const {
    data: {
      availableLocales: { available: locales }
    }
  } = await client.query({ query: avaliableLocalesQuery });

  const queryConfigs: QueryConfig[] = (locales as string[]).flatMap((locale) =>
    envs.flatMap((env) =>
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

        logger.debug('Perform Algolia query', {
          caller: 'performAlgoliaQuery',
          emapsedMs: timerQuery.end().millis,
          itemsSuccessful: result.data.contents.length,
          query: filter
        });

        const {
          data: { contents: algoliaResults }
        } = result;

        return algoliaResults;
      })
    )
  ).flat();

  logger.debug('performAlgoliaQuery', {
    caller: 'performAlgoliaQuery',
    elapsedMs: timer.end().millis,
    itemsSuccessful: results.length
  });

  return {
    errors: (results.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).map((r) => r.reason),
    results: (results.filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<any>[]).map(
      (r) => r.value
    )
  };
};

export default performAlgoliaQuery;
