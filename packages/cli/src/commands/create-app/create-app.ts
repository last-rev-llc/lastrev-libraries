import program from 'commander';
import determineActions, { possibleActions } from './determineActions';
import performCmsFunctions from './performCmsFunctions';
import performAppCreateFunctions from './performAppCreateFunctions';
import installDependencies from './installDependencies';
import performNetlifyFunctions from './performNetlifyFunctions';
import ContentfulApiWrapper from './apiWrappers/ContentfulApiWrapper';
import NetlifyApiWrapper from './apiWrappers/NetlifyApiWrapper';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import { includes } from 'lodash';
import LastRevConfig, { VAL_SELECTED_ACTIONS, ACTION_DETERMINE_ACTIONS } from './LastRevConfig';
import continueIfInProgress from './continueIfInProgress';
import Messager from './Messager';
import populateEnvVars from './populateEnvVars';

const messager = Messager.getInstance();
const config = new LastRevConfig();

const run = async () => {
  messager.load(config);
  const contentfulApiWrapper = new ContentfulApiWrapper(config);
  const netlifyApiWrapper = new NetlifyApiWrapper(config);
  const githubApiWrapper = new GithubApiWrapper(config);

  await continueIfInProgress(config);

  if (!config.hasCompletedAction(ACTION_DETERMINE_ACTIONS)) {
    await determineActions(config);
  }

  const selectedActions = config.getStateValue(VAL_SELECTED_ACTIONS);

  if (includes(selectedActions, possibleActions.createApp) || includes(selectedActions, possibleActions.setupNetlify)) {
    await populateEnvVars(config, contentfulApiWrapper);
  }

  await performCmsFunctions(config, contentfulApiWrapper, selectedActions);

  if (includes(selectedActions, possibleActions.createApp)) {
    await performAppCreateFunctions(config, githubApiWrapper);
  }

  if (includes(selectedActions, possibleActions.setupNetlify)) {
    await performNetlifyFunctions(config, netlifyApiWrapper, githubApiWrapper);
  }

  if (includes(selectedActions, possibleActions.createApp)) {
    await installDependencies(config);
  }
  config.clearState();
  messager.flush();
};

program.parse(process.argv);

run()
  .then(() => process.exit(0))
  .catch((err) => {
    messager.error(`create-app failed with error: ${err.message}`);
    messager.log(
      `Your state has been saved. If you resolve the errors, re-run the command to continue where you left off.`
    );
    messager.store(config);
    process.exit(1);
  });
