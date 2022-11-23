import { SearchClient } from 'algoliasearch';
import LastRevAppConfig from '@last-rev/app-config';

import { AlgoliaQueryByReferencedIdResult } from './types';
import { stringifyObejctFromAlgolia } from './utils';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-algolia-integration',
  module: 'queryAlgoliaByReferencedId'
});

const recursiveQueryAlgoliaByReferencedId = async ({
  algoliaClient,
  id,
  queries,
  contentfulEntryIds = new Set(),
  stringifiedToObjectIdMap = new Map(),
  config
}: {
  algoliaClient: SearchClient;
  id: string;
  queries: any; // not sure why algolia does not export all types.
  contentfulEntryIds?: Set<string>;
  stringifiedToObjectIdMap?: Map<string, string>;
  config: LastRevAppConfig;
}): Promise<AlgoliaQueryByReferencedIdResult> => {
  const r = await algoliaClient.multipleQueries<{ entryId: string }>(queries);
  const additionalQueries: any[] = [];
  const { hitsPerPage } = config.algolia;

  r.results.forEach((result) => {
    result.hits.forEach((hit) => {
      contentfulEntryIds.add(hit.entryId);
      const stringified = stringifyObejctFromAlgolia(result.index!, hit);
      const key = `${stringified}::${hit.objectID}`;
      stringifiedToObjectIdMap.set(key, hit.objectID);
    });
    if (result.nbPages > result.page + 1) {
      additionalQueries.push({
        indexName: result.index,
        params: {
          hitsPerPage,
          page: result.page + 1,
          filters: `referencedIds:${id}`
        }
      });
    }
  });

  if (additionalQueries.length > 0) {
    return await recursiveQueryAlgoliaByReferencedId({
      algoliaClient,
      id,
      queries: additionalQueries,
      contentfulEntryIds,
      stringifiedToObjectIdMap,
      config
    });
  }
  return {
    contentfulEntryIds: Array.from(contentfulEntryIds),
    stringifiedToObjectIdMap
  };
};

const queryAlgoliaByReferencedId = async ({
  algoliaClient,
  id,
  config
}: {
  algoliaClient: SearchClient;
  id: string;
  config: LastRevAppConfig;
}) => {
  const timer = new Timer();
  const { indices, hitsPerPage } = config.algolia;

  if (!indices || indices.length === 0) {
    logger.error('No indices found in config: algolia.indices', {
      caller: 'queryAlgoliaByReferencedId'
    });
    return {
      contentfulEntryIds: [],
      stringifiedToObjectIdMap: new Map()
    };
  }

  const queries = indices.map((indexName) => ({
    indexName,
    params: {
      hitsPerPage,
      filters: `referencedIds:${id}`
    }
  }));

  const res = await recursiveQueryAlgoliaByReferencedId({
    algoliaClient,
    id,
    queries,
    config
  });
  logger.debug('queryAlgoliaByReferencedId', {
    caller: 'queryAlgoliaByReferencedId',
    id,
    elapsedMs: timer.end().millis,
    resultsSuccessful: res.contentfulEntryIds.length
  });
  return res;
};

export default queryAlgoliaByReferencedId;
