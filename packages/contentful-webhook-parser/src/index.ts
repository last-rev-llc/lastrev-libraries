import { Entry, Asset, ContentType } from 'contentful';
import LastRevAppConfig from '@last-rev/app-config';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'contentful-webhook-parser',
  module: 'index'
});

type HasEnv = {
  sys: {
    environment: {
      sys: {
        id: string;
        type: 'Link';
        linkType: 'Environment';
      };
    };
  };
};

type ActionMappings = {
  [contentfulAction: string]: {
    action: 'update' | 'delete';
    envs: ('preview' | 'production')[];
  };
};

const actionMappings: ActionMappings = {
  create: { action: 'update', envs: ['preview'] },
  auto_save: { action: 'update', envs: ['preview'] },
  unarchive: { action: 'update', envs: ['preview'] },
  publish: { action: 'update', envs: ['production'] },
  save: { action: 'update', envs: ['preview'] },
  unpublish: { action: 'delete', envs: ['production'] },
  delete: { action: 'delete', envs: ['preview', 'production'] },
  archive: { action: 'delete', envs: ['preview', 'production'] }
};

export type WebhookBody = (Entry<any> | Asset | ContentType) & HasEnv;
export type WebhookHeaders = Record<string, string>;
export type WebhookParserResult = {
  action: 'update' | 'delete';
  contentStates: ('preview' | 'production')[];
  type: 'Entry' | 'Asset' | 'ContentType';
  env: string;
  itemId: string;
  isTruncated: boolean;
};

export const supportedTypes = ['Entry', 'Asset', 'ContentType'];
export const supportedActions = ['update', 'delete'];

const parseWebhook = (config: LastRevAppConfig, body: any, headers: WebhookHeaders): WebhookParserResult => {
  const topics = headers['x-contentful-topic']?.split('.');

  if (!topics || topics.length < 3) {
    throw Error('Invalid topics in x-contentful-topic header.');
  }

  const spaceId = body?.sys?.space?.sys?.id;
  const environmentId = body?.sys?.environment?.sys?.id;
  // body.fields is an object and is not an empty object
  const isTruncated = !body.fields || Object.keys(body.fields).length === 0;
  const itemId = body?.sys?.id;

  if (spaceId !== config.contentful.spaceId) {
    throw Error('Space id in webhook does not match configuration.');
  }

  const type = topics[1] as 'Entry' | 'Asset' | 'ContentType';

  if (!type) throw Error(`No type matched for ${headers['x-contentful-topic']}`);

  if (!supportedTypes.includes(type)) logger.debug(`Unsupported type! ${type}`, { caller: 'parseWebhook' });

  const contentfulAction: string = topics[2];

  if (!actionMappings[contentfulAction])
    logger.debug(`Unsupported action! ${contentfulAction}`, { caller: 'parseWebhook' });

  return {
    action: actionMappings[contentfulAction]?.action || contentfulAction,
    contentStates: actionMappings[contentfulAction]?.envs || [],
    type,
    env: environmentId,
    itemId,
    isTruncated
  };
};

export default parseWebhook;
