import { Entry, Asset, ContentType } from 'contentful';
import { map } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';
import { ProcessCommand } from './types';
import { createHandlers } from './handlers';

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

const handleWebhook = async (config: LastRevAppConfig, body: any, headers: WebhookHeaders) => {
  const handlers = createHandlers(config);
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
  const eventAction = actionMappings[contentfulAction];

  await Promise.all(
    map(eventAction.envs, async (env) => {
      try {
        const command = {
          isPreview: env === 'preview',
          action: eventAction.action,
          data: body
        };
        switch (type) {
          case 'Asset':
            await handlers.asset(command as ProcessCommand<Asset>);
            break;
          case 'Entry':
            await handlers.entry(command as ProcessCommand<Entry<any>>);
            break;
          case 'ContentType':
            await handlers.contentType(command as ProcessCommand<ContentType>);
            break;
          default:
            throw Error(`unsupported type! ${type}`);
        }
      } catch (err) {
        console.log('Error handling webhook', err);
        throw err;
      }
    })
  );

  await handlers.paths(eventAction.envs.includes('preview'), eventAction.envs.includes('production'));
};

export default handleWebhook;
