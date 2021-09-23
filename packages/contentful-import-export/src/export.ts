import contentfulExport from 'contentful-export';
import { ConnectionParams } from './types';
import validateParams from './validateParams';

const exportEnvironement = async (
  exportParams: ConnectionParams,
  skipEntries?: boolean,
  skipAssets?: boolean,
  skipContentTypes?: boolean
): Promise<{
  contentTypes?: any[];
  editorInterfaces?: any[];
  entries?: any[];
  assets?: any[];
}> => {
  validateParams(exportParams, 'export');
  if (skipEntries && skipAssets && skipContentTypes) {
    throw new Error('You cannot skip all 3 of these: entries, assets, contentTypes');
  }
  const result = await contentfulExport({
    ...exportParams,
    saveFile: false,
    skipRoles: true,
    skipWebhooks: true,
    skipLocales: true,
    skipEntries,
    skipAssets,
    skipContentTypes,
    skipEditorInterfaces: skipContentTypes // tied to both
  });

  return result;
};

export default exportEnvironement;
