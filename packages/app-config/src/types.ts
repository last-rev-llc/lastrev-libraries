import { ApolloContext, Extensions } from '@last-rev/types';
import { ApolloServerOptions, ContextFunction } from '@apollo/server';
import { RedisOptions } from 'ioredis';

export type LastRevStrategy = 'fs' | 'redis' | 'dynamodb';
export type ContentStrategy = 'fs' | 'cms';
export type CmsCacheStrategy = 'redis' | 'dynamodb' | 'none';

export type PathVersion = 'v1' | 'v2';

export interface LastRevAppConfiguration {
  cms: 'Contentful' | 'Sanity';
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
  sanity: {
    projectId: string;
    dataset: string;
    token: string;
    apiVersion: string;
  };
  algolia: {
    applicationId: string;
    adminApiKey: string;
    contentTypeIds: string[];
    indexDraftContent: boolean;
    maxBatchSize: number;
  };
  extensions: Extensions;
  logLevel: string;
  graphql: {
    port: number;
    host: string;
  };
  apolloServerOptions?: LRApolloServerOptions;
  sites: string[];
  paths: {
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
    disableCoreSidekickLookup: boolean;
    disableFederatedSchema: boolean;
    enablePathsV2: boolean;
  };
}

type LRApolloServerOptions = Partial<ApolloServerOptions<ApolloContext>> & {
  context?: ContextFunction<any, ApolloContext>;
};
export type LastRevAppConfigArgs = {
  cms?: 'Contentful' | 'Sanity';
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
  sanity?: {
    projectId?: string;
    dataset?: string;
    token?: string;
    apiVersion?: string;
  };
  algolia?: {
    applicationId?: string;
    adminApiKey?: string;
    contentTypeIds?: string[];
    indexDraftContent?: boolean;
    maxBatchSize?: number;
  };
  extensions?: Extensions;
  logLevel?: string;
  graphql?: {
    port?: number;
    host?: string;
  };
  apolloServerOptions?: LRApolloServerOptions;
  sites?: string[];
  paths?: {
    /*
      @deprecated use features.enablePathsV2 instead
    */
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
    disableFederatedSchema?: boolean;
    enablePathsV2?: boolean;
  };
};
