import flow from 'lodash/fp/flow';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import { join } from 'path';
import { ensureDir, writeFile, createFile } from 'fs-extra';
import { Asset, Entry, createClient, ContentfulClientApi, ContentType } from 'contentful';
import Timer from '@last-rev/timer';
import logger from 'loglevel';
import LastRevAppConfig from '@last-rev/app-config';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext, createLoaders } from '@last-rev/graphql-contentful-helpers';

const ENTRIES_DIRNAME = 'entries';
const ASSETS_DIRNAME = 'assets';
const CONTENT_TYPES_DIRNAME = 'content_types';
const CONTENT_TYPE_ENTRIES_DIRNAME = 'entry_ids_by_content_type';

const delay = (m: number) => new Promise((r) => setTimeout(r, m));

export type SlugToIdLookup = {
  [contentTypeIdSlug: string]: string;
};

export type ContentTypeIdToContentIdsLookup = {
  [contentTypeId: string]: string[];
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
  contentTypeId: string
): Promise<Entry<any>[]> => {
  return (
    await client.sync({
      initial: true,
      content_type: contentTypeId,
      resolveLinks: false
    })
  ).entries;
};

const syncAllAssets = async (client: ContentfulClientApi): Promise<Asset[]> => {
  return (
    await client.sync({
      initial: true,
      resolveLinks: false,
      type: 'Asset'
    })
  ).assets;
};

const syncAllEntries = async (client: ContentfulClientApi, contentTypes: ContentType[]): Promise<Entry<any>[]> => {
  return flatten(
    await Promise.all(
      contentTypes.map((contentType, index) =>
        (async () => {
          const {
            sys: { id: contentTypeId }
          } = contentType;
          await delay(index * 100);
          return await syncAllEntriesForContentType(client, contentTypeId);
        })()
      )
    )
  );
};

const sync = async (config: LastRevAppConfig, sites?: string[]) => {
  const totalTimer = new Timer('Total elapsed time');

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

  let timer = new Timer(`fetched entries and assets`);
  const [entries, assets] = await Promise.all([syncAllEntries(client, contentTypes), syncAllAssets(client)]);
  logger.trace(timer.end());

  const entryIdsByContentTypeLookup = groupByContentTypeAndMapToIds(entries);

  const root = join(
    config.fs.contentDir,
    config.contentful.spaceId,
    config.contentful.env,
    config.contentful.usePreview ? 'preview' : 'production'
  );

  timer = new Timer('wrote content files');
  await Promise.all([
    writeContentfulItems(entries, root, ENTRIES_DIRNAME),
    writeContentfulItems(assets, root, ASSETS_DIRNAME),
    writeContentfulItems(contentTypes, root, CONTENT_TYPES_DIRNAME),
    writeEntriesByContentTypeFiles(entryIdsByContentTypeLookup, root)
  ]);
  logger.trace(timer.end());

  timer = new Timer('wrote paths tree');

  await updateAllPaths({
    config,
    updateForPreview: !!config.contentful.usePreview,
    updateForProd: !config.contentful.usePreview,
    context: await createContext(config, createLoaders(config)),
    sites
  });
  logger.trace(timer.end());

  logger.trace(totalTimer.end());
};

export default sync;
