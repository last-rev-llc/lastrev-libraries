import flatten from 'lodash/flatten';

import { join } from 'path';
import { createClient, SanityClient } from '@sanity/client';
import type { SchemaType } from 'sanity';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';
import LastRevAppConfig from '@last-rev/app-config';
import { updateAllPaths } from '@last-rev/cms-path-util';
import { createContext } from '@last-rev/graphql-cms-helpers';
import {
  validateArg,
  delay,
  writeItems,
  writeEntriesByContentTypeFiles,
  readSyncTokens,
  writeSyncTokens,
  groupSanityDocsByTypeAndMapToIds
} from './utils';
import { ENTRIES_DIRNAME, ASSETS_DIRNAME, CONTENT_TYPES_DIRNAME, SYNC_TOKEN_DIRNAME } from './constants';
import { ContentTypeIdToSyncTokensLookup } from './types';

export type SanitySyncCollection = {
  syncToken: string;
  items: any[];
};

const logger = getWinstonLogger({
  package: 'cms-sync-to-fs',
  module: 'sanitySync'
});

const syncAllEntriesForSchemaType = async (
  client: SanityClient,
  contentTypeId: string,
  syncToken?: string
): Promise<SanitySyncCollection> => {
  // Simple GROQ query - fetch documents by type with optional sync token filter
  const query = `*[_type == $contentTypeId${syncToken ? ' && _updatedAt > $syncToken' : ''}]`;
  const params = {
    contentTypeId,
    ...(syncToken && { syncToken })
  };

  const entries = await client.fetch(query, params);

  // Store plain Sanity documents - normalize drafts. prefix
  const items = entries.map((entry: any) => {
    const id = entry._id?.startsWith('drafts.') ? entry._id.substring(7) : entry._id;
    return { ...entry, _id: id };
  });
  const currentDate = new Date().toISOString();

  return {
    syncToken: currentDate,
    items
  };
};

const syncAllAssets = async (
  client: SanityClient,
  syncToken?: string
): Promise<SanitySyncCollection> => {
  // Simple GROQ query - fetch assets with optional sync token filter
  const query = `*[_type in ['sanity.imageAsset', 'sanity.fileAsset']${
    syncToken ? ' && _updatedAt > $syncToken' : ''
  }]`;
  const params = {
    ...(syncToken && { syncToken })
  };

  const assets = await client.fetch(query, params);

  // Store plain Sanity documents - normalize drafts. prefix
  const items = assets.map((asset: any) => {
    const id = asset._id?.startsWith('drafts.') ? asset._id.substring(7) : asset._id;
    return { ...asset, _id: id };
  });
  const currentDate = new Date().toISOString();

  return {
    syncToken: currentDate,
    items
  };
};

const syncAllEntries = async (
  client: SanityClient,
  contentTypes: SchemaType[],
  syncTokens: ContentTypeIdToSyncTokensLookup
): Promise<SanitySyncCollection[]> => {
  return Promise.all(
    contentTypes.map((contentType, index) =>
      (async () => {
        // Use Sanity schema type name instead of Contentful sys.id
        const contentTypeId = contentType.name;

        if (!syncTokens[contentTypeId]) {
          await delay(index * 100);
        }

        return syncAllEntriesForSchemaType(client, contentTypeId, syncTokens[contentTypeId]);
      })()
    )
  );
};

const sanitySync = async (config: LastRevAppConfig, usePreview: boolean, sites?: string[]) => {
  validateArg(config.sanity.token, 'sanity.token');
  validateArg(config.sanity.projectId, 'sanity.projectId');
  validateArg(config.sanity.dataset, 'sanity.dataset');

  const totalTimer = new Timer();

  const client = createClient({
    token: config.sanity.token,
    projectId: config.sanity.projectId,
    dataset: config.sanity.dataset,
    ...(usePreview ? { perspective: 'drafts', useCdn: false } : { useCdn: true }),
    apiVersion: config.sanity.apiVersion
  });

  // Use native Sanity schema types directly
  const contentTypes: SchemaType[] = config.sanity.schemaTypes || [];

  const root = join(
    config.fs.contentDir,
    config.sanity.projectId,
    config.sanity.dataset,
    usePreview ? 'preview' : 'production'
  );

  let timer = new Timer();
  const syncTokens = await readSyncTokens(root, SYNC_TOKEN_DIRNAME);
  const [entriesResults, assetsResult] = await Promise.all([
    syncAllEntries(client, contentTypes, syncTokens),
    syncAllAssets(client, syncTokens['asset'])
  ]);

  const entries = flatten(entriesResults.map((result) => result.items));
  const assets = assetsResult.items;

  logger.debug(`fetched entries and assets`, {
    caller: 'sync',
    elapsedMs: timer.end().millis,
    itemsSuccessful: entries.length + assets.length
  });

  // Group Sanity documents by _type for entry lookup
  const entryIdsByContentTypeLookup = groupSanityDocsByTypeAndMapToIds(entries);
  const nextSyncTokens: ContentTypeIdToSyncTokensLookup = contentTypes.reduce(
    (accum, contentType, idx) => ({
      ...accum,
      [contentType.name]: entriesResults[idx]?.syncToken
    }),
    {}
  );
  nextSyncTokens['asset'] = assetsResult.syncToken;

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

export default sanitySync;
