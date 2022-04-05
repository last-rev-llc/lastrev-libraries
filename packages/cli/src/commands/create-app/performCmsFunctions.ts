import copyEnvironment from '@last-rev/contentful-import-export';
import chalk from 'chalk';
import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import LastRevConfig, {
  VAL_CONTENTFUL_PROCEED_WITH_MIGRATION,
  ACTION_CONTENTFUL_MIGRATION,
  VAL_CREATE_APP_CONFIG,
  ACTION_CONTENTFUL_MIGRATE_EXTENSIONS
} from './LastRevConfig';
import Messager from './Messager';
import { CreateAppConfig } from './types';

const messager = Messager.getInstance();

const performMigration = async (
  config: LastRevConfig,
  exportSpaceId: string,
  exportEnvId: string,
  importSpaceId: string,
  importEnvId: string,
  { contentfulImport }: CreateAppConfig,
  contentfulApiWrapper: ContentfulApiWrapper
) => {
  if (config.hasCompletedAction(ACTION_CONTENTFUL_MIGRATION)) {
    return;
  }

  await copyEnvironment({
    exportParams: {
      spaceId: exportSpaceId,
      environmentId: exportEnvId,
      managementToken: contentfulApiWrapper.getToken()!
    },
    importParams: {
      spaceId: importSpaceId!,
      environmentId: importEnvId,
      managementToken: contentfulApiWrapper.getToken()!
    },
    skipContentTypes: contentfulImport!.skipContentTypes,
    skipEntries: contentfulImport!.skipEntries,
    skipAssets: contentfulImport!.skipAssets
  });

  config.completeAction(ACTION_CONTENTFUL_MIGRATION);
};

const migrateExtensions = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  if (config.hasCompletedAction(ACTION_CONTENTFUL_MIGRATE_EXTENSIONS)) {
    return;
  }
  await contentfulApiWrapper.importExtensions();
  config.completeAction(ACTION_CONTENTFUL_MIGRATE_EXTENSIONS);
};

const performCmsFunctions = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  const { contentfulImport, app }: CreateAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);

  const exportSpaceId = contentfulImport!.sourceSpaceId!;
  const exportEnvId = contentfulImport!.sourceEnv || 'master';
  const exportSpace = await contentfulApiWrapper.getSpace(exportSpaceId);

  const importSpaceId = app?.contentfulSpaceId || contentfulImport!.targetSpaceId!;
  const importEnvId = contentfulImport!.targetEnv || app!.contentfulEnv || 'master';
  const importSpace = await contentfulApiWrapper.getSpace(importSpaceId);

  const cmsTypes: string[] = [];

  if (!contentfulImport!.skipExtensions) {
    cmsTypes.push('UI Extensions');
  }
  if (!contentfulImport!.skipContentTypes) {
    cmsTypes.push('Content Types');
  }
  if (!contentfulImport!.skipEntries) {
    cmsTypes.push('Entries');
  }
  if (!contentfulImport!.skipAssets) {
    cmsTypes.push('Assets');
  }

  await config.askAndUpdate(VAL_CONTENTFUL_PROCEED_WITH_MIGRATION, {
    type: 'confirm',
    name: VAL_CONTENTFUL_PROCEED_WITH_MIGRATION,
    message: `You are about to migrate ${cmsTypes.join(', ')} from ${chalk.green(exportSpace.name)} - ${chalk.green(
      exportEnvId
    )} to ${chalk.green(importSpace.name)} - ${chalk.green(
      importEnvId
    )}. This may overwrite existing content in that space. Are you sure you want to proceed?`
  });

  const proceed = config.getStateValue(VAL_CONTENTFUL_PROCEED_WITH_MIGRATION);

  if (!proceed) {
    config.completeAction(ACTION_CONTENTFUL_MIGRATION);
    messager.log(`Skipping Contentful import...`);
    return;
  }

  if (!contentfulImport!.skipExtensions) {
    await migrateExtensions(config, contentfulApiWrapper);
  }
  if (!contentfulImport!.skipAssets || !contentfulImport!.skipEntries || !contentfulImport!.skipContentTypes) {
    await performMigration(
      config,
      exportSpaceId,
      exportEnvId,
      importSpaceId,
      importEnvId,
      { contentfulImport },
      contentfulApiWrapper
    );
  }
};

export default performCmsFunctions;
