import contentfulImport from 'contentful-import';
import { ConnectionParams, ContentToImport } from './types';
import validateParams from './validateParams';
import { filter, get } from 'lodash';

const importEnvironment = async (
  importParams: ConnectionParams,
  content: ContentToImport,
  skipEntries?: boolean,
  skipAssets?: boolean,
  skipContentTypes?: boolean
): Promise<{ hadErrors: boolean }> => {
  validateParams(importParams, 'import');
  try {
    await contentfulImport({
      ...importParams,
      content: {
        entries: skipEntries ? undefined : content.entries,
        assets: skipAssets ? undefined : content.assets,
        contentTypes: skipContentTypes ? undefined : content.contentTypes,
        editorInterfaces: skipContentTypes ? undefined : content.editorInterfaces
      }
    });
    return { hadErrors: false };
  } catch (err: any) {
    const unauthorized = filter(err.errors as any[], (error) => get(error, ['error', 'data', 'status']) === 401);

    if (unauthorized.length) {
      throw err;
    } else {
      // else do nothing. errors already outputted to console and file by contentful-import
      return { hadErrors: true };
    }
  }
};

export default importEnvironment;
