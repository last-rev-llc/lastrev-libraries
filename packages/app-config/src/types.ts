import { Extensions } from '@last-rev/types';
import { LogLevelDesc } from 'loglevel';
import { RedisOptions } from 'ioredis';

export type LastRevStrategy = 'fs' | 'redis' | 'dynamodb';
export type ContentStrategy = 'fs' | 'cms';
export type CmsCacheStrategy = 'redis' | 'dynamodb' | 'none';

export type PathVersion = 'v1' | 'v2';

export interface LastRevAppConfiguration {
  cms: 'Contentful';
  contentStrategy: ContentStrategy;
  cmsCacheStrategy: CmsCacheStrategy;
  jwtSigningSecret?: string;
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
  paths: {
    version: PathVersion;
    generateFullPathTree: boolean;
  };
  sitemap: {
    domain: string;
    maxPageSize: number;
    indexRootPath: string;
    pagesRootPath: string;
    excludePages: string[];
  };
  features: {
    disableCoreSidekickLookup?: boolean;
  };
}

export type LastRevAppConfigArgs = {
  cms?: 'Contentful';
  /*
    @deprecated use contentStrategy and cmsCacheStrategy instead
  */
  strategy?: LastRevStrategy;
  contentStrategy?: ContentStrategy;
  cmsCacheStrategy?: CmsCacheStrategy;
  jwtSigningSecret?: string;
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
  paths?: {
    version?: PathVersion;
    generateFullPathTree?: boolean;
  };
  sitemap?: {
    domain?: string;
    maxPageSize?: number;
    indexRootPath?: string;
    pagesRootPath?: string;
    excludePages?: string[];
  };
  features?: {
    disableCoreSidekickLookup?: boolean;
  };
};
