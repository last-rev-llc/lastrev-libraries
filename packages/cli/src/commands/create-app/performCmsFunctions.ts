import copyEnvironment from '@last-rev/contentful-import-export';
import { find } from 'lodash';
import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import LastRevConfig, { MIGRATE_CONTENT_ACTION } from './LastRevConfig';

const performCmsFunctions = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  await contentfulApiWrapper.ensureLoggedIn();

  const client = contentfulApiWrapper.client;

  const { items: spaces } = await client.getSpaces();

  await config.askAndUpdate(MIGRATE_CONTENT_ACTION, 'exportSpaceId', {
    name: 'exportSpaceId',
    message: 'Please select which space to export from.',
    type: 'list',
    choices: spaces.map((space) => ({
      name: space.name,
      value: space.sys.id
    }))
  });

  await config.askAndUpdate(MIGRATE_CONTENT_ACTION, 'exportEnvId', {
    name: 'exportEnvId',
    message: 'Please select which environment to export from.',
    type: 'list',
    choices: async () => {
      const exportSpaceId = config.getStateValue(MIGRATE_CONTENT_ACTION, 'exportSpaceId');
      const space = find(spaces, { sys: { id: exportSpaceId } });
      const { items: envs } = await space!.getEnvironments();

      return envs.map((env) => ({
        name: env.sys.id,
        value: env.sys.id
      }));
    }
  });

  await config.askAndUpdate(MIGRATE_CONTENT_ACTION, 'importSpaceId', {
    name: 'importSpaceId',
    message: 'Please select which space to import to.',
    type: 'list',
    choices: spaces.map((space) => ({
      name: space.name,
      value: space.sys.id
    }))
  });

  await config.askAndUpdate(MIGRATE_CONTENT_ACTION, 'importEnvId', {
    name: 'importEnvId',
    message: 'Please select which environment to import to.',
    type: 'list',
    choices: async () => {
      const importSpaceId = config.getStateValue(MIGRATE_CONTENT_ACTION, 'importSpaceId');
      const space = find(spaces, { sys: { id: importSpaceId } });
      const { items: envs } = await space!.getEnvironments();

      return envs.map((env) => ({
        name: env.sys.id,
        value: env.sys.id
      }));
    }
  });

  await config.askAndUpdate(MIGRATE_CONTENT_ACTION, 'cmsTypes', {
    name: 'cmsTypes',
    message: 'Please select which types to import.',
    type: 'checkbox',
    choices: [
      {
        name: 'Content Types',
        value: 'contentTypes',
        checked: true
      },
      {
        name: 'Entries',
        value: 'entries'
      },
      {
        name: 'Assets',
        value: 'assets'
      }
    ],
    validate: (val) => {
      if (val.length === 0) {
        return 'Please select at least one type.';
      }

      return true;
    }
  });

  const cmsTypes = config.getStateValue(MIGRATE_CONTENT_ACTION, 'cmsTypes');

  await copyEnvironment({
    exportParams: {
      spaceId: config.getStateValue(MIGRATE_CONTENT_ACTION, 'exportSpaceId'),
      environmentId: config.getStateValue(MIGRATE_CONTENT_ACTION, 'exportEnvId'),
      managementToken: contentfulApiWrapper.getToken()!
    },
    importParams: {
      spaceId: config.getStateValue(MIGRATE_CONTENT_ACTION, 'importSpaceId'),
      environmentId: config.getStateValue(MIGRATE_CONTENT_ACTION, 'importEnvId'),
      managementToken: contentfulApiWrapper.getToken()!
    },
    skipContentTypes: cmsTypes.indexOf('contentTypes') === -1,
    skipEntries: cmsTypes.indexOf('entries') === -1,
    skipAssets: cmsTypes.indexOf('assets') === -1
  });

  config.completeAction(MIGRATE_CONTENT_ACTION);
};

export default performCmsFunctions;
