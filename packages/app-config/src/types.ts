import { Extensions } from '@last-rev/types';
import { LogLevelDesc } from 'loglevel';

export interface LastRevAppConfiguration {
  cms: 'Contentful';
  strategy: 'fs' | 'redis';
  redis: {
    host: string;
    port: number;
    password?: string;
    tls?: any;
    db?: number;
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
}

export type LastRevAppConfigArgs = {
  cms: 'Contentful';
  strategy: 'fs' | 'redis';
  redis?: {
    host: string;
    port: number;
    password?: string;
    tls?: any;
    db?: number;
  };
  fs?: {
    contentDir: string;
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
};
