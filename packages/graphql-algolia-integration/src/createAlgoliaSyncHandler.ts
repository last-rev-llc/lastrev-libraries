import LastRevAppConfig from '@last-rev/app-config';
import algoliasearch from 'algoliasearch';
import parseWebhook from '@last-rev/contentful-webhook-parser';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
import groupAlgoliaObjectsByIndex from './groupAlgoliaObjectsByIndex';
import performAlgoliaQuery from './performAlgoliaQuery';
import updateAlgoliaIndices from './updateAlgoliaIndices';
import logger from 'loglevel';

const createAlgoliaSyncHandler = (config: LastRevAppConfig, graphQlUrl: string, maxRecords?: number) => {
  const { algolia, logLevel } = config;

  logger.setLevel(logLevel);

  const algoliaClient = algoliasearch(algolia.applicationId, algolia.adminApiKey);
  const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: graphQlUrl, fetch }),
    cache: new InMemoryCache()
  });

  return async (event: any) => {
    try {
      const body = event.body ? JSON.parse(event.body) : null;
      const headers = event?.headers;

      let envs: ('preview' | 'production')[] = algolia.indexDraftContent ? ['preview', 'production'] : ['production'];

      try {
        const parsed = parseWebhook(config, body, headers);
        if (parsed.type === 'ContentType') {
          // don't do anything if only content type changed.
          return;
        }
        envs = parsed.envs;
        if (algolia.indexDraftContent && !parsed.envs.includes('production')) {
          // nothing to index
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/plain' },
            body: `Not indexing. Content is draft.`
          };
        }
      } catch (err) {
        // manually triggered. ignore, and use the default envs.
      }

      const { errors: queryErrors, results } = await performAlgoliaQuery(apolloClient, config, envs);

      const algoliaObjectsByIndex = groupAlgoliaObjectsByIndex(results);

      const updateErrors = await updateAlgoliaIndices(algoliaClient, algoliaObjectsByIndex, maxRecords);

      const allErrors = [...queryErrors, ...updateErrors];

      if (allErrors.length) {
        allErrors.map((error) => console.error(error));
        throw Error('There were some errors while syncing to Algolia. Please check the function logs for details.');
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Success`
      };
    } catch (err: any) {
      logger.error('err', err.message, err.stack);
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: err?.message || err
      };
    }
  };
};

export default createAlgoliaSyncHandler;
