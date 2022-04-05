import ContentfulApiWrapper from '../apiWrappers/ContentfulApiWrapper';
import GithubApiWrapper from '../apiWrappers/GithubApiWrapper';
import { CreateAppConfig } from '../types';

const validateCreateAppConfig = async (
  { app, netlify }: CreateAppConfig,
  errors: string[],
  githubApiWrapper: GithubApiWrapper,
  contentfulApiWrapper: ContentfulApiWrapper
) => {
  if (!app) {
    return;
  }

  if (!app.name) {
    errors.push('[app.name] app.name is required');
  } else {
    if (!app.name.match(/^[a-z0-9-]+$/)) {
      errors.push('[app.name] app.name must be lowercase and contain only alphanumeric characters and dashes');
    }
  }

  if (app.starter) {
    // TODO: validate this dynamically from examples dir in github.
    if (app.starter !== 'lastrev-next-starter') {
      errors.push('[app.starter] Only lastrev-next-starter is currently supported');
    }
  }

  if (!app.contentfulSpaceId) {
    errors.push('[contentfulSpaceId] You must specify a contentful space id');
  }

  if (app.contentfulSpaceId && app.contentfulEnv) {
    const spaces = await contentfulApiWrapper.getSpaces();

    const space = spaces.find((s) => s.sys.id === app.contentfulSpaceId);

    if (!space) {
      errors.push(`[contentfulSpaceId] You do not have access to ${app.contentfulSpaceId}`);
    } else {
      const env = await space.getEnvironment(app.contentfulEnv);
      if (!env) {
        errors.push(`[contentfulEnv] You do not have access to environment ${app.contentfulEnv} or it does not exist.`);
      }
    }
  }

  const repoName = app?.repoName || app.name;

  if (repoName) {
    const currentUserLogin = await githubApiWrapper.getCurrentUserLogin();
    const repoOwner = app?.repoOwner || currentUserLogin;

    if (repoOwner !== currentUserLogin) {
      const orgs = await githubApiWrapper.listOrgsForAuthenticatedUser();
      const userHasOrgAccess = orgs.some((org) => org.login === repoOwner);

      if (!userHasOrgAccess) {
        errors.push(`You do not have access to the org ${repoOwner}`);
      }

      if (
        !(await githubApiWrapper.userHasRepoAccess(repoOwner, repoName)) &&
        !(await githubApiWrapper.userCanCreateInOrg(repoOwner))
      ) {
        errors.push(
          `[github] Repo ${repoName} either does not exist and you do not have permissions to create a new repo in this org: ${repoOwner}, or it ewxists but you do not have access to it`
        );
      }
    }
  }

  if (!app.devDomainUrl && !netlify) {
    errors.push('[devDomainUrl] If not creating a Netlify dev site, you must specify a dev domain url.');
  }
};

export default validateCreateAppConfig;
