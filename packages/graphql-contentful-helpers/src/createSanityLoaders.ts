import DataLoader from 'dataloader';
import sanityClient, { SanityClient } from '@sanity/client';
import { CmsLoaders, ItemKey, FVLKey, RefByKey } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import fs from 'fs';
import path from 'path';

const createSanityClient = (config: any, useCdn: boolean): SanityClient => {
  return sanityClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion || '2021-03-25',
    token: config.token,
    useCdn
  });
};

const createSanityLoaders = (config: LastRevAppConfig, _defaultLocale: string): CmsLoaders => {
  const sanityCfg = (config as any).sanity || {};
  const prodClient = createSanityClient(sanityCfg, true);
  const previewClient = createSanityClient(sanityCfg, false);

  const getClient = (preview: boolean) => (preview ? previewClient : prodClient);

  const entryLoader = new DataLoader<ItemKey, any | null>(async (keys) => {
    const results = await Promise.all(
      keys.map(({ id, preview }) => getClient(preview).fetch('*[_id == $id][0]', { id }))
    );
    return results;
  });

  const assetLoader = new DataLoader<ItemKey, any | null>(async (keys) => {
    const results = await Promise.all(
      keys.map(({ id, preview }) => getClient(preview).fetch('*[_id == $id][0]', { id }))
    );
    return results;
  });

  const entriesByContentTypeLoader = new DataLoader<ItemKey, any[]>(async (keys) => {
    const results = await Promise.all(
      keys.map(({ id, preview }) => getClient(preview).fetch('*[_type == $type]', { type: id }))
    );
    return results;
  });

  const entryByFieldValueLoader = new DataLoader<FVLKey, any | null>(async (keys) => {
    const results = await Promise.all(
      keys.map(({ contentType, field, value, preview }) =>
        getClient(preview).fetch(`*[_type == $type && ${field} == $value][0]`, {
          type: contentType,
          value
        })
      )
    );
    return results;
  });

  const entriesRefByLoader = new DataLoader<RefByKey, any[]>(async (keys) => {
    const results = await Promise.all(
      keys.map(({ contentType, id, preview }) =>
        getClient(preview).fetch(`*[_type == $type && references($id)]`, {
          type: contentType,
          id
        })
      )
    );
    return results;
  });

  const fetchAllContentTypes = async (_preview: boolean) => {
    try {
      const schemaDir = path.resolve(process.cwd(), sanityCfg.schemasPath || 'sanity/schemas');
      const files = fs
        .readdirSync(schemaDir)
        .filter((f) => f.endsWith('.js') || f.endsWith('.ts'));
      const schemas = files.map((file) => {
        const mod = require(path.join(schemaDir, file));
        return mod.default || mod;
      });
      if (schemas.length) return schemas;
    } catch (err) {
      // ignore and fall back to API
    }

    try {
      const types = await prodClient.fetch('array::unique(*._type)');
      return (types || []).map((name: string) => ({ name }));
    } catch (err) {
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

export default createSanityLoaders;
