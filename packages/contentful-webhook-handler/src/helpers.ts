import { each } from 'lodash';
import { Asset, createClient, Entry, ContentType } from 'contentful';
import LastRevAppConfig from '@last-rev/app-config';
import logger from 'loglevel';
import { LOG_PREFIX } from './constants';

export const assetHasUrl = (asset: any): boolean => {
  const file = asset.fields.file;

  try {
    // loop through locales. They should all have url
    each(file, (val) => {
      if (!val.url) {
        throw Error();
      }
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const createContentfulClients = (config: LastRevAppConfig) => {
  const contentfulPreviewClient = createClient({
    space: config.contentful.spaceId,
    accessToken: config.contentful.contentPreviewToken,
    environment: config.contentful.env,
    host: 'preview.contentful.com',
    resolveLinks: false
  });

  const contentfulProdClient = createClient({
    space: config.contentful.spaceId,
    accessToken: config.contentful.contentDeliveryToken,
    environment: config.contentful.env,
    host: 'cdn.contentful.com',
    resolveLinks: false
  });

  return { contentfulPreviewClient, contentfulProdClient };
};

export const isError = (x: any): x is Error => x instanceof Error;
// using coersion on purpose here (== instead of ===)
export const isNil = (x: any): x is null | undefined => x == null;

export const isContentfulError = (item: any) => {
  return item?.sys?.type === 'Error';
};

export const isContentfulObject = (item: any): item is Entry<any> | Asset | ContentType => {
  return item?.sys?.type === 'Entry' || item?.sys?.type === 'Asset' || item?.sys?.type === 'ContentType';
};

export const enhanceContentfulObjectWithMetadata = (item: any) => {
  return {
    ...item,
    lastrev_metadata: {
      insert_date: new Date().toISOString(),
      source: 'contentfulWebhook'
    }
  };
};

export const stringify = (r: any, errorKey: string) => {
  if (isNil(r)) {
    logger.error(`${LOG_PREFIX} Error stringifying ${errorKey}: nil`);
    return undefined;
  }

  if (isError(r)) {
    logger.error(`${LOG_PREFIX} Error stringifying ${errorKey}: ${r.message}`);
    return undefined;
  }

  if (isContentfulError(r)) {
    logger.error(`${LOG_PREFIX} Error stringifying ${errorKey}: ${r.sys.id}`);
    return undefined;
  }

  if (!isContentfulObject(r)) {
    logger.error(`${LOG_PREFIX} Error stringifying ${errorKey}: Not contentful Object: ${r}`);
    return undefined;
  }

  try {
    return JSON.stringify(enhanceContentfulObjectWithMetadata(r));
  } catch (err: any) {
    logger.error(`${LOG_PREFIX} Error stringifying ${errorKey}: ${err.message}`);
    return undefined;
  }
};
