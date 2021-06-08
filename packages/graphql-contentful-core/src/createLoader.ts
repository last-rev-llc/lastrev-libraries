import { Asset, Entry } from 'contentful';
import DataLoader from 'dataloader';
import { keyBy, get } from 'lodash/fp';

export type Item<T> = Entry<T> | Asset;
export type FetchFunction<T> = (keys?: readonly string[]) => Promise<Array<Item<T>>>;
export type ContentfulDataLoader<T> = DataLoader<string, Item<T>> & { primeAll: () => Promise<any> };

export const createLoader = async <T>(fetcher: FetchFunction<T>, key: string = 'sys.id', lazy: boolean = false) => {
  const loader = new DataLoader(async (keys: readonly string[]) => {
    console.log('FETCH', { keys });
    // Fetch all items we can
    const items = await fetcher(keys);
    console.log('an item', items[0]);
    const byId = keyBy(key, items);
    items.forEach((x) => loader.prime(get(key, x), x));
    const result = keys.map((x: string) => byId[x]);
    console.log('FETCH', { byId, result });
    return result;
  }) as ContentfulDataLoader<T>;
  loader.primeAll = () => primeLoader(loader, fetcher, key);

  if (!lazy) loader.primeAll();
  return loader;
};

type PrimeLoader = <T>(
  loader: ContentfulDataLoader<T>,
  fetch: FetchFunction<T>,
  key: string,
  lazy?: boolean
) => Promise<ContentfulDataLoader<T>>;

export const primeLoader: PrimeLoader = async (loader, fetch, key = 'sys.id') => {
  const now = Date.now().toString();
  console.time('Prime_' + now + '_Key_' + key);
  const entries = await fetch();
  console.timeEnd('Prime_' + now + '_Key_' + key);
  entries.map((x: any) => loader.prime(get(key, x), x));
  //Return loader to chain
  console.log('Prime', entries.length);
  return loader;
};
