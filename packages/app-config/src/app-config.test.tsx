import '@testing-library/jest-dom';
import LastRevAppConfig from './';
import mockConfig, { redisConfig } from './app-config.mock';

let mockedConfig = mockConfig();
let consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

beforeEach(() => {
  mockedConfig = mockConfig();
  consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  consoleWarn.mockRestore();
});

describe('LastRevAppConfig', () => {
  describe('returns object with a config property with correct data', () => {
    test('cms is Contentful when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.cms).toBe('Contentful');
    });

    test('cms is Sanity when provided', () => {
      mockedConfig.cms = 'Sanity';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.cms).toBe('Sanity');
    });

    test('stategy is fs when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.contentStrategy).toBe('fs');
    });

    test('logLevel is warn when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.logLevel).toBe('warn');
    });

    test('graphql has port of 5000 when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.graphql?.port).toBe(5000);
    });

    test('graphql has host of localhost when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.graphql?.host).toBe('localhost');
    });

    test('sites is empty array when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.sites)).toBe(JSON.stringify([]));
    });

    test('contentful has env of master when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.graphql?.port).toBe(5000);
    });

    test('contentful has usePreview of false when not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.graphql?.host).toBe('localhost');
    });
  });

  describe('paths', () => {
    test('paths.generateFullPathTree defaults to true', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.paths).toEqual({
        generateFullPathTree: true
      });
    });

    test('throws error when generateFullPathTree is false', () => {
      expect(
        () =>
          new LastRevAppConfig({
            ...mockedConfig,
            paths: {
              generateFullPathTree: false
            }
          })
      ).toThrow('Invalid paths configuration: generateFullPathTree must be true');
    });
  });

  describe('cms errors', () => {
    test('throws error if contentful.spaceId is not provided', () => {
      if (mockedConfig.contentful) {
        mockedConfig.contentful.spaceId = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Contentful CMS: contentful.spaceId is required.');
    });

    test('throws error if contentful.contentDeliveryToken is not provided', () => {
      if (mockedConfig.contentful) {
        mockedConfig.contentful.contentDeliveryToken = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow(
        'Contentful CMS: contentful.contentDeliveryToken is required.'
      );
    });

    test('throws error if contentful.contentPreviewToken is not provided', () => {
      if (mockedConfig.contentful) {
        mockedConfig.contentful.contentPreviewToken = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow(
        'Contentful CMS: contentful.contentPreviewToken is required.'
      );
    });

    test('throws error if sanity.projectId is not provided', () => {
      mockedConfig.cms = 'Sanity';
      if (mockedConfig.sanity) {
        mockedConfig.sanity.projectId = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Sanity CMS: sanity.projectId is required.');
    });

    test('throws error if sanity.dataset is not provided', () => {
      mockedConfig.cms = 'Sanity';
      if (mockedConfig.sanity) {
        mockedConfig.sanity.dataset = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Sanity CMS: sanity.dataset is required.');
    });

    test('throws error if sanity.token is not provided', () => {
      mockedConfig.cms = 'Sanity';
      if (mockedConfig.sanity) {
        mockedConfig.sanity.token = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Sanity CMS: sanity.token is required.');
    });

    test('throws error if sanity.apiVersion is not provided', () => {
      mockedConfig.cms = 'Sanity';
      if (mockedConfig.sanity) {
        mockedConfig.sanity.apiVersion = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Sanity CMS: sanity.apiVersion is required.');
    });

    test('throws error if has incorrect strategy', () => {
      // @ts-ignore
      mockedConfig.strategy = 'wrong strategy';
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow(`Invalid strategy: ${mockedConfig.strategy}`);
    });

    test('throws error if invalid cms is provided', () => {
      // @ts-ignore
      mockedConfig.cms = 'Not Contentful';
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow(`Invalid CMS: ${mockedConfig.cms}`);
    });
  });

  describe('when strategy is fs', () => {
    test('throws error if contentDir is not provided', () => {
      if (mockedConfig.fs) {
        mockedConfig.fs.contentDir = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('FS strategy: fs.contentDir is required');
    });

    test('throws error if fs is not provided', () => {
      mockedConfig.fs = undefined;
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('FS strategy: fs.contentDir is required');
    });
  });

  describe('when strategy is redis', () => {
    test('throws error if redis is not provided', () => {
      mockedConfig.strategy = 'redis';
      mockedConfig.redis = undefined;
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Redis strategy: redis.host is required');
    });

    test('throws error if host is not provided', () => {
      mockedConfig.strategy = 'redis';
      if (mockedConfig.redis) {
        mockedConfig.redis.host = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Redis strategy: redis.host is required');
    });

    test('throws error if port is not provided', () => {
      mockedConfig.strategy = 'redis';
      if (mockedConfig.redis) {
        mockedConfig.redis.port = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('Redis strategy: redis.port is required');
    });
  });

  describe('dynamodb errors if strategy is dynamodb', () => {
    test('throws error if region is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.region = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('DynamoDB strategy: dynamodb.region is required');
    });

    test('throws error if port is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.accessKeyId = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('DynamoDB strategy: dynamodb.accessKeyId is required');
    });

    test('throws error if region is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.secretAccessKey = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow(
        'DynamoDB strategy: dynamodb.secretAccessKey is required'
      );
    });

    test('throws error if port is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.tableName = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('DynamoDB strategy: dynamodb.tableName is required');
    });
  });

  describe('dynamodb errors if strategy is dynamodb', () => {
    test('throws error if region is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      mockedConfig.dynamodb = undefined;
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('DynamoDB strategy: dynamodb.region is required');
    });

    test('throws error if region is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.region = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('DynamoDB strategy: dynamodb.region is required');
    });

    test('throws error if port is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.accessKeyId = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('DynamoDB strategy: dynamodb.accessKeyId is required');
    });

    test('throws error if region is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.secretAccessKey = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow(
        'DynamoDB strategy: dynamodb.secretAccessKey is required'
      );
    });

    test('throws error if port is not provided', () => {
      mockedConfig.strategy = 'dynamodb';
      if (mockedConfig.dynamodb) {
        mockedConfig.dynamodb.tableName = undefined;
      }
      expect(() => new LastRevAppConfig(mockedConfig)).toThrow('DynamoDB strategy: dynamodb.tableName is required');
    });
  });

  describe('clone functionality', () => {
    test('clone merges new config with old config', () => {
      const oldConfig = mockedConfig;
      const appConfig = new LastRevAppConfig({
        ...oldConfig,
        redis: {
          host: 'abc',
          port: 1234
        }
      });
      expect(appConfig.redis).toEqual({
        host: 'abc',
        port: 1234,
        maxBatchSize: 1000,
        ttlSeconds: 2592000
      });

      const clonedAppConfig = appConfig.clone({ ...redisConfig() });
      expect(clonedAppConfig.redis).toEqual(oldConfig.redis);
    });
  });

  describe('getters', () => {
    test('contentful returns contentful object', () => {
      if (mockedConfig.contentful) {
        mockedConfig.contentful.env = 'testing';
        mockedConfig.contentful.usePreview = true;
      }
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.contentful)).toBe(JSON.stringify(appConfig.contentful));
    });

    test('sanity returns sanity object', () => {
      mockedConfig.cms = 'Sanity';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.sanity)).toBe(JSON.stringify(appConfig.sanity));
    });

    test('logLevel returns logLevel', () => {
      mockedConfig.logLevel = 'debug';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.logLevel).toBe(mockedConfig.logLevel);
    });

    test('logLevel returns warn if not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      // @ts-ignore
      const noLogLevelConfig = appConfig.clone({ logLevel: null });
      expect(noLogLevelConfig.logLevel).toBe('warn');
    });

    test('cms returns cms', () => {
      mockedConfig.cms = 'Contentful';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.cms).toBe(mockedConfig.cms);
    });

    test('contentStrategy returns strategy', () => {
      mockedConfig.strategy = 'redis';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.cmsCacheStrategy).toBe(mockedConfig.strategy);
    });

    test('cms contentStrategy returns "cms" and cmsCacheStrategy is "none"', () => {
      mockedConfig.contentStrategy = 'cms';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.contentStrategy).toBe(mockedConfig.contentStrategy);
      expect(appConfig.cmsCacheStrategy).toBe('none');
    });

    test('cms contentStrategy with cache strategy returns correct values', () => {
      mockedConfig.contentStrategy = 'cms';
      mockedConfig.cmsCacheStrategy = 'redis';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.contentStrategy).toBe(mockedConfig.contentStrategy);
      expect(appConfig.cmsCacheStrategy).toBe(mockedConfig.cmsCacheStrategy);
    });

    test('fs contentStrategy returns "fs"', () => {
      mockedConfig.contentStrategy = 'fs';
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.contentStrategy).toBe(mockedConfig.contentStrategy);
    });

    test('fs returns fs', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.fs)).toBe(JSON.stringify(mockedConfig.fs));
    });

    test('redis returns redis', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.redis)).toBe(JSON.stringify(mockedConfig.redis));
    });

    test('dynamodb returns dynamodb', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.dynamodb)).toBe(JSON.stringify(mockedConfig.dynamodb));
    });

    test('extensions returns extensions', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.extensions)).toBe(JSON.stringify(mockedConfig.extensions));
    });

    test('graphql returns graphql', () => {
      mockedConfig.graphql = { port: 3000, host: 'notlocal' };
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.graphql)).toBe(JSON.stringify(mockedConfig.graphql));
    });

    test('sites returns sites', () => {
      mockedConfig.sites = ['site1'];
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(JSON.stringify(appConfig.sites)).toBe(JSON.stringify(mockedConfig.sites));
    });

    test('jwtSigningSecret defaults to nothing if not provided', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.jwtSigningSecret).toBeUndefined();
    });
  });

  describe('Algolia', () => {
    test('defaults max batch size to 1000', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.algolia.maxBatchSize).toBe(1000);
    });

    test('honors max batch size', () => {
      const appConfig = new LastRevAppConfig({
        ...mockedConfig,
        algolia: {
          maxBatchSize: 500
        }
      });
      expect(appConfig.algolia.maxBatchSize).toBe(500);
    });
  });

  describe('feature flags', () => {
    test('disableCoreSidekickLookup defaults to false and warns user', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.features.disableCoreSidekickLookup).toBe(false);
      expect(consoleWarn).toHaveBeenCalledWith(
        'The SidekickLookupResolver in the core is being deprecated. See how to migrate: https://lastrev.atlassian.net/wiki/spaces/KB/pages/108167187/Sidekick+Lookup+Migration'
      );
    });
    test('when disableCoreSidekickLookup is set to true, it returns true and no warning is logged', () => {
      Object.assign(mockedConfig.features!, { disableCoreSidekickLookup: true });
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.features.disableCoreSidekickLookup).toBe(true);
      expect(consoleWarn).not.toHaveBeenCalled();
    });
    test('disableFederatedSchema defaults to false', () => {
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.features.disableFederatedSchema).toBe(false);
    });
    test('when disableFederatedSchema is set to true, it returns true', () => {
      Object.assign(mockedConfig.features!, { disableFederatedSchema: true });
      const appConfig = new LastRevAppConfig(mockedConfig);
      expect(appConfig.features.disableFederatedSchema).toBe(true);
    });
  });
});
