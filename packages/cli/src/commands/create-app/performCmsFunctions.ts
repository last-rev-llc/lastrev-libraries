import copyEnvironment from '@last-rev/contentful-import-export';
import chalk from 'chalk';
import { find, includes } from 'lodash';
import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import { possibleActions } from './determineActions';
import LastRevConfig, {
  VAL_CONTENTFUL_SPACE_ID,
  VAL_CONTENTFUL_ENV_ID,
  VAL_CONTENTFUL_EXPORT_SPACE_ID,
  VAL_CONTENTFUL_EXPORT_ENV_ID,
  VAL_CONTENTFUL_MIGRATE_CMS_TYPES,
  VAL_CONTENTFUL_PROCEED_WITH_MIGRATION,
  ACTION_CONTENTFUL_MIGRATION
} from './LastRevConfig';
import Messager from './Messager';

const messager = Messager.getInstance();

const performMigration = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  if (config.hasCompletedAction(ACTION_CONTENTFUL_MIGRATION)) {
    return;
  }
  const spaces = await contentfulApiWrapper.getSpaces();

  await config.askAndUpdate(VAL_CONTENTFUL_EXPORT_SPACE_ID, {
    name: VAL_CONTENTFUL_EXPORT_SPACE_ID,
    message: 'Please select which Contentful space to export content from.',
    type: 'list',
    choices: spaces.map((space) => ({
      name: space.name,
      value: space.sys.id
    }))
  });

  await config.askAndUpdate(VAL_CONTENTFUL_EXPORT_ENV_ID, {
    name: VAL_CONTENTFUL_EXPORT_ENV_ID,
    message: 'Please select which Contentful environment to export content from.',
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

  await config.askAndUpdate(VAL_CONTENTFUL_MIGRATE_CMS_TYPES, {
    name: VAL_CONTENTFUL_MIGRATE_CMS_TYPES,
    message: 'Please select which Contentful types to import.',
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

  const exportSpaceId = config.getStateValue(VAL_CONTENTFUL_EXPORT_SPACE_ID);
  const exportEnvId = config.getStateValue(VAL_CONTENTFUL_EXPORT_ENV_ID);
  const exportSpaceName = find(spaces, { sys: { id: exportSpaceId } })?.name;

  const importSpaceId = config.getStateValue(VAL_CONTENTFUL_SPACE_ID);
  const importEnvId = config.getStateValue(VAL_CONTENTFUL_ENV_ID);
  const importSpaceName = find(spaces, { sys: { id: importSpaceId } })?.name;

  const cmsTypes = config.getStateValue(VAL_CONTENTFUL_MIGRATE_CMS_TYPES);

  await config.askAndUpdate(VAL_CONTENTFUL_PROCEED_WITH_MIGRATION, {
    type: 'confirm',
    name: VAL_CONTENTFUL_PROCEED_WITH_MIGRATION,
    message: `You are about to migrate ${cmsTypes.join(', ')} from ${chalk.green(exportSpaceName)} - ${chalk.green(
      exportEnvId
    )} to ${chalk.green(importSpaceName)} - ${chalk.green(
      importEnvId
    )}. This may overwrite existing content in that space. Are you sure you want to proceed?`
  });

  const proceed = config.getStateValue(VAL_CONTENTFUL_PROCEED_WITH_MIGRATION);

  if (!proceed) {
    config.completeAction(ACTION_CONTENTFUL_MIGRATION);
    messager.log(`Skipping Contentful migration...`);
    return;
  }

  await copyEnvironment({
    exportParams: {
      spaceId: exportSpaceId,
      environmentId: exportEnvId,
      managementToken: contentfulApiWrapper.getToken()!
    },
    importParams: {
      spaceId: importSpaceId,
      environmentId: importEnvId,
      managementToken: contentfulApiWrapper.getToken()!
    },
    skipContentTypes: cmsTypes.indexOf('contentTypes') === -1,
    skipEntries: cmsTypes.indexOf('entries') === -1,
    skipAssets: cmsTypes.indexOf('assets') === -1
  });

  config.completeAction(ACTION_CONTENTFUL_MIGRATION);
};

const performCmsFunctions = async (
  config: LastRevConfig,
  contentfulApiWrapper: ContentfulApiWrapper,
  selectedActions: string[]
) => {
  if (includes(selectedActions, possibleActions.migrateContent)) {
    await performMigration(config, contentfulApiWrapper);
  }
};

export default performCmsFunctions;
