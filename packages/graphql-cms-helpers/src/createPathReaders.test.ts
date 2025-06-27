import createPathReaders from './createPathReaders';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';

// Mock dependencies
jest.mock('@last-rev/cms-path-util', () => ({
  createPathStore: jest.fn().mockReturnValue({ type: 'pathStore' }),
  PathReader: jest.fn().mockImplementation((store) => ({ store, type: 'pathReader' }))
}));

import { createPathStore, PathReader } from '@last-rev/cms-path-util';

const mockCreatePathStore = createPathStore as jest.MockedFunction<typeof createPathStore>;
const MockPathReader = PathReader as jest.MockedClass<typeof PathReader>;

describe('createPathReaders', () => {
  let baseConfig: LastRevAppConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    baseConfig = new LastRevAppConfig(mockAppConfig());
  });

  describe('when generateFullPathTree is enabled', () => {
    it('should create preview and prod path readers', () => {
      const config = baseConfig.clone({
        paths: {
          generateFullPathTree: true
        }
      });

      const result = createPathReaders(config);

      expect(mockCreatePathStore).toHaveBeenCalledTimes(2);

      // Check preview configuration
      expect(mockCreatePathStore).toHaveBeenCalledWith(
        expect.objectContaining({
          contentful: expect.objectContaining({ usePreview: true }),
          sanity: expect.objectContaining({ usePreview: true })
        })
      );

      // Check production configuration
      expect(mockCreatePathStore).toHaveBeenCalledWith(
        expect.objectContaining({
          contentful: expect.objectContaining({ usePreview: false }),
          sanity: expect.objectContaining({ usePreview: false })
        })
      );

      expect(MockPathReader).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        preview: expect.objectContaining({ type: 'pathReader' }),
        prod: expect.objectContaining({ type: 'pathReader' })
      });
    });

    it('should create path readers with Contentful configuration', () => {
      const config = baseConfig.clone({
        cms: 'Contentful',
        paths: {
          generateFullPathTree: true
        },
        contentful: {
          spaceId: 'test-space',
          env: 'master'
        }
      });

      createPathReaders(config);

      // Verify that config.clone was called with the right parameters
      expect(mockCreatePathStore).toHaveBeenCalledWith(
        expect.objectContaining({
          cms: 'Contentful',
          contentful: expect.objectContaining({
            usePreview: true,
            spaceId: 'test-space',
            env: 'master'
          })
        })
      );

      expect(mockCreatePathStore).toHaveBeenCalledWith(
        expect.objectContaining({
          cms: 'Contentful',
          contentful: expect.objectContaining({
            usePreview: false,
            spaceId: 'test-space',
            env: 'master'
          })
        })
      );
    });

    it('should create path readers with Sanity configuration', () => {
      const config = baseConfig.clone({
        cms: 'Sanity',
        paths: {
          generateFullPathTree: true
        },
        sanity: {
          projectId: 'test-project',
          dataset: 'production'
        }
      });

      createPathReaders(config);

      expect(mockCreatePathStore).toHaveBeenCalledWith(
        expect.objectContaining({
          cms: 'Sanity',
          sanity: expect.objectContaining({
            usePreview: true,
            projectId: 'test-project',
            dataset: 'production'
          })
        })
      );

      expect(mockCreatePathStore).toHaveBeenCalledWith(
        expect.objectContaining({
          cms: 'Sanity',
          sanity: expect.objectContaining({
            usePreview: false,
            projectId: 'test-project',
            dataset: 'production'
          })
        })
      );
    });
  });

  describe('when generateFullPathTree is disabled', () => {
    it('should return undefined', () => {
      // Mock the config to bypass validation
      const mockConfig = {
        paths: {
          generateFullPathTree: false
        },
        clone: jest.fn()
      } as any;

      const result = createPathReaders(mockConfig);

      expect(result).toBeUndefined();
      expect(mockCreatePathStore).not.toHaveBeenCalled();
      expect(MockPathReader).not.toHaveBeenCalled();
    });

    it('should return undefined when paths config is missing', () => {
      const mockConfig = {
        paths: {},
        clone: jest.fn()
      } as any;

      const result = createPathReaders(mockConfig);

      expect(result).toBeUndefined();
      expect(mockCreatePathStore).not.toHaveBeenCalled();
      expect(MockPathReader).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle config cloning correctly', () => {
      const config = baseConfig.clone({
        paths: {
          generateFullPathTree: true
        }
      });

      // Spy on the clone method to verify it's called correctly
      const cloneSpy = jest.spyOn(config, 'clone');

      createPathReaders(config);

      expect(cloneSpy).toHaveBeenCalledTimes(2);
      expect(cloneSpy).toHaveBeenCalledWith({
        contentful: { usePreview: true },
        sanity: { usePreview: true }
      });
      expect(cloneSpy).toHaveBeenCalledWith({
        contentful: { usePreview: false },
        sanity: { usePreview: false }
      });

      cloneSpy.mockRestore();
    });
  });
});
