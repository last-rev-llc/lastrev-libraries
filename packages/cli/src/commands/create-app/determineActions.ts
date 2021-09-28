import { map } from 'lodash';
import LastRevConfig, { DETERMINE_ACTIONS_ACTION } from './LastRevConfig';

export const possibleActions = {
  createApp: 'Create an app from a starter template',
  migrateContent: 'Migrate content and models from a CMS space',
  setupNetlify: 'Setup a Netlify Site'
};

const determineActions = async (config: LastRevConfig): Promise<void> => {
  await config.askAndUpdate(DETERMINE_ACTIONS_ACTION, 'selectedActions', {
    type: 'checkbox',
    name: 'selectedActions',
    message: 'Which actions would you like to perform?',
    choices: map(possibleActions, (action, key) => ({
      name: action,
      value: action,
      checked: true,
      disabled: key === 'setupNetlify'
    }))
  });
};

export default determineActions;
