import {
  syncAllAssets,
  syncAllEntriesForContentType,
  getContentTypes,
  getLocales
} from '@last-rev/integration-contentful';
import { chain, flatten, find, get, has } from 'lodash';
import { resolve, join } from 'path';
import { ensureDir, writeFile } from 'fs-extra';
import { Asset, Entry } from 'contentful';

const ENTRIES_DIRNAME = 'entries';
const ASSETS_DIRNAME = 'assets';
const CONTENT_TYPES_FILENAME = 'content_types.json';
const SLUG_LOOKUP_FILENAME = 'content_type_slug_lookup.json';

const delay = (m: number) => new Promise((r) => setTimeout(r, m));

export type SlugToIdLookup = {
  [contentTypeIdSlug: string]: string;
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

const writeEntriesOrAssets = async (items: (Entry<any> | Asset)[], root: string, dirname: string): Promise<void> => {
  console.log('writing', dirname);
  console.time(`finished writing ${dirname}`);
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
  console.timeEnd(`finished writing ${dirname}`);
};

const writeSingleFile = async (json: any, root: string, filename: string): Promise<void> => {
  console.log('writing', filename);
  console.time(`finished writing ${filename}`);
  await ensureDir(root);
  await writeFile(join(root, filename), JSON.stringify(json));
  console.timeEnd(`finished writing ${filename}`);
};

const sync = async (rootDir: string) => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID; // assuming same env vars as required by integration-contentful
  const env = process.env.CONTENTFUL_ENV || 'master';
  const host = process.env.CONTENTFUL_HOST || 'cdn.contentful.com';
  if (!spaceId) throw Error('Missing required env var: CONTENTFUL_SPACE_ID');
  const previewOrProd = host.startsWith('preview') ? 'preview' : 'production';

  const [{ items: contentTypes }, locales] = await Promise.all([getContentTypes(), getLocales()]);

  const defaultLocale = get(
    find(locales, (locale) => locale.default),
    'code',
    'en-US'
  );

  console.log('fetching entries...');
  console.time('finished fetching entries');
  const entries = flatten(
    await Promise.all(
      contentTypes.map((contentType, index) =>
        (async () => {
          const {
            sys: { id: contentTypeId }
          } = contentType;
          await delay(index * 100);
          return (await syncAllEntriesForContentType({ contentTypeId })).entries;
        })()
      )
    )
  );
  console.timeEnd('finished fetching entries');

  console.log('fetching assets...');
  console.time('finished fetching assets');
  const { assets } = await syncAllAssets();
  console.timeEnd('finished fetching assets');

  const slugToIdLookup: SlugToIdLookup = getSlugToIdLookup(entries, defaultLocale);

  const root = join(resolve(process.cwd(), rootDir), spaceId, env, previewOrProd);

  await Promise.all([
    writeEntriesOrAssets(entries, root, ENTRIES_DIRNAME),
    writeEntriesOrAssets(assets, root, ASSETS_DIRNAME),
    writeSingleFile(contentTypes, root, CONTENT_TYPES_FILENAME),
    writeSingleFile(slugToIdLookup, root, SLUG_LOOKUP_FILENAME)
  ]);
};

export default sync;
