import { chunk, makeContentfulRequest, isRejected } from './helpers';

// Mock contentful client
const mockClient = {
  getEntries: jest.fn(),
  getAssets: jest.fn()
};

describe('helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isRejected', () => {
    it('should return true for rejected promise results', () => {
      const rejectedResult: PromiseRejectedResult = {
        status: 'rejected',
        reason: new Error('Test error')
      };

      expect(isRejected(rejectedResult)).toBe(true);
    });

    it('should return false for fulfilled promise results', () => {
      const fulfilledResult: PromiseFulfilledResult<string> = {
        status: 'fulfilled',
        value: 'test value'
      };

      expect(isRejected(fulfilledResult)).toBe(false);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks of specified size', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const result = chunk(array, 3);

      expect(result).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]);
    });

    it('should handle arrays that do not divide evenly', () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const result = chunk(array, 3);

      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('should handle empty arrays', () => {
      const array: number[] = [];
      const result = chunk(array, 3);

      expect(result).toEqual([]);
    });

    it('should handle chunk size larger than array', () => {
      const array = [1, 2, 3];
      const result = chunk(array, 5);

      expect(result).toEqual([[1, 2, 3]]);
    });

    it('should handle chunk size of 1', () => {
      const array = [1, 2, 3];
      const result = chunk(array, 1);

      expect(result).toEqual([[1], [2], [3]]);
    });
  });

  describe('makeContentfulRequest', () => {
    it('should fetch all items when total fits in one request', async () => {
      const mockItems = [
        { sys: { id: 'item1' }, fields: { title: 'Item 1' } },
        { sys: { id: 'item2' }, fields: { title: 'Item 2' } }
      ];

      mockClient.getEntries.mockResolvedValue({
        items: mockItems,
        total: 2
      });

      const result = await makeContentfulRequest(mockClient as any, 'getEntries', 100, { content_type: 'blog' });

      expect(result).toEqual(mockItems);
      expect(mockClient.getEntries).toHaveBeenCalledTimes(1);
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: 'blog',
        skip: 0,
        limit: 100
      });
    });

    it('should recursively fetch all items when pagination is needed', async () => {
      const mockItems1 = [
        { sys: { id: 'item1' }, fields: { title: 'Item 1' } },
        { sys: { id: 'item2' }, fields: { title: 'Item 2' } }
      ];
      const mockItems2 = [{ sys: { id: 'item3' }, fields: { title: 'Item 3' } }];

      mockClient.getEntries
        .mockResolvedValueOnce({
          items: mockItems1,
          total: 3
        })
        .mockResolvedValueOnce({
          items: mockItems2,
          total: 3
        });

      const result = await makeContentfulRequest(mockClient as any, 'getEntries', 2, { content_type: 'blog' });

      expect(result).toEqual([...mockItems1, ...mockItems2]);
      expect(mockClient.getEntries).toHaveBeenCalledTimes(2);
      expect(mockClient.getEntries).toHaveBeenNthCalledWith(1, {
        content_type: 'blog',
        skip: 0,
        limit: 2
      });
      expect(mockClient.getEntries).toHaveBeenNthCalledWith(2, {
        content_type: 'blog',
        skip: 2,
        limit: 2
      });
    });

    it('should work with getAssets command', async () => {
      const mockAssets = [{ sys: { id: 'asset1' }, fields: { file: { url: 'https://example.com/image1.jpg' } } }];

      mockClient.getAssets.mockResolvedValue({
        items: mockAssets,
        total: 1
      });

      const result = await makeContentfulRequest(mockClient as any, 'getAssets', 100, { 'sys.id[in]': 'asset1' });

      expect(result).toEqual(mockAssets);
      expect(mockClient.getAssets).toHaveBeenCalledWith({
        'sys.id[in]': 'asset1',
        'skip': 0,
        'limit': 100
      });
    });

    it('should handle empty results', async () => {
      mockClient.getEntries.mockResolvedValue({
        items: [],
        total: 0
      });

      const result = await makeContentfulRequest(mockClient as any, 'getEntries', 100, { content_type: 'nonexistent' });

      expect(result).toEqual([]);
      expect(mockClient.getEntries).toHaveBeenCalledTimes(1);
    });

    it('should use custom skip and existing parameters', async () => {
      const existingItems = [{ sys: { id: 'existing1' }, fields: { title: 'Existing 1' } }];
      const newItems = [{ sys: { id: 'item1' }, fields: { title: 'Item 1' } }];

      mockClient.getEntries.mockResolvedValue({
        items: newItems,
        total: 2
      });

      const result = await makeContentfulRequest(mockClient as any, 'getEntries', 100, { content_type: 'blog' }, 10, [
        ...existingItems
      ] as any);

      expect(result).toEqual([...existingItems, ...newItems]);
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: 'blog',
        skip: 10,
        limit: 100
      });
    });

    it('should handle multiple pagination rounds', async () => {
      const mockItems1 = [{ sys: { id: 'item1' } }];
      const mockItems2 = [{ sys: { id: 'item2' } }];
      const mockItems3 = [{ sys: { id: 'item3' } }];

      mockClient.getEntries
        .mockResolvedValueOnce({ items: mockItems1, total: 3 })
        .mockResolvedValueOnce({ items: mockItems2, total: 3 })
        .mockResolvedValueOnce({ items: mockItems3, total: 3 });

      const result = await makeContentfulRequest(mockClient as any, 'getEntries', 1, { content_type: 'blog' });

      expect(result).toEqual([...mockItems1, ...mockItems2, ...mockItems3]);
      expect(mockClient.getEntries).toHaveBeenCalledTimes(3);
    });
  });
});
