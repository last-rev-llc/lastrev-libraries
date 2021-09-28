import program from 'commander';
import chalk from 'chalk';
import determineActions, { possibleActions } from './determineActions';
import performCmsFunctions from './performCmsFunctions';
import performAppCreateFunctions from './performAppCreateFunctions';
import installDependencies from './installDependencies';
import performNetlifyFunctions from './performNetlifyFunctions';
import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import NetlifyApiWrapper from './apiWrappers/NetlifyApiWrapper';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import { includes } from 'lodash';
import LastRevConfig, {
  CREATE_APP_ACTION,
  DETERMINE_ACTIONS_ACTION,
  MIGRATE_CONTENT_ACTION,
  SETUP_NETLIFY_ACTION
} from './LastRevConfig';
import continueIfInProgress from './continueIfInProgress';

const run = async () => {
  try {
    const config = new LastRevConfig();
    const contentfulApiWrapper = new ContentfulApiWrapper(config);
    const netlifyApiWrapper = new NetlifyApiWrapper(config);
    const githubApiWrapper = new GithubApiWrapper(config);

    await continueIfInProgress(config);

    if (!config.hasCompletedAction(DETERMINE_ACTIONS_ACTION)) {
      await determineActions(config);
    }

    const selectedActions = config.getStateValue(DETERMINE_ACTIONS_ACTION, 'selectedActions');

    if (
      includes(selectedActions, possibleActions.migrateContent) &&
      !config.hasCompletedAction(MIGRATE_CONTENT_ACTION)
    ) {
      await performCmsFunctions(config, contentfulApiWrapper);
    }

    if (includes(selectedActions, possibleActions.createApp) && !config.hasCompletedAction(CREATE_APP_ACTION)) {
      await performAppCreateFunctions(config, githubApiWrapper);
    }

    if (includes(selectedActions, possibleActions.setupNetlify) && !config.hasCompletedAction(SETUP_NETLIFY_ACTION)) {
      await performNetlifyFunctions(config, netlifyApiWrapper, githubApiWrapper);
    }

    if (includes(selectedActions, possibleActions.createApp)) {
      await installDependencies(config);
    }
    config.clearState();
  } catch (err: any) {
    console.error(`create-app failed with error: ${chalk.red(err.message)}`);
    console.log(
      `You're state has been saved. If you resolve the errors, re-run the command to continue where you left off.`
    );
    process.exit(1);
  }
  process.exit();
};

program.parse(process.argv);

run().catch((err) => {
  console.log(err);
  process.exit();
});
