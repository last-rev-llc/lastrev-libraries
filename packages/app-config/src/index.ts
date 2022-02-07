import { LastRevAppConfigArgs, LastRevAppConfiguration } from './types';
import { merge, isNil } from 'lodash';
import defaultConfig from './defaultConfig';

export default class LastRevAppConfig implements LastRevAppConfiguration {
  config: LastRevAppConfigArgs;

  constructor(config: LastRevAppConfigArgs) {
    console.log(config.sites, defaultConfig.sites);
    this.config = merge({}, defaultConfig, config);
    console.log(config.sites, defaultConfig.sites, this.config.sites);
    this.validateCmsVars();
    this.validateStrategy();
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
      if (!this.config.contentful?.env) {
        throw new Error('Contentful CMS: contentful.environment is required.');
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

  clone(newConfig: LastRevAppConfigArgs) {
    return new LastRevAppConfig(merge({}, this.config, newConfig));
  }

  get contentful() {
    return {
      spaceId: this.config.contentful?.spaceId!,
      contentDeliveryToken: this.config.contentful?.contentDeliveryToken!,
      contentPreviewToken: this.config.contentful?.contentPreviewToken!,
      env: this.config.contentful?.env!,
      usePreview: !!this.config.contentful?.usePreview
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
      host: this.config.redis?.host!,
      port: this.config.redis?.port!,
      password: this.config.redis?.password,
      tls: this.config.redis?.tls,
      db: this.config.redis?.db
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

  get skipReferenceFields() {
    // defaults to true, to allow backwards compatibility
    return isNil(this.config.skipReferenceFields) ? true : this.config.skipReferenceFields;
  }
}
