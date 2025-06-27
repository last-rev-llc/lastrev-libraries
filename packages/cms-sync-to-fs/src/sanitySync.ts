import flatten from 'lodash/flatten';

import { join } from 'path';
import { ContentType } from '@last-rev/types';
import { createClient, SanityClient } from '@sanity/client';
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
  writeSyncTokens
} from './utils';
import { ENTRIES_DIRNAME, ASSETS_DIRNAME, CONTENT_TYPES_DIRNAME, SYNC_TOKEN_DIRNAME } from './constants';
import { ContentTypeIdToSyncTokensLookup } from './types';
import { groupByContentTypeAndMapToIds } from './utils';
import { mapSanityTypesToContentfulTypes, convertSanityDoc } from '@last-rev/sanity-mapper';

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
  config: LastRevAppConfig,
  syncToken?: string
): Promise<SanitySyncCollection> => {
  const locales = config.sanity.supportedLanguages.map((locale) => locale.id);
  const defaultLocale = locales[0];
  const query = `*[_type == $contentTypeId${syncToken ? ' && _updatedAt > $syncToken' : ''} &&
  (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
  ...,
  "_translations": *[
    _type == "translation.metadata" &&
    references(^._id)
  ].translations[]{
    "doc": value->{
      ...
    }
  }[doc.__i18n_lang != $defaultLocale && defined(doc)]
}`;
  const params = {
    contentTypeId,
    defaultLocale,
    ...(syncToken && { syncToken })
  };

  const entries = await client.fetch(query, params);
  // TODO: remove this part when we fix localization
  const items = entries.map((entry: any) => convertSanityDoc(entry, defaultLocale, locales));
  const currentDate = new Date().toISOString();

  return {
    syncToken: currentDate,
    items
  };
};

const syncAllAssets = async (
  client: SanityClient,
  config: LastRevAppConfig,
  syncToken?: string
): Promise<SanitySyncCollection> => {
  const locales = config.sanity.supportedLanguages.map((locale) => locale.id);
  const defaultLocale = locales[0];
  const query = `*[_type in ['sanity.imageAsset', 'sanity.fileAsset']${
    syncToken ? ' && _updatedAt > $syncToken' : ''
  } &&
  (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
  ...,
  "_translations": *[
    _type == "translation.metadata" &&
    references(^._id)
  ].translations[]{
    "doc": value->{
      ...
    }
  }[doc.__i18n_lang != $defaultLocale && defined(doc)]
}`;
  const params = {
    defaultLocale,
    ...(syncToken && { syncToken })
  };

  const assets = await client.fetch(query, params);
  // TODO: remove this part when we fix localization
  const items = assets.map((asset: any) => convertSanityDoc(asset, defaultLocale, locales));
  const currentDate = new Date().toISOString();

  return {
    syncToken: currentDate,
    items
  };
};

const syncAllEntries = async (
  client: SanityClient,
  contentTypes: ContentType[],
  syncTokens: ContentTypeIdToSyncTokensLookup,
  config: LastRevAppConfig
): Promise<SanitySyncCollection[]> => {
  return Promise.all(
    contentTypes.map((contentType, index) =>
      (async () => {
        const {
          sys: { id: contentTypeId }
        } = contentType;

        if (!syncTokens[contentTypeId]) {
          await delay(index * 100);
        }

        return syncAllEntriesForSchemaType(client, contentTypeId, config, syncTokens[contentTypeId]);
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

  const contentTypes = mapSanityTypesToContentfulTypes(config.sanity.schemaTypes);

  const root = join(
    config.fs.contentDir,
    config.sanity.projectId,
    config.sanity.dataset,
    usePreview ? 'preview' : 'production'
  );

  let timer = new Timer();
  const syncTokens = await readSyncTokens(root, SYNC_TOKEN_DIRNAME);
  const [entriesResults, assetsResult] = await Promise.all([
    syncAllEntries(client, contentTypes, syncTokens, config),
    syncAllAssets(client, config, syncTokens['asset'])
  ]);

  const entries = flatten(entriesResults.map((result) => result.items));
  const assets = assetsResult.items;

  logger.debug(`fetched entries and assets`, {
    caller: 'sync',
    elapsedMs: timer.end().millis,
    itemsSuccessful: entries.length + assets.length
  });

  const entryIdsByContentTypeLookup = groupByContentTypeAndMapToIds(entries);
  const nextSyncTokens: ContentTypeIdToSyncTokensLookup = contentTypes.reduce(
    (accum, contentType, idx) => ({
      ...accum,
      [contentType?.sys?.id]: entriesResults[idx]?.syncToken
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
