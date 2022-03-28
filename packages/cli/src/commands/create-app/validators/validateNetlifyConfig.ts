import NetlifyApiWrapper from '../apiWrappers/NetlifyApiWrapper';
import { CreateAppConfig } from '../types';

const validateNetlifyConfig = async (
  { netlify, app }: CreateAppConfig,
  errors: string[],
  netlifyApiWrapper: NetlifyApiWrapper
) => {
  if (!netlify) {
    return;
  }

  if (!netlify.accountSlug) {
    errors.push('[netlify.accountSlug] You must specify an account slug');
    return;
  }

  if (
    !app &&
    !['devSiteName', 'prodSiteName', 'storybookSiteName'].some(
      (n) => !netlify[n as 'devSiteName' | 'prodSiteName' | 'storybookSiteName']
    )
  ) {
    errors.push('[netlify] If you are not creating an app, you must specify the names of the sites you want to create');
    return;
  }

  const hasAccess = await netlifyApiWrapper.userHasAccountAccess(netlify.accountSlug);

  if (!hasAccess) {
    errors.push(`[netlify.accountSlug] You do not have access to the team ${netlify.accountSlug}.`);
  }
};

export default validateNetlifyConfig;
