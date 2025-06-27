import { primeRedisEntriesOrAssets, primeRedisEntriesByContentType } from './primers';
import RedisMock from 'ioredis-mock';
import { BaseEntry, ItemKey } from '@last-rev/types';

// Mock dependencies
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

describe('primers', () => {
  let mockClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = new RedisMock();
  });

  afterEach(async () => {
    await mockClient.disconnect();
  });

  describe('primeRedisEntriesOrAssets', () => {
    it('should prime valid entries in Redis', async () => {
      const cacheMissIds: ItemKey[] = [
        { id: 'entry1', preview: false },
        { id: 'entry2', preview: true }
      ];

      const sourceResults = [
        { sys: { type: 'Entry', id: 'entry1' }, fields: { title: 'Entry 1' } },
        { sys: { type: 'Entry', id: 'entry2' }, fields: { title: 'Entry 2' } }
      ];

      await primeRedisEntriesOrAssets(mockClient as any, cacheMissIds, 'entries', sourceResults, 1000, 3600);

      // Check that entries were set in Redis
      const entry1 = await mockClient.get('production:entries:entry1');
      const entry2 = await mockClient.get('preview:entries:entry2');

      expect(entry1).toBeDefined();
      expect(entry2).toBeDefined();

      const parsedEntry1 = JSON.parse(entry1!);
      expect(parsedEntry1.sys.id).toBe('entry1');
      expect(parsedEntry1.lastrev_metadata).toBeDefined();
    });

    it('should handle mixed valid and invalid results', async () => {
      const cacheMissIds: ItemKey[] = [
        { id: 'entry1', preview: false },
        { id: 'entry2', preview: false }
      ];

      const sourceResults = [
        { sys: { type: 'Entry', id: 'entry1' }, fields: { title: 'Entry 1' } },
        new Error('Failed to fetch')
      ];

      await primeRedisEntriesOrAssets(mockClient as any, cacheMissIds, 'entries', sourceResults, 1000, 3600);

      // Only valid entry should be in Redis
      const entry1 = await mockClient.get('production:entries:entry1');
      const entry2 = await mockClient.get('production:entries:entry2');

      expect(entry1).toBeDefined();
      expect(entry2).toBeNull();
    });

    it('should handle empty results', async () => {
      const cacheMissIds: ItemKey[] = [];
      const sourceResults: any[] = [];

      await primeRedisEntriesOrAssets(mockClient as any, cacheMissIds, 'entries', sourceResults, 1000, 3600);

      // Should not throw and complete successfully
      expect(true).toBe(true);
    });

    it('should batch large datasets', async () => {
      const largeCacheMissIds: ItemKey[] = Array.from({ length: 15 }, (_, i) => ({
        id: `entry${i}`,
        preview: false
      }));

      const largeSourceResults = largeCacheMissIds.map((_, i) => ({
        sys: { type: 'Entry', id: `entry${i}` },
        fields: { title: `Entry ${i}` }
      }));

      await primeRedisEntriesOrAssets(
        mockClient as any,
        largeCacheMissIds,
        'entries',
        largeSourceResults,
        10, // Small batch size to test batching
        3600
      );

      // Check that all entries were set
      for (let i = 0; i < 15; i++) {
        const entry = await mockClient.get(`production:entries:entry${i}`);
        expect(entry).toBeDefined();
      }
    });
  });

  describe('primeRedisEntriesByContentType', () => {
    it('should prime entries by content type', async () => {
      const mockEntries: BaseEntry[][] = [
        [
          {
            sys: { type: 'Entry', id: 'entry1', contentType: { sys: { id: 'blog' } } },
            fields: { title: 'Blog 1' },
            metadata: { tags: [] }
          } as any,
          {
            sys: { type: 'Entry', id: 'entry2', contentType: { sys: { id: 'blog' } } },
            fields: { title: 'Blog 2' },
            metadata: { tags: [] }
          } as any
        ]
      ];

      const cacheMissContentTypeIds: ItemKey[] = [{ id: 'blog', preview: false }];

      await primeRedisEntriesByContentType(mockClient as any, mockEntries, cacheMissContentTypeIds, 1000, 3600);

      // Check that entries were primed
      const entry1 = await mockClient.get('production:entries:entry1');
      const entry2 = await mockClient.get('production:entries:entry2');

      expect(entry1).toBeDefined();
      expect(entry2).toBeDefined();

      // Check that content type IDs were stored
      const contentTypeIds = await mockClient.smembers('production:entry_ids_by_content_type:blog');
      expect(contentTypeIds).toContain('entry1');
      expect(contentTypeIds).toContain('entry2');
    });

    it('should handle preview mode', async () => {
      const mockEntries: BaseEntry[][] = [
        [
          {
            sys: { type: 'Entry', id: 'preview1', contentType: { sys: { id: 'page' } } },
            fields: { title: 'Preview Page' },
            metadata: { tags: [] }
          } as any
        ]
      ];

      const cacheMissContentTypeIds: ItemKey[] = [{ id: 'page', preview: true }];

      await primeRedisEntriesByContentType(mockClient as any, mockEntries, cacheMissContentTypeIds, 1000, 3600);

      // Check preview entry was primed
      const previewEntry = await mockClient.get('preview:entries:preview1');
      expect(previewEntry).toBeDefined();

      // Check preview content type IDs were stored
      const previewContentTypeIds = await mockClient.smembers('preview:entry_ids_by_content_type:page');
      expect(previewContentTypeIds).toContain('preview1');
    });

    it('should handle empty content type arrays', async () => {
      const mockEntries: BaseEntry[][] = [[]]; // Empty array for content type

      const cacheMissContentTypeIds: ItemKey[] = [{ id: 'empty', preview: false }];

      await primeRedisEntriesByContentType(mockClient as any, mockEntries, cacheMissContentTypeIds, 1000, 3600);

      // Should complete without error
      const contentTypeIds = await mockClient.smembers('production:entry_ids_by_content_type:empty');
      expect(contentTypeIds).toHaveLength(0);
    });

    it('should batch large entry sets', async () => {
      const largeEntrySet: BaseEntry[] = Array.from({ length: 15 }, (_, i) => ({
        sys: { type: 'Entry', id: `entry${i}`, contentType: { sys: { id: 'large' } } },
        fields: { title: `Entry ${i}` },
        metadata: { tags: [] }
      })) as any[];

      const mockEntries: BaseEntry[][] = [largeEntrySet];

      const cacheMissContentTypeIds: ItemKey[] = [{ id: 'large', preview: false }];

      await primeRedisEntriesByContentType(
        mockClient as any,
        mockEntries,
        cacheMissContentTypeIds,
        10, // Small batch size
        3600
      );

      // Check that all entries were primed
      for (let i = 0; i < 15; i++) {
        const entry = await mockClient.get(`production:entries:entry${i}`);
        expect(entry).toBeDefined();
      }

      // Check that all IDs were stored in set
      const contentTypeIds = await mockClient.smembers('production:entry_ids_by_content_type:large');
      expect(contentTypeIds).toHaveLength(15);
    });

    it('should handle multiple content types', async () => {
      const mockEntries: BaseEntry[][] = [
        [
          {
            sys: { type: 'Entry', id: 'blog1', contentType: { sys: { id: 'blog' } } },
            fields: { title: 'Blog 1' },
            metadata: { tags: [] }
          } as any
        ],
        [
          {
            sys: { type: 'Entry', id: 'page1', contentType: { sys: { id: 'page' } } },
            fields: { title: 'Page 1' },
            metadata: { tags: [] }
          } as any
        ]
      ];

      const cacheMissContentTypeIds: ItemKey[] = [
        { id: 'blog', preview: false },
        { id: 'page', preview: false }
      ];

      await primeRedisEntriesByContentType(mockClient as any, mockEntries, cacheMissContentTypeIds, 1000, 3600);

      // Check both content types were primed
      const blogIds = await mockClient.smembers('production:entry_ids_by_content_type:blog');
      const pageIds = await mockClient.smembers('production:entry_ids_by_content_type:page');

      expect(blogIds).toContain('blog1');
      expect(pageIds).toContain('page1');
    });
  });
});
