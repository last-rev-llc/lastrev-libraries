import { Extensions } from '@last-rev/types';
import { LogLevelDesc } from 'loglevel';

export type LastRevStrategy = 'fs' | 'redis' | 'dynamodb';
export interface LastRevAppConfiguration {
  cms: 'Contentful';
  strategy: LastRevStrategy;
  redis: {
    host: string;
    port: number;
    password?: string;
    tls?: any;
    db?: number;
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
  redis?: {
    host?: string;
    port?: number;
    password?: string;
    tls?: any;
    db?: number;
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
