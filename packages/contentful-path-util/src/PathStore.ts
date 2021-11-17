import { PathData, PathDataMap } from 'packages/types';
import { join } from 'path';
import { ensureDir, readFile, writeFile } from 'fs-extra';
import AWS from 'aws-sdk';
import logger from 'loglevel';
import Redis from 'ioredis';
import { mapValues } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';

export interface PathStore {
  load: (site: string) => Promise<PathDataMap>;
  save: (pathDataMap: PathDataMap, site: string) => Promise<void>;
}

export class FsPathStore implements PathStore {
  basePath: string;

  constructor(config: LastRevAppConfig) {
    this.basePath = join(
      config.fs.contentDir,
      config.contentful.spaceId,
      config.contentful.env,
      config.contentful.usePreview ? 'preview' : 'production',
      'path_data'
    );
  }

  getFilePath(site: string) {
    return join(this.basePath, `${site}.json`);
  }

  async load(site: string) {
    try {
      const data = await readFile(this.getFilePath(site), 'utf8');
      console.log('returning data now');
      return JSON.parse(data);
    } catch (e) {
      logger.info(`No path data found at ${this.getFilePath(site)}`);
      return {};
    }
  }

  async save(pathDataMap: PathDataMap, site: string) {
    await ensureDir(this.basePath);
    await writeFile(this.getFilePath(site), JSON.stringify(pathDataMap));
  }
}

export class RedisPathStore implements PathStore {
  client: Redis.Redis;

  constructor(config: LastRevAppConfig) {
    this.client = new Redis({
      ...config.redis,
      keyPrefix: `${config.contentful.spaceId}:${config.contentful.env}:${
        config.contentful.usePreview ? 'preview' : 'production'
      }`
    });
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
      logger.info(`No path data found in redis`);
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
  dynamoDB: AWS.DynamoDB.DocumentClient;
  tableName: string;
  pk: string;

  constructor(config: LastRevAppConfig) {
    AWS.config.update({
      region: config.dynamodb.region,
      accessKeyId: config.dynamodb.accessKeyId,
      secretAccessKey: config.dynamodb.secretAccessKey
    });

    this.tableName = config.dynamodb.tableName;
    this.pk = `${config.contentful.spaceId}:${config.contentful.env}:${
      config.contentful.usePreview ? 'preview' : 'production'
    }`;

    this.dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: config.dynamodb.region
    });
  }

  sk(site: string) {
    return `path_data:${site}`;
  }

  load = async (site: string) => {
    try {
      const { Item } = await this.dynamoDB
        .get({
          TableName: this.tableName,
          Key: {
            pk: this.pk,
            sk: this.sk(site)
          },
          AttributesToGet: ['data']
        })
        .promise();
      return Item?.data as PathDataMap;
    } catch (e) {
      logger.info(`No path data found in dynamodb`);
      return {};
    }
  };

  save = async (pathDataMap: PathDataMap, site: string) => {
    if (Object.keys(pathDataMap).length === 0) {
      return;
    }
    await this.dynamoDB
      .put({
        TableName: this.tableName,
        Item: {
          pk: this.pk,
          sk: this.sk(site),
          data: pathDataMap
        }
      })
      .promise();
  };
}

export const createPathStore = (config: LastRevAppConfig) => {
  switch (config.strategy) {
    case 'redis':
      return new RedisPathStore(config);
    case 'dynamodb':
      return new DynamoDbPathStore(config);
    case 'fs':
      return new FsPathStore(config);
  }
};
