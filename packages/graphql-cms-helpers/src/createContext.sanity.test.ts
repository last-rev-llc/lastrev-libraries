import LastRevAppConfig from '@last-rev/app-config';

// Mock @sanity/client before importing createContext
const fetchMock = jest.fn();
jest.mock('@sanity/client', () => ({
  __esModule: true,
  createClient: jest.fn(() => ({ fetch: fetchMock }))
}));

// Mock other dependencies
jest.mock('./createLoaders', () => jest.fn().mockReturnValue({ type: 'mockLoaders' }));
jest.mock('./createPathReaders', () => jest.fn().mockReturnValue(undefined));

import createContext from './createContext';

describe('createContext with Sanity CMS', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    const { createClient } = require('@sanity/client');
    createClient.mockClear();
  });

  it('initializes context fields and loaders for Sanity', async () => {
    const config = new LastRevAppConfig({
      cms: 'Sanity',
      contentStrategy: 'cms',
      cmsCacheStrategy: 'none',
      sanity: {
        projectId: 'test-project',
        dataset: 'production',
        token: 'test-token',
        apiVersion: '2021-03-25',
        schemaTypes: [],
        supportedLanguages: [
          { id: 'en-US', title: 'English' },
          { id: 'es', title: 'Spanish' }
        ]
      }
    });

    const ctx = await createContext({ config });

    expect(ctx.cms).toBe('Sanity');
    expect(ctx.locales).toEqual(['en-US', 'es']);
    expect(ctx.defaultLocale).toBe('en-US');
    expect(ctx.loaders).toEqual({ type: 'mockLoaders' });
    expect(ctx.sanity).toBeDefined();
    expect(ctx.contentful).toBeUndefined();
  });

  it('creates sanity clients correctly', async () => {
    const config = new LastRevAppConfig({
      cms: 'Sanity',
      contentStrategy: 'cms',
      cmsCacheStrategy: 'none',
      sanity: {
        projectId: 'test-project',
        dataset: 'staging',
        token: 'test-token',
        apiVersion: '2022-01-01',
        schemaTypes: [],
        supportedLanguages: [{ id: 'en-US', title: 'English' }]
      }
    });

    await createContext({ config });

    const { createClient } = require('@sanity/client');
    expect(createClient).toHaveBeenCalledTimes(2);

    // Production client
    expect(createClient).toHaveBeenCalledWith({
      projectId: 'test-project',
      dataset: 'staging',
      apiVersion: '2022-01-01',
      token: 'test-token',
      useCdn: true
    });

    // Preview client
    expect(createClient).toHaveBeenCalledWith({
      projectId: 'test-project',
      dataset: 'staging',
      apiVersion: '2022-01-01',
      token: 'test-token',
      useCdn: false,
      perspective: 'drafts'
    });
  });
});
