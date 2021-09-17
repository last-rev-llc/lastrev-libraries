import { PathData, PathDataMap } from 'packages/types';
import { join } from 'path';
import { readFile, writeFile } from 'fs-extra';
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
      config.contentful.usePreview ? 'preview' : 'production'
    );
  }

  getFilePath(site: string) {
    return join(this.basePath, 'path_data', `${site}.json`);
  }

  load = async () => {
    try {
      const data = await readFile(this.basePath, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      logger.info(`No path data found at ${this.basePath}`);
      return {};
    }
  };

  save = async (pathDataMap: PathDataMap, site: string) => {
    await writeFile(this.getFilePath(site), JSON.stringify(pathDataMap));
  };
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
    const key = this.getKey(site);
    await this.client
      .multi()
      .hdel(key)
      .hmset(
        key,
        mapValues(pathDataMap, (p) => JSON.stringify(p))
      )
      .exec();
  };
}

export const createPathStore = (config: LastRevAppConfig) => {
  if (config.strategy === 'redis') {
    return new RedisPathStore(config);
  } else {
    return new FsPathStore(config);
  }
};
