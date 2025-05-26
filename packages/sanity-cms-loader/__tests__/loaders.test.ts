import createLoaders from '../src';
import LastRevAppConfig from '../../app-config/src';
import mockConfig from '../../app-config/src/app-config.mock';
import { createClient } from '@sanity/client';

jest.mock('@sanity/client');

const getConfig = () => new LastRevAppConfig({ ...mockConfig(), cms: 'Sanity' });

describe('sanity-cms-loader', () => {
  let prodFetch: jest.Mock;
  let previewFetch: jest.Mock;

  beforeEach(() => {
    prodFetch = jest.fn();
    previewFetch = jest.fn();
    (createClient as jest.Mock).mockReset();
    (createClient as jest.Mock)
      .mockReturnValueOnce({ fetch: prodFetch })
      .mockReturnValueOnce({ fetch: previewFetch });
  });

  test('entryLoader fetches by id', async () => {
    prodFetch.mockResolvedValueOnce([{ _id: '1' }]);
    const loaders = createLoaders(getConfig());
    const result = await loaders.entryLoader.load({ id: '1', preview: false });
    expect(prodFetch).toHaveBeenCalledWith('*[_id in $ids]', { ids: ['1'] });
    expect(result).toEqual({ _id: '1' });
  });

  test('assetLoader fetches by id using preview client', async () => {
    previewFetch.mockResolvedValueOnce([{ _id: 'a1' }]);
    const loaders = createLoaders(getConfig());
    const result = await loaders.assetLoader.load({ id: 'a1', preview: true });
    expect(previewFetch).toHaveBeenCalledWith('*[_id in $ids]', { ids: ['a1'] });
    expect(result).toEqual({ _id: 'a1' });
  });

  test('entriesByContentTypeLoader fetches by type', async () => {
    prodFetch.mockResolvedValueOnce([{ _id: '1' }, { _id: '2' }]);
    const loaders = createLoaders(getConfig());
    const result = await loaders.entriesByContentTypeLoader.load({ id: 'type', preview: false });
    expect(prodFetch).toHaveBeenCalledWith('*[_type == $type]', { type: 'type' });
    expect(result).toEqual([{ _id: '1' }, { _id: '2' }]);
  });

  test('entryByFieldValueLoader fetches by field value', async () => {
    prodFetch.mockResolvedValueOnce({ _id: '1', title: 'Home' });
    const loaders = createLoaders(getConfig());
    const result = await loaders.entryByFieldValueLoader.load({ contentType: 'page', field: 'slug', value: 'home', preview: false });
    expect(prodFetch).toHaveBeenCalledWith('*[_type == $type && slug == $value][0]', { type: 'page', value: 'home' });
    expect(result).toEqual({ _id: '1', title: 'Home' });
  });

  test('entriesRefByLoader fetches referenced docs', async () => {
    previewFetch.mockResolvedValueOnce([{ _id: '3' }]);
    const loaders = createLoaders(getConfig());
    const result = await loaders.entriesRefByLoader.load({ contentType: 'post', field: 'author', id: '1', preview: true });
    expect(previewFetch).toHaveBeenCalledWith('*[_type == $type && (author._ref == $id || $id in author[]._ref)]', { type: 'post', id: '1' });
    expect(result).toEqual([{ _id: '3' }]);
  });

  test('fetchAllContentTypes returns empty array', async () => {
    const loaders = createLoaders(getConfig());
    const result = await loaders.fetchAllContentTypes(false);
    expect(result).toEqual([]);
  });
});
