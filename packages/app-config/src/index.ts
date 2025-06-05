import { LastRevAppConfigArgs, LastRevAppConfiguration } from './types';
import { merge, isNil } from 'lodash';
import { RedisOptions } from 'ioredis';

const defaultConfig: LastRevAppConfigArgs = {
  cms: 'Contentful',
  strategy: 'fs',
  contentful: {
    env: 'master',
    usePreview: false
  },
  logLevel: 'warn',
  graphql: {
    port: 5000,
    host: 'localhost'
  },
  apolloServerOptions: {},
  sites: [],
  features: {}
};

export default class LastRevAppConfig implements LastRevAppConfiguration {
  config: LastRevAppConfigArgs;

  constructor(config: LastRevAppConfigArgs) {
    this.config = merge({}, defaultConfig, config);
    this.validateCmsVars();
    this.validateStrategy();
    this.validatePaths();
  }

  validateCmsVars() {
    if (this.config.cms === 'Contentful') {
      if (!this.config.contentful?.spaceId) {
        throw new Error('Contentful CMS: contentful.spaceId is required.');
      }
      if (!this.config.contentful?.contentDeliveryToken) {
        throw new Error('Contentful CMS: contentful.contentDeliveryToken is required.');
      }
      if (!this.config.contentful?.contentPreviewToken) {
        throw new Error('Contentful CMS: contentful.contentPreviewToken is required.');
      }
    } else if (this.config.cms === 'Sanity') {
      if (!this.config.sanity?.projectId) {
        throw new Error('Sanity CMS: sanity.projectId is required.');
      }
      if (!this.config.sanity?.dataset) {
        throw new Error('Sanity CMS: sanity.dataset is required.');
      }
      if (!this.config.sanity?.token) {
        throw new Error('Sanity CMS: sanity.token is required.');
      }
      if (!this.config.sanity?.apiVersion) {
        throw new Error('Sanity CMS: sanity.apiVersion is required.');
      }
      if (!this.config.sanity?.schemaTypes) {
        throw new Error('Sanity CMS: sanity.schemaTypes is required.');
      }
      if (!this.config.sanity?.supportedLanguages) {
        throw new Error('Sanity CMS: sanity.supportedLanguages is required.');
      }
    } else {
      throw new Error(`Invalid CMS: ${this.config.cms}`);
    }
  }

  validateStrategy() {
    if (this.config.contentStrategy) {
      if (this.config.contentStrategy === 'fs') {
        if (!this.config.fs?.contentDir) {
          throw new Error(`FS strategy: fs.contentDir is required`);
        }
      } else if (this.config.contentStrategy === 'cms') {
        if (this.config.cmsCacheStrategy === 'redis') {
          if (!this.config.redis?.host) {
            throw new Error(`Redis strategy: redis.host is required`);
          }
          if (!this.config.redis?.port) {
            throw new Error(`Redis strategy: redis.port is required`);
          }
        } else if (this.config.cmsCacheStrategy === 'dynamodb') {
          if (!this.config.dynamodb?.region) {
            throw new Error(`DynamoDB strategy: dynamodb.region is required`);
          }
          if (!this.config.dynamodb?.accessKeyId) {
            throw new Error(`DynamoDB strategy: dynamodb.accessKeyId is required`);
          }
          if (!this.config.dynamodb?.secretAccessKey) {
            throw new Error(`DynamoDB strategy: dynamodb.secretAccessKey is required`);
          }
          if (!this.config.dynamodb?.tableName) {
            throw new Error(`DynamoDB strategy: dynamodb.tableName is required`);
          }
        }
      } else {
        throw new Error(`Invalid contentStrategy: ${this.config.contentStrategy}`);
      }
    } else if (this.config.strategy) {
      if (this.config.strategy === 'fs') {
        if (!this.config.fs?.contentDir) {
          throw new Error(`FS strategy: fs.contentDir is required`);
        }
      } else if (this.config.strategy === 'redis') {
        if (!this.config.redis?.host) {
          throw new Error(`Redis strategy: redis.host is required`);
        }
        if (!this.config.redis?.port) {
          throw new Error(`Redis strategy: redis.port is required`);
        }
      } else if (this.config.strategy === 'dynamodb') {
        if (!this.config.dynamodb?.region) {
          throw new Error(`DynamoDB strategy: dynamodb.region is required`);
        }
        if (!this.config.dynamodb?.accessKeyId) {
          throw new Error(`DynamoDB strategy: dynamodb.accessKeyId is required`);
        }
        if (!this.config.dynamodb?.secretAccessKey) {
          throw new Error(`DynamoDB strategy: dynamodb.secretAccessKey is required`);
        }
        if (!this.config.dynamodb?.tableName) {
          throw new Error(`DynamoDB strategy: dynamodb.tableName is required`);
        }
      } else {
        throw new Error(`Invalid strategy: ${this.config.strategy}`);
      }
    } else {
      throw new Error(`Must specify a content stratgy`);
    }
  }

  validatePaths() {
    if (this.config.paths?.version !== 'v2' && this.config.paths?.generateFullPathTree === false) {
      throw new Error(`Invalid paths configuration: generateFullPathTree must be true when using paths v1`);
    }
  }

  clone(newConfig: LastRevAppConfigArgs) {
    return new LastRevAppConfig(merge({}, this.config, newConfig));
  }

  get jwtSigningSecret() {
    return this.config.jwtSigningSecret;
  }

  get contentful() {
    return {
      spaceId: this.config.contentful?.spaceId!,
      contentDeliveryToken: this.config.contentful?.contentDeliveryToken!,
      contentPreviewToken: this.config.contentful?.contentPreviewToken!,
      env: this.config.contentful?.env!,
      usePreview: !!this.config.contentful?.usePreview,
      maxBatchSize: this.config.contentful?.maxBatchSize || 1000,
      syncLimit: this.config.contentful?.syncLimit
    };
  }

  get sanity() {
    return {
      projectId: this.config.sanity?.projectId!,
      dataset: this.config.sanity?.dataset!,
      token: this.config.sanity?.token!,
      apiVersion: this.config.sanity?.apiVersion!,
      usePreview: !!this.config.sanity?.usePreview,
      schemaTypes: this.config.sanity?.schemaTypes!,
      supportedLanguages: this.config.sanity?.supportedLanguages!
    };
  }

  get algolia() {
    return {
      applicationId: this.config.algolia?.applicationId!,
      adminApiKey: this.config.algolia?.adminApiKey!,
      contentTypeIds: this.config.algolia?.contentTypeIds!,
      indexDraftContent: !!this.config.algolia?.indexDraftContent,
      maxBatchSize: this.config.algolia?.maxBatchSize || 1000
    };
  }

  get logLevel() {
    return this.config.logLevel || 'warn';
  }

  get cms() {
    return this.config.cms!;
  }

  get contentStrategy() {
    if (this.config.contentStrategy) return this.config.contentStrategy;
    if (this.config.strategy !== 'fs') return 'cms';
    return 'fs';
  }

  get cmsCacheStrategy() {
    if (this.config.cmsCacheStrategy) return this.config.cmsCacheStrategy;
    if (this.config.contentStrategy === 'cms') return 'none';
    if (this.config.strategy === 'redis' || 'dynamodb') return this.config.strategy as 'redis' | 'dynamodb';
    return 'none';
  }

  get fs() {
    return {
      contentDir: this.config.fs?.contentDir!
    };
  }

  get redis() {
    return {
      ...this.config.redis,
      maxBatchSize: this.config.redis?.maxBatchSize || 1000,
      ttlSeconds: this.config.redis?.ttlSeconds || 60 * 60 * 24 * 30 // 30 days
    } as RedisOptions & {
      maxBatchSize: number;
      ttlSeconds: number;
    };
  }

  get dynamodb() {
    return {
      region: this.config.dynamodb?.region!,
      accessKeyId: this.config.dynamodb?.accessKeyId!,
      secretAccessKey: this.config.dynamodb?.secretAccessKey!,
      tableName: this.config.dynamodb?.tableName!
    };
  }

  get extensions() {
    return (
      this.config.extensions || {
        typeDefs: '',
        resolvers: {},
        mappers: {},
        typeMappings: {},
        pathsConfigs: {}
      }
    );
  }

  get graphql() {
    return {
      port: this.config.graphql?.port!,
      host: this.config.graphql?.host!
    };
  }
  get apolloServerOptions() {
    return this.config.apolloServerOptions || {};
  }

  get sites() {
    return this.config.sites!;
  }

  get paths() {
    return {
      generateFullPathTree: this.config.paths?.generateFullPathTree || true
    };
  }

  get sitemap() {
    return {
      domain: this.config.sitemap?.domain || '',
      maxPageSize: this.config.sitemap?.maxPageSize || 1000,
      indexRootPath: this.config.sitemap?.indexRootPath || '/',
      pagesRootPath: this.config.sitemap?.pagesRootPath || '/sitemap',
      excludePages: this.config.sitemap?.excludePages || []
    };
  }

  get features() {
    if (!this.config.features?.disableCoreSidekickLookup) {
      console.warn(
        'The SidekickLookupResolver in the core is being deprecated. See how to migrate: https://lastrev.atlassian.net/wiki/spaces/KB/pages/108167187/Sidekick+Lookup+Migration'
      );
    }
    if (this.config.paths?.version) {
      console.warn('The paths.version config option is deprecated. Use the features.enablePathsV2 option instead');
    }
    return {
      disableCoreSidekickLookup: !!this.config.features?.disableCoreSidekickLookup,
      disableFederatedSchema: !!this.config.features?.disableFederatedSchema,
      enablePathsV2: isNil(this.config.features?.enablePathsV2)
        ? this.config.paths?.version === 'v2'
        : !!this.config.features?.enablePathsV2
    };
  }
}
