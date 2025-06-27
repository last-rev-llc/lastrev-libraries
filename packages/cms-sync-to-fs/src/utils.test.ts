import { validateArg, delay, groupByContentTypeAndMapToIds, writeItems } from './utils';
import { writeFile, ensureDir } from 'fs-extra';

// Mock fs-extra
jest.mock('fs-extra');
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    error: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));

const mockWriteFile = writeFile as jest.MockedFunction<typeof writeFile>;
const mockEnsureDir = ensureDir as jest.MockedFunction<typeof ensureDir>;

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateArg', () => {
    it('should not throw for valid arguments', () => {
      expect(() => validateArg('valid', 'testArg')).not.toThrow();
      expect(() => validateArg(123, 'numberArg')).not.toThrow();
      expect(() => validateArg(true, 'boolArg')).not.toThrow();
      expect(() => validateArg([], 'arrayArg')).not.toThrow();
      expect(() => validateArg({}, 'objectArg')).not.toThrow();
    });

    it('should throw for null/undefined arguments', () => {
      expect(() => validateArg(null, 'nullArg')).toThrow('Missing required argument: nullArg');
      expect(() => validateArg(undefined, 'undefinedArg')).toThrow('Missing required argument: undefinedArg');
    });

    it('should throw for empty string', () => {
      expect(() => validateArg('', 'emptyString')).toThrow('Missing required argument: emptyString');
    });

    it('should throw for zero', () => {
      expect(() => validateArg(0, 'zeroArg')).toThrow('Missing required argument: zeroArg');
    });

    it('should throw for false', () => {
      expect(() => validateArg(false, 'falseArg')).toThrow('Missing required argument: falseArg');
    });
  });

  describe('delay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay for specified milliseconds', async () => {
      const delayPromise = delay(1000);

      // Fast-forward time
      jest.advanceTimersByTime(1000);

      await expect(delayPromise).resolves.toBeUndefined();
    });

    it('should delay for different durations', async () => {
      const delay500 = delay(500);
      const delay1500 = delay(1500);

      jest.advanceTimersByTime(500);
      await expect(delay500).resolves.toBeUndefined();

      jest.advanceTimersByTime(1000);
      await expect(delay1500).resolves.toBeUndefined();
    });
  });

  describe('groupByContentTypeAndMapToIds', () => {
    it('should group entries by content type and map to IDs', () => {
      const entries = [
        {
          sys: {
            id: 'entry1',
            contentType: { sys: { id: 'blog' } }
          }
        },
        {
          sys: {
            id: 'entry2',
            contentType: { sys: { id: 'page' } }
          }
        },
        {
          sys: {
            id: 'entry3',
            contentType: { sys: { id: 'blog' } }
          }
        }
      ] as any[];

      const result = groupByContentTypeAndMapToIds(entries);

      expect(result).toEqual({
        blog: ['entry1', 'entry3'],
        page: ['entry2']
      });
    });

    it('should handle empty array', () => {
      const result = groupByContentTypeAndMapToIds([]);
      expect(result).toEqual({});
    });

    it('should handle single entry', () => {
      const entries = [
        {
          sys: {
            id: 'single-entry',
            contentType: { sys: { id: 'article' } }
          }
        }
      ] as any[];

      const result = groupByContentTypeAndMapToIds(entries);

      expect(result).toEqual({
        article: ['single-entry']
      });
    });
  });

  describe('writeItems', () => {
    it('should write items to filesystem', async () => {
      const items = [
        { sys: { id: 'item1' }, fields: { title: 'Test 1' } },
        { sys: { id: 'item2' }, fields: { title: 'Test 2' } }
      ] as any[];

      const root = '/test/root';
      const dirname = 'entries';

      await writeItems(items, root, dirname);

      expect(mockEnsureDir).toHaveBeenCalledWith('/test/root/entries');
      expect(mockWriteFile).toHaveBeenCalledTimes(2);
      expect(mockWriteFile).toHaveBeenCalledWith('/test/root/entries/item1.json', JSON.stringify(items[0]));
      expect(mockWriteFile).toHaveBeenCalledWith('/test/root/entries/item2.json', JSON.stringify(items[1]));
    });

    it('should handle empty items array', async () => {
      await writeItems([], '/test/root', 'entries');

      expect(mockEnsureDir).toHaveBeenCalledWith('/test/root/entries');
      expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it('should create directory structure', async () => {
      const items = [{ sys: { id: 'test-item' }, fields: {} }] as any[];

      await writeItems(items, '/deep/nested/path', 'content');

      expect(mockEnsureDir).toHaveBeenCalledWith('/deep/nested/path/content');
    });

    it('should serialize items as JSON', async () => {
      const item = {
        sys: { id: 'complex-item' },
        fields: {
          title: 'Complex Item',
          nested: {
            data: ['array', 'values'],
            number: 42
          }
        }
      } as any;

      await writeItems([item], '/test', 'items');

      expect(mockWriteFile).toHaveBeenCalledWith('/test/items/complex-item.json', JSON.stringify(item));
    });
  });
});
