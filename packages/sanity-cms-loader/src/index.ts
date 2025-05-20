import DataLoader, { Options } from 'dataloader';
import { createClient, SanityClient } from '@sanity/client';
import { map, partition } from 'lodash';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import * as ts from 'typescript';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { ItemKey, ContentfulLoaders, FVLKey, RefByKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

const convertSanityDoc = (doc: any) => {
  if (!doc) return null;
  const { _id, _type, _updatedAt, ...fields } = doc;
  return {
    sys: { id: _id, updatedAt: _updatedAt, contentType: { sys: { id: _type } } },
    fields
  };
};

const logger = getWinstonLogger({ package: 'sanity-cms-loader', module: 'index', strategy: 'Cms' });

const loadSchema = async (filePath: string): Promise<any> => {
  const source = await fs.readFile(filePath, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  });
  const module = { exports: {} } as any;
  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', outputText);
  fn(module.exports, require, module, filePath, dirname(filePath));
  return module.exports.default || module.exports;
};

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

const schemaToContentType = (schema: any): any => {
  return {
    sys: { id: schema.name },
    name: schema.title,
    fields: (schema.fields || []).map(mapSanityField)
  };
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

const createLoaders = (config: LastRevAppConfig): ContentfulLoaders => {
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
      const items = keys.map(({ id }) => convertSanityDoc(all.find((d) => d && d._id === id)));
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
          return convertSanityDoc(doc);
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

  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer();
      const schemaDir = join(process.cwd(), 'sanity', 'schemas');
      let types: any[] = [];

      try {
        const files = await fs.readdir(schemaDir);
        const schemas = await Promise.all(
          files.filter((f) => f.endsWith('.ts') && f !== 'index.ts').map((f) => loadSchema(join(schemaDir, f)))
        );
        types = schemas.map(schemaToContentType);
        logger.debug('Fetched all content types from local schemas', {
          caller: 'fetchAllContentTypes',
          elapsedMs: timer.end().millis,
          itemsSuccessful: types.length
        });
        return types;
      } catch {
        // ignore and fallback to client fetch
      }

      const query = 'array::unique(*[]._type)';
      const names: string[] = await (preview ? previewClient : prodClient).fetch(query);
      types = names.map((n) => ({ sys: { id: n }, name: n, fields: [] }));
      logger.debug('Fetched all content types from Sanity', {
        caller: 'fetchAllContentTypes',
        elapsedMs: timer.end().millis,
        itemsSuccessful: types.length
      });
      return types;
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
