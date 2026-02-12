import { each } from 'lodash';
import { createClient } from 'contentful';
import { ContentType, BaseAsset, BaseEntry } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'contentful-webhook-handler',
  module: 'helpers'
});

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
    host: 'preview.contentful.com'
  }).withoutLinkResolution.withAllLocales;

  const contentfulProdClient = createClient({
    space: config.contentful.spaceId,
    accessToken: config.contentful.contentDeliveryToken,
    environment: config.contentful.env,
    host: 'cdn.contentful.com'
  }).withoutLinkResolution.withAllLocales;

  return { contentfulPreviewClient, contentfulProdClient };
};

export const isError = (x: any): x is Error => x instanceof Error;
// using coersion on purpose here (== instead of ===)
export const isNil = (x: any): x is null | undefined => x == null;

export const isContentfulError = (item: any) => {
  return item?.sys?.type === 'Error';
};

export const isContentfulObject = (item: any): item is BaseEntry | BaseAsset | ContentType => {
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

/**
 * Check if an object is a Sanity document (has _id and _type)
 */
export const isSanityDocument = (item: any): boolean => {
  return typeof item?._id === 'string' && typeof item?._type === 'string';
};

/**
 * Add metadata to Sanity document for tracking
 */
export const enhanceSanityDocumentWithMetadata = (item: any) => {
  return {
    ...item,
    lastrev_metadata: {
      insert_date: new Date().toISOString(),
      source: 'sanityWebhook'
    }
  };
};

/**
 * Stringify a Sanity document for Redis storage
 */
export const stringifySanityDocument = (r: any, errorKey: string) => {
  try {
    if (isNil(r)) {
      throw Error('nil');
    }

    if (isError(r)) {
      throw Error(r.message);
    }

    if (!isSanityDocument(r)) {
      throw Error(`Not a Sanity document: ${r}`);
    }

    return JSON.stringify(enhanceSanityDocumentWithMetadata(r));
  } catch (err: any) {
    logger.error(`Error stringifying Sanity document ${errorKey}: ${err.message}`, {
      caller: 'stringifySanityDocument',
      stack: err.stack
    });
    return undefined;
  }
};
