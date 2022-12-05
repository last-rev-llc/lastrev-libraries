import LastRevAppConfig from '@last-rev/app-config';
import algoliasearch from 'algoliasearch';
import parseWebhook from '@last-rev/contentful-webhook-parser';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
import groupAlgoliaObjectsByIndex from './groupAlgoliaObjectsByIndex';
import performAlgoliaQuery from './performAlgoliaQuery';
import updateAlgoliaIndices from './updateAlgoliaIndices';
import logger from 'loglevel';
import extractDomainUrlFromEvent from './extractDomainUrlFromEvent';
import Timer from '@last-rev/timer';

const createAlgoliaSyncHandler = (config: LastRevAppConfig, graphQlUrl: string, maxRecords?: number) => {
  const { algolia, logLevel } = config;

  logger.setLevel('TRACE');

  const algoliaClient = algoliasearch(algolia.applicationId, algolia.adminApiKey);

  return async (event: any) => {
    const timer = new Timer('Algolia sync handler');
    try {
      if (!event) {
        logger.error('no event object passed.');
        return;
      }

      const domainUrl = extractDomainUrlFromEvent(event);

      const uri = graphQlUrl.startsWith('/') ? `${domainUrl}${graphQlUrl}` : graphQlUrl;

      logger.debug('requesting from URL:', uri);

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

      const performAlgoliaQueryTime = new Timer('performAlgoliaQuery');
      const { errors: queryErrors, results } = await performAlgoliaQuery(apolloClient, config, envs);
      logger.debug(performAlgoliaQueryTime.end());

      const algoliaObjectsByIndex = groupAlgoliaObjectsByIndex(results);
      const updateAlgoliaIndicesTime = new Timer('updateAlgoliaIndices');
      const updateErrors = await updateAlgoliaIndices(algoliaClient, algoliaObjectsByIndex, maxRecords);
      logger.debug(updateAlgoliaIndicesTime.end());

      const allErrors = [...queryErrors, ...updateErrors];
      logger.debug(timer.end());

      if (allErrors.length) {
        allErrors.map((error) => logger.error(`Error syncing to Algolia: ${error.message || error}`));
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
