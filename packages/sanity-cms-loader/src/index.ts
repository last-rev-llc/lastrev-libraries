import DataLoader, { Options } from 'dataloader';
import { createClient, SanityClient } from '@sanity/client';
import { map, partition } from 'lodash';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { ItemKey, CmsLoaders, FVLKey, RefByKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { mapSanityPortableTextArrayToContentfulRichText } from './richTextHelpers';

const mapSanityValueToContentful = (value: any, defaultLocale: string): any => {
  // Detect Sanity rich text (Block[])
  if (Array.isArray(value) && value[0] && (value[0]._type === 'block' || value[0]._type === 'break')) {
    return mapSanityPortableTextArrayToContentfulRichText(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => mapSanityValueToContentful(item, defaultLocale));
  }
  if (value && typeof value === 'object') {
    // Handle Sanity slug field
    if ((value._type === 'slug' || Object.keys(value).length === 1) && typeof value.current === 'string') {
      return value.current;
    }
    // Handle Sanity reference
    if (value._type === 'reference' && value._ref) {
      return {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: value._ref
        }
      };
    }
    // Handle Sanity asset reference (image/file)
    if (value._type === 'image' && value.asset?._ref) {
      return {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: value.asset._ref
        }
      };
    }
    // Recursively process all object properties
    const mapped: any = {};
    for (const [k, v] of Object.entries(value)) {
      mapped[k] = mapSanityValueToContentful(v, defaultLocale);
    }
    return mapped;
  }
  return value;
};

const convertSanityDoc = (doc: any, defaultLocale: string) => {
  if (!doc) return null;
  const { _id, _type, _updatedAt, ...fields } = doc;

  // Detect top-level asset (Sanity image or file asset)
  if (
    _type === 'sanity.imageAsset' ||
    _type === 'sanity.fileAsset' ||
    _type === 'imageAsset' ||
    _type === 'fileAsset'
  ) {
    // Map to Contentful asset structure
    const assetFields: any = {
      title: { [defaultLocale]: fields.alt || fields.title || '' },
      file: {
        [defaultLocale]: {
          contentType: fields.mimeType || fields.contentType || '',
          fileName: fields.originalFilename || fields.fileName || '',
          url: fields.url || '',
          details: {}
        }
      }
    };
    if (fields.metadata && fields.metadata.dimensions) {
      assetFields.file[defaultLocale].details.image = {
        width: fields.metadata.dimensions.width,
        height: fields.metadata.dimensions.height
      };
    }
    if (fields.size) {
      assetFields.file[defaultLocale].details.size = fields.size;
    }
    // Optionally map tags if present
    const metadata: any = {};
    if (fields.tags && Array.isArray(fields.tags)) {
      metadata.tags = fields.tags.map((tag: any) => ({
        sys: {
          type: 'Link',
          linkType: 'Tag',
          id: tag._ref || tag._id || tag.id || tag
        }
      }));
    }
    return {
      fields: assetFields,
      metadata,
      sys: {
        id: _id,
        type: 'Asset',
        createdAt: doc._createdAt,
        updatedAt: _updatedAt,
        revision: doc._rev
        // Optionally add space if you have a mapping
      }
    };
  }

  return {
    sys: { id: _id, updatedAt: _updatedAt, contentType: { sys: { id: _type, type: 'Entry' } } },
    fields: Object.entries(fields).reduce((acc: any, [name, value]: [string, any]) => {
      // Recursively map all values, including references and rich text
      acc[name] = { [defaultLocale]: mapSanityValueToContentful(value, defaultLocale) };
      return acc;
    }, {})
  };
};

const logger = getWinstonLogger({ package: 'sanity-cms-loader', module: 'index', strategy: 'Cms' });

const mapSanityField = (field: any): any => {
  let type = 'Symbol';
  let linkType;
  let items;
  let validations = [];

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
      if (field.to) {
        validations.push({
          linkContentType: field.to.map((t: any) => t.type)
        });
      }
      break;
    case 'array':
      if (field.of && field.of.length) {
        const firstItem = field.of[0];
        const firstItemType = firstItem.type;
        type = 'Array';
        switch (firstItemType) {
          case 'reference':
            items = {
              type: 'Link',
              linkType: 'Entry',
              validations: [{ linkContentType: field.of.map((item: any) => item.to.map((t: any) => t.type)) }]
            };
            break;
          case 'file':
            items = {
              type: 'Link',
              linkType: 'Asset'
            };
            break;
          case 'block':
            type = 'RichText';
            break;
          default:
            items = { type: mapSanityField(firstItem).type };
        }
      }

      break;
    case 'richText':
    case 'block':
      type = 'RichText';
      break;
    default:
      type = 'Symbol';
  }

  return {
    id: field.name,
    name: field.title,
    type,
    localized: false,
    required: field.validation?.required || false,
    validations,
    disabled: false,
    omitted: false,
    ...(linkType && { linkType }),
    ...(items && { items })
  };
};

const mapSanityTypesToContentfulTypes = (schemaTypes: any[]): any[] => {
  return schemaTypes.map((type) => ({
    sys: {
      id: type.name,
      type: 'ContentType'
    },
    displayField: 'internalTitle',
    name: type.title,
    description: type.description || '',
    fields: type.fields.map(mapSanityField)
  }));
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
    token: sanity.token,
    useCdn: true
  });

  const previewClient = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion || '2021-10-21',
    token: sanity.token,
    useCdn: false,
    perspective: 'drafts'
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
