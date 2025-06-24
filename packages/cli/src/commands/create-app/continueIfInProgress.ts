import { prompt } from 'inquirer';
import { LastRevConfig, VAL_CREATE_APP_CONFIG } from './LastRevConfig';
import Messager from './Messager';
import { CreateAppConfig } from './types';

const messager = Messager.getInstance();

const continueIfInProgress = async (config: LastRevConfig, createAppConfig: CreateAppConfig): Promise<void> => {
  if (config.inProgress()) {
    const savedCreateAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);

    if (JSON.stringify(savedCreateAppConfig) !== JSON.stringify(createAppConfig)) {
      messager.log('A different create-app.json was found from your previous session. Starting over...');
      config.clearState();
      config.startProgress();
      return;
    }

    const { continueProgress } = await prompt([
      {
        type: 'confirm',
        name: 'continueProgress',
        message: 'It looks like a previous run of this command was in progress. Do you want to continue it?',
        default: true
      }
    ]);
    if (!continueProgress) {
      config.clearState();
      messager.log('Clearing state and starting fresh...');
      config.startProgress();
    }
  } else {
    config.clearState();
    config.startProgress();
  }
};

export default continueIfInProgress;
