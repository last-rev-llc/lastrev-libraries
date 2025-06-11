import flatten from 'lodash/flatten';

import { join } from 'path';
import { createClient, ContentfulClientApi, SyncCollection } from 'contentful';
import { ContentType } from '@last-rev/types';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';
import LastRevAppConfig from '@last-rev/app-config';
import { updateAllPaths } from '@last-rev/cms-path-util';
import { createContext } from '@last-rev/graphql-cms-helpers';
import {
  validateArg,
  delay,
  writeItems,
  writeEntriesByContentTypeFiles,
  writeSyncTokens,
  readSyncTokens
} from './utils';
import { ENTRIES_DIRNAME, ASSETS_DIRNAME, CONTENT_TYPES_DIRNAME, SYNC_TOKEN_DIRNAME } from './constants';
import { ContentTypeIdToSyncTokensLookup } from './types';
import { groupByContentTypeAndMapToIds } from './utils';

const logger = getWinstonLogger({
  package: 'cms-sync-to-fs',
  module: 'contentfulSync'
});

const syncAllEntriesForContentType = async (
  client: ContentfulClientApi,
  contentTypeId: string,
  nextSyncToken?: string,
  config?: LastRevAppConfig
): Promise<SyncCollection> => {
  const result = await client.sync({
    initial: !nextSyncToken,
    content_type: contentTypeId,
    resolveLinks: false,
    nextSyncToken,
    ...(!nextSyncToken && config && config.contentful.syncLimit && { limit: config.contentful.syncLimit })
  });

  return result;
};

const syncAllAssets = async (client: ContentfulClientApi, nextSyncToken?: string): Promise<SyncCollection> => {
  return await client.sync({
    initial: !nextSyncToken,
    resolveLinks: false,
    nextSyncToken,
    type: 'Asset'
  });
};

const syncAllEntries = async (
  client: ContentfulClientApi,
  contentTypes: ContentType[],
  syncTokens: ContentTypeIdToSyncTokensLookup,
  config: LastRevAppConfig
): Promise<SyncCollection[]> => {
  return Promise.all(
    contentTypes.map((contentType, index) =>
      (async () => {
        const {
          sys: { id: contentTypeId }
        } = contentType;

        if (!syncTokens[contentTypeId]) {
          await delay(index * 100);
        }

        return syncAllEntriesForContentType(client, contentTypeId, syncTokens[contentTypeId], config);
      })()
    )
  );
};

const contentfulSync = async (config: LastRevAppConfig, usePreview: boolean, sites?: string[]) => {
  validateArg(config.contentful.contentDeliveryToken, 'contentful.contentDeliveryToken');
  validateArg(config.contentful.contentPreviewToken, 'contentful.contentPreviewToken');
  validateArg(config.contentful.spaceId, 'contentful.spaceId');

  const totalTimer = new Timer();

  const client = createClient({
    accessToken: usePreview ? config.contentful.contentPreviewToken : config.contentful.contentDeliveryToken,
    space: config.contentful.spaceId,
    environment: config.contentful.env,
    host: usePreview ? `preview.contentful.com` : `cdn.contentful.com`,
    resolveLinks: false
  });

  const { items: contentTypes } = await client.getContentTypes();

  const root = join(
    config.fs.contentDir,
    config.contentful.spaceId,
    config.contentful.env,
    usePreview ? 'preview' : 'production'
  );

  let timer = new Timer();
  const syncTokens = await readSyncTokens(root, SYNC_TOKEN_DIRNAME);
  const [entriesResults, assetsResult] = await Promise.all([
    syncAllEntries(client, contentTypes, syncTokens, config),
    syncAllAssets(client, syncTokens['asset'])
  ]);

  const entries = flatten(entriesResults.map((result) => result.entries));
  const assets = assetsResult.assets;

  logger.debug(`fetched entries and assets`, {
    caller: 'sync',
    elapsedMs: timer.end().millis,
    itemsSuccessful: entries.length + assets.length
  });

  const entryIdsByContentTypeLookup = groupByContentTypeAndMapToIds(entries);
  const nextSyncTokens: ContentTypeIdToSyncTokensLookup = contentTypes.reduce(
    (accum, contentType, idx) => ({
      ...accum,
      [contentType?.sys?.id]: entriesResults[idx]?.nextSyncToken
    }),
    {}
  );
  nextSyncTokens['asset'] = assetsResult.nextSyncToken;

  timer = new Timer();
  await Promise.all([
    writeItems(entries, root, ENTRIES_DIRNAME),
    writeItems(assets, root, ASSETS_DIRNAME),
    writeItems(contentTypes, root, CONTENT_TYPES_DIRNAME),
    writeEntriesByContentTypeFiles(entryIdsByContentTypeLookup, root),
    writeSyncTokens(nextSyncTokens, root, SYNC_TOKEN_DIRNAME)
  ]);
  logger.debug('Wrote content files', {
    caller: 'sync',
    elapsedMs: timer.end().millis,
    itemsSuccessful:
      entries.length + assets.length + contentTypes.length + Object.keys(entryIdsByContentTypeLookup).length
  });

  timer = new Timer();

  await updateAllPaths({
    config,
    updateForPreview: usePreview,
    updateForProd: !usePreview,
    context: await createContext({ config }),
    sites
  });
  logger.debug('wrote paths tree', {
    caller: 'sync',
    elapsedMs: timer.end().millis
  });

  logger.debug('Sync to file system', {
    caller: 'sync',
    elapsedMs: totalTimer.end().millis
  });
};

export default contentfulSync;
