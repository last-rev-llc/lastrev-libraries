import map from 'lodash/map';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import flow from 'lodash/fp/flow';
import { writeFile, ensureDir, createFile, readFile } from 'fs-extra';
import { join } from 'path';
import { Asset, ContentType, Entry } from 'contentful';
import { ContentTypeIdToContentIdsLookup, ContentTypeIdToSyncTokensLookup } from './types';
import { CONTENT_TYPE_ENTRIES_DIRNAME } from './constants';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'contentful-sync-to-fs',
  module: 'utils'
});

export const validateArg = (arg: any, argname: string) => {
  if (!arg) throw Error(`Missing required argument: ${argname}`);
};

export const delay = (m: number) => new Promise((r) => setTimeout(r, m));

export const groupByContentTypeAndMapToIds = flow(
  groupBy('sys.contentType.sys.id'),
  mapValues((entries) => map(entries, 'sys.id'))
);

export const writeItems = async (
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

export const writeEntriesByContentTypeFiles = async (
  lookup: ContentTypeIdToContentIdsLookup,
  root: string
): Promise<void> => {
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

export const writeSyncTokens = async (
  syncTokens: ContentTypeIdToSyncTokensLookup,
  root: string,
  dirname: string
): Promise<void> => {
  const dir = join(root, dirname);
  await ensureDir(dir);

  await writeFile(join(dir, `sync_tokens.json`), JSON.stringify(syncTokens));
};

export const readSyncTokens = async (root: string, dirname: string): Promise<ContentTypeIdToSyncTokensLookup> => {
  try {
    const filename = join(root, dirname, `sync_tokens.json`);
    logger.info(`Using sync tokens from: ${filename}`, {
      caller: 'readSyncTokens'
    });
    const syncTokens = JSON.parse(await readFile(filename, 'utf-8'));

    return syncTokens;
  } catch (error) {
    return {};
  }
};
