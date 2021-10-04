import { prompt } from 'inquirer';
import LastRevConfig from './LastRevConfig';
import Messager from './Messager';

const messager = Messager.getInstance();

const continueIfInProgress = async (config: LastRevConfig): Promise<void> => {
  if (config.inProgress()) {
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
