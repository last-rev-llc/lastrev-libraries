import { PathData, PathDataMap } from 'packages/types';
import { join } from 'path';
import { ensureDir, readFile, writeFile } from 'fs-extra';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { getWinstonLogger } from '@last-rev/logging';
import Redis from 'ioredis';
import { mapValues } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';

const logger = getWinstonLogger({ package: 'cms-path-util', module: 'PathStore' });
export interface PathStore {
  load: (site: string) => Promise<PathDataMap>;
  save: (pathDataMap: PathDataMap, site: string) => Promise<void>;
}

const redisClients: Record<string, Redis> = {};

const getRedisClient = (config: LastRevAppConfig) => {
  const key =
    config.cms === 'Sanity'
      ? JSON.stringify([config.redis, config.sanity.projectId, config.sanity.dataset])
      : JSON.stringify([config.redis, config.contentful.spaceId, config.contentful.env]);

  if (!redisClients[key]) {
    redisClients[key] = new Redis({
      ...config.redis,
      keyPrefix:
        config.cms === 'Sanity'
          ? `${config.sanity.projectId}:${config.sanity.dataset}:`
          : `${config.contentful.spaceId}:${config.contentful.env}:${
              config.contentful.usePreview ? 'preview' : 'production'
            }`
    });
  }
  return redisClients[key];
};

const getBasePath = (config: LastRevAppConfig) => {
  if (config.cms === 'Sanity') {
    return join(
      config.fs.contentDir,
      config.sanity.projectId,
      config.sanity.dataset,
      config.sanity.usePreview ? 'preview' : 'production',
      'path_data'
    );
  }
  return join(
    config.fs.contentDir,
    config.contentful.spaceId,
    config.contentful.env,
    config.contentful.usePreview ? 'preview' : 'production',
    'path_data'
  );
};

export class FsPathStore implements PathStore {
  basePath: string;

  constructor(config: LastRevAppConfig) {
    this.basePath = getBasePath(config);
  }

  getFilePath(site: string) {
    return join(this.basePath, `${site}.json`);
  }

  async load(site: string) {
    try {
      const data = await readFile(this.getFilePath(site), 'utf8');
      return JSON.parse(data);
    } catch (e) {
      logger.info(`No path data found at ${this.getFilePath(site)}`, {
        caller: 'FsPathStore.load'
      });
      return {};
    }
  }

  async save(pathDataMap: PathDataMap, site: string) {
    await ensureDir(this.basePath);
    await writeFile(this.getFilePath(site), JSON.stringify(pathDataMap));
  }
}

export class RedisPathStore implements PathStore {
  client: Redis;
  config: LastRevAppConfig;

  constructor(config: LastRevAppConfig) {
    this.client = getRedisClient(config);
    this.config = config;
  }

  getKey(site: string) {
    return `:path_data:${site}`;
  }

  load = async (site: string) => {
    try {
      return mapValues(await this.client.hgetall(this.getKey(site)), (s) => {
        return JSON.parse(s) as PathData;
      });
    } catch (e) {
      logger.info(`No path data found in redis`, {
        caller: 'RedisPathStore.load'
      });
      return {};
    }
  };

  save = async (pathDataMap: PathDataMap, site: string) => {
    if (Object.keys(pathDataMap).length === 0) {
      return;
    }
    const key = this.getKey(site);

    await this.client
      .multi()
      .del(key)
      .hmset(
        key,
        mapValues(pathDataMap, (p) => JSON.stringify(p))
      )
      .exec();
  };
}

export class DynamoDbPathStore implements PathStore {
  dynamoDB: DynamoDBDocument;
  tableName: string;
  pk: string;

  constructor(config: LastRevAppConfig) {
    this.tableName = config.dynamodb.tableName;

    this.pk =
      config.cms === 'Sanity'
        ? `${config.sanity.projectId}:${config.sanity.dataset}:${config.sanity.usePreview ? 'preview' : 'production'}`
        : `${config.contentful.spaceId}:${config.contentful.env}:${
            config.contentful.usePreview ? 'preview' : 'production'
          }`;

    this.dynamoDB = DynamoDBDocument.from(
      new DynamoDB({
        region: config.dynamodb.region,
        credentials: {
          accessKeyId: config.dynamodb.accessKeyId,
          secretAccessKey: config.dynamodb.secretAccessKey
        }
      })
    );
  }

  sk(site: string) {
    return `path_data:${site}`;
  }

  load = async (site: string) => {
    try {
      const { Item } = await this.dynamoDB.get({
        TableName: this.tableName,
        Key: {
          pk: this.pk,
          sk: this.sk(site)
        },
        AttributesToGet: ['data']
      });
      return (Item?.data as PathDataMap) || {};
    } catch (e) {
      logger.info(`No path data found in dynamodb`, {
        caller: 'DynamoDbPathStore.load'
      });
      return {};
    }
  };

  save = async (pathDataMap: PathDataMap, site: string) => {
    if (Object.keys(pathDataMap).length === 0) {
      return;
    }
    await this.dynamoDB.put({
      TableName: this.tableName,
      Item: {
        pk: this.pk,
        sk: this.sk(site),
        data: pathDataMap
      }
    });
  };
}

export class DummyStore implements PathStore {
  load = async () => {
    return {};
  };

  save = async () => {};
}

export const createPathStore = (config: LastRevAppConfig) => {
  switch (config.contentStrategy) {
    case 'cms': {
      switch (config.cmsCacheStrategy) {
        case 'redis':
          return new RedisPathStore(config);
        case 'dynamodb':
          return new DynamoDbPathStore(config);
        case 'none':
          // path reader only works with pre-calculated paths in redis/dynamodb/fs
          return new DummyStore();
      }
    }
    case 'fs':
      return new FsPathStore(config);
  }
};
