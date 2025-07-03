import { FsPathStore, RedisPathStore, DynamoDbPathStore, DummyStore, createPathStore } from './PathStore';
import { PathDataMap } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
// Mock fs-extra
jest.mock('fs-extra', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  ensureDir: jest.fn()
}));

import { readFile, writeFile, ensureDir } from 'fs-extra';
import { join } from 'path';

const mockReadFile = readFile as jest.MockedFunction<any>;
const mockWriteFile = writeFile as jest.MockedFunction<any>;
const mockEnsureDir = ensureDir as jest.MockedFunction<any>;
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    info: jest.fn()
  })
}));

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    hgetall: jest.fn(),
    multi: jest.fn(() => ({
      del: jest.fn().mockReturnThis(),
      hmset: jest.fn().mockReturnThis(),
      exec: jest.fn()
    }))
  }));
});

jest.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDB: jest.fn()
}));

jest.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocument: {
    from: jest.fn().mockImplementation(() => ({
      get: jest.fn(),
      put: jest.fn()
    }))
  }
}));

// mockReadFile, mockWriteFile, mockEnsureDir already defined above

// Mock data
const mockPathDataMap: PathDataMap = {
  '/': {
    fullPath: '/',
    contentId: 'home-123',
    excludedLocales: [],
    isPrimary: true
  },
  '/about': {
    fullPath: '/about',
    contentId: 'about-456',
    excludedLocales: ['de'],
    isPrimary: true
  }
};

// Mock configs
const createMockContentfulConfig = (overrides = {}): LastRevAppConfig =>
  new LastRevAppConfig({
    cms: 'Contentful',
    contentStrategy: 'fs',
    contentful: {
      spaceId: 'test-space',
      env: 'master',
      usePreview: false,
      contentDeliveryToken: 'test-token',
      contentPreviewToken: 'test-preview-token'
    },
    fs: {
      contentDir: '/test/content'
    },
    redis: {
      host: 'localhost',
      port: 6379
    },
    dynamodb: {
      region: 'us-east-1',
      accessKeyId: 'test-key',
      secretAccessKey: 'test-secret',
      tableName: 'test-table'
    },
    ...overrides
  });

const createMockSanityConfig = (overrides = {}): LastRevAppConfig =>
  new LastRevAppConfig({
    cms: 'Sanity',
    contentStrategy: 'fs',
    sanity: {
      projectId: 'test-project',
      dataset: 'production',
      usePreview: false,
      token: 'test-token',
      apiVersion: '2021-03-25',
      schemaTypes: [],
      supportedLanguages: [{ id: 'en-US', title: 'English' }]
    },
    fs: {
      contentDir: '/test/content'
    },
    ...overrides
  });

describe('PathStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('FsPathStore', () => {
    let config: LastRevAppConfig;
    let store: FsPathStore;

    beforeEach(() => {
      config = createMockContentfulConfig();
      store = new FsPathStore(config);
    });

    describe('constructor', () => {
      it('should set basePath for Contentful', () => {
        expect(store.basePath).toBe(join('/test/content', 'test-space', 'master', 'production', 'path_data'));
      });

      it('should set basePath for Sanity', () => {
        const sanityConfig = createMockSanityConfig();
        const sanityStore = new FsPathStore(sanityConfig);

        expect(sanityStore.basePath).toBe(
          join('/test/content', 'test-project', 'production', 'production', 'path_data')
        );
      });

      it('should handle preview mode for Contentful', () => {
        const previewConfig = createMockContentfulConfig({
          contentful: {
            spaceId: 'test-space',
            env: 'master',
            usePreview: true,
            contentDeliveryToken: 'test-token',
            contentPreviewToken: 'test-preview-token'
          }
        });
        const previewStore = new FsPathStore(previewConfig);

        expect(previewStore.basePath).toBe(join('/test/content', 'test-space', 'master', 'preview', 'path_data'));
      });

      it('should handle preview mode for Sanity', () => {
        const previewConfig = createMockSanityConfig({
          sanity: {
            projectId: 'test-project',
            dataset: 'production',
            usePreview: true,
            token: 'test-token',
            apiVersion: '2021-03-25',
            schemaTypes: [],
            supportedLanguages: [{ id: 'en-US', title: 'English' }]
          }
        });
        const previewStore = new FsPathStore(previewConfig);

        expect(previewStore.basePath).toBe(join('/test/content', 'test-project', 'production', 'preview', 'path_data'));
      });
    });

    describe('getFilePath', () => {
      it('should return correct file path', () => {
        const filePath = store.getFilePath('default');
        expect(filePath).toBe(join(store.basePath, 'default.json'));
      });
    });

    describe('load', () => {
      it('should load and parse JSON data', async () => {
        mockReadFile.mockResolvedValue(JSON.stringify(mockPathDataMap));

        const result = await store.load('default');

        expect(mockReadFile).toHaveBeenCalledWith(join(store.basePath, 'default.json'), 'utf8');
        expect(result).toEqual(mockPathDataMap);
      });

      it('should return empty object when file not found', async () => {
        mockReadFile.mockRejectedValue(new Error('ENOENT: no such file'));

        const result = await store.load('default');

        expect(result).toEqual({});
      });

      it('should return empty object when JSON parse fails', async () => {
        mockReadFile.mockResolvedValue('invalid json');

        const result = await store.load('default');

        expect(result).toEqual({});
      });
    });

    describe('save', () => {
      it('should ensure directory exists and write file', async () => {
        mockEnsureDir.mockResolvedValue(undefined);
        mockWriteFile.mockResolvedValue(undefined);

        await store.save(mockPathDataMap, 'default');

        expect(mockEnsureDir).toHaveBeenCalledWith(store.basePath);
        expect(mockWriteFile).toHaveBeenCalledWith(
          join(store.basePath, 'default.json'),
          JSON.stringify(mockPathDataMap)
        );
      });
    });
  });

  describe('RedisPathStore', () => {
    let config: LastRevAppConfig;
    let store: RedisPathStore;
    let mockRedisClient: any;

    beforeEach(() => {
      config = createMockContentfulConfig();
      store = new RedisPathStore(config);
      mockRedisClient = store.client;
    });

    describe('constructor', () => {
      it('should create Redis client with correct configuration', () => {
        expect(mockRedisClient).toBeDefined();
      });
    });

    describe('getKey', () => {
      it('should return correct Redis key', () => {
        const key = store.getKey('default');
        expect(key).toBe(':path_data:default');
      });
    });

    describe('load', () => {
      it('should load data from Redis and parse JSON values', async () => {
        const redisData = {
          '/': JSON.stringify(mockPathDataMap['/']),
          '/about': JSON.stringify(mockPathDataMap['/about'])
        };
        mockRedisClient.hgetall.mockResolvedValue(redisData);

        const result = await store.load('default');

        expect(mockRedisClient.hgetall).toHaveBeenCalledWith(':path_data:default');
        expect(result).toEqual(mockPathDataMap);
      });

      it('should return empty object when Redis operation fails', async () => {
        mockRedisClient.hgetall.mockRejectedValue(new Error('Redis error'));

        const result = await store.load('default');

        expect(result).toEqual({});
      });
    });

    describe('save', () => {
      it('should save data to Redis with JSON stringified values', async () => {
        const mockMulti = {
          del: jest.fn().mockReturnThis(),
          hmset: jest.fn().mockReturnThis(),
          exec: jest.fn().mockResolvedValue([])
        };
        mockRedisClient.multi.mockReturnValue(mockMulti);

        await store.save(mockPathDataMap, 'default');

        expect(mockRedisClient.multi).toHaveBeenCalled();
        expect(mockMulti.del).toHaveBeenCalledWith(':path_data:default');
        expect(mockMulti.hmset).toHaveBeenCalledWith(':path_data:default', {
          '/': JSON.stringify(mockPathDataMap['/']),
          '/about': JSON.stringify(mockPathDataMap['/about'])
        });
        expect(mockMulti.exec).toHaveBeenCalled();
      });

      it('should not save when pathDataMap is empty', async () => {
        const mockMulti = {
          del: jest.fn().mockReturnThis(),
          hmset: jest.fn().mockReturnThis(),
          exec: jest.fn().mockResolvedValue([])
        };
        mockRedisClient.multi.mockReturnValue(mockMulti);

        await store.save({}, 'default');

        expect(mockRedisClient.multi).not.toHaveBeenCalled();
      });
    });
  });

  describe('DynamoDbPathStore', () => {
    let config: LastRevAppConfig;
    let store: DynamoDbPathStore;
    let mockDynamoClient: any;

    beforeEach(() => {
      config = createMockContentfulConfig();
      store = new DynamoDbPathStore(config);
      mockDynamoClient = store.dynamoDB;
    });

    describe('constructor', () => {
      it('should set correct properties', () => {
        expect(store.tableName).toBe('test-table');
        expect(store.pk).toBe('test-space:master:production');
      });

      it('should handle preview mode', () => {
        const previewConfig = createMockContentfulConfig({
          contentful: {
            spaceId: 'test-space',
            env: 'master',
            usePreview: true,
            contentDeliveryToken: 'test-token',
            contentPreviewToken: 'test-preview-token'
          }
        });
        const previewStore = new DynamoDbPathStore(previewConfig);

        expect(previewStore.pk).toBe('test-space:master:preview');
      });
    });

    describe('sk', () => {
      it('should return correct sort key', () => {
        const sk = store.sk('default');
        expect(sk).toBe('path_data:default');
      });
    });

    describe('load', () => {
      it('should load data from DynamoDB', async () => {
        mockDynamoClient.get.mockResolvedValue({
          Item: { data: mockPathDataMap }
        });

        const result = await store.load('default');

        expect(mockDynamoClient.get).toHaveBeenCalledWith({
          TableName: 'test-table',
          Key: {
            pk: 'test-space:master:production',
            sk: 'path_data:default'
          },
          AttributesToGet: ['data']
        });
        expect(result).toEqual(mockPathDataMap);
      });

      it('should return empty object when item not found', async () => {
        mockDynamoClient.get.mockResolvedValue({ Item: undefined });

        const result = await store.load('default');

        expect(result).toEqual({});
      });

      it('should return empty object when DynamoDB operation fails', async () => {
        mockDynamoClient.get.mockRejectedValue(new Error('DynamoDB error'));

        const result = await store.load('default');

        expect(result).toEqual({});
      });
    });

    describe('save', () => {
      it('should save data to DynamoDB', async () => {
        mockDynamoClient.put.mockResolvedValue({});

        await store.save(mockPathDataMap, 'default');

        expect(mockDynamoClient.put).toHaveBeenCalledWith({
          TableName: 'test-table',
          Item: {
            pk: 'test-space:master:production',
            sk: 'path_data:default',
            data: mockPathDataMap
          }
        });
      });

      it('should not save when pathDataMap is empty', async () => {
        await store.save({}, 'default');

        expect(mockDynamoClient.put).not.toHaveBeenCalled();
      });
    });
  });

  describe('DummyStore', () => {
    let store: DummyStore;

    beforeEach(() => {
      store = new DummyStore();
    });

    describe('load', () => {
      it('should return empty object', async () => {
        const result = await store.load();
        expect(result).toEqual({});
      });
    });

    describe('save', () => {
      it('should do nothing', async () => {
        await expect(store.save()).resolves.toBeUndefined();
      });
    });
  });

  describe('createPathStore', () => {
    it('should create FsPathStore for fs content strategy', () => {
      const config = createMockContentfulConfig({ contentStrategy: 'fs' });
      const store = createPathStore(config);

      expect(store).toBeInstanceOf(FsPathStore);
    });

    it('should create RedisPathStore for cms strategy with redis cache', () => {
      const config = createMockContentfulConfig({
        contentStrategy: 'cms',
        cmsCacheStrategy: 'redis'
      });
      const store = createPathStore(config);

      expect(store).toBeInstanceOf(RedisPathStore);
    });

    it('should create DynamoDbPathStore for cms strategy with dynamodb cache', () => {
      const config = createMockContentfulConfig({
        contentStrategy: 'cms',
        cmsCacheStrategy: 'dynamodb'
      });
      const store = createPathStore(config);

      expect(store).toBeInstanceOf(DynamoDbPathStore);
    });

    it('should create DummyStore for cms strategy with none cache', () => {
      const config = createMockContentfulConfig({
        contentStrategy: 'cms',
        cmsCacheStrategy: 'none'
      });
      const store = createPathStore(config);

      expect(store).toBeInstanceOf(DummyStore);
    });

    it('should create FsPathStore for Sanity with fs strategy', () => {
      const config = createMockSanityConfig({ contentStrategy: 'fs' });
      const store = createPathStore(config);

      expect(store).toBeInstanceOf(FsPathStore);
    });
  });
});
