import ContentfulApiWrapper from '../apiWrappers/ContentfulApiWrapper';
import { CreateAppConfig } from '../types';

const validateContentfulImportConfig = async (
  { contentfulImport, app }: CreateAppConfig,
  errors: string[],
  contentfulApiWrapper: ContentfulApiWrapper
) => {
  if (!contentfulImport) {
    return;
  }

  if (!contentfulImport.sourceSpaceId) {
    errors.push('[contentfulImport.sourceSpaceId] You must specify a sourceSpaceId');
  }

  if (!contentfulImport.targetSpaceId && !app) {
    errors.push(
      '[contentfulImport.targetSpaceId] You must specify a targetSpaceId if not provided through app creation options'
    );
  }

  if (!contentfulImport.sourceSpaceId || !contentfulImport.targetSpaceId) {
    return;
  }

  const spaces = await contentfulApiWrapper.getSpaces();

  const sourceSpace = spaces.find((s) => s.sys.id === contentfulImport.sourceSpaceId);

  if (!sourceSpace) {
    errors.push(`[contentfulImport.sourceSpaceId] You do not have access to ${contentfulImport?.sourceSpaceId}`);
  } else {
    const sourceEnv = contentfulImport?.sourceEnv || 'master';

    const env = await sourceSpace.getEnvironment(sourceEnv);
    if (!env) {
      errors.push(
        `[contentfulImport.sourceEnv] You do not have access to environment ${sourceEnv} or it does not exist.`
      );
    }
  }

  if (contentfulImport.targetSpaceId) {
    const targetSpace = spaces.find((s) => s.sys.id === contentfulImport.targetSpaceId);

    if (!targetSpace) {
      errors.push(`[contentfulImport.targetSpaceId] You do not have access to ${contentfulImport?.targetSpaceId}`);
    } else {
      const targetEnv = contentfulImport?.targetEnv || 'master';

      const env = await targetSpace.getEnvironment(targetEnv);
      if (!env) {
        errors.push(
          `[contentfulImport.sourceEnv] You do not have access to environment ${targetEnv} or it does not exist.`
        );
      }
    }
  }

  if (
    contentfulImport.skipAssets &&
    contentfulImport.skipEntries &&
    contentfulImport.skipContentTypes &&
    contentfulImport.skipExtensions
  ) {
    errors.push('[contentfulImport] You cannot skip all import functions');
  }
};

export default validateContentfulImportConfig;
