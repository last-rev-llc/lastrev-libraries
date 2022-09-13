import { Extensions } from '@last-rev/types';
import { LogLevelDesc } from 'loglevel';
import { RedisOptions } from 'ioredis';

export type LastRevStrategy = 'fs' | 'redis' | 'dynamodb';
export interface LastRevAppConfiguration {
  cms: 'Contentful';
  strategy: LastRevStrategy;
  redis: RedisOptions & {
    maxBatchSize: number;
    ttlSeconds: number;
  };
  dynamodb: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    tableName: string;
  };
  fs: {
    contentDir: string;
  };
  contentful: {
    contentDeliveryToken: string;
    contentPreviewToken: string;
    spaceId: string;
    env: string;
    usePreview: boolean;
    maxBatchSize: number;
    syncLimit?: number;
  };
  algolia: {
    applicationId: string;
    adminApiKey: string;
    contentTypeIds: string[];
    indexDraftContent: boolean;
  };
  extensions: Extensions;
  logLevel: LogLevelDesc;
  graphql: {
    port: number;
    host: string;
  };
  sites: string[];
  skipReferenceFields: boolean;
}

export type LastRevAppConfigArgs = {
  cms?: 'Contentful';
  strategy?: LastRevStrategy;
  redis?: RedisOptions & {
    maxBatchSize?: number;
    ttlSeconds?: number;
  };
  dynamodb?: {
    region?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    tableName?: string;
  };
  fs?: {
    contentDir?: string;
  };
  contentful?: {
    contentDeliveryToken?: string;
    contentPreviewToken?: string;
    spaceId?: string;
    env?: string;
    usePreview?: boolean;
    maxBatchSize?: number;
    syncLimit?: number;
  };
  algolia?: {
    applicationId?: string;
    adminApiKey?: string;
    contentTypeIds?: string[];
    indexDraftContent?: boolean;
  };
  extensions?: Extensions;
  logLevel?: LogLevelDesc;
  graphql?: {
    port?: number;
    host?: string;
  };
  sites?: string[];
  skipReferenceFields?: boolean;
};
