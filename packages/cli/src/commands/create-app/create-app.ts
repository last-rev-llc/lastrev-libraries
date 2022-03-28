import program from 'commander';
// import determineActions, { possibleActions } from './determineActions';
import performCmsFunctions from './performCmsFunctions';
import performAppCreateFunctions from './performAppCreateFunctions';
// import installDependencies from './installDependencies';
import performNetlifyFunctions from './performNetlifyFunctions';
import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import NetlifyApiWrapper from './apiWrappers/NetlifyApiWrapper';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
// import { includes } from 'lodash';
import LastRevConfig, { VAL_CREATE_APP_CONFIG } from './LastRevConfig';
// import LastRevConfig, { VAL_SELECTED_ACTIONS, ACTION_DETERMINE_ACTIONS } from './LastRevConfig';
import continueIfInProgress from './continueIfInProgress';
import Messager from './Messager';
import populateEnvVars from './populateEnvVars';
import validateConfig from './validators/validateConfig';
import { existsSync, readFile, writeFile } from 'fs-extra';
import { join } from 'path';
import { CreateAppConfig } from './types';
import performPostFunctions from './performPostFunctions';

const messager = Messager.getInstance();
const config = new LastRevConfig();

const basicConfig: CreateAppConfig = {
  app: {
    name: 'your-app-name',
    contentfulSpaceId: 'abcxyz123',
    repoOwner: 'your-github-org',
    redisHost: 'http://your-redis-host.com',
    redisPort: 12345,
    redisPassword: 'abcxyz123',
    googleTagManagerId: 'GTM-12345'
  },
  netlify: {
    accountSlug: 'your-netlify-team'
  },
  contentfulImport: {
    sourceSpaceId: 'abcxyz123'
  }
};

const run = async () => {
  const configFile = join(process.cwd(), 'create-app.json');

  const configExists = existsSync(configFile);

  messager.load(config);

  if (!configExists) {
    config.clearState();
    await writeFile(configFile, JSON.stringify(basicConfig, null, 2));
    messager.log(
      'A basic create-app.json file was created in the current directory. Please edit it and re-run create-app to create the app. For all options see full documentation at https://www.npmjs.com/package/@last-rev/cli'
    );
    return;
  }

  const contentfulApiWrapper = new ContentfulApiWrapper(config);
  const netlifyApiWrapper = new NetlifyApiWrapper(config);
  const githubApiWrapper = new GithubApiWrapper(config);

  let createAppConfig: CreateAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);

  await continueIfInProgress(config, createAppConfig);

  if (!createAppConfig) {
    createAppConfig = JSON.parse(await readFile(configFile, 'utf8'));

    const errors: string[] = [];

    await validateConfig(createAppConfig, errors, githubApiWrapper, contentfulApiWrapper, netlifyApiWrapper);

    if (errors.length > 0) {
      messager.error('Encountered the following validation errors:');
      errors.map((e) => messager.error(e));
      process.exit(1);
    }

    config.updateStateValue(VAL_CREATE_APP_CONFIG, createAppConfig);
  }

  if (createAppConfig.contentfulImport) {
    await performCmsFunctions(config, contentfulApiWrapper);
  }

  if (createAppConfig.app || createAppConfig.netlify) {
    await populateEnvVars(config, contentfulApiWrapper);
  }

  if (createAppConfig.app) {
    await performAppCreateFunctions(config, githubApiWrapper);
  }

  if (createAppConfig.netlify) {
    await performNetlifyFunctions(config, netlifyApiWrapper, githubApiWrapper);
  }

  if (createAppConfig.app) {
    await performPostFunctions(config, contentfulApiWrapper, netlifyApiWrapper);
    messager.delayed('Your app is ready!');
    messager.delayed('To install dependencies, run: nvm install && nvm use && yarn');
  }

  config.clearState();
  messager.flush();
};

program.parse(process.argv);

run()
  .then(() => process.exit(0))
  .catch((err) => {
    messager.error(`create-app failed with error: ${err.message}`);
    messager.error(err.stack);
    messager.log(
      `Your state has been saved. If you resolve the errors, re-run the command to continue where you left off.`
    );
    messager.store(config);
    process.exit(1);
  });
