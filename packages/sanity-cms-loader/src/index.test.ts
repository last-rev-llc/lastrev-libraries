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

      // Sanity-native loaders (unified document model)
      expect(loaders).toHaveProperty('documentLoader');
      expect(loaders).toHaveProperty('documentsByTypeLoader');
      expect(loaders).toHaveProperty('documentByFieldValueLoader');
      expect(loaders).toHaveProperty('documentsRefByLoader');
      // fetchAllContentTypes removed - schemas come from config.sanity.schemaTypes
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

  describe('documentLoader', () => {
    it('should load single document and return native Sanity document', async () => {
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
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-02T00:00:00Z',
        _rev: 'abc123',
        title: 'Test Blog',
        slug: { current: 'test-blog' }
      };

      mockProdClient.fetch.mockResolvedValue([mockDoc]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.documentLoader.load({ id: 'doc1', preview: false });

      // Should return native Sanity document structure
      expect(result).toEqual(mockDoc);
      expect(result?._id).toBe('doc1');
      expect(result?._type).toBe('blog');
      expect(mockProdClient.fetch).toHaveBeenCalled();
    });

    it('should load preview document', async () => {
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
      const result = await loaders.documentLoader.load({ id: 'doc1', preview: true });

      expect(result).toEqual(mockDoc);
      expect(result?._id).toBe('doc1');
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });

    it('should return null for non-existent document', async () => {
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
      const result = await loaders.documentLoader.load({ id: 'nonexistent', preview: false });

      expect(result).toBeNull();
    });

    it('should batch load multiple documents', async () => {
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
      const results = await loaders.documentLoader.loadMany([
        { id: 'doc1', preview: false },
        { id: 'doc2', preview: false }
      ]);

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(expect.objectContaining({ _id: 'doc1' }));
      expect(results[1]).toEqual(expect.objectContaining({ _id: 'doc2' }));
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
      const results = await loaders.documentLoader.loadMany([
        { id: 'doc1', preview: false },
        { id: 'doc2', preview: true }
      ]);

      expect(results).toHaveLength(2);
      expect(mockProdClient.fetch).toHaveBeenCalled();
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });

    it('should use simplified GROQ query without translations', async () => {
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
      await loaders.documentLoader.load({ id: 'doc1', preview: false });

      // Should NOT include _translations or __i18n_lang filters
      expect(mockProdClient.fetch).toHaveBeenCalledWith(
        '*[_id in $ids]',
        expect.objectContaining({ ids: ['doc1'] })
      );
    });

    it('should load asset documents (unified document model)', async () => {
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
        _type: 'sanity.imageAsset',
        url: 'https://cdn.sanity.io/images/project/dataset/abc123.jpg',
        metadata: { dimensions: { width: 800, height: 600 } }
      };

      mockProdClient.fetch.mockResolvedValue([mockAsset]);

      const loaders = createLoaders(config, 'en');
      // Same documentLoader handles both entries and assets (unified document model)
      const result = await loaders.documentLoader.load({ id: 'image-abc123', preview: false });

      expect(result).toEqual(mockAsset);
      expect(result?._id).toBe('image-abc123');
      expect(result?._type).toBe('sanity.imageAsset');
    });
  });

  describe('documentsByTypeLoader', () => {
    it('should load documents by type', async () => {
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
      const result = await loaders.documentsByTypeLoader.load({ id: 'blog', preview: false });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(expect.objectContaining({ _id: 'blog1' }));
      expect(mockProdClient.fetch).toHaveBeenCalledWith('*[_type == $type]', expect.objectContaining({ type: 'blog' }));
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
      const result = await loaders.documentsByTypeLoader.load({ id: 'blog', preview: true });

      expect(result).toHaveLength(1);
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });

    it('should return empty array for non-existent types', async () => {
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
      const result = await loaders.documentsByTypeLoader.load({ id: 'nonexistent', preview: false });

      expect(result).toEqual([]);
    });
  });

  describe('documentByFieldValueLoader', () => {
    it('should find document by field value', async () => {
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
      const result = await loaders.documentByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug.current',
        value: 'test-slug',
        preview: false
      });

      expect(result).toEqual(mockDoc);
      expect(result?._id).toBe('blog1');
      expect(mockProdClient.fetch).toHaveBeenCalledWith(
        '*[_type == $type && slug.current == $value][0]',
        expect.objectContaining({
          type: 'blog',
          value: 'test-slug'
        })
      );
    });

    it('should return null when document not found', async () => {
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
      const result = await loaders.documentByFieldValueLoader.load({
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
      const result = await loaders.documentByFieldValueLoader.load({
        contentType: 'blog',
        field: 'slug.current',
        value: 'preview-slug',
        preview: true
      });

      expect(result).toEqual(mockDoc);
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });
  });

  describe('documentsRefByLoader', () => {
    it('should load documents referencing a specific document', async () => {
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
      const result = await loaders.documentsRefByLoader.load({
        contentType: 'article',
        field: 'author',
        id: 'author1',
        preview: false
      });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(expect.objectContaining({ _id: 'article1' }));
      expect(mockProdClient.fetch).toHaveBeenCalledWith(
        '*[_type == $type && (author._ref == $id || $id in author[]._ref)]',
        expect.objectContaining({
          type: 'article',
          id: 'author1'
        })
      );
    });

    it('should handle preview mode for referenced documents', async () => {
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
      const result = await loaders.documentsRefByLoader.load({
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
      const result = await loaders.documentsRefByLoader.load({
        contentType: 'article',
        field: 'author',
        id: 'nonexistent',
        preview: false
      });

      expect(result).toEqual([]);
    });
  });

  // fetchAllContentTypes removed - Sanity schemas come from config.sanity.schemaTypes
  // Schema types should be accessed directly via config, not loaded at runtime

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
      const prodResult = await loaders.documentLoader.load({ id: 'doc1', preview: false });
      const previewResult = await loaders.documentLoader.load({ id: 'doc1', preview: true });

      expect(prodResult).toBeDefined();
      expect(previewResult).toBeDefined();
      expect(mockProdClient.fetch).toHaveBeenCalled();
      expect(mockPreviewClient.fetch).toHaveBeenCalled();
    });
  });

  describe('field-level i18n support', () => {
    it('should not include document-based i18n filters in queries', async () => {
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
      await loaders.documentLoader.load({ id: 'doc1', preview: false });

      // Query should NOT include __i18n_lang or _translations
      const calledQuery = mockProdClient.fetch.mock.calls[0][0];
      expect(calledQuery).not.toContain('__i18n_lang');
      expect(calledQuery).not.toContain('_translations');
      expect(calledQuery).toBe('*[_id in $ids]');
    });

    it('should work with field-level internationalized values', async () => {
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

      // Document with field-level i18n (sanity-plugin-internationalized-array format)
      const mockDoc = {
        _id: 'blog1',
        _type: 'blog',
        title: [
          { _key: 'en', value: 'English Title' },
          { _key: 'es', value: 'Titulo en Espanol' }
        ],
        body: [
          { _key: 'en', value: [{ _type: 'block', children: [{ text: 'English content' }] }] },
          { _key: 'es', value: [{ _type: 'block', children: [{ text: 'Contenido en espanol' }] }] }
        ]
      };

      mockProdClient.fetch.mockResolvedValue([mockDoc]);

      const loaders = createLoaders(config, 'en');
      const result = await loaders.documentLoader.load({ id: 'blog1', preview: false });

      // Should return native document with field-level i18n intact
      expect(result).toEqual(mockDoc);
      const doc = result as unknown as typeof mockDoc;
      expect(doc.title).toHaveLength(2);
      expect(doc.title[0]._key).toBe('en');
      expect(doc.title[1]._key).toBe('es');
    });
  });
});
