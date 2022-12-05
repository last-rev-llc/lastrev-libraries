import ContentfulApiWrapper from '../apiWrappers/ContentfulApiWrapper';
import GithubApiWrapper from '../apiWrappers/GithubApiWrapper';
import NetlifyApiWrapper from '../apiWrappers/NetlifyApiWrapper';
import { CreateAppConfig } from '../types';
import validateContentfulImportConfig from './validateContentfulImportConfig';
import validateCreateAppConfig from './validateCreateAppConfig';
import validateNetlifyConfig from './validateNetlifyConfig';
import validateRedisConfig from './validateRedisConfig';

const validateConfig = async (
  config: CreateAppConfig,
  errors: string[],
  githubApiWrapper: GithubApiWrapper,
  contentfulApiWrapper: ContentfulApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
) => {
  await validateCreateAppConfig(config, errors, githubApiWrapper, contentfulApiWrapper);
  await validateContentfulImportConfig(config, errors, contentfulApiWrapper);
  await validateNetlifyConfig(config, errors, netlifyApiWrapper);
  await validateRedisConfig(config, errors);
};

export default validateConfig;
