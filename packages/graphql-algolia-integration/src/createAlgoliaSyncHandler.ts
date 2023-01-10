import LastRevAppConfig from '@last-rev/app-config';
import algoliasearch from 'algoliasearch';
import parseWebhook from '@last-rev/contentful-webhook-parser';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
import groupAlgoliaObjectsByIndex from './groupAlgoliaObjectsByIndex';
import performAlgoliaQuery from './performAlgoliaQuery';
import updateAlgoliaIndices from './updateAlgoliaIndices';
import { getWinstonLogger } from '@last-rev/logging';
import extractDomainUrlFromEvent from './extractDomainUrlFromEvent';
import Timer from '@last-rev/timer';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'createAlgoliaSyncHandler'
});

const createAlgoliaSyncHandler = (config: LastRevAppConfig, graphQlUrl: string, maxRecords?: number) => {
  const { algolia } = config;

  const algoliaClient = algoliasearch(algolia.applicationId, algolia.adminApiKey);

  return async (event: any) => {
    const timer = new Timer();
    try {
      if (!event) {
        throw Error('no event object passed.');
      }

      const domainUrl = extractDomainUrlFromEvent(event);

      const uri = graphQlUrl.startsWith('/') ? `${domainUrl}${graphQlUrl}` : graphQlUrl;

      const apolloClient = new ApolloClient({
        link: new HttpLink({ uri, fetch }),
        cache: new InMemoryCache()
      });

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
      logger.debug('Algolia sync handler', {
        caller: 'createAlgoliaSyncHandler',
        elapsedMs: timer.end().millis
      });

      if (allErrors.length) {
        allErrors.map((error) =>
          logger.error(`Error syncing to Algolia: ${error.message}`, {
            caller: 'createAlgoliaSyncHandler',
            stack: error.stack
          })
        );
        throw Error('There were some errors while syncing to Algolia. Please check the function logs for details.');
      }
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Success`
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: err?.message || err
      };
    }
  };
};

export default createAlgoliaSyncHandler;
