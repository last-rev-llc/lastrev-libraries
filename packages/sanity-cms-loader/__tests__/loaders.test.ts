import createLoaders from '../src';
import LastRevAppConfig from '@last-rev/app-config';
import { createClient } from '@sanity/client';

jest.mock('@sanity/client', () => ({
  createClient: jest.fn()
}));

const baseConfig = new LastRevAppConfig({
  cms: 'Sanity',
  strategy: 'fs',
  fs: { contentDir: '.' },
  sanity: {
    projectId: 'test',
    dataset: 'production',
    apiVersion: '2021-10-21',
    token: 'token',
    previewToken: 'previewToken'
  }
});

describe('sanity loaders', () => {
  let prodFetch: jest.Mock;
  let previewFetch: jest.Mock;
  let loaders: ReturnType<typeof createLoaders>;

  beforeEach(() => {
    prodFetch = jest.fn();
    previewFetch = jest.fn();
    (createClient as jest.Mock).mockReset();
    (createClient as jest.Mock)
      .mockReturnValueOnce({ fetch: prodFetch })
      .mockReturnValueOnce({ fetch: previewFetch });

    loaders = createLoaders(baseConfig as any);
  });

  it('entryLoader uses production client when preview is false', async () => {
    const doc = { _id: 'doc1' };
    prodFetch.mockResolvedValueOnce([doc]);
    const result = await loaders.entryLoader.load({ id: 'doc1', preview: false });
    expect(prodFetch).toHaveBeenCalledWith('*[_id in $ids]', { ids: ['doc1'] });
    expect(result).toEqual(doc);
  });

  it('entryLoader uses preview client when preview is true', async () => {
    const doc = { _id: 'doc1' };
    previewFetch.mockResolvedValueOnce([doc]);
    const result = await loaders.entryLoader.load({ id: 'doc1', preview: true });
    expect(previewFetch).toHaveBeenCalledWith('*[_id in $ids]', { ids: ['doc1'] });
    expect(result).toEqual(doc);
  });

  it('assetLoader fetches assets', async () => {
    const asset = { _id: 'asset1' };
    prodFetch.mockResolvedValueOnce([asset]);
    const result = await loaders.assetLoader.load({ id: 'asset1', preview: false });
    expect(prodFetch).toHaveBeenCalledWith('*[_id in $ids]', { ids: ['asset1'] });
    expect(result).toEqual(asset);
  });

  it('entriesByContentTypeLoader fetches entries by type', async () => {
    const doc = { _id: 'doc1', _type: 'page' };
    prodFetch.mockResolvedValueOnce([doc]);
    const result = await loaders.entriesByContentTypeLoader.load({ id: 'page', preview: false });
    expect(prodFetch).toHaveBeenCalledWith('*[_type == $type]', { type: 'page' });
    expect(result).toEqual([doc]);
  });

  it('entryByFieldValueLoader fetches entry by field value', async () => {
    const doc = { _id: 'doc1', _type: 'page', slug: 'home' };
    previewFetch.mockResolvedValueOnce(doc);
    const result = await loaders.entryByFieldValueLoader.load({
      contentType: 'page',
      field: 'slug',
      value: 'home',
      preview: true
    });
    expect(previewFetch).toHaveBeenCalledWith('*[_type == $type && slug == $value][0]', { type: 'page', value: 'home' });
    expect(result).toEqual(doc);
  });

  it('entriesRefByLoader fetches entries referencing given id', async () => {
    const doc = { _id: 'docRef', page: { _ref: 'doc1' } };
    prodFetch.mockResolvedValueOnce([doc]);
    const result = await loaders.entriesRefByLoader.load({
      id: 'doc1',
      contentType: 'comment',
      field: 'page',
      preview: false
    });
    expect(prodFetch).toHaveBeenCalledWith(
      '*[_type == $type && (page._ref == $id || $id in page[]._ref)]',
      { type: 'comment', id: 'doc1' }
    );
    expect(result).toEqual([doc]);
  });
});
