import parseWebhook from './index';
import LastRevAppConfig from '@last-rev/app-config';

const getConfig = (overrides = {}) =>
  ({
    sanity: {
      projectId: 'testProject',
      dataset: 'production',
      supportedLanguages: [{ id: 'en-US', title: 'English' }],
      ...overrides
    }
  } as any as LastRevAppConfig);

describe('parseWebhook', () => {
  const baseHeaders = {
    'sanity-dataset': 'production',
    'sanity-project-id': 'testProject',
    'sanity-document-id': 'doc123',
    'sanity-operation': 'update'
  };

  it('parses a published entry (not a draft)', () => {
    const body = { _id: 'doc123', _type: 'article', title: 'Test' };
    const result = parseWebhook(getConfig(), body, baseHeaders);
    expect(result).toMatchObject({
      action: 'update',
      contentStates: ['production'],
      type: 'Entry',
      env: 'production',
      itemId: 'doc123',
      isTruncated: false
    });
  });

  it('parses a draft entry (_id starts with drafts.)', () => {
    const body = { _id: 'drafts.doc123', _type: 'article', title: 'Draft' };
    const result = parseWebhook(getConfig(), body, baseHeaders);
    expect(result).toMatchObject({
      action: 'update',
      contentStates: ['preview'],
      type: 'Entry',
      env: 'production',
      itemId: 'doc123',
      isTruncated: false
    });
  });

  it('parses an asset (image)', () => {
    const body = { _id: 'img123', _type: 'image', url: 'http://img' };
    const result = parseWebhook(getConfig(), body, baseHeaders);
    expect(result.type).toBe('Asset');
  });

  it('throws if project id does not match', () => {
    const body = { _id: 'doc123', _type: 'article' };
    const headers = { ...baseHeaders, 'sanity-project-id': 'wrongProject' };
    expect(() => parseWebhook(getConfig(), body, headers)).toThrow(
      'Project id in webhook does not match configuration.'
    );
  });

  it('sets isTruncated true when _lr_truncated is true in the body', () => {
    const body = { _id: 'drafts.someId', _lr_truncated: true, _type: 'section' };
    const headers = { ...baseHeaders, 'sanity-document-id': 'drafts.someId' };
    const result = parseWebhook(getConfig(), body, headers);
    expect(result).toMatchObject({
      action: 'update',
      contentStates: ['preview'],
      type: 'Entry',
      env: 'production',
      itemId: 'drafts.someId',
      isTruncated: true
    });
  });
});
