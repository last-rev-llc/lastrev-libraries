import { handleWebhook, supportedTypes, supportedActions } from './index';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';
import { parseWebhook as parseContentfulWebhook } from '@last-rev/contentful-webhook-parser';
import parseSanityWebhook from '@last-rev/sanity-webhook-parser';
import { createHandlers } from './handlers';
import jwt from 'jsonwebtoken';
import { convertSanityDoc } from '@last-rev/sanity-mapper';

// Mock external dependencies
jest.mock('@last-rev/contentful-webhook-parser');
jest.mock('@last-rev/sanity-webhook-parser');
jest.mock('./handlers');
jest.mock('jsonwebtoken');
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    error: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));
jest.mock('contentful', () => ({
  createClient: jest.fn(() => ({
    withoutLinkResolution: {
      withAllLocales: {
        getEntry: jest.fn(),
        getAsset: jest.fn(),
        getContentTypes: jest.fn()
      }
    }
  }))
}));
jest.mock('@sanity/client', () => ({
  createClient: jest.fn()
}));

const mockParseContentfulWebhook = parseContentfulWebhook as jest.MockedFunction<typeof parseContentfulWebhook>;
const mockParseSanityWebhook = parseSanityWebhook as jest.MockedFunction<typeof parseSanityWebhook>;
const mockCreateHandlers = createHandlers as jest.MockedFunction<typeof createHandlers>;
const mockJwtVerify = jwt.verify as jest.MockedFunction<any>;

describe('cms-webhook-handler', () => {
  let mockHandlers: any;
  let baseConfig: LastRevAppConfig;

  beforeEach(() => {
    jest.clearAllMocks();

    mockHandlers = {
      asset: jest.fn().mockResolvedValue(undefined),
      entry: jest.fn().mockResolvedValue(undefined),
      contentType: jest.fn().mockResolvedValue(undefined),
      paths: jest.fn().mockResolvedValue(undefined)
    };

    mockCreateHandlers.mockReturnValue(mockHandlers);

    // Create a base config using the mock
    baseConfig = new LastRevAppConfig(mockAppConfig());
  });

  describe('constants', () => {
    it('should export correct supported types', () => {
      expect(supportedTypes).toEqual(['Entry', 'Asset', 'ContentType']);
    });

    it('should export correct supported actions', () => {
      expect(supportedActions).toEqual(['update', 'delete']);
    });
  });

  describe('handleWebhook', () => {
    const mockBody = { sys: { id: 'test-id' } };
    const mockHeaders = { 'content-type': 'application/json' };

    describe('Contentful webhooks', () => {
      it('should handle valid Contentful webhook for Entry update', async () => {
        const config = baseConfig.clone({ cms: 'Contentful' });
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'master',
          itemId: 'test-entry-id',
          isTruncated: false
        };

        mockParseContentfulWebhook.mockReturnValue(webhookResult);

        await handleWebhook(config, mockBody, mockHeaders);

        expect(mockParseContentfulWebhook).toHaveBeenCalledWith(config, mockBody, mockHeaders);
        expect(mockCreateHandlers).toHaveBeenCalledWith(config);
        expect(mockHandlers.entry).toHaveBeenCalledWith({
          isPreview: false,
          action: 'update',
          data: mockBody
        });
        expect(mockHandlers.paths).toHaveBeenCalledWith(false, true);
      });

      it('should handle Asset delete action', async () => {
        const config = baseConfig.clone({ cms: 'Contentful' });
        const webhookResult = {
          type: 'Asset' as const,
          action: 'delete' as const,
          contentStates: ['preview' as const],
          env: 'master',
          itemId: 'test-asset-id',
          isTruncated: false
        };

        mockParseContentfulWebhook.mockReturnValue(webhookResult);

        await handleWebhook(config, mockBody, mockHeaders);

        expect(mockHandlers.asset).toHaveBeenCalledWith({
          isPreview: true,
          action: 'delete',
          data: mockBody
        });
        expect(mockHandlers.paths).toHaveBeenCalledWith(true, false);
      });

      it('should handle ContentType updates', async () => {
        const config = baseConfig.clone({ cms: 'Contentful' });
        const webhookResult = {
          type: 'ContentType' as const,
          action: 'update' as const,
          contentStates: ['production' as const, 'preview' as const],
          env: 'master',
          itemId: 'test-content-type-id',
          isTruncated: false
        };

        mockParseContentfulWebhook.mockReturnValue(webhookResult);

        await handleWebhook(config, mockBody, mockHeaders);

        expect(mockHandlers.contentType).toHaveBeenCalledTimes(2);
        expect(mockHandlers.paths).toHaveBeenCalledWith(true, true);
      });

      it('should clone config when environment differs', async () => {
        const config = baseConfig.clone({ cms: 'Contentful' });
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'staging',
          itemId: 'test-entry-id',
          isTruncated: false
        };

        const configSpy = jest.spyOn(config, 'clone');
        mockParseContentfulWebhook.mockReturnValue(webhookResult);

        await handleWebhook(config, mockBody, mockHeaders);

        expect(configSpy).toHaveBeenCalledWith({ contentful: { env: 'staging' } });
      });
    });

    describe('Sanity webhooks', () => {
      it('should handle valid Sanity webhook', async () => {
        const config = baseConfig.clone({ cms: 'Sanity' });
        const sanityMockBody = {
          _id: 'test-sanity-id',
          _type: 'page',
          _updatedAt: '2023-01-01T00:00:00Z',
          _createdAt: '2023-01-01T00:00:00Z',
          title: 'Test Page'
        };
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'production',
          itemId: 'test-sanity-id',
          isTruncated: false
        };

        mockParseSanityWebhook.mockReturnValue(webhookResult);

        await handleWebhook(config, sanityMockBody, mockHeaders);

        const expectedConvertedData = convertSanityDoc(
          sanityMockBody,
          config.sanity.supportedLanguages[0].id,
          config.sanity.supportedLanguages.map((l) => l.id)
        );

        expect(mockParseSanityWebhook).toHaveBeenCalledWith(config, sanityMockBody, mockHeaders);
        expect(mockHandlers.entry).toHaveBeenCalledWith({
          isPreview: false,
          action: 'update',
          data: expectedConvertedData
        });
      });

      it('should clone config when dataset differs', async () => {
        const config = baseConfig.clone({ cms: 'Sanity' });
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'staging',
          itemId: 'test-sanity-id',
          isTruncated: false
        };

        const configSpy = jest.spyOn(config, 'clone');
        mockParseSanityWebhook.mockReturnValue(webhookResult);

        await handleWebhook(config, mockBody, mockHeaders);

        expect(configSpy).toHaveBeenCalledWith({ sanity: { dataset: 'staging' } });
      });
    });

    describe('JWT authentication', () => {
      it('should verify JWT token when signing secret is provided', async () => {
        const config = baseConfig.clone({
          cms: 'Contentful',
          jwtSigningSecret: 'test-secret'
        });
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'master',
          itemId: 'test-entry-id',
          isTruncated: false
        };

        const headersWithAuth = {
          ...mockHeaders,
          authorization: 'Bearer valid-token'
        };

        mockParseContentfulWebhook.mockReturnValue(webhookResult);
        mockJwtVerify.mockResolvedValue({ spaceId: config.contentful.spaceId });

        await handleWebhook(config, mockBody, headersWithAuth);

        expect(mockJwtVerify).toHaveBeenCalledWith('valid-token', 'test-secret');
        expect(mockHandlers.entry).toHaveBeenCalled();
      });

      it('should throw error when no authorization token provided', async () => {
        const config = baseConfig.clone({
          cms: 'Contentful',
          jwtSigningSecret: 'test-secret'
        });
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'master',
          itemId: 'test-entry-id',
          isTruncated: false
        };

        mockParseContentfulWebhook.mockReturnValue(webhookResult);

        await expect(handleWebhook(config, mockBody, mockHeaders)).rejects.toThrow('No authorization token provided.');
      });

      it('should throw error when JWT spaceId does not match config', async () => {
        const config = baseConfig.clone({
          cms: 'Contentful',
          jwtSigningSecret: 'test-secret'
        });
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'master',
          itemId: 'test-entry-id',
          isTruncated: false
        };

        const headersWithAuth = {
          ...mockHeaders,
          authorization: 'Bearer invalid-token'
        };

        mockParseContentfulWebhook.mockReturnValue(webhookResult);
        mockJwtVerify.mockResolvedValue({ spaceId: 'wrong-space-id' });

        await expect(handleWebhook(config, mockBody, headersWithAuth)).rejects.toThrow('Invalid spaceId in JWT Token');
      });
    });

    describe('error handling', () => {
      it('should return early when webhook parser returns undefined', async () => {
        const config = baseConfig.clone({ cms: 'Contentful' });
        mockParseContentfulWebhook.mockReturnValue(undefined as any);

        await handleWebhook(config, mockBody, mockHeaders);

        expect(mockCreateHandlers).not.toHaveBeenCalled();
        expect(mockHandlers.entry).not.toHaveBeenCalled();
      });

      it('should propagate handler errors', async () => {
        const config = baseConfig.clone({ cms: 'Contentful' });
        const webhookResult = {
          type: 'Entry' as const,
          action: 'update' as const,
          contentStates: ['production' as const],
          env: 'master',
          itemId: 'test-entry-id',
          isTruncated: false
        };

        mockParseContentfulWebhook.mockReturnValue(webhookResult);
        mockHandlers.entry.mockRejectedValue(new Error('Handler failed'));

        await expect(handleWebhook(config, mockBody, mockHeaders)).rejects.toThrow('Handler failed');
      });
    });
  });
});
