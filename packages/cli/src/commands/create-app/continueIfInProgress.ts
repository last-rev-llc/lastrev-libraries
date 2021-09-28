import { prompt } from 'inquirer';
import LastRevConfig from './LastRevConfig';

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
      console.log('Clearing state and starting fresh...');
    }
  } else {
    config.clearState();
    config.startProgress();
  }
};

export default continueIfInProgress;
