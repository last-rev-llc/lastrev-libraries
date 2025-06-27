import createLoaders from './index';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';
import { createClient } from 'contentful';
import * as helpers from './helpers';

// Mock dependencies
jest.mock('contentful');
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));
jest.mock('@last-rev/timer', () => ({
  SimpleTimer: jest.fn().mockImplementation(() => ({
    end: jest.fn().mockReturnValue({ millis: 100 }),
    millis: 100
  }))
}));

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;
const mockMakeContentfulRequest = jest.spyOn(helpers, 'makeContentfulRequest');

describe('contentful-cms-loader', () => {
  let baseConfig: LastRevAppConfig;
  let mockProdClient: any;
  let mockPreviewClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    baseConfig = new LastRevAppConfig(mockAppConfig());

    // Mock Contentful clients
    mockProdClient = {
      getEntries: jest.fn(),
      getAssets: jest.fn(),
      getContentTypes: jest.fn()
    };

    mockPreviewClient = {
      getEntries: jest.fn(),
      getAssets: jest.fn(),
      getContentTypes: jest.fn()
    };

    // Mock the createClient chain
    mockCreateClient.mockImplementation((config: any) => {
      const isPreview = config.host === 'preview.contentful.com';
      const client = isPreview ? mockPreviewClient : mockProdClient;

      return {
        withoutLinkResolution: {
          withAllLocales: client
        }
      } as any;
    });

    // Default mock for makeContentfulRequest
    mockMakeContentfulRequest.mockImplementation(async (client, command, _limit, query) => {
      const mockClient = client as any;
      const result = await mockClient[command](query);
      return result.items || [];
    });
  });

  describe('createLoaders', () => {
    it('should create all required loaders', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const loaders = createLoaders(config, 'en-US');

      expect(loaders).toHaveProperty('entryLoader');
      expect(loaders).toHaveProperty('assetLoader');
      expect(loaders).toHaveProperty('entriesByContentTypeLoader');
      expect(loaders).toHaveProperty('entryByFieldValueLoader');
      expect(loaders).toHaveProperty('entriesRefByLoader');
      expect(loaders).toHaveProperty('fetchAllContentTypes');
    });

    it('should create clients with correct configuration', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'staging',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      createLoaders(config, 'en-US');

      expect(mockCreateClient).toHaveBeenCalledTimes(2);

      // Production client
      expect(mockCreateClient).toHaveBeenCalledWith({
        accessToken: 'delivery-token',
        space: 'test-space',
        environment: 'staging',
        host: 'cdn.contentful.com'
      });

      // Preview client
      expect(mockCreateClient).toHaveBeenCalledWith({
        accessToken: 'preview-token',
        space: 'test-space',
        environment: 'staging',
        host: 'preview.contentful.com'
      });
    });
  });

  describe('entryLoader', () => {
    it('should load single entry successfully', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockEntry = {
        sys: { id: 'entry1', contentType: { sys: { id: 'blog' } } },
        fields: { title: { 'en-US': 'Test Entry' } }
      };

      mockProdClient.getEntries.mockResolvedValue({
        items: [mockEntry],
        total: 1
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entryLoader.load({ id: 'entry1', preview: false });

      expect(result).toEqual(mockEntry);
      expect(mockProdClient.getEntries).toHaveBeenCalled();
    });

    it('should load preview entry', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockEntry = {
        sys: { id: 'entry1', contentType: { sys: { id: 'blog' } } },
        fields: { title: { 'en-US': 'Preview Entry' } }
      };

      mockPreviewClient.getEntries.mockResolvedValue({
        items: [mockEntry],
        total: 1
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entryLoader.load({ id: 'entry1', preview: true });

      expect(result).toEqual(mockEntry);
      expect(mockPreviewClient.getEntries).toHaveBeenCalled();
    });

    it('should return null for non-existent entry', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      mockProdClient.getEntries.mockResolvedValue({
        items: [],
        total: 0
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entryLoader.load({ id: 'nonexistent', preview: false });

      expect(result).toBeNull();
    });

    it('should batch load multiple entries', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockEntries = [
        { sys: { id: 'entry1' }, fields: { title: { 'en-US': 'Entry 1' } } },
        { sys: { id: 'entry2' }, fields: { title: { 'en-US': 'Entry 2' } } }
      ];

      mockProdClient.getEntries.mockResolvedValue({
        items: mockEntries,
        total: 2
      });

      const loaders = createLoaders(config, 'en-US');
      const results = await loaders.entryLoader.loadMany([
        { id: 'entry1', preview: false },
        { id: 'entry2', preview: false }
      ]);

      expect(results).toEqual(mockEntries);
      expect(mockProdClient.getEntries).toHaveBeenCalledTimes(1);
    });

    it('should handle mixed preview and production requests', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockProdEntry = { sys: { id: 'entry1' }, fields: { title: { 'en-US': 'Prod Entry' } } };
      const mockPreviewEntry = { sys: { id: 'entry2' }, fields: { title: { 'en-US': 'Preview Entry' } } };

      mockProdClient.getEntries.mockResolvedValue({
        items: [mockProdEntry],
        total: 1
      });

      mockPreviewClient.getEntries.mockResolvedValue({
        items: [mockPreviewEntry],
        total: 1
      });

      const loaders = createLoaders(config, 'en-US');
      const results = await loaders.entryLoader.loadMany([
        { id: 'entry1', preview: false },
        { id: 'entry2', preview: true }
      ]);

      expect(results).toEqual([mockProdEntry, mockPreviewEntry]);
      expect(mockProdClient.getEntries).toHaveBeenCalledTimes(1);
      expect(mockPreviewClient.getEntries).toHaveBeenCalledTimes(1);
    });
  });

  describe('assetLoader', () => {
    it('should load asset successfully', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockAsset = {
        sys: { id: 'asset1' },
        fields: { file: { 'en-US': { url: 'https://example.com/image.jpg' } } }
      };

      mockProdClient.getAssets.mockResolvedValue({
        items: [mockAsset],
        total: 1
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.assetLoader.load({ id: 'asset1', preview: false });

      expect(result).toEqual(mockAsset);
      expect(mockProdClient.getAssets).toHaveBeenCalled();
    });

    it('should return null for non-existent asset', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      mockProdClient.getAssets.mockResolvedValue({
        items: [],
        total: 0
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.assetLoader.load({ id: 'nonexistent', preview: false });

      expect(result).toBeNull();
    });
  });

  describe('entriesByContentTypeLoader', () => {
    it('should load entries by content type', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockEntries = [
        { sys: { id: 'entry1', contentType: { sys: { id: 'blog' } } }, fields: {} },
        { sys: { id: 'entry2', contentType: { sys: { id: 'blog' } } }, fields: {} }
      ];

      mockMakeContentfulRequest.mockResolvedValue(mockEntries as any);

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entriesByContentTypeLoader.load({ id: 'blog', preview: false });

      expect(result).toEqual(mockEntries);
      expect(mockMakeContentfulRequest).toHaveBeenCalledWith(mockProdClient, 'getEntries', 500, {
        content_type: 'blog',
        include: 0,
        locale: '*'
      });
    });

    it('should handle preview mode', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockEntries = [{ sys: { id: 'entry1', contentType: { sys: { id: 'blog' } } }, fields: {} }];

      mockMakeContentfulRequest.mockResolvedValue(mockEntries as any);

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entriesByContentTypeLoader.load({ id: 'blog', preview: true });

      expect(result).toEqual(mockEntries);
      expect(mockMakeContentfulRequest).toHaveBeenCalledWith(mockPreviewClient, 'getEntries', 500, {
        content_type: 'blog',
        include: 0,
        locale: '*'
      });
    });

    it('should use custom maxBatchSize', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token',
          maxBatchSize: 500
        }
      });

      mockMakeContentfulRequest.mockResolvedValue([]);

      const loaders = createLoaders(config, 'en-US');
      await loaders.entriesByContentTypeLoader.load({ id: 'blog', preview: false });

      expect(mockMakeContentfulRequest).toHaveBeenCalledWith(mockProdClient, 'getEntries', 500, expect.any(Object));
    });
  });

  describe('entryByFieldValueLoader', () => {
    it('should find entry by field value', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockEntry = {
        sys: { id: 'entry1', contentType: { sys: { id: 'blog' } } },
        fields: { slug: { 'en-US': 'test-slug' } }
      };

      mockProdClient.getEntries.mockResolvedValue({
        items: [mockEntry]
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entryByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug',
        value: 'test-slug',
        preview: false
      });

      expect(result).toEqual(mockEntry);
      expect(mockProdClient.getEntries).toHaveBeenCalledWith({
        'content_type': 'blog',
        'include': 0,
        'fields.slug[in]': 'test-slug'
      });
    });

    it('should return null when entry not found', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      mockProdClient.getEntries.mockResolvedValue({
        items: []
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entryByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug',
        value: 'nonexistent',
        preview: false
      });

      expect(result).toBeNull();
    });

    it('should handle preview mode', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockEntry = {
        sys: { id: 'entry1', contentType: { sys: { id: 'blog' } } },
        fields: { slug: { 'en-US': 'preview-slug' } }
      };

      mockPreviewClient.getEntries.mockResolvedValue({
        items: [mockEntry]
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entryByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug',
        value: 'preview-slug',
        preview: true
      });

      expect(result).toEqual(mockEntry);
      expect(mockPreviewClient.getEntries).toHaveBeenCalledWith({
        'content_type': 'blog',
        'include': 0,
        'fields.slug[in]': 'preview-slug'
      });
    });
  });

  describe('fetchAllContentTypes', () => {
    it('should fetch content types successfully', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockContentTypes = [
        { sys: { id: 'blog' }, name: 'Blog' },
        { sys: { id: 'page' }, name: 'Page' }
      ];

      mockProdClient.getContentTypes.mockResolvedValue({
        items: mockContentTypes
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.fetchAllContentTypes(false);

      expect(result).toEqual(mockContentTypes);
      expect(mockProdClient.getContentTypes).toHaveBeenCalled();
    });

    it('should fetch preview content types', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockContentTypes = [{ sys: { id: 'blog' }, name: 'Blog' }];

      mockPreviewClient.getContentTypes.mockResolvedValue({
        items: mockContentTypes
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.fetchAllContentTypes(true);

      expect(result).toEqual(mockContentTypes);
      expect(mockPreviewClient.getContentTypes).toHaveBeenCalled();
    });

    it('should return empty array on error', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      mockProdClient.getContentTypes.mockRejectedValue(new Error('API Error'));

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.fetchAllContentTypes(false);

      expect(result).toEqual([]);
    });
  });

  describe('entriesRefByLoader', () => {
    it('should load entries referencing a specific entry', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockReferencingEntries = [
        {
          sys: { id: 'ref1', contentType: { sys: { id: 'article' } } },
          fields: { author: { 'en-US': { sys: { id: 'author1', type: 'Link' } } } }
        },
        {
          sys: { id: 'ref2', contentType: { sys: { id: 'article' } } },
          fields: { author: { 'en-US': { sys: { id: 'author1', type: 'Link' } } } }
        }
      ];

      // Mock the client to return the referencing entries
      mockProdClient.getEntries.mockImplementation((query: any) => {
        if (query['fields.author.sys.id[in]'] === 'author1') {
          return Promise.resolve({
            items: mockReferencingEntries,
            total: 2
          });
        }
        return Promise.resolve({ items: [], total: 0 });
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entriesRefByLoader.load({
        contentType: 'article',
        field: 'author',
        id: 'author1',
        preview: false
      });

      expect(result).toEqual(mockReferencingEntries);
      expect(mockProdClient.getEntries).toHaveBeenCalledWith({
        'content_type': 'article',
        'include': 0,
        'fields.author.sys.id[in]': 'author1'
      });
    });

    it('should handle preview mode for referenced entries', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockReferencingEntries = [
        {
          sys: { id: 'ref1', contentType: { sys: { id: 'article' } } },
          fields: { category: { 'en-US': { sys: { id: 'cat1', type: 'Link' } } } }
        }
      ];

      // Mock the preview client to return the referencing entries
      mockPreviewClient.getEntries.mockImplementation((query: any) => {
        if (query['fields.category.sys.id[in]'] === 'cat1') {
          return Promise.resolve({
            items: mockReferencingEntries,
            total: 1
          });
        }
        return Promise.resolve({ items: [], total: 0 });
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entriesRefByLoader.load({
        contentType: 'article',
        field: 'category',
        id: 'cat1',
        preview: true
      });

      expect(result).toEqual(mockReferencingEntries);
      expect(mockPreviewClient.getEntries).toHaveBeenCalledWith({
        'content_type': 'article',
        'include': 0,
        'fields.category.sys.id[in]': 'cat1'
      });
    });

    it('should return empty array when no references found', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      mockProdClient.getEntries.mockResolvedValue({
        items: [],
        total: 0
      });

      const loaders = createLoaders(config, 'en-US');
      const result = await loaders.entriesRefByLoader.load({
        contentType: 'article',
        field: 'author',
        id: 'nonexistent',
        preview: false
      });

      expect(result).toEqual([]);
    });
  });

  describe('caching behavior', () => {
    it('should use different cache keys for preview vs production', async () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test-space',
          env: 'master',
          contentDeliveryToken: 'delivery-token',
          contentPreviewToken: 'preview-token'
        }
      });

      const mockProdEntry = { sys: { id: 'entry1' }, fields: { title: { 'en-US': 'Prod' } } };
      const mockPreviewEntry = { sys: { id: 'entry1' }, fields: { title: { 'en-US': 'Preview' } } };

      mockProdClient.getEntries.mockResolvedValue({
        items: [mockProdEntry],
        total: 1
      });

      mockPreviewClient.getEntries.mockResolvedValue({
        items: [mockPreviewEntry],
        total: 1
      });

      const loaders = createLoaders(config, 'en-US');

      // Load both versions
      const prodResult = await loaders.entryLoader.load({ id: 'entry1', preview: false });
      const previewResult = await loaders.entryLoader.load({ id: 'entry1', preview: true });

      expect(prodResult).toEqual(mockProdEntry);
      expect(previewResult).toEqual(mockPreviewEntry);
      expect(mockProdClient.getEntries).toHaveBeenCalledTimes(1);
      expect(mockPreviewClient.getEntries).toHaveBeenCalledTimes(1);
    });
  });
});
