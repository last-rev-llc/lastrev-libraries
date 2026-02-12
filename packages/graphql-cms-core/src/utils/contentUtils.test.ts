import { ApolloContext } from '@last-rev/types';
import {
  getContentId,
  getContentType,
  getUpdatedAt,
  getRefInfo,
  getLoaders,
  loadDocument,
  loadDocuments,
  loadDocumentsByType,
  loadDocumentByFieldValue,
  loadDocumentsRefBy
} from './contentUtils';

describe('contentUtils', () => {
  const createSanityContext = (overrides = {}): ApolloContext =>
    ({
      cms: 'Sanity',
      sanityLoaders: {
        documentLoader: {
          load: jest.fn(),
          loadMany: jest.fn()
        },
        documentsByTypeLoader: { load: jest.fn() },
        documentByFieldValueLoader: { load: jest.fn() },
        documentsRefByLoader: { load: jest.fn() }
      },
      loaders: {},
      ...overrides
    }) as unknown as ApolloContext;

  const createContentfulContext = (overrides = {}): ApolloContext =>
    ({
      cms: 'Contentful',
      loaders: {
        entryLoader: {
          load: jest.fn(),
          loadMany: jest.fn()
        },
        assetLoader: {
          load: jest.fn(),
          loadMany: jest.fn()
        },
        entriesByContentTypeLoader: { load: jest.fn() },
        entryByFieldValueLoader: { load: jest.fn() },
        entriesRefByLoader: { load: jest.fn() }
      },
      sanityLoaders: {},
      ...overrides
    }) as unknown as ApolloContext;

  describe('getContentId', () => {
    it('returns _id for Sanity entries', () => {
      const ctx = createSanityContext();
      const entry = { _id: 'sanity-doc-123', _type: 'page' } as any;
      expect(getContentId(entry, ctx)).toBe('sanity-doc-123');
    });

    it('returns sys.id for Contentful entries', () => {
      const ctx = createContentfulContext();
      const entry = { sys: { id: 'contentful-entry-456' }, fields: {} } as any;
      expect(getContentId(entry, ctx)).toBe('contentful-entry-456');
    });

    it('returns undefined for null Sanity entry', () => {
      const ctx = createSanityContext();
      expect(getContentId(null as any, ctx)).toBeUndefined();
    });

    it('returns undefined for null Contentful entry', () => {
      const ctx = createContentfulContext();
      expect(getContentId(null as any, ctx)).toBeUndefined();
    });

    it('returns undefined for Sanity entry without _id', () => {
      const ctx = createSanityContext();
      const entry = { _type: 'page' };
      expect(getContentId(entry as any, ctx)).toBeUndefined();
    });

    it('returns undefined for Contentful entry without sys', () => {
      const ctx = createContentfulContext();
      const entry = { fields: {} };
      expect(getContentId(entry as any, ctx)).toBeUndefined();
    });
  });

  describe('getContentType', () => {
    it('returns _type for Sanity entries', () => {
      const ctx = createSanityContext();
      const entry = { _id: 'doc-123', _type: 'blogPost' } as any;
      expect(getContentType(entry, ctx)).toBe('blogPost');
    });

    it('returns sys.contentType.sys.id for Contentful entries', () => {
      const ctx = createContentfulContext();
      const entry = { sys: { id: '123', contentType: { sys: { id: 'article' } } }, fields: {} } as any;
      expect(getContentType(entry, ctx)).toBe('article');
    });

    it('returns sys.type for Contentful assets', () => {
      const ctx = createContentfulContext();
      const entry = { sys: { id: '123', type: 'Asset' }, fields: {} } as any;
      expect(getContentType(entry, ctx)).toBe('Asset');
    });

    it('returns undefined for null Sanity entry', () => {
      const ctx = createSanityContext();
      expect(getContentType(null as any, ctx)).toBeUndefined();
    });

    it('returns undefined for null Contentful entry', () => {
      const ctx = createContentfulContext();
      expect(getContentType(null as any, ctx)).toBeUndefined();
    });

    it('returns undefined for Sanity entry without _type', () => {
      const ctx = createSanityContext();
      const entry = { _id: 'doc-123' };
      expect(getContentType(entry as any, ctx)).toBeUndefined();
    });
  });

  describe('getUpdatedAt', () => {
    it('returns _updatedAt for Sanity entries', () => {
      const ctx = createSanityContext();
      const entry = { _id: 'doc-123', _updatedAt: '2024-01-15T10:30:00Z' };
      expect(getUpdatedAt(entry as any, ctx)).toBe('2024-01-15T10:30:00Z');
    });

    it('returns sys.updatedAt for Contentful entries', () => {
      const ctx = createContentfulContext();
      const entry = { sys: { id: '123', updatedAt: '2024-01-15T10:30:00Z' }, fields: {} };
      expect(getUpdatedAt(entry as any, ctx)).toBe('2024-01-15T10:30:00Z');
    });

    it('returns undefined for null entry', () => {
      const ctx = createSanityContext();
      expect(getUpdatedAt(null as any, ctx)).toBeUndefined();
    });

    it('returns undefined for entry without timestamp', () => {
      const ctx = createSanityContext();
      const entry = { _id: 'doc-123' };
      expect(getUpdatedAt(entry as any, ctx)).toBeUndefined();
    });
  });

  describe('getRefInfo', () => {
    describe('Sanity', () => {
      it('identifies Sanity reference with _ref', () => {
        const ctx = createSanityContext();
        const ref = { _ref: 'referenced-doc-123', _type: 'reference' };
        const result = getRefInfo(ref, ctx);
        expect(result).toEqual({
          isReference: true,
          isEntry: true,
          isAsset: false,
          id: 'referenced-doc-123'
        });
      });

      it('returns non-reference for plain object', () => {
        const ctx = createSanityContext();
        const value = { title: 'Hello', description: 'World' };
        const result = getRefInfo(value, ctx);
        expect(result).toEqual({
          isReference: false,
          isEntry: false,
          isAsset: false,
          id: null
        });
      });

      it('returns non-reference for null', () => {
        const ctx = createSanityContext();
        expect(getRefInfo(null, ctx)).toEqual({
          isReference: false,
          isEntry: false,
          isAsset: false,
          id: null
        });
      });

      it('returns non-reference for undefined', () => {
        const ctx = createSanityContext();
        expect(getRefInfo(undefined, ctx)).toEqual({
          isReference: false,
          isEntry: false,
          isAsset: false,
          id: null
        });
      });

      it('returns non-reference for string', () => {
        const ctx = createSanityContext();
        expect(getRefInfo('plain-string', ctx)).toEqual({
          isReference: false,
          isEntry: false,
          isAsset: false,
          id: null
        });
      });
    });

    describe('Contentful', () => {
      it('identifies Contentful entry reference', () => {
        const ctx = createContentfulContext();
        const ref = { sys: { id: 'entry-123', linkType: 'Entry', type: 'Link' } };
        const result = getRefInfo(ref, ctx);
        expect(result).toEqual({
          isReference: true,
          isEntry: true,
          isAsset: false,
          id: 'entry-123'
        });
      });

      it('identifies Contentful asset reference', () => {
        const ctx = createContentfulContext();
        const ref = { sys: { id: 'asset-456', linkType: 'Asset', type: 'Link' } };
        const result = getRefInfo(ref, ctx);
        expect(result).toEqual({
          isReference: true,
          isEntry: false,
          isAsset: true,
          id: 'asset-456'
        });
      });

      it('returns non-reference for resolved entry (no linkType)', () => {
        const ctx = createContentfulContext();
        const entry = { sys: { id: '123', type: 'Entry' }, fields: {} };
        const result = getRefInfo(entry, ctx);
        expect(result).toEqual({
          isReference: false,
          isEntry: false,
          isAsset: false,
          id: null
        });
      });

      it('returns non-reference for null', () => {
        const ctx = createContentfulContext();
        expect(getRefInfo(null, ctx)).toEqual({
          isReference: false,
          isEntry: false,
          isAsset: false,
          id: null
        });
      });
    });
  });

  describe('getLoaders', () => {
    it('returns sanityLoaders for Sanity context', () => {
      const sanityLoaders = { documentLoader: {} };
      const ctx = createSanityContext({ sanityLoaders });
      expect(getLoaders(ctx)).toBe(sanityLoaders);
    });

    it('returns loaders for Contentful context', () => {
      const loaders = { entryLoader: {} };
      const ctx = createContentfulContext({ loaders });
      expect(getLoaders(ctx)).toBe(loaders);
    });
  });

  describe('loadDocument', () => {
    it('uses documentLoader for Sanity', async () => {
      const ctx = createSanityContext();
      const mockDoc = { _id: 'doc-123', _type: 'page' };
      (ctx.sanityLoaders!.documentLoader.load as jest.Mock).mockResolvedValue(mockDoc);

      const result = await loadDocument(ctx, 'doc-123', false);

      expect(ctx.sanityLoaders!.documentLoader.load).toHaveBeenCalledWith({
        id: 'doc-123',
        preview: false
      });
      expect(result).toBe(mockDoc);
    });

    it('uses entryLoader for Contentful entries', async () => {
      const ctx = createContentfulContext();
      const mockEntry = { sys: { id: 'entry-123' }, fields: {} };
      (ctx.loaders.entryLoader.load as jest.Mock).mockResolvedValue(mockEntry);

      const result = await loadDocument(ctx, 'entry-123', false);

      expect(ctx.loaders.entryLoader.load).toHaveBeenCalledWith({
        id: 'entry-123',
        preview: false
      });
      expect(result).toBe(mockEntry);
    });

    it('uses assetLoader for Contentful assets', async () => {
      const ctx = createContentfulContext();
      const mockAsset = { sys: { id: 'asset-456' }, fields: {} };
      (ctx.loaders.assetLoader.load as jest.Mock).mockResolvedValue(mockAsset);

      const result = await loadDocument(ctx, 'asset-456', true, true);

      expect(ctx.loaders.assetLoader.load).toHaveBeenCalledWith({
        id: 'asset-456',
        preview: true
      });
      expect(result).toBe(mockAsset);
    });

    it('passes preview flag correctly', async () => {
      const ctx = createSanityContext();
      (ctx.sanityLoaders!.documentLoader.load as jest.Mock).mockResolvedValue(null);

      await loadDocument(ctx, 'doc-123', true);

      expect(ctx.sanityLoaders!.documentLoader.load).toHaveBeenCalledWith({
        id: 'doc-123',
        preview: true
      });
    });
  });

  describe('loadDocuments', () => {
    it('uses documentLoader.loadMany for Sanity', async () => {
      const ctx = createSanityContext();
      const mockDocs = [{ _id: 'doc-1' }, { _id: 'doc-2' }];
      (ctx.sanityLoaders!.documentLoader.loadMany as jest.Mock).mockResolvedValue(mockDocs);

      const keys = [
        { id: 'doc-1', preview: false },
        { id: 'doc-2', preview: false }
      ];
      const result = await loadDocuments(ctx, keys);

      expect(ctx.sanityLoaders!.documentLoader.loadMany).toHaveBeenCalledWith(keys);
      expect(result).toEqual(mockDocs);
    });

    it('filters out null results', async () => {
      const ctx = createSanityContext();
      const mockDocs = [{ _id: 'doc-1' }, null, { _id: 'doc-3' }];
      (ctx.sanityLoaders!.documentLoader.loadMany as jest.Mock).mockResolvedValue(mockDocs);

      const keys = [
        { id: 'doc-1', preview: false },
        { id: 'doc-2', preview: false },
        { id: 'doc-3', preview: false }
      ];
      const result = await loadDocuments(ctx, keys);

      expect(result).toEqual([{ _id: 'doc-1' }, { _id: 'doc-3' }]);
    });

    it('filters out Error results', async () => {
      const ctx = createSanityContext();
      const mockDocs = [{ _id: 'doc-1' }, new Error('Not found'), { _id: 'doc-3' }];
      (ctx.sanityLoaders!.documentLoader.loadMany as jest.Mock).mockResolvedValue(mockDocs);

      const keys = [
        { id: 'doc-1', preview: false },
        { id: 'doc-2', preview: false },
        { id: 'doc-3', preview: false }
      ];
      const result = await loadDocuments(ctx, keys);

      expect(result).toEqual([{ _id: 'doc-1' }, { _id: 'doc-3' }]);
    });

    it('uses entryLoader.loadMany for Contentful entries', async () => {
      const ctx = createContentfulContext();
      const mockEntries = [{ sys: { id: 'entry-1' } }, { sys: { id: 'entry-2' } }];
      (ctx.loaders.entryLoader.loadMany as jest.Mock).mockResolvedValue(mockEntries);

      const keys = [
        { id: 'entry-1', preview: false },
        { id: 'entry-2', preview: false }
      ];
      const result = await loadDocuments(ctx, keys);

      expect(ctx.loaders.entryLoader.loadMany).toHaveBeenCalledWith(keys);
      expect(result).toEqual(mockEntries);
    });

    it('uses assetLoader.loadMany for Contentful assets', async () => {
      const ctx = createContentfulContext();
      const mockAssets = [{ sys: { id: 'asset-1' } }];
      (ctx.loaders.assetLoader.loadMany as jest.Mock).mockResolvedValue(mockAssets);

      const keys = [{ id: 'asset-1', preview: false }];
      const result = await loadDocuments(ctx, keys, true);

      expect(ctx.loaders.assetLoader.loadMany).toHaveBeenCalledWith(keys);
      expect(result).toEqual(mockAssets);
    });
  });

  describe('loadDocumentsByType', () => {
    it('uses documentsByTypeLoader for Sanity', async () => {
      const ctx = createSanityContext();
      const mockDocs = [{ _id: 'doc-1', _type: 'page' }];
      (ctx.sanityLoaders!.documentsByTypeLoader.load as jest.Mock).mockResolvedValue(mockDocs);

      const result = await loadDocumentsByType(ctx, 'page', false);

      expect(ctx.sanityLoaders!.documentsByTypeLoader.load).toHaveBeenCalledWith({
        id: 'page',
        preview: false
      });
      expect(result).toEqual(mockDocs);
    });

    it('uses entriesByContentTypeLoader for Contentful', async () => {
      const ctx = createContentfulContext();
      const mockEntries = [{ sys: { id: 'entry-1' } }];
      (ctx.loaders.entriesByContentTypeLoader.load as jest.Mock).mockResolvedValue(mockEntries);

      const result = await loadDocumentsByType(ctx, 'article', true);

      expect(ctx.loaders.entriesByContentTypeLoader.load).toHaveBeenCalledWith({
        id: 'article',
        preview: true
      });
      expect(result).toEqual(mockEntries);
    });
  });

  describe('loadDocumentByFieldValue', () => {
    it('uses documentByFieldValueLoader for Sanity', async () => {
      const ctx = createSanityContext();
      const mockDoc = { _id: 'doc-123', slug: 'test-slug' };
      (ctx.sanityLoaders!.documentByFieldValueLoader.load as jest.Mock).mockResolvedValue(mockDoc);

      const result = await loadDocumentByFieldValue(ctx, 'page', 'slug', 'test-slug', false);

      expect(ctx.sanityLoaders!.documentByFieldValueLoader.load).toHaveBeenCalledWith({
        contentType: 'page',
        field: 'slug',
        value: 'test-slug',
        preview: false
      });
      expect(result).toBe(mockDoc);
    });

    it('uses entryByFieldValueLoader for Contentful', async () => {
      const ctx = createContentfulContext();
      const mockEntry = { sys: { id: 'entry-123' }, fields: { slug: 'test-slug' } };
      (ctx.loaders.entryByFieldValueLoader.load as jest.Mock).mockResolvedValue(mockEntry);

      const result = await loadDocumentByFieldValue(ctx, 'article', 'slug', 'test-slug', true);

      expect(ctx.loaders.entryByFieldValueLoader.load).toHaveBeenCalledWith({
        contentType: 'article',
        field: 'slug',
        value: 'test-slug',
        preview: true
      });
      expect(result).toBe(mockEntry);
    });
  });

  describe('loadDocumentsRefBy', () => {
    it('uses documentsRefByLoader for Sanity', async () => {
      const ctx = createSanityContext();
      const mockDocs = [{ _id: 'doc-1' }, { _id: 'doc-2' }];
      (ctx.sanityLoaders!.documentsRefByLoader.load as jest.Mock).mockResolvedValue(mockDocs);

      const result = await loadDocumentsRefBy(ctx, 'page', 'author', 'author-123', false);

      expect(ctx.sanityLoaders!.documentsRefByLoader.load).toHaveBeenCalledWith({
        contentType: 'page',
        field: 'author',
        id: 'author-123',
        preview: false
      });
      expect(result).toEqual(mockDocs);
    });

    it('uses entriesRefByLoader for Contentful', async () => {
      const ctx = createContentfulContext();
      const mockEntries = [{ sys: { id: 'entry-1' } }];
      (ctx.loaders.entriesRefByLoader.load as jest.Mock).mockResolvedValue(mockEntries);

      const result = await loadDocumentsRefBy(ctx, 'article', 'category', 'cat-456', true);

      expect(ctx.loaders.entriesRefByLoader.load).toHaveBeenCalledWith({
        contentType: 'article',
        field: 'category',
        id: 'cat-456',
        preview: true
      });
      expect(result).toEqual(mockEntries);
    });
  });
});
