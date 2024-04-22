import { CreateAppConfig } from '../types';

const validateRedisConfig = async ({ redis }: CreateAppConfig, errors: string[]) => {
  if (!redis) {
    return;
  }

  if (!redis.host) {
    errors.push('[redis.host] You must specify a redis host if you are providing a redis config');
  }

  if (!redis.port) {
    errors.push('[redis.port] You must specify a redis port if you are providing a redis config');
  }

  if (!redis.password) {
    errors.push('[redis.password] You must specify a redis password if you are providing a redis config');
  }
};

export default validateRedisConfig;
