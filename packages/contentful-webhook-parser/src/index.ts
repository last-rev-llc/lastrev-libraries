import { Entry, Asset, ContentType } from 'contentful';
import LastRevAppConfig from '@last-rev/app-config';

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

const parseWebhook = (config: LastRevAppConfig, body: any, headers: WebhookHeaders) => {
  const topics = headers['x-contentful-topic']?.split('.');

  if (!topics || topics.length < 3) {
    throw Error('Invalid topics in x-contentful-topic header.');
  }

  const spaceId = body.sys.space?.sys.id;
  const environmentId = body.sys?.environment.sys.id;

  if (spaceId !== config.contentful.spaceId) {
    throw Error('Space id in webhook does not match configuration.');
  }

  if (environmentId !== config.contentful.env) {
    throw Error('Environment in webhook does not match configuration.');
  }

  const type = topics[1];

  if (!type) throw Error(`No type matched for ${headers['x-contentful-topic']}`);

  const contentfulAction: string = topics[2];

  return {
    ...actionMappings[contentfulAction],
    type
  };
};

export default parseWebhook;