import exportEnvironment from './export';
import importEnvironment from './import';
import { CopyEnvironmentParams, ConnectionParams } from './types';

const getEnvString = (params: ConnectionParams): string => {
  return `${params.spaceId}:${params.environmentId}`;
};

const getItemsCopied = (skipEntries?: boolean, skipAssets?: boolean): string => {
  let itemsCopied = 'Content Types, Editor Interfaces';
  if (!skipEntries) {
    itemsCopied += ', Entries';
  }
  if (!skipAssets) {
    itemsCopied += ', Assets';
  }
  return itemsCopied;
};

const copyEnvironment = async ({
  exportParams,
  importParams,
  skipEntries,
  skipAssets,
  skipContentTypes
}: CopyEnvironmentParams): Promise<void> => {
  const exportResults = await exportEnvironment(exportParams, skipEntries, skipAssets, skipContentTypes);
  const { hadErrors } = await importEnvironment(importParams, exportResults, skipEntries, skipAssets, skipContentTypes);
  console.log(
    `Copied ${getItemsCopied(skipEntries, skipAssets)} from ${getEnvString(exportParams)} to ${getEnvString(
      importParams
    )}${hadErrors ? ' with Errors. Please see error log file for details.' : ' with no errors.'}`
  );
};

export default copyEnvironment;
