import {
  isString,
  isError,
  isNil,
  isRejected,
  getKey,
  parse,
  enhanceContentfulObjectWithMetadata,
  isContentfulObject,
  isContentfulError,
  stringify
} from './helpers';

// Mock the logger
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    error: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));

describe('helpers', () => {
  describe('isString', () => {
    it('should return true for string primitives', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
    });

    it('should return true for String objects', () => {
      expect(isString(new String('hello'))).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe('isError', () => {
    it('should return true for Error instances', () => {
      expect(isError(new Error('test'))).toBe(true);
      expect(isError(new TypeError('test'))).toBe(true);
    });

    it('should return false for non-Error objects', () => {
      expect(isError({ message: 'test' })).toBe(false);
      expect(isError('error')).toBe(false);
      expect(isError(null)).toBe(false);
    });
  });

  describe('isNil', () => {
    it('should return true for null and undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNil('')).toBe(false);
      expect(isNil(0)).toBe(false);
      expect(isNil(false)).toBe(false);
      expect(isNil({})).toBe(false);
    });
  });

  describe('isRejected', () => {
    it('should return true for rejected promise results', () => {
      const rejectedResult: PromiseRejectedResult = {
        status: 'rejected',
        reason: new Error('test')
      };
      expect(isRejected(rejectedResult)).toBe(true);
    });

    it('should return false for fulfilled promise results', () => {
      const fulfilledResult: PromiseFulfilledResult<string> = {
        status: 'fulfilled',
        value: 'test'
      };
      expect(isRejected(fulfilledResult)).toBe(false);
    });
  });

  describe('getKey', () => {
    it('should generate correct key for production', () => {
      const itemKey = { id: 'entry1', preview: false };
      const result = getKey(itemKey, 'entries');
      expect(result).toBe('production:entries:entry1');
    });

    it('should generate correct key for preview', () => {
      const itemKey = { id: 'entry1', preview: true };
      const result = getKey(itemKey, 'assets');
      expect(result).toBe('preview:assets:entry1');
    });
  });

  describe('parse', () => {
    it('should parse valid JSON strings', () => {
      const obj = { test: 'value' };
      const jsonStr = JSON.stringify(obj);
      expect(parse(jsonStr)).toEqual(obj);
    });

    it('should return null for empty strings', () => {
      expect(parse('')).toBeNull();
    });

    it('should return null for null input', () => {
      expect(parse(null)).toBeNull();
    });

    it('should return null for Error input', () => {
      expect(parse(new Error('test') as any)).toBeNull();
    });

    it('should return null for non-string input', () => {
      expect(parse(123 as any)).toBeNull();
    });
  });

  describe('enhanceContentfulObjectWithMetadata', () => {
    it('should add lastrev_metadata to object', () => {
      const item = { sys: { id: 'test' }, fields: {} };
      const enhanced = enhanceContentfulObjectWithMetadata(item);
      
      expect(enhanced).toHaveProperty('lastrev_metadata');
      expect(enhanced.lastrev_metadata).toHaveProperty('insert_date');
      expect(enhanced.lastrev_metadata).toHaveProperty('source', 'RedisLoader');
      expect(enhanced.lastrev_metadata.insert_date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('should preserve original object properties', () => {
      const item = { sys: { id: 'test' }, fields: { title: 'Test' } };
      const enhanced = enhanceContentfulObjectWithMetadata(item);
      
      expect(enhanced.sys).toEqual(item.sys);
      expect(enhanced.fields).toEqual(item.fields);
    });
  });

  describe('isContentfulObject', () => {
    it('should return true for Entry objects', () => {
      const entry = { sys: { type: 'Entry', id: 'test' } };
      expect(isContentfulObject(entry)).toBe(true);
    });

    it('should return true for Asset objects', () => {
      const asset = { sys: { type: 'Asset', id: 'test' } };
      expect(isContentfulObject(asset)).toBe(true);
    });

    it('should return true for ContentType objects', () => {
      const contentType = { sys: { type: 'ContentType', id: 'test' } };
      expect(isContentfulObject(contentType)).toBe(true);
    });

    it('should return false for non-Contentful objects', () => {
      expect(isContentfulObject({ sys: { type: 'Other' } })).toBe(false);
      expect(isContentfulObject({ id: 'test' })).toBe(false);
      expect(isContentfulObject(null)).toBe(false);
    });
  });

  describe('isContentfulError', () => {
    it('should return true for Contentful Error objects', () => {
      const error = { sys: { type: 'Error', id: 'NotFound' } };
      expect(isContentfulError(error)).toBe(true);
    });

    it('should return false for non-Error objects', () => {
      expect(isContentfulError({ sys: { type: 'Entry' } })).toBe(false);
      expect(isContentfulError(new Error('test'))).toBe(false);
      expect(isContentfulError(null)).toBe(false);
    });
  });

  describe('stringify', () => {
    it('should stringify valid Contentful entries', () => {
      const entry = {
        sys: { type: 'Entry', id: 'test' },
        fields: { title: 'Test Entry' }
      };
      
      const result = stringify(entry, 'test-key');
      expect(result).toBeDefined();
      
      const parsed = JSON.parse(result!);
      expect(parsed.sys).toEqual(entry.sys);
      expect(parsed.fields).toEqual(entry.fields);
      expect(parsed.lastrev_metadata).toBeDefined();
    });

    it('should stringify valid Contentful assets', () => {
      const asset = {
        sys: { type: 'Asset', id: 'test-asset' },
        fields: { file: { url: 'https://example.com/image.jpg' } }
      };
      
      const result = stringify(asset, 'test-key');
      expect(result).toBeDefined();
      
      const parsed = JSON.parse(result!);
      expect(parsed.sys).toEqual(asset.sys);
      expect(parsed.fields).toEqual(asset.fields);
    });

    it('should return undefined for null input', () => {
      const result = stringify(null, 'test-key');
      expect(result).toBeUndefined();
    });

    it('should return undefined for Error input', () => {
      const result = stringify(new Error('test'), 'test-key');
      expect(result).toBeUndefined();
    });

    it('should return undefined for Contentful Error objects', () => {
      const contentfulError = { sys: { type: 'Error', id: 'NotFound' } };
      const result = stringify(contentfulError, 'test-key');
      expect(result).toBeUndefined();
    });

    it('should return undefined for non-Contentful objects', () => {
      const invalidObject = { id: 'test', data: 'value' };
      const result = stringify(invalidObject, 'test-key');
      expect(result).toBeUndefined();
    });
  });
});