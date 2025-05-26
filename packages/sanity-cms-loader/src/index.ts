import DataLoader, { Options } from 'dataloader';
import { createClient, SanityClient } from '@sanity/client';
import { map, partition } from 'lodash';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { ItemKey, CmsLoaders, FVLKey, RefByKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const convertSanityDoc = (doc: any, defaultLocale: string) => {
  if (!doc) return null;
  const { _id, _type, _updatedAt, ...fields } = doc;
  return {
    sys: { id: _id, updatedAt: _updatedAt, contentType: { sys: { id: _type, type: 'Entry' } } },
    fields: Object.entries(fields).reduce((acc: any, [name, value]: [string, any]) => {
      // TODO: implment using actual locales
      acc[name] = { [defaultLocale]: value };
      return acc;
    }, {})
  };
};

const logger = getWinstonLogger({ package: 'sanity-cms-loader', module: 'index', strategy: 'Cms' });

const mapSanityField = (field: any): any => {
  let type = 'Symbol';
  let linkType;
  let items;

  switch (field.type) {
    case 'string':
    case 'slug':
    case 'url':
      type = 'Symbol';
      break;
    case 'text':
      type = 'Text';
      break;
    case 'number':
    case 'integer':
      type = 'Number';
      break;
    case 'boolean':
      type = 'Boolean';
      break;
    case 'datetime':
    case 'date':
      type = 'Date';
      break;
    case 'object':
      type = 'Object';
      break;
    case 'image':
    case 'file':
      type = 'Link';
      linkType = 'Asset';
      break;
    case 'reference':
      type = 'Link';
      linkType = 'Entry';
      break;
    case 'array':
      type = 'Array';
      if (field.of && field.of.length) {
        const first = mapSanityField(field.of[0]);
        items = { type: first.type } as any;
        if (first.linkType) items.linkType = first.linkType;
      }
      break;
    case 'richText':
    case 'block':
      type = 'RichText';
      break;
    default:
      type = 'Symbol';
  }

  const out: any = { id: field.name, name: field.title, type };
  if (linkType) out.linkType = linkType;
  if (items) out.items = items;
  return out;
};

const mapSanityTypesToContentfulTypes = (schemaTypes: any[]): any[] => {
  return schemaTypes.map((type) => {
    const fields = type.fields.map((field: any) => {
      const contentTypeField: any = {
        id: field.name,
        name: field.title,
        type: mapSanityField(field).type,
        localized: false,
        required: field.validation?.required || false,
        validations: [] as any[],
        disabled: false,
        omitted: false
      };

      // Handle reference fields
      if (field.type === 'reference' && field.to) {
        contentTypeField.validations.push({
          linkContentType: field.to.map((t: any) => t.type)
        });
      }

      // Handle array fields
      if (field.type === 'array' && field.of) {
        contentTypeField.items = {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            {
              linkContentType: field.of
                .map((item: any) => {
                  if (item.type === 'reference' && item.to) {
                    return item.to.map((t: any) => t.type);
                  }
                  return item.type;
                })
                .flat()
            }
          ]
        };
      }

      return contentTypeField;
    });

    return {
      sys: {
        id: type.name,
        type: 'ContentType'
      },
      displayField: 'internalTitle',
      name: type.title,
      description: type.description || '',
      fields
    };
  });
};

const options: Options<ItemKey, any, string> = {
  cacheKeyFn: (key: ItemKey) => {
    return key.preview ? `${key.id}-preview` : `${key.id}-prod`;
  }
};

const fvlOptions: Options<FVLKey, any, string> = {
  cacheKeyFn: (key: FVLKey) => {
    const baseKey = `${key.contentType}-${key.field}-${key.value}`;
    return key.preview ? `${baseKey}-preview` : `${baseKey}-prod`;
  }
};

const refByOptions: Options<RefByKey, any, string> = {
  cacheKeyFn: (key: RefByKey) => {
    const baseKey = `${key.contentType}-${key.field}-${key.id}`;
    return key.preview ? `${baseKey}-preview` : `${baseKey}-prod`;
  }
};

const createLoaders = (config: LastRevAppConfig, defaultLocale: string): CmsLoaders => {
  const sanity = (config as any).sanity || {};

  const prodClient = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion || '2021-10-21',
    useCdn: true
  });

  const previewClient = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion || '2021-10-21',
    token: sanity.previewToken,
    useCdn: false
  });

  const fetchBatchItems = async (ids: string[], client: SanityClient) => {
    if (!ids.length) return [] as any[];
    const query = '*[_id in $ids]';
    return client.fetch(query, { ids });
  };

  const getBatchItemFetcher = (): DataLoader.BatchLoadFn<ItemKey, any | null> => {
    return async (keys) => {
      const timer = new Timer();
      const [previewKeys, prodKeys] = partition(keys, (k) => k.preview);
      const [previewDocs, prodDocs] = await Promise.all([
        fetchBatchItems(map(previewKeys, 'id'), previewClient),
        fetchBatchItems(map(prodKeys, 'id'), prodClient)
      ]);
      const all = [...previewDocs, ...prodDocs];
      const items = keys.map(({ id }) =>
        convertSanityDoc(
          all.find((d) => d && d._id === id),
          defaultLocale
        )
      );
      logger.debug('Fetched docs', {
        caller: 'getBatchItemFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: items.filter((x) => x).length
      });
      return items;
    };
  };

  const getBatchEntriesByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, any[]> => {
    return async (keys) => {
      const timer = new Timer();
      const results = await Promise.all(
        keys.map(async ({ id, preview }) => {
          const client = preview ? previewClient : prodClient;
          const query = '*[_type == $type]';
          const docs = await client.fetch(query, { type: id });
          return docs.map(convertSanityDoc) as any[];
        })
      );
      logger.debug('Fetched docs by type', {
        caller: 'getBatchEntriesByContentTypeFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: results.reduce((a, c) => a + c.length, 0)
      });
      return results;
    };
  };

  const getBatchEntriesByFieldValueFetcher = (): DataLoader.BatchLoadFn<FVLKey, any | null> => {
    return async (keys) => {
      const timer = new Timer();
      const results = await Promise.all(
        keys.map(async ({ contentType, field, value, preview }) => {
          const client = preview ? previewClient : prodClient;
          const query = `*[_type == $type && ${field} == $value][0]`;
          const doc = await client.fetch(query, { type: contentType, value });
          return convertSanityDoc(doc, defaultLocale);
        })
      );
      logger.debug('Fetched doc by field value', {
        caller: 'getBatchEntriesByFieldValueFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: results.filter((x) => x).length
      });
      return results;
    };
  };

  const getBatchEntriesRefByFetcher = (): DataLoader.BatchLoadFn<RefByKey, any[]> => {
    return async (keys) => {
      const timer = new Timer();
      const results = await Promise.all(
        keys.map(async ({ contentType, field, id, preview }) => {
          const client = preview ? previewClient : prodClient;
          const query = `*[_type == $type && (${field}._ref == $id || $id in ${field}[]._ref)]`;
          const docs = await client.fetch(query, { type: contentType, id });
          return docs.map(convertSanityDoc) as any[];
        })
      );
      logger.debug('Fetched docs ref by', {
        caller: 'getBatchEntriesRefByFetcher',
        elapsedMs: timer.end().millis,
        itemsAttempted: keys.length,
        itemsSuccessful: results.reduce((a, c) => a + c.length, 0)
      });
      return results;
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher(), options);
  const assetLoader = new DataLoader(getBatchItemFetcher(), options);
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(), options);
  const entryByFieldValueLoader = new DataLoader(getBatchEntriesByFieldValueFetcher(), fvlOptions);
  const entriesRefByLoader = new DataLoader(getBatchEntriesRefByFetcher(), refByOptions);

  const fetchAllContentTypes = async (_preview: boolean) => {
    try {
      const timer = new Timer();

      try {
        const types = mapSanityTypesToContentfulTypes(config.sanity.schemaTypes);
        logger.debug('Fetched all content types from local schemas', {
          caller: 'fetchAllContentTypes',
          elapsedMs: timer.end().millis,
          itemsSuccessful: types.length
        });
        return types;
      } catch (err: any) {
        console.log('Error fetching content types from local schemas', err.message);
        console.log(JSON.stringify(config.sanity.schemaTypes, null, 2));
        throw err;
      }
    } catch (err: any) {
      logger.error(`Unable to fetch content types: ${err.message}`, {
        caller: 'fetchAllContentTypes',
        stack: err.stack
      });
      return [];
    }
  };

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    entryByFieldValueLoader,
    entriesRefByLoader,
    fetchAllContentTypes
  };
};

export default createLoaders;
