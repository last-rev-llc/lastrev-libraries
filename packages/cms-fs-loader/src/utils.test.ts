import { getGetUriFunction } from './utils';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';

describe('utils', () => {
  let baseConfig: LastRevAppConfig;

  beforeEach(() => {
    baseConfig = new LastRevAppConfig(mockAppConfig());
  });

  describe('getGetUriFunction', () => {
    describe('Contentful CMS', () => {
      it('should generate correct path for Contentful', () => {
        const config = baseConfig.clone({
          cms: 'Contentful',
          fs: { contentDir: '/test/content' },
          contentful: {
            spaceId: 'test-space',
            env: 'master'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri('production', 'entries', 'test.json');

        expect(result).toBe('/test/content/test-space/master/production/entries/test.json');
      });

      it('should handle multiple path segments', () => {
        const config = baseConfig.clone({
          cms: 'Contentful',
          fs: { contentDir: '/content' },
          contentful: {
            spaceId: 'space',
            env: 'staging'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri('preview', 'assets', 'nested', 'file.json');

        expect(result).toBe('/content/space/staging/preview/assets/nested/file.json');
      });

      it('should work with different environments', () => {
        const config = baseConfig.clone({
          cms: 'Contentful',
          fs: { contentDir: '/data' },
          contentful: {
            spaceId: 'my-space',
            env: 'development'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri('production', 'content_types');

        expect(result).toBe('/data/my-space/development/production/content_types');
      });
    });

    describe('Sanity CMS', () => {
      it('should generate correct path for Sanity', () => {
        const config = baseConfig.clone({
          cms: 'Sanity',
          fs: { contentDir: '/test/content' },
          sanity: {
            projectId: 'test-project',
            dataset: 'production'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri('production', 'entries', 'test.json');

        expect(result).toBe('/test/content/test-project/production/production/entries/test.json');
      });

      it('should handle multiple path segments for Sanity', () => {
        const config = baseConfig.clone({
          cms: 'Sanity',
          fs: { contentDir: '/content' },
          sanity: {
            projectId: 'project',
            dataset: 'staging'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri('preview', 'assets', 'nested', 'file.json');

        expect(result).toBe('/content/project/staging/preview/assets/nested/file.json');
      });

      it('should work with different datasets', () => {
        const config = baseConfig.clone({
          cms: 'Sanity',
          fs: { contentDir: '/data' },
          sanity: {
            projectId: 'my-project',
            dataset: 'development'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri('production', 'content_types');

        expect(result).toBe('/data/my-project/development/production/content_types');
      });
    });

    describe('edge cases', () => {
      it('should handle empty path segments', () => {
        const config = baseConfig.clone({
          cms: 'Contentful',
          fs: { contentDir: '/test' },
          contentful: {
            spaceId: 'space',
            env: 'env'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri();

        expect(result).toBe('/test/space/env');
      });

      it('should handle single path segment', () => {
        const config = baseConfig.clone({
          cms: 'Sanity',
          fs: { contentDir: '/test' },
          sanity: {
            projectId: 'project',
            dataset: 'dataset'
          }
        });

        const getUri = getGetUriFunction(config);
        const result = getUri('production');

        expect(result).toBe('/test/project/dataset/production');
      });
    });
  });
});