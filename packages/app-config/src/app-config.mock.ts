import { LastRevAppConfigArgs } from './types';

const redis = () => ({
  host: 'host',
  port: 2,
  password: 'password',
  tls: {},
  db: 1,
  username: 'username',
  maxBatchSize: 500,
  ttlSeconds: 2992000
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

const sanity = () => ({
  projectId: 'projectId',
  dataset: 'dataset',
  token: 'token',
  apiVersion: '2021-06-07',
  schemaTypes: [
    { name: 'page', type: 'document' },
    { name: 'blog', type: 'document' }
  ],
  supportedLanguages: [
    { id: 'en', title: 'English' },
    { id: 'es', title: 'Spanish' },
    { id: 'fr', title: 'French' }
  ]
});

export const redisConfig = (): LastRevAppConfigArgs => ({
  redis: { ...redis() }
});

export const sanityConfig = (): LastRevAppConfigArgs => ({
  sanity: { ...sanity() }
});

export default (): LastRevAppConfigArgs => ({
  redis: { ...redis() },
  dynamodb: { ...dynamodb() },
  fs: { ...fs() },
  contentful: { ...contentful() },
  sanity: { ...sanity() },
  extensions: {
    typeDefs: 'typeDefs',
    resolvers: {},
    mappers: {},
    typeMappings: {},
    pathsConfigs: {}
  },
  paths: {},
  features: {}
});
