import { parseWebhook, WebhookBody, WebhookHeaders } from './index';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';

// Mock logging
jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));

describe('parseWebhook', () => {
  let config: LastRevAppConfig;

  beforeEach(() => {
    config = new LastRevAppConfig(mockAppConfig());
  });

  describe('successful parsing', () => {
    it('should parse Entry create webhook correctly', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.create'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {
          title: { 'en-US': 'Test Title' }
        }
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result).toEqual({
        action: 'update',
        contentStates: ['preview'],
        type: 'Entry',
        env: 'master',
        itemId: 'entry123',
        isTruncated: false
      });
    });

    it('should parse Entry publish webhook correctly', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.publish'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry456',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'production', type: 'Link', linkType: 'Environment' } }
        },
        fields: {
          title: { 'en-US': 'Published Title' }
        }
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result).toEqual({
        action: 'update',
        contentStates: ['production'],
        type: 'Entry',
        env: 'production',
        itemId: 'entry456',
        isTruncated: false
      });
    });

    it('should parse Entry delete webhook correctly', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.delete'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry789',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result).toEqual({
        action: 'delete',
        contentStates: ['preview', 'production'],
        type: 'Entry',
        env: 'master',
        itemId: 'entry789',
        isTruncated: true
      });
    });

    it('should parse Asset webhook correctly', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Asset.publish'
      };

      const body: WebhookBody = {
        sys: {
          id: 'asset123',
          type: 'Asset',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {
          title: { 'en-US': 'Test Asset' },
          file: { 'en-US': { url: 'https://example.com/image.jpg' } }
        }
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result).toEqual({
        action: 'update',
        contentStates: ['production'],
        type: 'Asset',
        env: 'master',
        itemId: 'asset123',
        isTruncated: false
      });
    });

    it('should parse ContentType webhook correctly', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.ContentType.save'
      };

      const body: WebhookBody = {
        sys: {
          id: 'blogPost',
          type: 'ContentType',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: []
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result).toEqual({
        action: 'update',
        contentStates: ['preview'],
        type: 'ContentType',
        env: 'master',
        itemId: 'blogPost',
        isTruncated: true
      });
    });
  });

  describe('action mappings', () => {
    it('should map auto_save to update with preview env', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.auto_save'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {
          title: { 'en-US': 'Auto saved title' }
        }
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result.action).toBe('update');
      expect(result.contentStates).toEqual(['preview']);
    });

    it('should map unarchive to update with preview env', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.unarchive'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {
          title: { 'en-US': 'Unarchived entry' }
        }
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result.action).toBe('update');
      expect(result.contentStates).toEqual(['preview']);
    });

    it('should map unpublish to delete with production env', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.unpublish'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result.action).toBe('delete');
      expect(result.contentStates).toEqual(['production']);
    });

    it('should map archive to delete with both environments', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.archive'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result.action).toBe('delete');
      expect(result.contentStates).toEqual(['preview', 'production']);
    });
  });

  describe('isTruncated detection', () => {
    it('should detect truncated webhook when fields is missing', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.publish'
      };

      const body = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        }
        // fields is missing
      };

      const result = parseWebhook(config, body, headers);

      expect(result.isTruncated).toBe(true);
    });

    it('should detect truncated webhook when fields is empty object', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.publish'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result.isTruncated).toBe(true);
    });

    it('should detect non-truncated webhook when fields has content', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.publish'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {
          title: { 'en-US': 'Test Title' }
        }
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result.isTruncated).toBe(false);
    });
  });

  describe('unsupported actions', () => {
    it('should handle unsupported action gracefully', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.unknown_action'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {
          title: { 'en-US': 'Test Title' }
        }
      } as any;

      const result = parseWebhook(config, body, headers);

      expect(result.action).toBe('unknown_action');
      expect(result.contentStates).toEqual([]);
    });
  });

  describe('error cases', () => {
    it('should throw error for invalid topic header', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'invalid'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      expect(() => parseWebhook(config, body, headers)).toThrow('Invalid topics in x-contentful-topic header.');
    });

    it('should throw error for missing topic header', () => {
      const headers: WebhookHeaders = {};

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      expect(() => parseWebhook(config, body, headers)).toThrow('Invalid topics in x-contentful-topic header.');
    });

    it('should throw error for mismatched space ID', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.publish'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: 'wrong-space-id', type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      expect(() => parseWebhook(config, body, headers)).toThrow('Space id in webhook does not match configuration.');
    });

    it('should throw error for empty type in topic', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement..publish'
      };

      const body: WebhookBody = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: {}
      } as any;

      expect(() => parseWebhook(config, body, headers)).toThrow('No type matched for ContentManagement..publish');
    });
  });

  describe('edge cases', () => {
    it('should handle webhook with null fields', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.publish'
      };

      const body = {
        sys: {
          id: 'entry123',
          type: 'Entry',
          space: { sys: { id: config.contentful.spaceId, type: 'Link', linkType: 'Space' } },
          environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } }
        },
        fields: null
      };

      const result = parseWebhook(config, body, headers);

      expect(result.isTruncated).toBe(true);
    });

    it('should handle webhook with undefined body properties', () => {
      const headers: WebhookHeaders = {
        'x-contentful-topic': 'ContentManagement.Entry.publish'
      };

      const body = {
        sys: undefined,
        fields: {
          title: { 'en-US': 'Test' }
        }
      };

      expect(() => parseWebhook(config, body, headers)).toThrow('Space id in webhook does not match configuration.');
    });
  });
});