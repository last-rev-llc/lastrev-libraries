import { chain, flatten, find, get, has, map } from 'lodash';
import { resolve, join } from 'path';
import { ensureDir, writeFile } from 'fs-extra';
import { Asset, Entry, createClient, ContentfulClientApi } from 'contentful';
import ora from 'ora';

const ENTRIES_DIRNAME = 'entries';
const ASSETS_DIRNAME = 'assets';
const CONTENT_TYPES_FILENAME = 'content_types.json';
const SLUG_LOOKUP_FILENAME = 'content_type_slug_lookup.json';
const CONTENT_TYPE_ENTRIES_FILENAME = 'entry_ids_by_content_type_lookup.json';

const delay = (m: number) => new Promise((r) => setTimeout(r, m));

export type SlugToIdLookup = {
  [contentTypeIdSlug: string]: string;
};

export type contentTypeIdToContentIdsLookup = {
  [contentTypeId: string]: string[];
};

const getSlugToIdLookup = (
  entries: Entry<{ slug?: { [locale: string]: string } }>[],
  defaultLocale: string
): SlugToIdLookup => {
  return chain(entries)
    .filter((entry) => has(entry, 'fields.slug'))
    .keyBy((entry) => {
      const {
        sys: {
          contentType: {
            sys: { id: contentTypeId }
          }
        },
        fields: { slug }
      } = entry as Entry<{ slug: { [locale: string]: string } }>;
      return `${contentTypeId}:${slug[defaultLocale]}`;
    })
    .mapValues('sys.id')
    .value();
};

const getEntriesByContentTypeLookup = (
  entries: Entry<{ slug?: { [locale: string]: string } }>[]
): contentTypeIdToContentIdsLookup => {
  return chain(entries)
    .groupBy('sys.contentType.sys.id')
    .mapValues((entries) => map(entries, 'sys.id'))
    .value();
};

const writeEntriesOrAssets = async (items: (Entry<any> | Asset)[], root: string, dirname: string): Promise<void> => {
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

const writeSingleFile = async (json: any, root: string, filename: string): Promise<void> => {
  await ensureDir(root);
  await writeFile(join(root, filename), JSON.stringify(json));
};

export type SyncProps = {
  rootDir: string;
  accessToken: string;
  space: string;
  environment?: string;
  host?: string;
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

const sync = async ({
  rootDir,
  accessToken,
  space,
  environment = 'master',
  host = 'cdn.contentful.com'
}: SyncProps) => {
  console.time('Total elapsed time');
  let spinner;
  validateArg(rootDir, 'rootDir');
  validateArg(accessToken, 'accessToken');
  validateArg(space, 'space');

  const previewOrProd = host.startsWith('preview') ? 'preview' : 'production';

  const client = createClient({
    accessToken,
    space,
    environment,
    host
  });

  const [{ items: contentTypes }, { items: locales }] = await Promise.all([
    client.getContentTypes(),
    client.getLocales()
  ]);

  const defaultLocale = get(
    find(locales, (locale) => locale.default),
    'code',
    'en-US'
  );

  let startTime = Date.now();
  spinner = ora('fetching entries').start();
  // console.time('finished fetching entries');
  const entries = flatten(
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
  spinner.succeed(`fetching entries: ${Date.now() - startTime}ms`);
  // console.timeEnd('finished fetching entries');

  startTime = Date.now();
  spinner = ora('fetching assets').start();
  // console.time('finished fetching assets');
  const assets = await syncAllAssets(client);
  spinner.succeed(`fetching assets: ${Date.now() - startTime}ms`);
  // console.timeEnd('finished fetching assets');

  const slugToIdLookup = getSlugToIdLookup(entries, defaultLocale);
  const entryIdsByContentTypeLookup = getEntriesByContentTypeLookup(entries);

  const root = join(resolve(process.cwd(), rootDir), space, environment, previewOrProd);
  startTime = Date.now();
  spinner = ora('writing files');
  // console.time('finished writing files');
  await Promise.all([
    writeEntriesOrAssets(entries, root, ENTRIES_DIRNAME),
    writeEntriesOrAssets(assets, root, ASSETS_DIRNAME),
    writeSingleFile(contentTypes, root, CONTENT_TYPES_FILENAME),
    writeSingleFile(slugToIdLookup, root, SLUG_LOOKUP_FILENAME),
    writeSingleFile(entryIdsByContentTypeLookup, root, CONTENT_TYPE_ENTRIES_FILENAME)
  ]);
  spinner.succeed(`writing files: ${Date.now() - startTime}ms`);
  // console.timeEnd('finished writing files');
  console.timeEnd('Total elapsed time');
};

export default sync;
