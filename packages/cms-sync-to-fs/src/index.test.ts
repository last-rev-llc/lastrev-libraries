import sync from './index';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';
import contentfulSync from './contentfulSync';
import sanitySync from './sanitySync';
import { validateArg } from './utils';

// Mock dependencies
jest.mock('./contentfulSync');
jest.mock('./sanitySync');
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  validateArg: jest.fn()
}));

const mockContentfulSync = contentfulSync as jest.MockedFunction<typeof contentfulSync>;
const mockSanitySync = sanitySync as jest.MockedFunction<typeof sanitySync>;
const mockValidateArg = validateArg as jest.MockedFunction<typeof validateArg>;

describe('cms-sync-to-fs', () => {
  let baseConfig: LastRevAppConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    baseConfig = new LastRevAppConfig(mockAppConfig());
  });

  describe('sync', () => {
    it('should call contentfulSync for Contentful CMS', async () => {
      const config = baseConfig.clone({ 
        cms: 'Contentful',
        fs: { contentDir: '/test/content' }
      });
      const sites = ['site1', 'site2'];

      await sync(config, sites);

      expect(mockValidateArg).toHaveBeenCalledWith('/test/content', 'fs.contentDir');
      expect(mockContentfulSync).toHaveBeenCalledWith(config, false, sites);
      expect(mockSanitySync).not.toHaveBeenCalled();
    });

    it('should call sanitySync for Sanity CMS', async () => {
      const config = baseConfig.clone({ 
        cms: 'Sanity',
        fs: { contentDir: '/test/content' },
        sanity: {
          ...baseConfig.sanity,
          usePreview: true
        }
      });
      const sites = ['site1'];

      await sync(config, sites);

      expect(mockValidateArg).toHaveBeenCalledWith('/test/content', 'fs.contentDir');
      expect(mockSanitySync).toHaveBeenCalledWith(config, true, sites);
      expect(mockContentfulSync).not.toHaveBeenCalled();
    });

    it('should use usePreview from contentful config for Contentful CMS', async () => {
      const config = baseConfig.clone({ 
        cms: 'Contentful',
        fs: { contentDir: '/test/content' },
        contentful: {
          ...baseConfig.contentful,
          usePreview: true
        }
      });

      await sync(config);

      expect(mockContentfulSync).toHaveBeenCalledWith(config, true, undefined);
    });

    it('should use usePreview from sanity config for Sanity CMS', async () => {
      const config = baseConfig.clone({ 
        cms: 'Sanity',
        fs: { contentDir: '/test/content' },
        sanity: {
          ...baseConfig.sanity,
          usePreview: false
        }
      });

      await sync(config);

      expect(mockSanitySync).toHaveBeenCalledWith(config, false, undefined);
    });

    it('should pass sites parameter correctly', async () => {
      const config = baseConfig.clone({ 
        cms: 'Contentful',
        fs: { contentDir: '/test/content' }
      });
      const sites = ['site1', 'site2', 'site3'];

      await sync(config, sites);

      expect(mockContentfulSync).toHaveBeenCalledWith(config, false, sites);
    });

    it('should work without sites parameter', async () => {
      const config = baseConfig.clone({ 
        cms: 'Contentful',
        fs: { contentDir: '/test/content' }
      });

      await sync(config);

      expect(mockContentfulSync).toHaveBeenCalledWith(config, false, undefined);
    });

    it('should validate contentDir argument', async () => {
      const config = baseConfig.clone({ 
        cms: 'Contentful',
        fs: { contentDir: '/test/content' }
      });

      await sync(config);

      expect(mockValidateArg).toHaveBeenCalledWith('/test/content', 'fs.contentDir');
    });

    it('should throw error if contentDir validation fails', async () => {
      const config = baseConfig.clone({ 
        cms: 'Contentful',
        fs: { contentDir: '/test/content' }
      });
      
      mockValidateArg.mockImplementation((_arg, argname) => {
        if (argname === 'fs.contentDir') {
          throw new Error(`Missing required argument: ${argname}`);
        }
      });

      await expect(sync(config)).rejects.toThrow('Missing required argument: fs.contentDir');
      expect(mockContentfulSync).not.toHaveBeenCalled();
      expect(mockSanitySync).not.toHaveBeenCalled();
    });
  });
});