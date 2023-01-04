import { getWinstonLogger } from '@last-rev/logging';
import { ItemKey } from '@last-rev/types';

const logger = getWinstonLogger({ package: 'contentful-redis-loader', module: 'helpers' });

export const isString = (x: any): x is string => typeof x === 'string' || x instanceof String;
export const isError = (x: any): x is Error => x instanceof Error;
// using coersion on purpose here (== instead of ===)
export const isNil = (x: any): x is null | undefined => x == null;
export const isRejected = (r: PromiseSettledResult<unknown>): r is PromiseRejectedResult => r.status === 'rejected';

export const getKey = (itemKey: ItemKey, dir: string) => {
  return [itemKey.preview ? 'preview' : 'production', dir, itemKey.id].join(':');
};

export const parse = (r: string | Error | null): any => {
  if (isString(r) && r.length) {
    return JSON.parse(r);
  }
  return null;
};

export const enhanceContentfulObjectWithMetadata = (item: any) => {
  return {
    ...item,
    lastrev_metadata: {
      insert_date: new Date().toISOString(),
      source: 'RedisLoader'
    }
  };
};

export const isContentfulObject = (item: any) => {
  return item?.sys?.type === 'Entry' || item?.sys?.type === 'Asset' || item?.sys?.type === 'ContentType';
};

export const isContentfulError = (item: any) => {
  return item?.sys?.type === 'Error';
};

export const stringify = (r: any, errorKey: string) => {
  try {
    if (isNil(r)) {
      throw Error('nil');
    }

    if (isError(r)) {
      throw Error(r.message);
    }

    if (isContentfulError(r)) {
      throw Error(`Contentful Error: ${r.sys.id}`);
    }

    if (!isContentfulObject(r)) {
      throw Error(`Not contentful Object: ${r}`);
    }

    return JSON.stringify(enhanceContentfulObjectWithMetadata(r));
  } catch (err: any) {
    logger.error(`Error stringifying ${errorKey}: ${err.message}`, {
      caller: 'stringify',
      stack: err.stack
    });
    return undefined;
  }
};
