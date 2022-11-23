import LastRevAppConfig from '@last-rev/app-config';
import algoliasearch from 'algoliasearch';
import type { ALBEvent, APIGatewayProxyEvent, APIGatewayProxyEventV2 } from 'aws-lambda';
import handleIncomingRequest from './handleIncomingRequest';

export type IncomingEvent = APIGatewayProxyEvent | APIGatewayProxyEventV2 | ALBEvent;

const createAlgoliaSyncLambdaHandler = (config: LastRevAppConfig, graphQlUrl: string) => {
  const { algolia } = config;

  const algoliaClient = algoliasearch(algolia.applicationId, algolia.adminApiKey);

  return async (event: IncomingEvent) => {
    const headers = event?.headers as Record<string, any>;
    try {
      return handleIncomingRequest(config, algoliaClient, graphQlUrl, event.body, headers);
    } catch (err: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  };
};

export default createAlgoliaSyncLambdaHandler;
