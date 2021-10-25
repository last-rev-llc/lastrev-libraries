import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import { createRedisHandlers } from './redisHandlers';
import { createDynamoDbHandlers } from './dynamodbHandlers';

export const createHandlers = (config: LastRevAppConfig): Handlers => {
  switch (config.strategy) {
    case 'redis':
      return createRedisHandlers(config);
    case 'dynamodb':
      return createDynamoDbHandlers(config);
    default:
      throw new Error(`Unknown or unsuported strategy ${config.strategy}`);
  }
};
