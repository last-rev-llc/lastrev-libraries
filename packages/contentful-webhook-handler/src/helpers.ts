import { each } from 'lodash';
import { createClient } from 'contentful';
import LastRevAppConfig from '@last-rev/app-config';

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
