import sanitySync from './sanitySync';
import LastRevAppConfig from '@last-rev/app-config';
import { createClient } from '@sanity/client';
import { SimpleTimer } from '@last-rev/timer';
import { updateAllPaths } from '@last-rev/cms-path-util';
import { createContext } from '@last-rev/graphql-cms-helpers';
import {
  validateArg,
  delay,
  writeItems,
  writeDocumentIdsByTypeFiles,
  readSyncTokens,
  writeSyncTokens,
  groupSanityDocsByTypeAndMapToIds
} from './utils';

// Mock dependencies
jest.mock('@sanity/client');
jest.mock('@last-rev/timer');
jest.mock('@last-rev/cms-path-util');
jest.mock('@last-rev/graphql-cms-helpers');
jest.mock('./utils');
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    debug: jest.fn()
  })
}));

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;
const mockSimpleTimer = SimpleTimer as jest.MockedClass<typeof SimpleTimer>;
const mockUpdateAllPaths = updateAllPaths as jest.MockedFunction<typeof updateAllPaths>;
const mockCreateContext = createContext as jest.MockedFunction<typeof createContext>;
const mockValidateArg = validateArg as jest.MockedFunction<typeof validateArg>;
const mockDelay = delay as jest.MockedFunction<typeof delay>;
const mockWriteItems = writeItems as jest.MockedFunction<typeof writeItems>;
const mockWriteDocumentIdsByTypeFiles = writeDocumentIdsByTypeFiles as jest.MockedFunction<
  typeof writeDocumentIdsByTypeFiles
>;
const mockReadSyncTokens = readSyncTokens as jest.MockedFunction<typeof readSyncTokens>;
const mockWriteSyncTokens = writeSyncTokens as jest.MockedFunction<typeof writeSyncTokens>;
const mockGroupSanityDocsByTypeAndMapToIds = groupSanityDocsByTypeAndMapToIds as jest.MockedFunction<
  typeof groupSanityDocsByTypeAndMapToIds
>;

// Mock data
const mockSanityClient = {
  fetch: jest.fn()
};

const mockSanityEntries = [
  {
    _id: 'entry1',
    _type: 'page',
    _updatedAt: '2023-01-01T00:00:00Z',
    title: 'Home Page',
    _translations: []
  },
  {
    _id: 'entry2',
    _type: 'article',
    _updatedAt: '2023-01-02T00:00:00Z',
    title: 'Test Article',
    _translations: []
  }
];

const mockSanityAssets = [
  {
    _id: 'asset1',
    _type: 'sanity.imageAsset',
    _updatedAt: '2023-01-01T00:00:00Z',
    url: 'https://example.com/image.jpg',
    _translations: []
  }
];

const mockConfig = new LastRevAppConfig({
  cms: 'Sanity',
  contentStrategy: 'fs',
  sanity: {
    token: 'test-token',
    projectId: 'test-project',
    dataset: 'production',
    apiVersion: '2021-03-25',
    schemaTypes: [
      { name: 'page', type: 'document' },
      { name: 'article', type: 'document' }
    ],
    supportedLanguages: [
      { id: 'en-US', title: 'English' },
      { id: 'fr', title: 'French' }
    ]
  },
  fs: {
    contentDir: '/test/content'
  }
});

const mockSyncTokens = {
  page: '2023-01-01T00:00:00Z',
  article: '2023-01-01T00:00:00Z',
  asset: '2023-01-01T00:00:00Z'
};

const mockTimer = {
  end: jest.fn().mockReturnValue({ millis: 1000 })
};

describe('sanitySync', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mocks
    mockCreateClient.mockReturnValue(mockSanityClient as any);
    mockSimpleTimer.mockImplementation(() => mockTimer as any);
    mockReadSyncTokens.mockResolvedValue(mockSyncTokens);
    mockGroupSanityDocsByTypeAndMapToIds.mockReturnValue({
      page: ['entry1'],
      article: ['entry2']
    });
    mockCreateContext.mockResolvedValue({} as any);

    // Mock fetch responses
    mockSanityClient.fetch
      .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'page')) // page entries
      .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'article')) // article entries
      .mockResolvedValueOnce(mockSanityAssets); // assets
  });

  describe('basic functionality', () => {
    it('should validate required config parameters', async () => {
      await sanitySync(mockConfig, false);

      expect(mockValidateArg).toHaveBeenCalledWith('test-token', 'sanity.token');
      expect(mockValidateArg).toHaveBeenCalledWith('test-project', 'sanity.projectId');
      expect(mockValidateArg).toHaveBeenCalledWith('production', 'sanity.dataset');
    });

    it('should create Sanity client with correct configuration for production', async () => {
      await sanitySync(mockConfig, false);

      expect(mockCreateClient).toHaveBeenCalledWith({
        token: 'test-token',
        projectId: 'test-project',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2021-03-25'
      });
    });

    it('should create Sanity client with correct configuration for preview', async () => {
      await sanitySync(mockConfig, true);

      expect(mockCreateClient).toHaveBeenCalledWith({
        token: 'test-token',
        projectId: 'test-project',
        dataset: 'production',
        perspective: 'drafts',
        useCdn: false,
        apiVersion: '2021-03-25'
      });
    });

    it('should read existing sync tokens', async () => {
      await sanitySync(mockConfig, false);

      expect(mockReadSyncTokens).toHaveBeenCalledWith('/test/content/test-project/production/production', '');
    });

    it('should read sync tokens for preview path when usePreview is true', async () => {
      await sanitySync(mockConfig, true);

      expect(mockReadSyncTokens).toHaveBeenCalledWith('/test/content/test-project/production/preview', '');
    });
  });

  describe('data fetching', () => {
    it('should fetch entries for each content type', async () => {
      await sanitySync(mockConfig, false);

      // Should make calls for each content type + assets
      expect(mockSanityClient.fetch).toHaveBeenCalledTimes(3);

      // Check page query (simplified GROQ)
      expect(mockSanityClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == $contentTypeId && _updatedAt > $syncToken'),
        {
          contentTypeId: 'page',
          syncToken: '2023-01-01T00:00:00Z'
        }
      );

      // Check article query
      expect(mockSanityClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == $contentTypeId && _updatedAt > $syncToken'),
        {
          contentTypeId: 'article',
          syncToken: '2023-01-01T00:00:00Z'
        }
      );
    });

    it('should fetch assets', async () => {
      await sanitySync(mockConfig, false);

      expect(mockSanityClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining("*[_type in ['sanity.imageAsset', 'sanity.fileAsset'] && _updatedAt > $syncToken"),
        {
          syncToken: '2023-01-01T00:00:00Z'
        }
      );
    });

    it('should handle initial sync without sync tokens', async () => {
      mockReadSyncTokens.mockResolvedValue({});

      await sanitySync(mockConfig, false);

      // Should query without syncToken filter for initial sync (no && clause)
      expect(mockSanityClient.fetch).toHaveBeenCalledWith(
        '*[_type == $contentTypeId]',
        expect.objectContaining({ contentTypeId: expect.any(String) })
      );
    });

    it('should apply delay for content types without sync tokens', async () => {
      mockReadSyncTokens.mockResolvedValue({});

      await sanitySync(mockConfig, false);

      // Should call delay for each content type index
      expect(mockDelay).toHaveBeenCalledWith(0); // page (index 0)
      expect(mockDelay).toHaveBeenCalledWith(100); // article (index 1)
    });

    it('should store plain Sanity documents (no conversion)', async () => {
      await sanitySync(mockConfig, false);

      // Should write all documents to unified 'documents' directory (entries + assets combined)
      expect(mockWriteItems).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ _id: 'entry1', _type: 'page' }),
          expect.objectContaining({ _id: 'asset1', _type: 'sanity.imageAsset' })
        ]),
        expect.any(String),
        'documents'
      );
    });
  });

  describe('data writing', () => {
    it('should write all content to filesystem', async () => {
      await sanitySync(mockConfig, false);

      const expectedRoot = '/test/content/test-project/production/production';

      // Should write all documents to unified 'documents' directory (entries + assets combined)
      expect(mockWriteItems).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ _id: 'entry1', _type: 'page' }),
          expect.objectContaining({ _id: 'asset1', _type: 'sanity.imageAsset' })
        ]),
        expectedRoot,
        'documents'
      );
    });

    it('should write document IDs by type files', async () => {
      await sanitySync(mockConfig, false);

      expect(mockWriteDocumentIdsByTypeFiles).toHaveBeenCalledWith(
        {
          page: ['entry1'],
          article: ['entry2']
        },
        '/test/content/test-project/production/production'
      );
    });

    it('should write updated sync tokens', async () => {
      const mockDate = '2023-01-03T00:00:00Z';
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

      await sanitySync(mockConfig, false);

      expect(mockWriteSyncTokens).toHaveBeenCalledWith(
        {
          page: mockDate,
          article: mockDate,
          asset: mockDate
        },
        '/test/content/test-project/production/production',
        ''
      );
    });
  });

  describe('path generation', () => {
    it('should update paths for production sync', async () => {
      await sanitySync(mockConfig, false);

      expect(mockUpdateAllPaths).toHaveBeenCalledWith({
        config: mockConfig,
        updateForPreview: false,
        updateForProd: true,
        context: {},
        sites: undefined
      });
    });

    it('should update paths for preview sync', async () => {
      await sanitySync(mockConfig, true);

      expect(mockUpdateAllPaths).toHaveBeenCalledWith({
        config: mockConfig,
        updateForPreview: true,
        updateForProd: false,
        context: {},
        sites: undefined
      });
    });

    it('should pass sites parameter to updateAllPaths', async () => {
      const sites = ['site1', 'site2'];

      await sanitySync(mockConfig, false, sites);

      expect(mockUpdateAllPaths).toHaveBeenCalledWith({
        config: mockConfig,
        updateForPreview: false,
        updateForProd: true,
        context: {},
        sites
      });
    });

    it('should create context with correct config', async () => {
      await sanitySync(mockConfig, false);

      expect(mockCreateContext).toHaveBeenCalledWith({ config: mockConfig });
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      // Reset all mocks to their default behavior for error handling tests
      jest.clearAllMocks();

      // Setup default working mocks for error handling tests
      mockCreateClient.mockReturnValue(mockSanityClient as any);
      mockSimpleTimer.mockImplementation(() => mockTimer as any);
      mockReadSyncTokens.mockResolvedValue(mockSyncTokens);
      mockGroupSanityDocsByTypeAndMapToIds.mockReturnValue({
        page: ['entry1'],
        article: ['entry2']
      });
      mockCreateContext.mockResolvedValue({} as any);
      mockSanityClient.fetch
        .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'page'))
        .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'article'))
        .mockResolvedValueOnce(mockSanityAssets);
    });

    it('should throw error if validation fails', async () => {
      mockValidateArg.mockImplementation((_value, name) => {
        if (name === 'sanity.token') {
          throw new Error('Missing sanity token');
        }
      });

      await expect(sanitySync(mockConfig, false)).rejects.toThrow('Missing sanity token');
    });

    it('should handle Sanity client fetch errors', async () => {
      mockValidateArg.mockImplementation(() => {}); // Ensure validation passes
      mockSanityClient.fetch.mockReset();
      mockSanityClient.fetch.mockRejectedValue(new Error('Sanity API error'));

      await expect(sanitySync(mockConfig, false)).rejects.toThrow('Sanity API error');
    });

    it('should handle file write errors', async () => {
      mockValidateArg.mockImplementation(() => {}); // Ensure validation passes
      mockWriteItems.mockRejectedValue(new Error('File write error'));

      await expect(sanitySync(mockConfig, false)).rejects.toThrow('File write error');
    });

    it('should handle path update errors', async () => {
      mockValidateArg.mockImplementation(() => {}); // Ensure validation passes
      mockWriteItems.mockResolvedValue(undefined); // Reset writeItems to not throw
      mockUpdateAllPaths.mockRejectedValue(new Error('Path update error'));

      await expect(sanitySync(mockConfig, false)).rejects.toThrow('Path update error');
    });
  });

  describe('edge cases', () => {
    beforeEach(() => {
      // Reset all mocks to their default behavior for edge case tests
      jest.clearAllMocks();

      // Ensure validateArg doesn't throw for edge case tests
      mockValidateArg.mockImplementation(() => {});

      // Reset other mocks to their default working state
      mockSanityClient.fetch.mockResolvedValue(mockSanityEntries);
      mockReadSyncTokens.mockResolvedValue({});
      mockWriteItems.mockResolvedValue(undefined);
      mockWriteDocumentIdsByTypeFiles.mockResolvedValue(undefined);
      mockWriteSyncTokens.mockResolvedValue(undefined);
      mockUpdateAllPaths.mockResolvedValue(undefined);
    });

    it('should handle empty documents response', async () => {
      // Create a fresh mock client for this test
      const freshMockClient = {
        fetch: jest
          .fn()
          .mockResolvedValueOnce([]) // page entries
          .mockResolvedValueOnce([]) // article entries
          .mockResolvedValueOnce([]) // assets
      };

      // Clear previous mock calls and setup fresh mocks
      jest.clearAllMocks();

      // Setup fresh mocks for this specific test
      mockCreateClient.mockReturnValue(freshMockClient as any);
      mockSimpleTimer.mockImplementation(() => mockTimer as any);
      mockReadSyncTokens.mockResolvedValue(mockSyncTokens);
      mockGroupSanityDocsByTypeAndMapToIds.mockReturnValue({});
      mockCreateContext.mockResolvedValue({} as any);
      mockValidateArg.mockImplementation(() => {});
      mockWriteItems.mockResolvedValue(undefined);
      mockWriteDocumentIdsByTypeFiles.mockResolvedValue(undefined);
      mockWriteSyncTokens.mockResolvedValue(undefined);
      mockUpdateAllPaths.mockResolvedValue(undefined);

      await sanitySync(mockConfig, false);

      // Check that documents were written with empty array (unified documents directory)
      expect(mockWriteItems).toHaveBeenCalledWith([], expect.any(String), 'documents');
    });

    it('should handle entries with no assets', async () => {
      // Create a fresh mock client for this test
      const freshMockClient = {
        fetch: jest
          .fn()
          .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'page')) // page entries
          .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'article')) // article entries
          .mockResolvedValueOnce([]) // no assets
      };

      // Clear previous mock calls and setup fresh mocks
      jest.clearAllMocks();

      // Setup fresh mocks for this specific test
      mockCreateClient.mockReturnValue(freshMockClient as any);
      mockSimpleTimer.mockImplementation(() => mockTimer as any);
      mockReadSyncTokens.mockResolvedValue(mockSyncTokens);
      mockGroupSanityDocsByTypeAndMapToIds.mockReturnValue({
        page: ['entry1'],
        article: ['entry2']
      });
      mockCreateContext.mockResolvedValue({} as any);
      mockValidateArg.mockImplementation(() => {});
      mockWriteItems.mockResolvedValue(undefined);
      mockWriteDocumentIdsByTypeFiles.mockResolvedValue(undefined);
      mockWriteSyncTokens.mockResolvedValue(undefined);
      mockUpdateAllPaths.mockResolvedValue(undefined);

      await sanitySync(mockConfig, false);

      // Check that documents were written with only entries (no assets)
      expect(mockWriteItems).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ _id: 'entry1', _type: 'page' }),
          expect.objectContaining({ _id: 'entry2', _type: 'article' })
        ]),
        expect.any(String),
        'documents'
      );
    });

    it('should handle document types without documents', async () => {
      mockGroupSanityDocsByTypeAndMapToIds.mockReturnValue({});

      await sanitySync(mockConfig, false);

      expect(mockWriteDocumentIdsByTypeFiles).toHaveBeenCalledWith({}, expect.any(String));
    });

    it('should handle single locale configuration', async () => {
      // Clear and reset all mocks for this test
      jest.clearAllMocks();

      // Setup fresh mocks
      mockCreateClient.mockReturnValue(mockSanityClient as any);
      mockSimpleTimer.mockImplementation(() => mockTimer as any);
      mockReadSyncTokens.mockResolvedValue(mockSyncTokens);
      mockGroupSanityDocsByTypeAndMapToIds.mockReturnValue({
        page: ['entry1'],
        article: ['entry2']
      });
      mockCreateContext.mockResolvedValue({} as any);
      mockValidateArg.mockImplementation(() => {});
      mockWriteItems.mockResolvedValue(undefined);
      mockWriteDocumentIdsByTypeFiles.mockResolvedValue(undefined);
      mockWriteSyncTokens.mockResolvedValue(undefined);
      mockUpdateAllPaths.mockResolvedValue(undefined);

      // Mock fetch responses
      mockSanityClient.fetch
        .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'page'))
        .mockResolvedValueOnce(mockSanityEntries.filter((e) => e._type === 'article'))
        .mockResolvedValueOnce(mockSanityAssets);

      const singleLocaleConfig = new LastRevAppConfig({
        ...mockConfig.config,
        sanity: {
          ...mockConfig.sanity,
          supportedLanguages: [{ id: 'en-US', title: 'English' }]
        }
      });

      await sanitySync(singleLocaleConfig, false);

      // Should store plain Sanity documents regardless of locale configuration
      expect(mockWriteItems).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ _id: 'entry1', _type: 'page' }),
          expect.objectContaining({ _id: 'asset1', _type: 'sanity.imageAsset' })
        ]),
        expect.any(String),
        'documents'
      );
    });

    it('should handle missing sync token for assets', async () => {
      mockReadSyncTokens.mockResolvedValue({ page: '2023-01-01T00:00:00Z' });

      await sanitySync(mockConfig, false);

      // Should query without syncToken filter for assets (no && clause)
      expect(mockSanityClient.fetch).toHaveBeenCalledWith(
        "*[_type in ['sanity.imageAsset', 'sanity.fileAsset']]",
        {}
      );
    });
  });

  describe('performance and timing', () => {
    beforeEach(() => {
      // Reset all mocks to their default behavior for performance tests
      jest.clearAllMocks();

      // Ensure validateArg doesn't throw for performance tests
      mockValidateArg.mockImplementation(() => {});

      // Reset other mocks to their default working state
      mockSanityClient.fetch.mockResolvedValue(mockSanityEntries);
      mockReadSyncTokens.mockResolvedValue({});
      mockWriteItems.mockResolvedValue(undefined);
      mockWriteDocumentIdsByTypeFiles.mockResolvedValue(undefined);
      mockWriteSyncTokens.mockResolvedValue(undefined);
      mockUpdateAllPaths.mockResolvedValue(undefined);
    });

    it('should use timers to track performance', async () => {
      await sanitySync(mockConfig, false);

      // Should create multiple timer instances
      expect(mockSimpleTimer).toHaveBeenCalled();
      expect(mockTimer.end).toHaveBeenCalled();
    });

    it('should log performance metrics', async () => {
      // This test ensures the logging calls are made (already mocked)
      await sanitySync(mockConfig, false);

      // Timer should be called to end timing
      expect(mockTimer.end).toHaveBeenCalled();
    });
  });
});
