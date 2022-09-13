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
  sites: []
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
    } else {
      throw new Error(`Invalid CMS: ${this.config.cms}`);
    }
  }

  validateStrategy() {
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
  }

  validatePaths() {
    if (this.config.paths?.version !== 'v2' && this.config.paths?.generateFullPathTree === false) {
      throw new Error(`Invalid paths configuration: generateFullPathTree must be true when using paths v1`);
    }
  }

  clone(newConfig: LastRevAppConfigArgs) {
    return new LastRevAppConfig(merge({}, this.config, newConfig));
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

  get algolia() {
    return {
      applicationId: this.config.algolia?.applicationId!,
      adminApiKey: this.config.algolia?.adminApiKey!,
      contentTypeIds: this.config.algolia?.contentTypeIds!,
      indexDraftContent: !!this.config.algolia?.indexDraftContent
    };
  }

  get logLevel() {
    return this.config.logLevel || 'warn';
  }

  get cms() {
    return this.config.cms!;
  }

  get strategy() {
    return this.config.strategy!;
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

  get sites() {
    return this.config.sites!;
  }

  get paths() {
    return {
      version: this.config.paths?.version || 'v1',
      generateFullPathTree: this.config.paths?.generateFullPathTree || true
    };
  }

  get skipReferenceFields() {
    // defaults to true, to allow backwards compatibility
    return isNil(this.config.skipReferenceFields) ? true : this.config.skipReferenceFields;
  }

  get sitemapMaxPageSize() {
    return this.config.sitemapMaxPageSize || 1000;
  }
}
