import { ensureDir, readFile, existsSync, writeFile } from 'fs-extra';
import { join } from 'path';
import { homedir } from 'os';
import { Asset, ContentfulClientApi, ContentType, Entry } from 'contentful';

const configDir = join(homedir(), '.config', 'lr-contentful-report');

export type Store = {
  entries: { [id: string]: Entry<any> };
  assets: { [id: string]: Asset };
  syncToken: string;
};

export type ContentfulData = {
  entries: Entry<any>[];
  assets: Asset[];
  contentTypes: ContentType[];
};

const newStore = (): Store => ({
  entries: {},
  assets: {},
  syncToken: ''
});

const storeLocation = (spaceId: string, environment: string) => join(configDir, `${spaceId}-${environment}.json`);

// Define a function to sync data from Contentful and update the database
export async function updateStore(
  spaceId: string,
  environment: string,
  client: ContentfulClientApi
): Promise<ContentfulData> {
  await ensureDir(configDir);

  console.log(`Syncing data from Contentful...`);

  const storeFile = storeLocation(spaceId, environment);
  // check for existing store
  const storeExists = existsSync(storeFile);
  // load existing store
  const store: Store = storeExists
    ? JSON.parse(await readFile(storeLocation(spaceId, environment), 'utf8'))
    : newStore();
  // perform a sync with old token or a frewsh sync
  const syncResult = await client.sync({
    initial: !store.syncToken,
    nextSyncToken: storeExists ? store.syncToken : undefined
  });
  syncResult.deletedEntries.forEach((e) => delete store.entries[e.sys.id]);
  syncResult.entries.forEach((e) => (store.entries[e.sys.id] = e));
  syncResult.deletedAssets.forEach((a) => delete store.assets[a.sys.id]);
  syncResult.assets.forEach((a) => (store.assets[a.sys.id] = a));

  await writeFile(storeFile, JSON.stringify(store), 'utf8');

  const contentTypes = await client.getContentTypes().then((r) => r.items);

  console.log('Data synced!');

  return {
    entries: Object.values(store.entries),
    assets: Object.values(store.assets),
    contentTypes
  };
}
