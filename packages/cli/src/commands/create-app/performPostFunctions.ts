import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import NetlifyApiWrapper from './apiWrappers/NetlifyApiWrapper';
import {
  LastRevConfig,
  ACTION_CREATE_CONTENTFUL_CACHE_WEBHOOK,
  ACTION_CREATE_CONTENTFUL_PROD_WEBHOOK,
  VAL_NETLIFY_SITE
} from './LastRevConfig';

const createContentfulCacheWebhook = async (config: LastRevConfig, contentfulApiWrapper: ContentfulApiWrapper) => {
  if (config.hasCompletedAction(ACTION_CREATE_CONTENTFUL_CACHE_WEBHOOK)) {
    return;
  }

  await contentfulApiWrapper.createCacheUpdateWebhook();
  config.completeAction(ACTION_CREATE_CONTENTFUL_CACHE_WEBHOOK);
};

const createContentfulProdWebhook = async (
  config: LastRevConfig,
  contentfulApiWrapper: ContentfulApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
) => {
  if (config.hasCompletedAction(ACTION_CREATE_CONTENTFUL_PROD_WEBHOOK)) {
    return;
  }

  if (config.getStateValue(`${VAL_NETLIFY_SITE}-prod`)) {
    await netlifyApiWrapper.addBuildHookForSite('prod');
    await contentfulApiWrapper.createProdWebhook();
  }

  config.completeAction(ACTION_CREATE_CONTENTFUL_PROD_WEBHOOK);
};

const performPostFunctions = async (
  config: LastRevConfig,
  contentfulApiWrapper: ContentfulApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
) => {
  await createContentfulCacheWebhook(config, contentfulApiWrapper);
  await createContentfulProdWebhook(config, contentfulApiWrapper, netlifyApiWrapper);
};

export default performPostFunctions;
