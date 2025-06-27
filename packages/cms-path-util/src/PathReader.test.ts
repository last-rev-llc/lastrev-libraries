import PathReader from './PathReader';
import { PathStore } from './PathStore';
import PathTree from './PathTree';
import { PathNode } from './PathNode';
import { DEFAULT_SITE_KEY } from './constants';
import { ApolloContext, PathData, PathDataMap } from '@last-rev/types';

// Mock AsyncLock
jest.mock('async-lock', () => {
  return jest.fn().mockImplementation(() => ({
    acquire: jest.fn((_key, fn) => fn())
  }));
});

// Mock data
const mockPathData1: PathData = {
  fullPath: '/',
  contentId: 'home-123',
  excludedLocales: [],
  isPrimary: true
};

const mockPathData2: PathData = {
  fullPath: '/about',
  contentId: 'about-456',
  excludedLocales: ['de'],
  isPrimary: true
};

const mockPathData3: PathData = {
  fullPath: '/about/team',
  contentId: 'team-789',
  excludedLocales: [],
  isPrimary: true
};

const mockSerializedData: PathDataMap = {
  '/': mockPathData1,
  '/about': mockPathData2,
  '/about/team': mockPathData3
};

// Mock PathStore
const createMockPathStore = (): jest.Mocked<PathStore> => ({
  load: jest.fn(),
  save: jest.fn()
});

// Mock ApolloContext
const createMockContext = (locale = 'en-US', preview = false): ApolloContext =>
  ({
    locale,
    preview,
    loaders: {
      entryLoader: {
        load: jest.fn(),
        loadMany: jest.fn()
      }
    }
  } as any);

describe('PathReader', () => {
  let mockPathStore: jest.Mocked<PathStore>;
  let pathReader: PathReader;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPathStore = createMockPathStore();
    pathReader = new PathReader(mockPathStore);
  });

  describe('constructor', () => {
    it('should initialize with empty trees and provided pathStore', () => {
      expect(pathReader.trees).toEqual({});
      expect(pathReader.pathStore).toBe(mockPathStore);
    });
  });

  describe('load', () => {
    it('should load and rebuild tree from serialized data', async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);

      await pathReader.load();

      expect(mockPathStore.load).toHaveBeenCalledWith(DEFAULT_SITE_KEY);
      expect(pathReader.trees[DEFAULT_SITE_KEY]).toBeInstanceOf(PathTree);

      const tree = pathReader.trees[DEFAULT_SITE_KEY];
      expect(tree.getNodeByPath('/')?.data).toEqual(mockPathData1);
      expect(tree.getNodeByPath('/about')?.data).toEqual(mockPathData2);
      expect(tree.getNodeByPath('/about/team')?.data).toEqual(mockPathData3);
    });

    it('should load for specific site', async () => {
      const siteName = 'test-site';
      mockPathStore.load.mockResolvedValue(mockSerializedData);

      await pathReader.load(siteName);

      expect(mockPathStore.load).toHaveBeenCalledWith(siteName);
      expect(pathReader.trees[siteName]).toBeInstanceOf(PathTree);
    });
  });

  describe('ensureLoaded', () => {
    it('should load tree if not already loaded', async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);

      await pathReader.ensureLoaded(DEFAULT_SITE_KEY);

      expect(mockPathStore.load).toHaveBeenCalledWith(DEFAULT_SITE_KEY);
      expect(pathReader.trees[DEFAULT_SITE_KEY]).toBeInstanceOf(PathTree);
    });

    it('should not reload if tree already exists', async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);

      // First load
      await pathReader.ensureLoaded(DEFAULT_SITE_KEY);
      expect(mockPathStore.load).toHaveBeenCalledTimes(1);

      // Second call should not reload
      await pathReader.ensureLoaded(DEFAULT_SITE_KEY);
      expect(mockPathStore.load).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTree', () => {
    it('should return tree after ensuring it is loaded', async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);

      const tree = await pathReader.getTree();

      expect(tree).toBeInstanceOf(PathTree);
      expect(tree?.getNodeByPath('/')?.data).toEqual(mockPathData1);
    });

    it('should return tree for specific site', async () => {
      const siteName = 'test-site';
      mockPathStore.load.mockResolvedValue(mockSerializedData);

      const tree = await pathReader.getTree(siteName);

      expect(mockPathStore.load).toHaveBeenCalledWith(siteName);
      expect(tree).toBeInstanceOf(PathTree);
    });
  });

  describe('getPathsByContentId', () => {
    beforeEach(async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);
      await pathReader.load();
    });

    it('should return paths for content ID', async () => {
      const paths = await pathReader.getPathsByContentId('about-456');

      expect(paths).toEqual(['/about']);
    });

    it('should return empty array for non-existent content ID', async () => {
      const paths = await pathReader.getPathsByContentId('non-existent');

      expect(paths).toEqual([]);
    });

    it('should filter out paths with excluded locales', async () => {
      const paths = await pathReader.getPathsByContentId('about-456', 'de');

      expect(paths).toEqual([]);
    });

    it('should include paths for non-excluded locales', async () => {
      const paths = await pathReader.getPathsByContentId('about-456', 'en-US');

      expect(paths).toEqual(['/about']);
    });

    it('should handle nodes without data', async () => {
      // Mock a tree where getNodesById returns a node without data
      const mockTree = {
        getNodesById: jest.fn().mockReturnValue([{ data: null }])
      };
      pathReader.trees[DEFAULT_SITE_KEY] = mockTree as any;

      const paths = await pathReader.getPathsByContentId('test');

      expect(paths).toEqual([]);
    });
  });

  describe('getPathInfosByContentId', () => {
    beforeEach(async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);
      await pathReader.load();
    });

    it('should return path infos for content ID', async () => {
      const ctx = createMockContext();
      const mockPathEntries = [{ id: 'entry1' }, { id: 'entry2' }];

      // Mock the getPathEntries method
      const originalGetPathEntries = PathNode.prototype.getPathEntries;
      PathNode.prototype.getPathEntries = jest.fn().mockResolvedValue(mockPathEntries);

      const pathInfos = await pathReader.getPathInfosByContentId('about-456', ctx);

      expect(pathInfos).toEqual([
        {
          path: '/about',
          pathEntries: mockPathEntries
        }
      ]);

      // Restore original method
      PathNode.prototype.getPathEntries = originalGetPathEntries;
    });

    it('should break early if node has no data', async () => {
      const ctx = createMockContext();

      // Mock a tree where getNodesById returns a node without data
      const mockTree = {
        getNodesById: jest.fn().mockReturnValue([{ data: null }])
      };
      pathReader.trees[DEFAULT_SITE_KEY] = mockTree as any;

      const pathInfos = await pathReader.getPathInfosByContentId('test', ctx);

      expect(pathInfos).toEqual([]);
    });

    it('should break early if locale is excluded', async () => {
      const ctx = createMockContext('de'); // German locale which is excluded for about-456

      const pathInfos = await pathReader.getPathInfosByContentId('about-456', ctx);

      expect(pathInfos).toEqual([]);
    });
  });

  describe('getAllPaths', () => {
    beforeEach(async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);
      await pathReader.load();
    });

    it('should return all paths for given locales', async () => {
      const locales = ['en-US', 'fr'];
      const result = await pathReader.getAllPaths(locales);

      expect(result).toEqual([
        {
          params: { slug: [''] },
          locale: 'en-US'
        },
        {
          params: { slug: [''] },
          locale: 'fr'
        },
        {
          params: { slug: ['about'] },
          locale: 'en-US'
        },
        {
          params: { slug: ['about'] },
          locale: 'fr'
        },
        {
          params: { slug: ['about', 'team'] },
          locale: 'en-US'
        },
        {
          params: { slug: ['about', 'team'] },
          locale: 'fr'
        }
      ]);
    });

    it('should exclude paths for excluded locales', async () => {
      const locales = ['de']; // German is excluded for /about
      const result = await pathReader.getAllPaths(locales);

      expect(result).toEqual([
        {
          params: { slug: [''] },
          locale: 'de'
        },
        {
          params: { slug: ['about', 'team'] },
          locale: 'de'
        }
      ]);
    });
  });

  describe('normalizePath', () => {
    it('should remove trailing slash except for root', () => {
      expect(pathReader.normalizePath('/about/')).toBe('/about');
      expect(pathReader.normalizePath('/about/team/')).toBe('/about/team');
      expect(pathReader.normalizePath('/')).toBe('/');
    });

    it('should add leading slash', () => {
      expect(pathReader.normalizePath('about')).toBe('/about');
      expect(pathReader.normalizePath('about/team')).toBe('/about/team');
    });

    it('should handle root path correctly', () => {
      expect(pathReader.normalizePath('/')).toBe('/');
    });

    it('should handle already normalized paths', () => {
      expect(pathReader.normalizePath('/about')).toBe('/about');
      expect(pathReader.normalizePath('/about/team')).toBe('/about/team');
    });
  });

  describe('getNodeByPath', () => {
    beforeEach(async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);
      await pathReader.load();
    });

    it('should return node for valid path', async () => {
      const node = await pathReader.getNodeByPath('/about');

      expect(node?.data).toEqual(mockPathData2);
    });

    it('should normalize path before lookup', async () => {
      const node = await pathReader.getNodeByPath('/about/');

      expect(node?.data).toEqual(mockPathData2);
    });

    it('should return undefined for non-existent path', async () => {
      const node = await pathReader.getNodeByPath('/non-existent');

      expect(node).toBeUndefined();
    });
  });

  describe('getFilteredTree', () => {
    beforeEach(async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);
      await pathReader.load();
    });

    it('should return filtered tree', async () => {
      const filter = (node: PathNode) => node.data?.fullPath.includes('about') || false;
      const filteredTree = await pathReader.getFilteredTree(filter);

      expect(filteredTree).toBeInstanceOf(PathTree);
      // The filtered tree should contain about-related nodes
    });

    it('should return original tree when no filter provided', async () => {
      const tree = await pathReader.getFilteredTree();

      expect(tree).toBe(pathReader.trees[DEFAULT_SITE_KEY]);
    });
  });

  describe('getSitemap', () => {
    beforeEach(async () => {
      mockPathStore.load.mockResolvedValue(mockSerializedData);
      await pathReader.load();
    });

    it('should return sitemap entries for all locales', async () => {
      const locales = ['en-US', 'fr'];
      const sitemap = await pathReader.getSitemap(locales);

      expect(sitemap).toEqual([
        {
          path: '/',
          locale: 'en-US',
          contentId: 'home-123'
        },
        {
          path: '/',
          locale: 'fr',
          contentId: 'home-123'
        },
        {
          path: '/about',
          locale: 'en-US',
          contentId: 'about-456'
        },
        {
          path: '/about',
          locale: 'fr',
          contentId: 'about-456'
        },
        {
          path: '/about/team',
          locale: 'en-US',
          contentId: 'team-789'
        },
        {
          path: '/about/team',
          locale: 'fr',
          contentId: 'team-789'
        }
      ]);
    });

    it('should exclude entries for excluded locales', async () => {
      const locales = ['de']; // German is excluded for /about
      const sitemap = await pathReader.getSitemap(locales);

      expect(sitemap).toEqual([
        {
          path: '/',
          locale: 'de',
          contentId: 'home-123'
        },
        {
          path: '/about/team',
          locale: 'de',
          contentId: 'team-789'
        }
      ]);
    });

    it('should handle nodes without data', async () => {
      // Create a tree with a node without data
      const tree = new PathTree();
      tree.root.children.set('empty', new PathNode('empty')); // Node without data
      pathReader.trees[DEFAULT_SITE_KEY] = tree;

      const sitemap = await pathReader.getSitemap(['en-US']);

      expect(sitemap).toEqual([]);
    });
  });

  describe('error handling and edge cases', () => {
    it('should handle PathStore load errors gracefully', async () => {
      mockPathStore.load.mockRejectedValue(new Error('Storage error'));

      await expect(pathReader.load()).rejects.toThrow('Storage error');
    });

    it('should handle empty serialized data', async () => {
      mockPathStore.load.mockResolvedValue({});

      await pathReader.load();

      const tree = pathReader.trees[DEFAULT_SITE_KEY];
      expect(tree).toBeInstanceOf(PathTree);
      expect(tree.root.children.size).toBe(0);
    });

    it('should work with multiple sites concurrently', async () => {
      const site1 = 'site1';
      const site2 = 'site2';

      const site1PathData: PathData = {
        fullPath: '/site1',
        contentId: 'home-123',
        excludedLocales: [],
        isPrimary: true
      };

      const site2PathData: PathData = {
        fullPath: '/site2',
        contentId: 'about-456',
        excludedLocales: [],
        isPrimary: true
      };

      mockPathStore.load.mockImplementation((site) => {
        if (site === site1) {
          return Promise.resolve({ '/site1': site1PathData });
        } else {
          return Promise.resolve({ '/site2': site2PathData });
        }
      });

      await Promise.all([pathReader.ensureLoaded(site1), pathReader.ensureLoaded(site2)]);

      expect(pathReader.trees[site1]).toBeInstanceOf(PathTree);
      expect(pathReader.trees[site2]).toBeInstanceOf(PathTree);
      expect(pathReader.trees[site1].getNodeByPath('/site1')?.data).toEqual(site1PathData);
      expect(pathReader.trees[site2].getNodeByPath('/site2')?.data).toEqual(site2PathData);
    });
  });
});
