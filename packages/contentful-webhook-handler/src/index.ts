import { Entry, Asset, ContentType } from 'contentful';
import { map } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';
import { ProcessCommand } from './types';
import { createHandlers } from './handlers';
import parseWebhook from '@last-rev/contentful-webhook-parser';
import logger from 'loglevel';
import jwt from 'jsonwebtoken';

const handleWebhook = async (config: LastRevAppConfig, body: any, headers: Record<string, string>) => {
  logger.setLevel(config.logLevel);
  const token = headers['authorization']?.split(' ')[1];

  const { type, action, envs } = parseWebhook(config, body, headers);
  const handlers = createHandlers(config);

  // if signing secret is provided, decode the token and verify it
  if (config.jwtSigningSecret) {
    if (!token) throw Error('No authorization token provided.');
    try {
      const decoded = (await jwt.verify(token, config.jwtSigningSecret)) as jwt.JwtPayload;
      if (decoded?.spaceId !== config.contentful.spaceId) {
        throw new Error('Invalid spaceId in JWT Token');
      }
    } catch (e) {
      logger.error('Invalid JWT token');
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
            throw Error(`unsupported tpe! ${type}`);
        }
      } catch (err) {
        logger.error('Error handling webhook', err);
        throw err;
      }
    })
  );

  await handlers.paths(envs.includes('preview'), envs.includes('production'));
};

export default handleWebhook;
