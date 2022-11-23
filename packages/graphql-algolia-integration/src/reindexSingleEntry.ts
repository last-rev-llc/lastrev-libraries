import LastRevAppConfig from '@last-rev/app-config';
import { SearchClient } from 'algoliasearch';
import parseWebhook from '@last-rev/contentful-webhook-parser';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import queryGqlForObjectsToIndexByEntryIds from './queryGqlForObjectsToIndexByEntryIds';
import { getWinstonLogger } from '@last-rev/logging';
import queryAlgoliaByReferencedId from './queryAlgoliaByReferencedId';
import { errorResponse, successResponse } from './utils';
import performTargetedReindex from './performTargetedReindex';
import generateAlgoliaInstructions from './generateAlgoliaInstructions';
import Timer from '@last-rev/timer';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'reindexSingleEntry'
});

const reindexSingleEntry = async ({
  config,
  apolloClient,
  algoliaClient,
  body,
  headers
}: {
  config: LastRevAppConfig;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  algoliaClient: SearchClient;
  body: any;
  headers: Record<string, string>;
}) => {
  const { algolia } = config;
  try {
    const timer = new Timer();
    const parsedBody = body ? JSON.parse(body) : null;
    const { type, contentStates } = parseWebhook(config, parsedBody, headers);

    if (type === 'ContentType') {
      // don't do anything if only content type changed.
      return;
    }

    const states = algolia.indexDraftContent ? contentStates : contentStates.filter((s) => s === 'production');

    if (!states.length) {
      logger.debug('Not indexing. Content is draft and algolia.indexDraftContent is false.', {
        caller: 'reindexSingleEntry',
        itemsSuccessful: 0
      });
      // nothing to index
      return successResponse(`Not indexing. Content is draft and algolia.indexDraftContent is false.`);
    }

    const id: string | undefined = parsedBody.sys.id;

    if (!id) {
      return errorResponse(`No ID found in data.sys.id`);
    }

    const { contentfulEntryIds, stringifiedToObjectIdMap } = await queryAlgoliaByReferencedId({
      algoliaClient,
      id,
      config
    });

    if (!contentfulEntryIds.length) {
      return successResponse(`No items found to reindex for id ${id}`);
    }

    const results = await queryGqlForObjectsToIndexByEntryIds(apolloClient, states, contentfulEntryIds);

    const instructions = generateAlgoliaInstructions(stringifiedToObjectIdMap, results);

    await performTargetedReindex(instructions, algoliaClient);

    logger.debug('reindexSingleEntry', {
      caller: 'reindexSingleEntry',
      elapsedMs: timer.end().millis,
      itemsSuccessful: results.length
    });
    return successResponse(`Successfully queued reindex for item ${id}`);
  } catch (err: any) {
    logger.error(err.message, {
      caller: 'reindexSingleEntry',
      stack: err.stack
    });
    return errorResponse('Unable to parse webhook body');
  }
};

export default reindexSingleEntry;
