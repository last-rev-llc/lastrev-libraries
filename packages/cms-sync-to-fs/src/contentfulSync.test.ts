import contentfulSync from './contentfulSync';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';
import { createClient } from 'contentful';
import { SimpleTimer } from '@last-rev/timer';
import { updateAllPaths } from '@last-rev/cms-path-util';
import { createContext } from '@last-rev/graphql-cms-helpers';
import * as utils from './utils';

// Mock dependencies
jest.mock('contentful');
jest.mock('@last-rev/timer');
jest.mock('@last-rev/cms-path-util');
jest.mock('@last-rev/graphql-cms-helpers');
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  })
}));

// Mock utils
jest.mock('./utils', () => ({
  validateArg: jest.fn(),
  delay: jest.fn(),
  writeItems: jest.fn(),
  writeEntriesByContentTypeFiles: jest.fn(),
  writeSyncTokens: jest.fn(),
  readSyncTokens: jest.fn(),
  groupByContentTypeAndMapToIds: jest.fn()
}));

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;
const mockUpdateAllPaths = updateAllPaths as jest.MockedFunction<typeof updateAllPaths>;
const mockCreateContext = createContext as jest.MockedFunction<typeof createContext>;
const mockTimer = SimpleTimer as jest.MockedClass<typeof SimpleTimer>;

describe('contentfulSync', () => {
  let baseConfig: LastRevAppConfig;
  let mockClient: any;
  let mockTimerInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();

    baseConfig = new LastRevAppConfig(mockAppConfig());

    mockTimerInstance = {
      end: jest.fn().mockReturnValue({ millis: 100 })
    };

    mockTimer.mockImplementation(() => mockTimerInstance);

    // Mock Contentful client
    mockClient = {
      sync: jest.fn(),
      getContentTypes: jest.fn()
    };

    mockCreateClient.mockReturnValue({
      withoutLinkResolution: {
        withAllLocales: mockClient
      }
    } as any);

    // Mock utils functions
    (utils.validateArg as jest.Mock).mockImplementation(() => {});
    (utils.readSyncTokens as jest.Mock).mockResolvedValue({});
    (utils.writeItems as jest.Mock).mockResolvedValue(undefined);
    (utils.writeEntriesByContentTypeFiles as jest.Mock).mockResolvedValue(undefined);
    (utils.writeSyncTokens as jest.Mock).mockResolvedValue(undefined);
    (utils.groupByContentTypeAndMapToIds as jest.Mock).mockReturnValue({});

    mockCreateContext.mockResolvedValue({} as any);
    mockUpdateAllPaths.mockResolvedValue(undefined);
  });

  it('should validate required Contentful configuration', async () => {
    const config = baseConfig.clone({ cms: 'Contentful' });

    mockClient.getContentTypes.mockResolvedValue({ items: [] });
    mockClient.sync.mockResolvedValue({ assets: [], nextSyncToken: 'token' });

    await contentfulSync(config, false);

    expect(utils.validateArg).toHaveBeenCalledWith(
      config.contentful.contentDeliveryToken,
      'contentful.contentDeliveryToken'
    );
    expect(utils.validateArg).toHaveBeenCalledWith(
      config.contentful.contentPreviewToken,
      'contentful.contentPreviewToken'
    );
    expect(utils.validateArg).toHaveBeenCalledWith(config.contentful.spaceId, 'contentful.spaceId');
  });

  it('should create Contentful client with production settings', async () => {
    const config = baseConfig.clone({
      cms: 'Contentful',
      contentful: {
        spaceId: 'test-space',
        env: 'production',
        contentDeliveryToken: 'delivery-token',
        contentPreviewToken: 'preview-token'
      }
    });

    mockClient.getContentTypes.mockResolvedValue({ items: [] });
    mockClient.sync.mockResolvedValue({ assets: [], nextSyncToken: 'token' });

    await contentfulSync(config, false);

    expect(mockCreateClient).toHaveBeenCalledWith({
      accessToken: 'delivery-token',
      space: 'test-space',
      environment: 'production',
      host: 'cdn.contentful.com'
    });
  });

  it('should create Contentful client with preview settings', async () => {
    const config = baseConfig.clone({
      cms: 'Contentful',
      contentful: {
        spaceId: 'test-space',
        env: 'staging',
        contentDeliveryToken: 'delivery-token',
        contentPreviewToken: 'preview-token'
      }
    });

    mockClient.getContentTypes.mockResolvedValue({ items: [] });
    mockClient.sync.mockResolvedValue({ assets: [], nextSyncToken: 'token' });

    await contentfulSync(config, true);

    expect(mockCreateClient).toHaveBeenCalledWith({
      accessToken: 'preview-token',
      space: 'test-space',
      environment: 'staging',
      host: 'preview.contentful.com'
    });
  });

  it('should fetch content types and sync data', async () => {
    const config = baseConfig.clone({ cms: 'Contentful' });
    const mockContentTypes = [{ sys: { id: 'blog' } }, { sys: { id: 'page' } }];

    mockClient.getContentTypes.mockResolvedValue({ items: mockContentTypes });
    mockClient.sync.mockImplementation((params: any) => {
      if (params.content_type === 'blog') {
        return Promise.resolve({ entries: [{ sys: { id: 'entry1' } }], assets: [], nextSyncToken: 'token1' });
      } else if (params.content_type === 'page') {
        return Promise.resolve({ entries: [{ sys: { id: 'entry2' } }], assets: [], nextSyncToken: 'token2' });
      } else if (params.type === 'Asset') {
        return Promise.resolve({ entries: [], assets: [{ sys: { id: 'asset1' } }], nextSyncToken: 'asset-token' });
      }
      return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'default' });
    });

    await contentfulSync(config, false);

    expect(mockClient.getContentTypes).toHaveBeenCalled();
    expect(mockClient.sync).toHaveBeenCalledTimes(3); // 2 content types + 1 assets
  });

  it('should write content files to filesystem', async () => {
    const config = baseConfig.clone({
      cms: 'Contentful',
      fs: { contentDir: '/test/content' },
      contentful: { spaceId: 'test-space', env: 'master' }
    });

    const mockEntries = [{ sys: { id: 'entry1' } }];
    const mockAssets = [{ sys: { id: 'asset1' } }];
    const mockContentTypes = [{ sys: { id: 'blog' } }];

    mockClient.getContentTypes.mockResolvedValue({ items: mockContentTypes });
    mockClient.sync.mockImplementation((params: any) => {
      if (params.content_type === 'blog') {
        return Promise.resolve({ entries: mockEntries, assets: [], nextSyncToken: 'token1' });
      } else if (params.type === 'Asset') {
        return Promise.resolve({ entries: [], assets: mockAssets, nextSyncToken: 'asset-token' });
      }
      return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'default' });
    });

    await contentfulSync(config, false);

    const expectedRoot = '/test/content/test-space/master/production';

    expect(utils.writeItems).toHaveBeenCalledWith(mockEntries, expectedRoot, 'entries');
    expect(utils.writeItems).toHaveBeenCalledWith(mockAssets, expectedRoot, 'assets');
    expect(utils.writeItems).toHaveBeenCalledWith(mockContentTypes, expectedRoot, 'content_types');
  });

  it('should handle preview mode directory structure', async () => {
    const config = baseConfig.clone({
      cms: 'Contentful',
      fs: { contentDir: '/test/content' },
      contentful: { spaceId: 'test-space', env: 'staging' }
    });

    mockClient.getContentTypes.mockResolvedValue({ items: [] });
    mockClient.sync.mockResolvedValue({ assets: [], nextSyncToken: 'token' });

    await contentfulSync(config, true);

    const expectedRoot = '/test/content/test-space/staging/preview';
    expect(utils.writeItems).toHaveBeenCalledWith([], expectedRoot, 'entries');
  });

  it('should update paths after syncing content', async () => {
    const config = baseConfig.clone({ cms: 'Contentful' });
    const mockContext = { config } as any;
    const sites = ['site1', 'site2'];

    mockClient.getContentTypes.mockResolvedValue({ items: [] });
    mockClient.sync.mockResolvedValue({ assets: [], nextSyncToken: 'token' });
    mockCreateContext.mockResolvedValue(mockContext);

    await contentfulSync(config, false, sites);

    expect(mockCreateContext).toHaveBeenCalledWith({ config });
    expect(mockUpdateAllPaths).toHaveBeenCalledWith({
      config,
      updateForPreview: false,
      updateForProd: true,
      context: mockContext,
      sites
    });
  });

  it('should update paths for preview mode', async () => {
    const config = baseConfig.clone({ cms: 'Contentful' });

    mockClient.getContentTypes.mockResolvedValue({ items: [] });
    mockClient.sync.mockResolvedValue({ assets: [], nextSyncToken: 'token' });

    await contentfulSync(config, true);

    expect(mockUpdateAllPaths).toHaveBeenCalledWith(
      expect.objectContaining({
        updateForPreview: true,
        updateForProd: false
      })
    );
  });

  it('should handle sync with existing sync tokens', async () => {
    const config = baseConfig.clone({ cms: 'Contentful' });
    const existingSyncTokens = {
      blog: 'existing-blog-token',
      asset: 'existing-asset-token'
    };

    (utils.readSyncTokens as jest.Mock).mockResolvedValue(existingSyncTokens);
    mockClient.getContentTypes.mockResolvedValue({
      items: [{ sys: { id: 'blog' } }]
    });
    mockClient.sync.mockImplementation((params: any) => {
      if (params.content_type === 'blog') {
        return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'new-blog-token' });
      } else if (params.type === 'Asset') {
        return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'new-asset-token' });
      }
      return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'default' });
    });

    await contentfulSync(config, false);

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        content_type: 'blog',
        nextSyncToken: 'existing-blog-token'
      })
    );
    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Asset',
        nextSyncToken: 'existing-asset-token'
      })
    );
  });

  it('should save new sync tokens', async () => {
    const config = baseConfig.clone({
      cms: 'Contentful',
      fs: { contentDir: '/test' },
      contentful: { spaceId: 'space', env: 'env' }
    });

    mockClient.getContentTypes.mockResolvedValue({
      items: [{ sys: { id: 'blog' } }]
    });
    mockClient.sync.mockImplementation((params: any) => {
      if (params.content_type === 'blog') {
        return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'new-blog-token' });
      } else if (params.type === 'Asset') {
        return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'new-asset-token' });
      }
      return Promise.resolve({ entries: [], assets: [], nextSyncToken: 'default' });
    });

    await contentfulSync(config, false);

    const expectedTokens = {
      blog: 'new-blog-token',
      asset: 'new-asset-token'
    };

    expect(utils.writeSyncTokens).toHaveBeenCalledWith(expectedTokens, '/test/space/env/production', '');
  });
});
