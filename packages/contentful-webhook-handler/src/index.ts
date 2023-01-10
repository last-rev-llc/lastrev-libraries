import { Entry, Asset, ContentType } from 'contentful';
import { map } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';
import { ProcessCommand } from './types';
import { createHandlers } from './handlers';
import parseWebhook from '@last-rev/contentful-webhook-parser';
import { getWinstonLogger } from '@last-rev/logging';
import jwt from 'jsonwebtoken';

const logger = getWinstonLogger({
  package: 'contentful-webhook-handler',
  module: 'index'
});

const handleWebhook = async (config: LastRevAppConfig, body: any, headers: Record<string, string>) => {
  const token = headers['authorization']?.split(' ')[1];

  const { type, action, envs } = parseWebhook(config, body, headers);
  const handlers = createHandlers(config);

  // if signing secret is provided, decode the token and verify it
  if (config.jwtSigningSecret) {
    try {
      if (!token) throw Error('No authorization token provided.');
      const decoded = (await jwt.verify(token, config.jwtSigningSecret)) as jwt.JwtPayload;
      if (decoded?.spaceId !== config.contentful.spaceId) {
        throw new Error('Invalid spaceId in JWT Token');
      }
    } catch (e: any) {
      logger.error(e.message, {
        caller: 'handleWebhook',
        stack: e.stack
      });
      throw e;
    }
  }

  await Promise.all(
    map(envs, async (env) => {
      try {
        const command = {
          isPreview: env === 'preview',
          action: action,
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
            throw Error(`Unsupported type! ${type}`);
        }
      } catch (err: any) {
        logger.error(`Error handling webhook: ${err.message}`, {
          caller: 'handleWebhook',
          stack: err.stack
        });
        throw err;
      }
    })
  );

  await handlers.paths(envs.includes('preview'), envs.includes('production'));
};

export default handleWebhook;
