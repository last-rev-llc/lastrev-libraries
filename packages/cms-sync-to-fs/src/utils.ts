import map from 'lodash/map';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import flow from 'lodash/fp/flow';
import { writeFile, ensureDir, createFile, readFile } from 'fs-extra';
import { join } from 'path';
import { BaseAsset, BaseEntry, ContentType } from '@last-rev/types';
import { ContentTypeIdToContentIdsLookup, ContentTypeIdToSyncTokensLookup } from './types';
import { CONTENT_TYPE_ENTRIES_DIRNAME, DOCUMENT_IDS_BY_TYPE_DIRNAME } from './constants';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'cms-sync-to-fs',
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

/**
 * Group Sanity documents by _type and map to _id arrays.
 * Used for building entry_ids_by_content_type lookup.
 */
export const groupSanityDocsByTypeAndMapToIds = flow(
  groupBy('_type'),
  mapValues((docs) => map(docs, '_id'))
);

export const writeItems = async (
  items: (BaseEntry | BaseAsset | ContentType | Record<string, any>)[],
  root: string,
  dirname: string
): Promise<void> => {
  const dir = join(root, dirname);
  await ensureDir(dir);
  await Promise.all(
    items.map((item) =>
      (async () => {
        // Handle both Contentful (sys.id) and Sanity (_id or name) formats
        let id: string | undefined;
        if ('sys' in item && (item as any).sys?.id) {
          id = (item as any).sys.id;
        } else if ('_id' in item) {
          id = (item as any)._id;
        } else if ('name' in item) {
          id = (item as any).name;
        }

        if (!id) {
          logger.warn('Item has no identifiable id field', { item });
          return;
        }
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

/**
 * Write document IDs grouped by _type for Sanity (unified document model).
 * Creates: document_ids_by_type/{typeName}/{docId} files
 */
export const writeDocumentIdsByTypeFiles = async (
  lookup: Record<string, string[]>,
  root: string
): Promise<void> => {
  const dir = join(root, DOCUMENT_IDS_BY_TYPE_DIRNAME);
  await ensureDir(dir);

  await Promise.all(
    Object.entries(lookup).map(([typeName, ids]) =>
      (async () => {
        const typeDir = join(dir, typeName);
        await ensureDir(typeDir);
        await Promise.all(ids.map((id) => createFile(join(typeDir, id))));
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
