import { Entry, Asset, ContentType } from 'contentful';
import { map } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';
import { ProcessCommand } from './types';
import { createHandlers } from './handlers';
import parseWebhook from '@last-rev/contentful-webhook-parser';
import logger from 'loglevel';

const handleWebhook = async (config: LastRevAppConfig, body: any, headers: Record<string, string>) => {
  logger.setLevel(config.logLevel);
  const eventAction = parseWebhook(config, body, headers);
  const handlers = createHandlers(config);

  await Promise.all(
    map(eventAction.envs, async (env) => {
      try {
        const command = {
          isPreview: env === 'preview',
          action: eventAction.action,
          data: body
        };
        switch (eventAction.type) {
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
            throw Error(`unsupported type! ${eventAction.type}`);
        }
      } catch (err) {
        logger.error('Error handling webhook', err);
        throw err;
      }
    })
  );

  await handlers.paths(eventAction.envs.includes('preview'), eventAction.envs.includes('production'));
};

export default handleWebhook;
