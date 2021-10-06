import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import { find } from 'lodash';
import LastRevConfig, {
  VAL_CONTENTFUL_ENV_ID,
  VAL_CONTENTFUL_SPACE_ID,
  VAL_CONTENTFUL_PREVIEW_KEY,
  VAL_CONTENTFUL_DELIVERY_KEY,
  VAL_REDIS_HOST,
  VAL_REDIS_PORT,
  VAL_REDIS_PASSWORD,
  VAL_ENV_VARS
} from './LastRevConfig';

const populateEnvVars = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  const spaces = await contentfulApiWrapper.getSpaces();

  await config.askAndUpdate(VAL_CONTENTFUL_SPACE_ID, {
    name: VAL_CONTENTFUL_SPACE_ID,
    message: 'Please select the Contentful Space to use for this site.',
    type: 'list',
    choices: spaces.map((space) => ({
      name: space.name,
      value: space.sys.id
    }))
  });

  await config.askAndUpdate(VAL_CONTENTFUL_ENV_ID, {
    name: VAL_CONTENTFUL_ENV_ID,
    message: 'Please select the Contentful environment to use for this site.',
    type: 'list',
    choices: async () => {
      const exportSpaceId = config.getStateValue(VAL_CONTENTFUL_SPACE_ID);
      const space = find(spaces, { sys: { id: exportSpaceId } });
      const { items: envs } = await space!.getEnvironments();

      return envs.map((env) => ({
        name: env.sys.id,
        value: env.sys.id
      }));
    }
  });

  await config.askAndUpdate(VAL_REDIS_HOST, {
    type: 'input',
    name: VAL_REDIS_HOST,
    message: 'Enter the redis host',
    validate: (input: string) => {
      return input.length > 0 || 'Please enter a valid host';
    }
  });

  await config.askAndUpdate(VAL_REDIS_PORT, {
    type: 'input',
    name: VAL_REDIS_PORT,
    message: 'Enter the redis port number',
    validate: (input: string) => {
      return input.length > 0 || 'Please enter a valid port number';
    }
  });

  await config.askAndUpdate(VAL_REDIS_PASSWORD, {
    type: 'password',
    name: VAL_REDIS_PASSWORD,
    message: 'Enter the redis password',
    validate: (input: string) => {
      return input.length > 0 || 'Please enter a valid password';
    }
  });

  await contentfulApiWrapper.createApiKeys();

  const envVars: Record<string, string> = {
    CONTENTFUL_PREVIEW_TOKEN: config.getStateValue(VAL_CONTENTFUL_PREVIEW_KEY),
    CONTENTFUL_DELIVERY_TOKEN: config.getStateValue(VAL_CONTENTFUL_DELIVERY_KEY),
    CONTENTFUL_ENV: config.getStateValue(VAL_CONTENTFUL_ENV_ID),
    CONTENTFUL_SPACE_ID: config.getStateValue(VAL_CONTENTFUL_SPACE_ID),
    REDIS_HOST: config.getStateValue(VAL_REDIS_HOST),
    REDIS_PORT: config.getStateValue(VAL_REDIS_PORT),
    REDIS_PASSWORD: config.getStateValue(VAL_REDIS_PASSWORD)
  };

  config.updateStateValue(VAL_ENV_VARS, envVars);
};

export default populateEnvVars;
