import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import RedisApiWrapper from './apiWrappers/RedisApiWrapper';
import LastRevConfig, {
  VAL_CONTENTFUL_PREVIEW_KEY,
  VAL_CONTENTFUL_DELIVERY_KEY,
  VAL_ENV_VARS,
  VAL_CONTENTFUL_DEFAULT_SITE_ID,
  VAL_CONTENTFUL_DEFAULT_SITE_KEY,
  VAL_CREATE_APP_CONFIG,
  VAL_REDIS_HOST,
  VAL_REDIS_PORT,
  VAL_REDIS_PASSWORD
} from './LastRevConfig';
import { CreateAppConfig } from './types';

const createRedisUser = async (config: LastRevConfig, redisApiWrapper: RedisApiWrapper) => {
  const createAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);
  if (!createAppConfig.redis) {
    await redisApiWrapper.saveHost();
    await redisApiWrapper.savePort();
  } else {
    config.updateStateValue(VAL_REDIS_HOST, createAppConfig.redis.host);
    config.updateStateValue(VAL_REDIS_PORT, createAppConfig.redis.port);
    config.updateStateValue(VAL_REDIS_PASSWORD, createAppConfig.redis.password);
  }
};

const populateEnvVars = async (
  config: LastRevConfig,
  contentfulApiWrapper: ContentfulApiWrapper,
  redisApiWrapper: RedisApiWrapper
) => {
  await createRedisUser(config, redisApiWrapper);
  await contentfulApiWrapper.createApiKeys();
  await contentfulApiWrapper.setSiteValues();

  const createAppConfig: CreateAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);

  const envVars: Record<string, string> = {
    CONTENTFUL_PREVIEW_TOKEN: config.getStateValue(VAL_CONTENTFUL_PREVIEW_KEY),
    CONTENTFUL_DELIVERY_TOKEN: config.getStateValue(VAL_CONTENTFUL_DELIVERY_KEY),
    CONTENTFUL_ENV: createAppConfig.app!.contentfulEnv || 'master',
    CONTENTFUL_SPACE_ID: createAppConfig.app!.contentfulSpaceId!,
    REDIS_HOST: config.getStateValue(VAL_REDIS_HOST) || 'TBD',
    REDIS_PORT: config.getStateValue(VAL_REDIS_PORT) || 'TBD',
    REDIS_PASSWORD: config.getStateValue(VAL_REDIS_PASSWORD) || 'TBD',
    SITE_ID: config.getStateValue(VAL_CONTENTFUL_DEFAULT_SITE_ID),
    DEFAULT_SITE_ID: config.getStateValue(VAL_CONTENTFUL_DEFAULT_SITE_ID),
    SITE: config.getStateValue(VAL_CONTENTFUL_DEFAULT_SITE_KEY),
    GRAPHQL_SERVER_TIMEOUT: '30000',
    NEXT_PUBLIC_GTM_ID: createAppConfig.app!.googleTagManagerId || 'TBD'
  };

  config.updateStateValue(VAL_ENV_VARS, envVars);
};

export default populateEnvVars;
