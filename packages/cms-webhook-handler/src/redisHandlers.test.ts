import { createRedisHandlers } from './redisHandlers';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';

jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));

jest.mock('@last-rev/cms-path-util', () => ({
  updateAllPaths: jest.fn()
}));

jest.mock('@last-rev/graphql-cms-helpers', () => ({
  createContext: jest.fn().mockResolvedValue({})
}));

jest.mock('contentful', () => ({
  createClient: jest.fn()
}));

const redisInstance = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  multi: jest.fn()
};

jest.mock('ioredis', () => jest.fn().mockImplementation(() => redisInstance));

const DOC_ID = 'abc123';
const DRAFT_ID = `drafts.${DOC_ID}`;
const TYPE = 'page';

const PREVIEW_DOC_KEY = `preview:documents:${DOC_ID}`;
const PRODUCTION_DOC_KEY = `production:documents:${DOC_ID}`;
const PREVIEW_TYPE_KEY = `preview:document_ids_by_type:${TYPE}`;
const PRODUCTION_TYPE_KEY = `production:document_ids_by_type:${TYPE}`;

// Every key this module hands to redis.
const keysPassedToRedis = (): string[] => {
  const keys: string[] = redisInstance.set.mock.calls.map((call: any[]) => call[0]);
  redisInstance.del.mock.calls.forEach((call: any[]) => keys.push(...call));
  return keys;
};

describe('createSanityRedisHandlers', () => {
  let config: LastRevAppConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    // clearAllMocks resets recorded calls but not implementations, so restate the
    // defaults rather than letting one test's stub leak into the next.
    redisInstance.get.mockResolvedValue(null);
    redisInstance.set.mockResolvedValue('OK');
    redisInstance.del.mockResolvedValue(1);
    config = new LastRevAppConfig(mockAppConfig()).clone({ cms: 'Sanity', cmsCacheStrategy: 'redis' });
  });

  describe('draft update', () => {
    it('primes the bare-id preview key', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: true,
        action: 'update',
        data: { _id: DRAFT_ID, _type: TYPE, title: 'Draft' }
      } as any);

      expect(redisInstance.set).toHaveBeenCalledWith(
        PREVIEW_DOC_KEY,
        expect.any(String),
        'EX',
        config.redis.ttlSeconds
      );
      expect(redisInstance.del).not.toHaveBeenCalledWith(PREVIEW_DOC_KEY);
      expect(redisInstance.del).not.toHaveBeenCalledWith(PRODUCTION_DOC_KEY);
    });

    it('stores the draft with a bare _id so readers are not poisoned', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: true,
        action: 'update',
        data: { _id: DRAFT_ID, _type: TYPE, title: 'Draft' }
      } as any);

      const [, stored] = redisInstance.set.mock.calls[0];
      const parsed = JSON.parse(stored);
      expect(parsed._id).toBe(DOC_ID);
      expect(parsed.title).toBe('Draft');
    });

    it('leaves the production type set alone', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: true,
        action: 'update',
        data: { _id: DRAFT_ID, _type: TYPE }
      } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_TYPE_KEY);
      expect(redisInstance.del).not.toHaveBeenCalledWith(PRODUCTION_TYPE_KEY);
    });
  });

  describe('published update', () => {
    it('primes production and invalidates preview', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: false,
        action: 'update',
        data: { _id: DOC_ID, _type: TYPE, title: 'Published' }
      } as any);

      expect(redisInstance.set).toHaveBeenCalledWith(
        PRODUCTION_DOC_KEY,
        expect.any(String),
        'EX',
        config.redis.ttlSeconds
      );
      // Publishing removes the draft, so the drafts perspective now resolves here.
      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_DOC_KEY);
    });

    it('stores a document whose _id carries no drafts. prefix', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: false,
        action: 'update',
        // A published body always has a bare _id; normalizing is defensive.
        data: { _id: DRAFT_ID, _type: TYPE, title: 'Published' }
      } as any);

      const [, stored] = redisInstance.set.mock.calls[0];
      expect(JSON.parse(stored)._id).toBe(DOC_ID);
    });

    it('only clears the production type set', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: false,
        action: 'update',
        data: { _id: DOC_ID, _type: TYPE }
      } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_TYPE_KEY);
      expect(redisInstance.del).not.toHaveBeenCalledWith(PREVIEW_TYPE_KEY);
    });
  });

  describe('draft delete', () => {
    it('invalidates preview only, so preview falls back to published', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: true,
        action: 'delete',
        data: { _id: DRAFT_ID, _type: TYPE }
      } as any);

      expect(redisInstance.set).not.toHaveBeenCalled();
      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_DOC_KEY);
      expect(redisInstance.del).not.toHaveBeenCalledWith(PRODUCTION_DOC_KEY);
    });
  });

  describe('published delete', () => {
    it('invalidates both namespaces', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: false,
        action: 'delete',
        data: { _id: DOC_ID, _type: TYPE }
      } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_DOC_KEY);
      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_DOC_KEY);
    });
  });

  describe('document_ids_by_type invalidation on delete', () => {
    it('clears both type sets when a draft is discarded', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: true,
        action: 'delete',
        data: { _id: DRAFT_ID, _type: TYPE }
      } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_TYPE_KEY);
      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_TYPE_KEY);
    });

    it('clears both type sets when a published document is deleted', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview: false,
        action: 'delete',
        data: { _id: DOC_ID, _type: TYPE }
      } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_TYPE_KEY);
      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_TYPE_KEY);
    });
  });

  // Sanity's default projection is "the whole document after the change", and a
  // delete has no after-state, so delete webhooks arrive with no document body.
  // The id comes from the parser instead, and the type only from what we cached.
  describe('delete webhooks with no document body', () => {
    const cachedDoc = JSON.stringify({ _id: DOC_ID, _type: TYPE, title: 'Cached' });

    it('invalidates preview using the id from the parser when a draft is discarded', async () => {
      const handlers = createRedisHandlers(config);
      redisInstance.get.mockResolvedValue(cachedDoc);

      await handlers.entry({ isPreview: true, action: 'delete', data: {}, itemId: DOC_ID } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_DOC_KEY);
      expect(redisInstance.del).not.toHaveBeenCalledWith(PRODUCTION_DOC_KEY);
    });

    it('invalidates both namespaces when a published document is deleted', async () => {
      const handlers = createRedisHandlers(config);
      redisInstance.get.mockResolvedValue(cachedDoc);

      await handlers.entry({ isPreview: false, action: 'delete', data: {}, itemId: DOC_ID } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_DOC_KEY);
      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_DOC_KEY);
    });

    it('recovers the type from the cached document to clear both type sets', async () => {
      const handlers = createRedisHandlers(config);
      redisInstance.get.mockResolvedValue(cachedDoc);

      await handlers.entry({ isPreview: true, action: 'delete', data: {}, itemId: DOC_ID } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_TYPE_KEY);
      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_TYPE_KEY);
    });

    it('reads the cached document before evicting it', async () => {
      const handlers = createRedisHandlers(config);
      const order: string[] = [];
      redisInstance.get.mockImplementation(async () => {
        order.push('get');
        return cachedDoc;
      });
      redisInstance.del.mockImplementation(async () => {
        order.push('del');
        return 1;
      });

      await handlers.entry({ isPreview: true, action: 'delete', data: {}, itemId: DOC_ID } as any);

      expect(order[0]).toBe('get');
    });

    it('still evicts the document keys when the type cannot be recovered', async () => {
      const handlers = createRedisHandlers(config);
      redisInstance.get.mockResolvedValue(null);

      await handlers.entry({ isPreview: false, action: 'delete', data: {}, itemId: DOC_ID } as any);

      expect(redisInstance.del).toHaveBeenCalledWith(PREVIEW_DOC_KEY);
      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_DOC_KEY);
      // Nothing identifies the type, so no `document_ids_by_type` key is guessed at.
      keysPassedToRedis().forEach((key) => expect(key).not.toContain('document_ids_by_type'));
    });

    it('does not consult redis for a type the body already carries', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({ isPreview: false, action: 'delete', data: { _id: DOC_ID, _type: TYPE } } as any);

      expect(redisInstance.get).not.toHaveBeenCalled();
      expect(redisInstance.del).toHaveBeenCalledWith(PRODUCTION_TYPE_KEY);
    });
  });

  describe('assets', () => {
    it('routes through the same document handling', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.asset({
        isPreview: true,
        action: 'update',
        data: { _id: `drafts.${DOC_ID}`, _type: 'image' }
      } as any);

      expect(redisInstance.set).toHaveBeenCalledWith(
        PREVIEW_DOC_KEY,
        expect.any(String),
        'EX',
        config.redis.ttlSeconds
      );
    });
  });

  describe('malformed payloads', () => {
    it('does not write when data is nullish', async () => {
      const handlers = createRedisHandlers(config);

      await expect(handlers.entry({ isPreview: true, action: 'update', data: null } as any)).resolves.toBeUndefined();

      expect(redisInstance.set).not.toHaveBeenCalled();
      expect(redisInstance.del).not.toHaveBeenCalled();
    });

    it('does not write when the document has no _id', async () => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({ isPreview: false, action: 'delete', data: { _type: TYPE } } as any);

      expect(redisInstance.set).not.toHaveBeenCalled();
      expect(redisInstance.del).not.toHaveBeenCalled();
    });
  });

  // Regression guard for the invariant 0.3.0 broke: the read side only ever
  // looks up bare ids, so a prefixed key is a key nothing can read.
  describe('no drafts. prefix ever reaches redis', () => {
    const cases: Array<[string, boolean, 'update' | 'delete']> = [
      ['draft update', true, 'update'],
      ['draft delete', true, 'delete'],
      ['published update', false, 'update'],
      ['published delete', false, 'delete']
    ];

    it.each(cases)('%s', async (_name, isPreview, action) => {
      const handlers = createRedisHandlers(config);

      await handlers.entry({
        isPreview,
        action,
        data: { _id: isPreview ? DRAFT_ID : DOC_ID, _type: TYPE }
      } as any);

      const keys = keysPassedToRedis();
      expect(keys.length).toBeGreaterThan(0);
      keys.forEach((key) => expect(key).not.toContain('drafts.'));
    });
  });
});
