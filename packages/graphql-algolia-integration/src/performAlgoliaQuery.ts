import { ApolloClient } from '@apollo/client';
import LastRevAppConfig from '@last-rev/app-config';
import { algoliaQuery, avaliableLocalesQuery } from './queries';
import { AlgoliaRecord, QueryConfig } from './types';
import Timer from '@last-rev/timer';
import logger from 'loglevel';

const performAlgoliaQuery = async (
  client: ApolloClient<any>,
  config: LastRevAppConfig,
  envs: ('preview' | 'production')[]
): Promise<{ errors: any[]; results: AlgoliaRecord[][] }> => {
  let timer = new Timer(`Performed Algolia query`);
  const {
    data: {
      availableLocales: { available: locales }
    }
  } = await client.query({ query: avaliableLocalesQuery });

  const queryConfigs: QueryConfig[] = (locales as string[]).flatMap((locale) =>
    envs.flatMap((env) => ({
      preview: env === 'preview',
      locale
    }))
  );

  const results = (
    await Promise.allSettled(
      queryConfigs.map(async (queryConfig) => {
        const filter = {
          contentTypes: config.algolia.contentTypeIds,
          displayType: 'AlgoliaRecord',
          ...queryConfig
        };

        const result = await client.query({
          query: algoliaQuery,
          variables: {
            filter
          }
        });

        const {
          data: { contents: algoliaResults }
        } = result;

        return algoliaResults;
      })
    )
  ).flat();

  logger.trace(timer.end());

  return {
    errors: (results.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]).map((r) => r.reason),
    results: (results.filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<any>[]).map(
      (r) => r.value
    )
  };
};

export default performAlgoliaQuery;
