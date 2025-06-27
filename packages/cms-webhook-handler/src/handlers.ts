import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import { createRedisHandlers } from './redisHandlers';
import { createDynamoDbHandlers } from './dynamodbHandlers';

export const createHandlers = (config: LastRevAppConfig): Handlers => {
  switch (config.cmsCacheStrategy) {
    case 'redis':
      return createRedisHandlers(config);
    case 'dynamodb':
      return createDynamoDbHandlers(config);
    case 'none':
      throw new Error('cmsCacheStrategy "none" does not need a webhook handler');
    default:
      throw new Error(`Unknown or unsuported cmsCacheStrategy ${config.cmsCacheStrategy}`);
  }
};
