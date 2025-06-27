import { PathNode } from './PathNode';
import { ApolloContext, BaseEntry, PathData } from '@last-rev/types';

// Realistic CMS content entries
const createProductEntry = (id: string, name: string): BaseEntry =>
  ({
    sys: {
      id,
      contentType: { sys: { id: 'product' } },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      revision: 1,
      type: 'Entry',
      space: { sys: { id: 'test-space' } },
      environment: { sys: { id: 'master' } },
      publishedVersion: 1
    },
    fields: {
      title: { 'en-US': name },
      slug: { 'en-US': id }
    },
    metadata: { tags: [] }
  } as unknown as BaseEntry);

const createCategoryEntry = (id: string, name: string): BaseEntry =>
  ({
    sys: {
      id,
      contentType: { sys: { id: 'category' } },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      revision: 1,
      type: 'Entry',
      space: { sys: { id: 'test-space' } },
      environment: { sys: { id: 'master' } },
      publishedVersion: 1
    },
    fields: {
      title: { 'en-US': name },
      slug: { 'en-US': id }
    },
    metadata: { tags: [] }
  } as unknown as BaseEntry);

const createPageEntry = (id: string, title: string): BaseEntry =>
  ({
    sys: {
      id,
      contentType: { sys: { id: 'page' } },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      revision: 1,
      type: 'Entry',
      space: { sys: { id: 'test-space' } },
      environment: { sys: { id: 'master' } },
      publishedVersion: 1
    },
    fields: {
      title: { 'en-US': title },
      slug: { 'en-US': id }
    },
    metadata: { tags: [] }
  } as unknown as BaseEntry);

// Mock Apollo context with realistic loader behavior
const createMockContext = (preview = false) =>
  ({
    preview,
    loaders: {
      entryLoader: {
        load: jest.fn(),
        loadMany: jest.fn()
      }
    }
  } as unknown as ApolloContext);

describe('PathNode - CMS Content Hierarchy Loading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('E-commerce Product Catalog Scenarios', () => {
    it('should load content hierarchy for product page breadcrumbs', async () => {
      // Scenario: User visits /products/shoes/nike-air-max
      // Need to load: Products page + Shoes category + Nike product

      const productsPageData: PathData = {
        fullPath: '/products',
        contentId: 'products-page',
        excludedLocales: [],
        isPrimary: true
      };

      const shoesCategoryData: PathData = {
        fullPath: '/products/shoes',
        contentId: 'shoes-category',
        excludedLocales: [],
        isPrimary: true
      };

      const nikeProductData: PathData = {
        fullPath: '/products/shoes/nike-air-max',
        contentId: 'nike-product',
        excludedLocales: [],
        isPrimary: true
      };

      // Build hierarchy: products -> shoes -> nike
      const productsNode = new PathNode('products', productsPageData);
      const shoesNode = new PathNode('shoes', shoesCategoryData);
      const nikeNode = new PathNode('nike-air-max', nikeProductData);

      shoesNode.parent = productsNode;
      nikeNode.parent = shoesNode;

      // Mock content entries
      const shoesEntry = createCategoryEntry('shoes-category', 'Shoes');
      const nikeEntry = createProductEntry('nike-product', 'Nike Air Max');

      const ctx = createMockContext();

      // Mock the loader responses
      ctx.loaders.entryLoader.load = jest.fn().mockResolvedValue(nikeEntry);
      ctx.loaders.entryLoader.loadMany = jest.fn().mockResolvedValue([nikeEntry, shoesEntry]);

      const result = await nikeNode.getPathEntries(ctx);

      // Verify efficient batching - should use loadMany for multiple entries
      expect(ctx.loaders.entryLoader.loadMany).toHaveBeenCalledWith([
        { id: 'nike-product', preview: false },
        { id: 'shoes-category', preview: false }
      ]);

      // Result should contain entries that can be used for breadcrumbs
      expect(result).toHaveLength(3);
      expect(result.every((entry) => entry && entry.sys)).toBe(true);
    });

    it('should handle missing category content gracefully', async () => {
      // Scenario: Category was deleted but product still exists
      const shoesData: PathData = {
        fullPath: '/products/shoes',
        contentId: 'deleted-category',
        excludedLocales: [],
        isPrimary: true
      };

      const nikeData: PathData = {
        fullPath: '/products/shoes/nike-air-max',
        contentId: 'nike-product',
        excludedLocales: [],
        isPrimary: true
      };

      const shoesNode = new PathNode('shoes', shoesData);
      const nikeNode = new PathNode('nike-air-max', nikeData);
      nikeNode.parent = shoesNode;

      const nikeEntry = createProductEntry('nike-product', 'Nike Air Max');
      const ctx = createMockContext();

      ctx.loaders.entryLoader.load = jest.fn().mockResolvedValue(nikeEntry);
      // loadMany returns null for missing category
      ctx.loaders.entryLoader.loadMany = jest.fn().mockResolvedValue([nikeEntry, null]);

      const result = await nikeNode.getPathEntries(ctx);

      // Should handle missing content without breaking
      expect(result).toContain(nikeEntry);
      // The implementation filters out missing content, so we verify it doesn't crash
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Blog Content Hierarchy', () => {
    it('should load blog post with category context', async () => {
      // Scenario: Blog post in a category
      const techCategoryData: PathData = {
        fullPath: '/blog/technology',
        contentId: 'tech-category',
        excludedLocales: [],
        isPrimary: true
      };

      const postData: PathData = {
        fullPath: '/blog/technology/ai-trends',
        contentId: 'ai-post',
        excludedLocales: [],
        isPrimary: true
      };

      const categoryNode = new PathNode('technology', techCategoryData);
      const postNode = new PathNode('ai-trends', postData);
      postNode.parent = categoryNode;

      const postEntry = createPageEntry('ai-post', 'AI Trends 2024');

      const ctx = createMockContext();
      ctx.loaders.entryLoader.load = jest.fn().mockResolvedValue(postEntry);
      ctx.loaders.entryLoader.loadMany = jest.fn().mockResolvedValue([postEntry]);

      const result = await postNode.getPathEntries(ctx);

      expect(result).toContain(postEntry);
      expect(ctx.loaders.entryLoader.load).toHaveBeenCalledWith({
        id: 'ai-post',
        preview: false
      });
    });
  });

  describe('Performance and Efficiency', () => {
    it('should batch content requests efficiently', async () => {
      // Test that multiple content IDs are loaded in single batch request
      const parent1Data: PathData = {
        fullPath: '/section1',
        contentId: 'section1-content',
        excludedLocales: [],
        isPrimary: true
      };

      const parent2Data: PathData = {
        fullPath: '/section1/section2',
        contentId: 'section2-content',
        excludedLocales: [],
        isPrimary: true
      };

      const childData: PathData = {
        fullPath: '/section1/section2/page',
        contentId: 'page-content',
        excludedLocales: [],
        isPrimary: true
      };

      const parent1 = new PathNode('section1', parent1Data);
      const parent2 = new PathNode('section2', parent2Data);
      const child = new PathNode('page', childData);

      parent2.parent = parent1;
      child.parent = parent2;

      const ctx = createMockContext();
      const mockEntries = [createPageEntry('page-content', 'Page'), createPageEntry('section2-content', 'Section 2')];

      ctx.loaders.entryLoader.load = jest.fn().mockResolvedValue(mockEntries[0]);
      ctx.loaders.entryLoader.loadMany = jest.fn().mockResolvedValue(mockEntries);

      await child.getPathEntries(ctx);

      // Should make only ONE batch request, not multiple individual requests
      expect(ctx.loaders.entryLoader.loadMany).toHaveBeenCalledTimes(1);
      expect(ctx.loaders.entryLoader.load).toHaveBeenCalledTimes(1);

      // Batch should contain multiple content IDs
      const loadManyArgs = (ctx.loaders.entryLoader.loadMany as jest.Mock).mock.calls[0][0];
      expect(loadManyArgs.length).toBeGreaterThan(1);
    });

    it('should handle preview mode correctly', async () => {
      const pageData: PathData = {
        fullPath: '/test-page',
        contentId: 'test-content',
        excludedLocales: [],
        isPrimary: true
      };

      const node = new PathNode('test-page', pageData);
      const ctx = createMockContext(true); // preview = true

      const testEntry = createPageEntry('test-content', 'Test Page');
      ctx.loaders.entryLoader.load = jest.fn().mockResolvedValue(testEntry);
      ctx.loaders.entryLoader.loadMany = jest.fn().mockResolvedValue([testEntry]);

      await node.getPathEntries(ctx);

      // Should pass preview flag to all loader calls
      expect(ctx.loaders.entryLoader.load).toHaveBeenCalledWith({
        id: 'test-content',
        preview: true
      });

      // For single node without parents, loadMany is called with empty array
      expect(ctx.loaders.entryLoader.loadMany).toHaveBeenCalledWith([]);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should return empty array when node has no content ID', async () => {
      // Scenario: Path exists but no content associated
      const emptyData: PathData = {
        fullPath: '/empty-path',
        contentId: '',
        excludedLocales: [],
        isPrimary: true
      };

      const node = new PathNode('empty', emptyData);
      const ctx = createMockContext();

      const result = await node.getPathEntries(ctx);

      expect(result).toEqual([]);
      expect(ctx.loaders.entryLoader.load).not.toHaveBeenCalled();
      expect(ctx.loaders.entryLoader.loadMany).not.toHaveBeenCalled();
    });

    it('should return empty array when node has no data', async () => {
      // Scenario: Path node exists but no metadata
      const node = new PathNode('no-data');
      const ctx = createMockContext();

      const result = await node.getPathEntries(ctx);

      expect(result).toEqual([]);
      expect(ctx.loaders.entryLoader.load).not.toHaveBeenCalled();
    });

    it('should handle content loader failures gracefully', async () => {
      const pageData: PathData = {
        fullPath: '/test-page',
        contentId: 'test-content',
        excludedLocales: [],
        isPrimary: true
      };

      const node = new PathNode('test-page', pageData);
      const ctx = createMockContext();

      // Mock loader failure
      ctx.loaders.entryLoader.load = jest.fn().mockRejectedValue(new Error('Content not found'));
      ctx.loaders.entryLoader.loadMany = jest.fn().mockResolvedValue([]);

      // Should propagate errors appropriately
      await expect(node.getPathEntries(ctx)).rejects.toThrow('Content not found');
    });
  });

  describe('Node Structure and Relationships', () => {
    it('should correctly maintain parent-child relationships', () => {
      const parent = new PathNode('parent');
      const child = new PathNode('child');

      child.parent = parent;
      parent.children.set('child', child);

      expect(child.parent).toBe(parent);
      expect(parent.children.get('child')).toBe(child);
      expect(parent.hasChildren()).toBe(true);
    });

    it('should support complex hierarchies', () => {
      const root = new PathNode('root');
      const level1 = new PathNode('level1');
      const level2a = new PathNode('level2a');
      const level2b = new PathNode('level2b');

      level1.parent = root;
      level2a.parent = level1;
      level2b.parent = level1;

      root.children.set('level1', level1);
      level1.children.set('level2a', level2a);
      level1.children.set('level2b', level2b);

      expect(level1.hasChildren()).toBe(true);
      expect(level1.children.size).toBe(2);
      expect(level2a.parent).toBe(level1);
      expect(level2b.parent).toBe(level1);
    });
  });
});
