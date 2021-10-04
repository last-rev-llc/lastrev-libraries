import copyEnvironment from '@last-rev/contentful-import-export';
import { find } from 'lodash';
import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import LastRevConfig, {
  VAL_CONTENTFUL_EXPORT_SPACE_ID,
  VAL_CONTENTFUL_EXPORT_ENV_ID,
  VAL_CONTENTFUL_IMPORT_SPACE_ID,
  VAL_CONTENTFUL_IMPORT_ENV_ID,
  VAL_CONTENTFUL_MIGRATE_CMS_TYPES,
  ACTION_CONTENTFUL_MIGRATION
} from './LastRevConfig';

const performCmsFunctions = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  if (config.hasCompletedAction(ACTION_CONTENTFUL_MIGRATION)) {
    return;
  }
  const spaces = await contentfulApiWrapper.getSpaces();

  await config.askAndUpdate(VAL_CONTENTFUL_EXPORT_SPACE_ID, {
    name: VAL_CONTENTFUL_EXPORT_SPACE_ID,
    message: 'Please select which space to export from.',
    type: 'list',
    choices: spaces.map((space) => ({
      name: space.name,
      value: space.sys.id
    }))
  });

  await config.askAndUpdate(VAL_CONTENTFUL_EXPORT_ENV_ID, {
    name: VAL_CONTENTFUL_EXPORT_ENV_ID,
    message: 'Please select which environment to export from.',
    type: 'list',
    choices: async () => {
      const exportSpaceId = config.getStateValue(VAL_CONTENTFUL_EXPORT_SPACE_ID);
      const space = find(spaces, { sys: { id: exportSpaceId } });
      const { items: envs } = await space!.getEnvironments();

      return envs.map((env) => ({
        name: env.sys.id,
        value: env.sys.id
      }));
    }
  });

  await config.askAndUpdate(VAL_CONTENTFUL_IMPORT_SPACE_ID, {
    name: VAL_CONTENTFUL_IMPORT_SPACE_ID,
    message: 'Please select which space to import to.',
    type: 'list',
    choices: spaces.map((space) => ({
      name: space.name,
      value: space.sys.id
    }))
  });

  await config.askAndUpdate(VAL_CONTENTFUL_IMPORT_ENV_ID, {
    name: 'importEnvId',
    message: 'Please select which environment to import to.',
    type: 'list',
    choices: async () => {
      const importSpaceId = config.getStateValue(VAL_CONTENTFUL_IMPORT_SPACE_ID);
      const space = find(spaces, { sys: { id: importSpaceId } });
      const { items: envs } = await space!.getEnvironments();

      return envs.map((env) => ({
        name: env.sys.id,
        value: env.sys.id
      }));
    }
  });

  await config.askAndUpdate(VAL_CONTENTFUL_MIGRATE_CMS_TYPES, {
    name: VAL_CONTENTFUL_MIGRATE_CMS_TYPES,
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

  const cmsTypes = config.getStateValue(VAL_CONTENTFUL_MIGRATE_CMS_TYPES);

  await copyEnvironment({
    exportParams: {
      spaceId: config.getStateValue(VAL_CONTENTFUL_EXPORT_SPACE_ID),
      environmentId: config.getStateValue(VAL_CONTENTFUL_EXPORT_ENV_ID),
      managementToken: contentfulApiWrapper.getToken()!
    },
    importParams: {
      spaceId: config.getStateValue(VAL_CONTENTFUL_IMPORT_SPACE_ID),
      environmentId: config.getStateValue(VAL_CONTENTFUL_IMPORT_ENV_ID),
      managementToken: contentfulApiWrapper.getToken()!
    },
    skipContentTypes: cmsTypes.indexOf('contentTypes') === -1,
    skipEntries: cmsTypes.indexOf('entries') === -1,
    skipAssets: cmsTypes.indexOf('assets') === -1
  });

  config.completeAction(ACTION_CONTENTFUL_MIGRATION);
};

export default performCmsFunctions;
