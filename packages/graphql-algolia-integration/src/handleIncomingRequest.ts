import LastRevAppConfig from '@last-rev/app-config';
import { SearchClient } from 'algoliasearch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
import { getWinstonLogger } from '@last-rev/logging';
import reindexFull from './reindexFull';
import reindexSingleEntry from './reindexSingleEntry';
import { errorResponse } from './utils';

// import reindexBatchEntries from './reindexBatchEntries';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'handleIncomingRequest'
});

enum ReindexType {
  SINGLE_ENTRY,
  FULL
  // BATCH
}

const handleIncomingRequest = async (
  config: LastRevAppConfig,
  algoliaClient: SearchClient,
  graphqlUrl: string,
  body: any,
  headers: Record<string, any>
) => {
  // there are 2 scenarios this endpoint needs to handle
  // 1. a webhook from contentful that indicates a change/create/delete of a contentful entry
  // 2. a request from the client to perform a full reindex
  try {
    if (!graphqlUrl) {
      logger.error('No graphql url passed in', {
        caller: 'handleIncomingRequest'
      });
      return errorResponse('Missing graphql url');
    }

    const apolloClient = new ApolloClient({
      link: new HttpLink({ uri: graphqlUrl, fetch }),
      cache: new InMemoryCache()
    });

    const reindexType: ReindexType =
      Object.keys(headers).includes('x-contentful-topic') && body ? ReindexType.SINGLE_ENTRY : ReindexType.FULL;

    switch (reindexType) {
      case ReindexType.SINGLE_ENTRY: {
        return await reindexSingleEntry({
          config,
          apolloClient,
          algoliaClient,
          body,
          headers
        });
      }
      case ReindexType.FULL: {
        return reindexFull({ algoliaClient, config, apolloClient });
      }
    }
  } catch (err: any) {
    logger.error(err.message, {
      caller: 'handleIncomingRequest',
      stack: err.stack
    });
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message
    };
  }
};

export default handleIncomingRequest;
