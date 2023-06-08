import { ApolloClient } from '@apollo/client';
import LastRevAppConfig from '@last-rev/app-config';
import { algoliaQuery, avaliableLocalesQuery, idsQuery } from './queries';
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
  } = await client.query<{ availableLocales: { available: string[] } }>({ query: avaliableLocalesQuery });

  const idsQueryFilters: QueryConfig[] = envs.flatMap((env) =>
    config.algolia.contentTypeIds.flatMap((contentType: string) => ({
      preview: env === 'preview',
      contentTypes: [contentType]
    }))
  );

  const idsResults = await Promise.allSettled(
    idsQueryFilters.map(async (filter) => {
      const timerQuery = new Timer();
      const result = await client.query({
        query: idsQuery,
        variables: {
          filter
        }
      });

      logger.debug('Query for Ids', {
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
  );

  const idsErrors = (idsResults.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).map(
    (r) => r.reason
  );
  const ids = (idsResults.filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<{ id: string }>[])
    .map((r) => r.value)
    .flat()
    .map((r) => r.id);

  const batches = ids.reduce(
    (acc, id) => {
      const lastBatch = acc[acc.length - 1];
      if (lastBatch.length < (config.algolia.maxBatchSize || 1000)) {
        return [...acc.slice(0, acc.length - 1), [...lastBatch, id]];
      }
      return [...acc, [id]];
    },
    [[]] as string[][]
  );

  const queryFilters = locales.flatMap((locale) =>
    envs.flatMap((env) =>
      batches.map((batch) => ({
        displayType: 'AlgoliaRecord',
        preview: env === 'preview',
        locale,
        ids: batch
      }))
    )
  );

  const results = await Promise.allSettled(
    queryFilters.map(async (filter) => {
      const timerQuery = new Timer();
      const result = await client.query({
        query: algoliaQuery,
        variables: {
          filter
        }
      });
      logger.debug('Query for algolia objects by ids', {
        caller: 'performAlgoliaQuery',
        emapsedMs: timerQuery.end().millis,
        itemsSuccessful: result.data.contents.length
      });
      const {
        data: { contents: algoliaResults }
      } = result;
      return algoliaResults;
    })
  );

  logger.debug('performAlgoliaQuery', {
    caller: 'performAlgoliaQuery',
    elapsedMs: timer.end().millis,
    itemsSuccessful: results.length
  });

  return {
    errors: [
      ...idsErrors,
      ...(idsResults.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).map((r) => r.reason)
    ],
    results: (results.filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<any>[]).map(
      (r) => r.value
    )
  };
};

export default performAlgoliaQuery;
