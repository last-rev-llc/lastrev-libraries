import flow from 'lodash/fp/flow';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import { join } from 'path';
import { readFile, ensureDir, writeFile, createFile } from 'fs-extra';
import { Asset, Entry, createClient, ContentfulClientApi, ContentType, SyncCollection } from 'contentful';
import Timer from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';
import LastRevAppConfig from '@last-rev/app-config';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext } from '@last-rev/graphql-contentful-helpers';

const logger = getWinstonLogger({
  package: 'contentful-sync-to-fs',
  module: 'contentfulSyncToFs'
});

const ENTRIES_DIRNAME = 'entries';
const ASSETS_DIRNAME = 'assets';
const CONTENT_TYPES_DIRNAME = 'content_types';
const CONTENT_TYPE_ENTRIES_DIRNAME = 'entry_ids_by_content_type';
const SYNC_TOKEN_DIRNAME = '';

const delay = (m: number) => new Promise((r) => setTimeout(r, m));

export type SlugToIdLookup = {
  [contentTypeIdSlug: string]: string;
};

export type ContentTypeIdToContentIdsLookup = {
  [contentTypeId: string]: string[];
};

export type ContentTypeIdToSyncTokensLookup = {
  [contentTypeId: string]: string;
};

const groupByContentTypeAndMapToIds = flow(
  groupBy('sys.contentType.sys.id'),
  mapValues((entries) => map(entries, 'sys.id'))
);

const writeContentfulItems = async (
  items: (Entry<any> | Asset | ContentType)[],
  root: string,
  dirname: string
): Promise<void> => {
  const dir = join(root, dirname);
  await ensureDir(dir);
  await Promise.all(
    items.map((item) =>
      (async () => {
        const {
          sys: { id }
        } = item;
        const filename = join(dir, `${id}.json`);
        await writeFile(filename, JSON.stringify(item));
      })()
    )
  );
};

const writeContentfulSyncTokens = async (
  syncTokens: ContentTypeIdToSyncTokensLookup,
  root: string,
  dirname: string
): Promise<void> => {
  const dir = join(root, dirname);
  await ensureDir(dir);

  await writeFile(join(dir, `sync_tokens.json`), JSON.stringify(syncTokens));
};

const readContentfulSyncTokens = async (root: string, dirname: string): Promise<ContentTypeIdToSyncTokensLookup> => {
  try {
    const filename = join(root, dirname, `sync_tokens.json`);
    logger.info(`Using sync tokens from: ${filename}`, {
      caller: 'readContentfulSyncTokens'
    });
    const syncTokens = JSON.parse(await readFile(filename, 'utf-8'));

    return syncTokens;
  } catch (error) {
    return {};
  }
};

const writeEntriesByContentTypeFiles = async (lookup: ContentTypeIdToContentIdsLookup, root: string): Promise<void> => {
  const dir = join(root, CONTENT_TYPE_ENTRIES_DIRNAME);
  await ensureDir(dir);

  await Promise.all(
    Object.keys(lookup).map((contentTypeId) =>
      (async () => {
        const innerDir = join(dir, contentTypeId);
        await ensureDir(innerDir);
        const contentIds = lookup[contentTypeId];
        await Promise.all(
          contentIds.map((contentId) =>
            (async () => {
              const innerDir = join(dir, contentTypeId);
              await createFile(join(innerDir, contentId));
            })()
          )
        );
      })()
    )
  );
};

const validateArg = (arg: any, argname: string) => {
  if (!arg) throw Error(`Missing required argument: ${argname}`);
};

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

const sync = async (config: LastRevAppConfig, sites?: string[]) => {
  if (config.cms === 'Sanity') {
    logger.info('Sanity file sync is not supported yet', {
      caller: 'sync'
    });
    return;
  }

  const totalTimer = new Timer();

  validateArg(config.fs.contentDir, 'fs.contentDir');
  validateArg(config.contentful.contentDeliveryToken, 'contentful.contentDeliveryToken');
  validateArg(config.contentful.contentPreviewToken, 'contentful.contentPreviewToken');
  validateArg(config.contentful.spaceId, 'contentful.spaceId');

  const client = createClient({
    accessToken: config.contentful.usePreview
      ? config.contentful.contentPreviewToken
      : config.contentful.contentDeliveryToken,
    space: config.contentful.spaceId,
    environment: config.contentful.env,
    host: config.contentful.usePreview ? `preview.contentful.com` : `cdn.contentful.com`,
    resolveLinks: false
  });
  const { items: contentTypes } = await client.getContentTypes();

  const root = join(
    config.fs.contentDir,
    config.contentful.spaceId,
    config.contentful.env,
    config.contentful.usePreview ? 'preview' : 'production'
  );

  let timer = new Timer();
  const syncTokens = await readContentfulSyncTokens(root, SYNC_TOKEN_DIRNAME);
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
    writeContentfulItems(entries, root, ENTRIES_DIRNAME),
    writeContentfulItems(assets, root, ASSETS_DIRNAME),
    writeContentfulItems(contentTypes, root, CONTENT_TYPES_DIRNAME),
    writeEntriesByContentTypeFiles(entryIdsByContentTypeLookup, root),
    writeContentfulSyncTokens(nextSyncTokens, root, SYNC_TOKEN_DIRNAME)
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
    updateForPreview: !!config.contentful.usePreview,
    updateForProd: !config.contentful.usePreview,
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

export default sync;
