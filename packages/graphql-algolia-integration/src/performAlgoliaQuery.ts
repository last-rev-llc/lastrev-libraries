import { GraphQLClient } from 'graphql-request';
import LastRevAppConfig from '@last-rev/app-config';
import { algoliaQuery, avaliableLocalesQuery, idsQuery } from './queries';
import { AlgoliaRecord, QueryConfig } from './types';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'performAlgoliaQuery'
});

const performAlgoliaQuery = async (
  client: GraphQLClient,
  config: LastRevAppConfig,
  envs: ('preview' | 'production')[]
): Promise<{ errors: any[]; results: AlgoliaRecord[][] }> => {
  let timer = new Timer();
  const {
    availableLocales: { available: locales }
  } = await client.request<{ availableLocales: { available: string[] } }>(avaliableLocalesQuery);

  const idsQueryFilters: QueryConfig[] = envs.flatMap((env) =>
    config.algolia.contentTypeIds.flatMap((contentType: string) => ({
      preview: env === 'preview',
      contentTypes: [contentType]
    }))
  );

  const idsResults = await Promise.allSettled(
    idsQueryFilters.map(async (filter) => {
      try {
        const timerQuery = new Timer();
        const result = await client.request<{ contents: { id: string }[] }>(idsQuery, {
          filter
        });

        logger.debug('Query for Ids', {
          caller: 'performAlgoliaQuery',
          emapsedMs: timerQuery.end().millis,
          itemsSuccessful: result.contents.length,
          query: filter
        });

        const { contents: algoliaResults } = result;

        return algoliaResults;
      } catch (err) {
        logger.error('[ERROR] Query for algolia objects by ids', {
          caller: 'performAlgoliaQuery',
          idsQuery,
          filter
        });
        throw err;
      }
    })
  );

  const idsErrors = (idsResults.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).map(
    (r) => r.reason
  );
  const ids = (
    idsResults.filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<{ id: string }[]>[]
  )
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
      const result = await client.request<{ contents: AlgoliaRecord[] }>(algoliaQuery, {
        filter
      });
      logger.debug('Query for algolia objects by ids', {
        caller: 'performAlgoliaQuery',
        emapsedMs: timerQuery.end().millis,
        itemsSuccessful: result.contents.length
      });
      const { contents: algoliaResults } = result;
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
