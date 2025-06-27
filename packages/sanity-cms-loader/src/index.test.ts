import createLoaders from './index';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';
import { createClient } from '@sanity/client';

// Mock dependencies
jest.mock('@sanity/client');
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

jest.mock('@last-rev/sanity-mapper', () => ({
  convertSanityDoc: jest.fn((doc, _defaultLocale, _locales) => {
    if (!doc) return null;
    return {
      sys: {
        id: doc._id,
        type: doc._type === 'sanityImageAsset' ? 'Asset' : 'Entry',
        contentType: { sys: { id: doc._type } }
      },
      fields: {
        title: doc.title || `Converted ${doc._type}`,
        slug: doc.slug?.current || doc.slug,
        ...doc
      },
      metadata: { tags: [] }
    };
  }),
  mapSanityTypesToContentfulTypes: jest.fn((schemaTypes) => {
    return (
      schemaTypes?.map((type: any) => ({
        sys: { type: 'ContentType', id: type.name },
        name: type.title || type.name,
        fields: []
      })) || []
    );
  })
}));

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

describe('sanity-cms-loader', () => {
  let baseConfig: LastRevAppConfig;
  let mockProdClient: any;
  let mockPreviewClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    baseConfig = new LastRevAppConfig(mockAppConfig());

    // Mock Sanity clients
    mockProdClient = {
      fetch: jest.fn()
    };

    mockPreviewClient = {
      fetch: jest.fn()
    };

    // Mock the createClient to return our mock clients
    mockCreateClient.mockImplementation((config: any) => {
      return config.perspective === 'drafts' ? mockPreviewClient : mockProdClient;
    });
  });

  describe('createLoaders', () => {
    it('should create all required loaders', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          apiVersion: '2021-10-21',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const loaders = createLoaders(config, 'en');

      expect(loaders).toHaveProperty('entryLoader');
      expect(loaders).toHaveProperty('assetLoader');
      expect(loaders).toHaveProperty('entriesByContentTypeLoader');
      expect(loaders).toHaveProperty('entryByFieldValueLoader');
      expect(loaders).toHaveProperty('entriesRefByLoader');
      expect(loaders).toHaveProperty('fetchAllContentTypes');
    });

    it('should create clients with correct configuration', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'staging',
          apiVersion: '2022-01-01',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      createLoaders(config, 'en');

      expect(mockCreateClient).toHaveBeenCalledTimes(2);

      // Production client
      expect(mockCreateClient).toHaveBeenCalledWith({
        projectId: 'test-project',
        dataset: 'staging',
        apiVersion: '2022-01-01',
        token: 'test-token',
        useCdn: true
      });

      // Preview client
      expect(mockCreateClient).toHaveBeenCalledWith({
        projectId: 'test-project',
        dataset: 'staging',
        apiVersion: '2022-01-01',
        token: 'test-token',
        useCdn: false,
        perspective: 'drafts'
      });
    });

    it('should use default API version when not specified', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      createLoaders(config, 'en');

      expect(mockCreateClient).toHaveBeenCalledWith(
        expect.objectContaining({
          apiVersion: '2021-06-07'
        })
      );
    });
  });

  describe('entryLoader', () => {
    it('should load single entry successfully', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDoc = {
        _id: 'doc1',
        _type: 'blog',
        title: 'Test Blog',
        slug: { current: 'test-blog' }
      };

      mockProdClient.fetch.mockResolvedValue([mockDoc]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entryLoader.load({ id: 'doc1', preview: false });

      expect(result).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({
            id: 'doc1',
            type: 'Entry'
          }),
          fields: expect.objectContaining({
            title: 'Test Blog'
          })
        })
      );
      expect(mockProdClient.fetch).toHaveBeenCalled();
    });

    it('should load preview entry', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDoc = {
        _id: 'doc1',
        _type: 'blog',
        title: 'Preview Blog',
        slug: { current: 'preview-blog' }
      };

      mockPreviewClient.fetch.mockResolvedValue([mockDoc]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entryLoader.load({ id: 'doc1', preview: true });

      expect(result).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({
            id: 'doc1',
            type: 'Entry'
          }),
          fields: expect.objectContaining({
            title: 'Preview Blog'
          })
        })
      );
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });

    it('should return null for non-existent entry', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      mockProdClient.fetch.mockResolvedValue([]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entryLoader.load({ id: 'nonexistent', preview: false });

      expect(result).toBeNull();
    });

    it('should batch load multiple entries', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDocs = [
        { _id: 'doc1', _type: 'blog', title: 'Blog 1' },
        { _id: 'doc2', _type: 'blog', title: 'Blog 2' }
      ];

      mockProdClient.fetch.mockResolvedValue(mockDocs);

      const loaders = createLoaders(config, 'en');
      const results = await loaders.entryLoader.loadMany([
        { id: 'doc1', preview: false },
        { id: 'doc2', preview: false }
      ]);

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({ id: 'doc1' })
        })
      );
      expect(results[1]).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({ id: 'doc2' })
        })
      );
    });

    it('should handle mixed preview and production requests', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockProdDoc = { _id: 'doc1', _type: 'blog', title: 'Prod Blog' };
      const mockPreviewDoc = { _id: 'doc2', _type: 'blog', title: 'Preview Blog' };

      mockProdClient.fetch.mockResolvedValue([mockProdDoc]);
      mockPreviewClient.fetch.mockResolvedValue([mockPreviewDoc]);

      const loaders = createLoaders(config, 'en');
      const results = await loaders.entryLoader.loadMany([
        { id: 'doc1', preview: false },
        { id: 'doc2', preview: true }
      ]);

      expect(results).toHaveLength(2);
      expect(mockProdClient.fetch).toHaveBeenCalled();
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });
  });

  describe('assetLoader', () => {
    it('should load asset successfully', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockAsset = {
        _id: 'image-abc123',
        _type: 'sanityImageAsset',
        url: 'https://cdn.sanity.io/images/project/dataset/abc123.jpg'
      };

      mockProdClient.fetch.mockResolvedValue([mockAsset]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.assetLoader.load({ id: 'image-abc123', preview: false });

      expect(result).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({
            id: 'image-abc123',
            type: 'Asset'
          })
        })
      );
    });

    it('should return null for non-existent asset', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      mockProdClient.fetch.mockResolvedValue([]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.assetLoader.load({ id: 'nonexistent', preview: false });

      expect(result).toBeNull();
    });
  });

  describe('entriesByContentTypeLoader', () => {
    it('should load entries by content type', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDocs = [
        { _id: 'blog1', _type: 'blog', title: 'Blog 1' },
        { _id: 'blog2', _type: 'blog', title: 'Blog 2' }
      ];

      mockProdClient.fetch.mockResolvedValue(mockDocs);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entriesByContentTypeLoader.load({ id: 'blog', preview: false });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({ id: 'blog1' })
        })
      );
      expect(mockProdClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == $type'),
        expect.objectContaining({ type: 'blog', defaultLocale: 'en' })
      );
    });

    it('should handle preview mode', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDocs = [{ _id: 'blog1', _type: 'blog', title: 'Preview Blog' }];

      mockPreviewClient.fetch.mockResolvedValue(mockDocs);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entriesByContentTypeLoader.load({ id: 'blog', preview: true });

      expect(result).toHaveLength(1);
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });

    it('should return empty array for non-existent content types', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      mockProdClient.fetch.mockResolvedValue([]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entriesByContentTypeLoader.load({ id: 'nonexistent', preview: false });

      expect(result).toEqual([]);
    });
  });

  describe('entryByFieldValueLoader', () => {
    it('should find entry by field value', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDoc = {
        _id: 'blog1',
        _type: 'blog',
        slug: { current: 'test-slug' },
        title: 'Test Blog'
      };

      mockProdClient.fetch.mockResolvedValue(mockDoc);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entryByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug.current',
        value: 'test-slug',
        preview: false
      });

      expect(result).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({ id: 'blog1' })
        })
      );
      expect(mockProdClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == $type && slug.current == $value'),
        expect.objectContaining({
          type: 'blog',
          value: 'test-slug',
          defaultLocale: 'en'
        })
      );
    });

    it('should return null when entry not found', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      mockProdClient.fetch.mockResolvedValue(null);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entryByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug.current',
        value: 'nonexistent',
        preview: false
      });

      expect(result).toBeNull();
    });

    it('should handle preview mode', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDoc = {
        _id: 'blog1',
        _type: 'blog',
        slug: { current: 'preview-slug' }
      };

      mockPreviewClient.fetch.mockResolvedValue(mockDoc);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entryByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug.current',
        value: 'preview-slug',
        preview: true
      });

      expect(result).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({ id: 'blog1' })
        })
      );
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });
  });

  describe('entriesRefByLoader', () => {
    it('should load entries referencing a specific entry', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockReferencingDocs = [
        { _id: 'article1', _type: 'article', author: { _ref: 'author1' } },
        { _id: 'article2', _type: 'article', author: { _ref: 'author1' } }
      ];

      mockProdClient.fetch.mockResolvedValue(mockReferencingDocs);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entriesRefByLoader.load({
        contentType: 'article',
        field: 'author',
        id: 'author1',
        preview: false
      });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(
        expect.objectContaining({
          sys: expect.objectContaining({ id: 'article1' })
        })
      );
      expect(mockProdClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == $type && (author._ref == $id || $id in author[]._ref)'),
        expect.objectContaining({
          type: 'article',
          id: 'author1',
          defaultLocale: 'en'
        })
      );
    });

    it('should handle preview mode for referenced entries', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockReferencingDocs = [{ _id: 'article1', _type: 'article', category: { _ref: 'cat1' } }];

      mockPreviewClient.fetch.mockResolvedValue(mockReferencingDocs);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entriesRefByLoader.load({
        contentType: 'article',
        field: 'category',
        id: 'cat1',
        preview: true
      });

      expect(result).toHaveLength(1);
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });

    it('should return empty array when no references found', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      mockProdClient.fetch.mockResolvedValue([]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.entriesRefByLoader.load({
        contentType: 'article',
        field: 'author',
        id: 'nonexistent',
        preview: false
      });

      expect(result).toEqual([]);
    });
  });

  describe('fetchAllContentTypes', () => {
    it('should fetch content types from schema types', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: [
            { name: 'blog', title: 'Blog Post' },
            { name: 'page', title: 'Page' }
          ]
        }
      });

      const loaders = createLoaders(config, 'en');
      const result = await loaders.fetchAllContentTypes(false);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        sys: { type: 'ContentType', id: 'blog' },
        name: 'Blog Post',
        fields: []
      });
      expect(result[1]).toEqual({
        sys: { type: 'ContentType', id: 'page' },
        name: 'Page',
        fields: []
      });
    });

    it('should handle preview mode', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: [{ name: 'blog', title: 'Blog Post' }]
        }
      });

      const loaders = createLoaders(config, 'en');
      const result = await loaders.fetchAllContentTypes(true);

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            sys: { type: 'ContentType', id: 'blog' },
            name: 'Blog Post',
            fields: []
          })
        ])
      );
    });

    it('should return empty array on error', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: undefined as any // This will cause an error
        }
      });

      const loaders = createLoaders(config, 'en');
      const result = await loaders.fetchAllContentTypes(false);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('caching behavior', () => {
    it('should use different cache keys for preview vs production', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [{ id: 'en', title: 'English' }],
          schemaTypes: []
        }
      });

      const mockDoc = { _id: 'doc1', _type: 'blog', title: 'Test' };

      mockProdClient.fetch.mockResolvedValue([mockDoc]);
      mockPreviewClient.fetch.mockResolvedValue([mockDoc]);

      const loaders = createLoaders(config, 'en');

      // Load both versions
      const prodResult = await loaders.entryLoader.load({ id: 'doc1', preview: false });
      const previewResult = await loaders.entryLoader.load({ id: 'doc1', preview: true });

      expect(prodResult).toBeDefined();
      expect(previewResult).toBeDefined();
      expect(mockProdClient.fetch).toHaveBeenCalled();
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });
  });

  describe('multilingual support', () => {
    it('should handle multiple supported languages', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [
            { id: 'en', title: 'English' },
            { id: 'es', title: 'Spanish' },
            { id: 'fr', title: 'French' }
          ],
          schemaTypes: []
        }
      });

      const loaders = createLoaders(config, 'en');

      expect(loaders).toHaveProperty('entryLoader');
      expect(loaders).toHaveProperty('assetLoader');
    });

    it('should include translations in queries', async () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        sanity: {
          projectId: 'test-project',
          dataset: 'production',
          token: 'test-token',
          supportedLanguages: [
            { id: 'en', title: 'English' },
            { id: 'es', title: 'Spanish' }
          ],
          schemaTypes: []
        }
      });

      mockProdClient.fetch.mockResolvedValue([]);

      const loaders = createLoaders(config, 'en');
      await loaders.entryLoader.load({ id: 'doc1', preview: false });

      expect(mockProdClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('_translations'),
        expect.objectContaining({ defaultLocale: 'en' })
      );
    });
  });
});
