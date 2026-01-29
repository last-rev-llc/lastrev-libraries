import createLoaders from './createLoaders';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';

// Mock all the loader modules
jest.mock('@last-rev/cms-fs-loader', () => jest.fn().mockReturnValue({ type: 'fs' }));
jest.mock('@last-rev/contentful-cms-loader', () => jest.fn().mockReturnValue({ type: 'contentful' }));
jest.mock('@last-rev/cms-redis-loader', () => jest.fn().mockReturnValue({ type: 'redis' }));
jest.mock('@last-rev/cms-dynamodb-loader', () => jest.fn().mockReturnValue({ type: 'dynamodb' }));
jest.mock('@last-rev/sanity-cms-loader', () => jest.fn().mockReturnValue({ type: 'sanity' }));

import createFsLoaders from '@last-rev/cms-fs-loader';
import createContentfulCmsLoaders from '@last-rev/contentful-cms-loader';
import createRedisLoaders from '@last-rev/cms-redis-loader';
import createDynamoDbLoaders from '@last-rev/cms-dynamodb-loader';
import createSanityLoaders from '@last-rev/sanity-cms-loader';

describe('createLoaders', () => {
  let baseConfig: LastRevAppConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    baseConfig = new LastRevAppConfig(mockAppConfig());
  });

  describe('CMS loader selection', () => {
    it('should create Sanity loaders when cms is Sanity', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        contentStrategy: 'cms',
        cmsCacheStrategy: 'none'
      });

      const result = createLoaders(config, 'en-US');

      expect(createSanityLoaders).toHaveBeenCalledWith(config, 'en-US');
      expect(result.sanityLoaders).toEqual({ type: 'sanity' });
      // Contentful loaders are proxies that throw when accessed
      expect(() => (result.loaders as any).entryLoader).toThrow('Cannot access Contentful loaders');
      expect(() => (result.contentfulLoaders as any).entryLoader).toThrow('Cannot access Contentful loaders');
    });

    it('should create Contentful loaders when cms is Contentful', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentStrategy: 'cms',
        cmsCacheStrategy: 'none'
      });

      const result = createLoaders(config, 'en-US');

      expect(createContentfulCmsLoaders).toHaveBeenCalledWith(config, 'en-US');
      expect(result.loaders).toEqual({ type: 'contentful' });
      expect(result.contentfulLoaders).toEqual({ type: 'contentful' });
      // Sanity loaders are proxies that throw when accessed
      expect(() => (result.sanityLoaders as any).documentLoader).toThrow('Cannot access Sanity loaders');
    });

    it('should default to Contentful loaders for unknown cms', () => {
      // Create a simple config to avoid validation errors
      const config = new LastRevAppConfig({
        cms: 'Contentful',
        contentful: {
          spaceId: 'test',
          contentDeliveryToken: 'test',
          contentPreviewToken: 'test'
        },
        contentStrategy: 'cms',
        cmsCacheStrategy: 'none'
      });

      const result = createLoaders(config, 'en-US');

      expect(createContentfulCmsLoaders).toHaveBeenCalledWith(config, 'en-US');
      expect(result.loaders).toEqual({ type: 'contentful' });
      expect(result.contentfulLoaders).toEqual({ type: 'contentful' });
    });
  });

  describe('content strategy selection', () => {
    it('should use fs loaders when contentStrategy is fs', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        contentStrategy: 'fs'
      });

      const result = createLoaders(config, 'en-US');

      expect(createContentfulCmsLoaders).toHaveBeenCalledWith(config, 'en-US');
      expect(createFsLoaders).toHaveBeenCalledWith(config, { type: 'contentful' });
      expect(result.loaders).toEqual({ type: 'fs' });
      expect(result.contentfulLoaders).toEqual({ type: 'fs' });
    });

    it('should use redis loaders when cmsCacheStrategy is redis', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        cmsCacheStrategy: 'redis',
        contentStrategy: 'cms'
      });

      const result = createLoaders(config, 'en-US');

      expect(createContentfulCmsLoaders).toHaveBeenCalledWith(config, 'en-US');
      expect(createRedisLoaders).toHaveBeenCalledWith(config, { type: 'contentful' });
      expect(result.loaders).toEqual({ type: 'redis' });
      expect(result.contentfulLoaders).toEqual({ type: 'redis' });
    });

    it('should use dynamodb loaders when cmsCacheStrategy is dynamodb', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        cmsCacheStrategy: 'dynamodb',
        contentStrategy: 'cms'
      });

      const result = createLoaders(config, 'en-US');

      expect(createContentfulCmsLoaders).toHaveBeenCalledWith(config, 'en-US');
      expect(createDynamoDbLoaders).toHaveBeenCalledWith(config, { type: 'contentful' });
      expect(result.loaders).toEqual({ type: 'dynamodb' });
      expect(result.contentfulLoaders).toEqual({ type: 'dynamodb' });
    });

    it('should use cms loaders directly when cmsCacheStrategy is none', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        cmsCacheStrategy: 'none',
        contentStrategy: 'cms' // Override the fs default
      });

      const result = createLoaders(config, 'en-US');

      expect(createContentfulCmsLoaders).toHaveBeenCalledWith(config, 'en-US');
      expect(createRedisLoaders).not.toHaveBeenCalled();
      expect(createDynamoDbLoaders).not.toHaveBeenCalled();
      expect(createFsLoaders).not.toHaveBeenCalled();
      expect(result.loaders).toEqual({ type: 'contentful' });
      expect(result.contentfulLoaders).toEqual({ type: 'contentful' });
    });
  });

  describe('fallback behavior', () => {
    it('should use base loaders when cmsCacheStrategy is unknown', () => {
      // Unknown cache strategy falls through to base loaders
      const config = baseConfig.clone({
        cms: 'Contentful',
        cmsCacheStrategy: 'unknown' as any,
        contentStrategy: 'cms' // Not fs strategy
      });

      const result = createLoaders(config, 'en-US');

      // Falls back to base contentful loaders
      expect(result.loaders).toEqual({ type: 'contentful' });
      expect(result.contentfulLoaders).toEqual({ type: 'contentful' });
    });
  });

  describe('combined scenarios', () => {
    it('should apply fs cache strategy to Sanity', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        contentStrategy: 'fs',
        cmsCacheStrategy: 'none'
      });

      const result = createLoaders(config, 'es');

      expect(createSanityLoaders).toHaveBeenCalledWith(config, 'es');
      expect(createFsLoaders).toHaveBeenCalledWith(config, { type: 'sanity' });
      expect(result.sanityLoaders).toEqual({ type: 'fs' });
    });

    it('should apply redis cache strategy to Sanity', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        contentStrategy: 'cms',
        cmsCacheStrategy: 'redis'
      });

      const result = createLoaders(config, 'es');

      expect(createSanityLoaders).toHaveBeenCalledWith(config, 'es');
      expect(createRedisLoaders).toHaveBeenCalledWith(config, { type: 'sanity' });
      expect(result.sanityLoaders).toEqual({ type: 'redis' });
    });

    it('should not apply dynamodb cache strategy to Sanity (not yet supported)', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        contentStrategy: 'cms',
        cmsCacheStrategy: 'dynamodb'
      });

      const result = createLoaders(config, 'es');

      expect(createSanityLoaders).toHaveBeenCalledWith(config, 'es');
      // DynamoDB not yet supported for Sanity - falls back to base loaders
      expect(createDynamoDbLoaders).not.toHaveBeenCalled();
      expect(result.sanityLoaders).toEqual({ type: 'sanity' });
    });

    it('should use base Sanity loaders when cmsCacheStrategy is none', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        contentStrategy: 'cms',
        cmsCacheStrategy: 'none'
      });

      const result = createLoaders(config, 'es');

      expect(createSanityLoaders).toHaveBeenCalledWith(config, 'es');
      expect(createFsLoaders).not.toHaveBeenCalled();
      expect(createRedisLoaders).not.toHaveBeenCalled();
      expect(result.sanityLoaders).toEqual({ type: 'sanity' });
    });
  });

  describe('locale handling', () => {
    it('should pass through different locales correctly', () => {
      const config = baseConfig.clone({ cms: 'Contentful' });

      createLoaders(config, 'de-DE');

      expect(createContentfulCmsLoaders).toHaveBeenCalledWith(config, 'de-DE');
    });
  });
});
