import { LastRevAppConfigArgs } from './types';

const redis = () => ({
  host: 'host',
  port: 2,
  password: 'password',
  tls: {},
  db: 1,
  username: 'username',
  maxBatchSize: 500
});

const dynamodb = () => ({
  region: 'region',
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  tableName: 'tableName'
});

const fs = () => ({
  contentDir: 'contentDir'
});

const contentful = () => ({
  spaceId: 'spaceId',
  contentDeliveryToken: 'contentDeliveryToken',
  contentPreviewToken: 'contentPreviewToken',
  maxBatchSize: 500
});

export const redisConfig = (): LastRevAppConfigArgs => ({
  redis: { ...redis() }
});

export default (): LastRevAppConfigArgs => ({
  redis: { ...redis() },
  dynamodb: { ...dynamodb() },
  fs: { ...fs() },
  contentful: { ...contentful() },
  extensions: {
    typeDefs: 'typeDefs',
    resolvers: {},
    mappers: {},
    typeMappings: {},
    pathsConfigs: {}
  },
  skipReferenceFields: false
});
