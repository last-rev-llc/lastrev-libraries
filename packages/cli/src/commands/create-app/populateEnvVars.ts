import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import LastRevConfig, {
  VAL_CONTENTFUL_PREVIEW_KEY,
  VAL_CONTENTFUL_DELIVERY_KEY,
  VAL_ENV_VARS,
  VAL_CONTENTFUL_DEFAULT_SITE_ID,
  VAL_CONTENTFUL_DEFAULT_SITE_KEY,
  VAL_CREATE_APP_CONFIG
} from './LastRevConfig';
import { CreateAppConfig } from './types';

const populateEnvVars = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  await contentfulApiWrapper.createApiKeys();
  await contentfulApiWrapper.setSiteValues();

  const createAppConfig: CreateAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);

  const envVars: Record<string, string> = {
    CONTENTFUL_PREVIEW_TOKEN: config.getStateValue(VAL_CONTENTFUL_PREVIEW_KEY),
    CONTENTFUL_DELIVERY_TOKEN: config.getStateValue(VAL_CONTENTFUL_DELIVERY_KEY),
    CONTENTFUL_ENV: createAppConfig.app!.contentfulEnv || 'master',
    CONTENTFUL_SPACE_ID: createAppConfig.app!.contentfulSpaceId!,
    REDIS_HOST: createAppConfig.app!.redisHost || 'TBD',
    REDIS_PORT: `${createAppConfig.app!.redisPort}` || 'TBD',
    REDIS_PASSWORD: createAppConfig.app!.redisPassword || 'TBD',
    SITE_ID: config.getStateValue(VAL_CONTENTFUL_DEFAULT_SITE_ID),
    DEFAULT_SITE_ID: config.getStateValue(VAL_CONTENTFUL_DEFAULT_SITE_ID),
    SITE: config.getStateValue(VAL_CONTENTFUL_DEFAULT_SITE_KEY),
    GRAPHQL_SERVER_TIMEOUT: '30000',
    NEXT_PUBLIC_GTM_ID: createAppConfig.app!.googleTagManagerId || 'TBD'
  };

  config.updateStateValue(VAL_ENV_VARS, envVars);
};

export default populateEnvVars;
