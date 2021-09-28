import { map } from 'lodash';
import LastRevConfig, { VAL_SELECTED_ACTIONS } from './LastRevConfig';

export const possibleActions = {
  createApp: 'Create an app from a starter template',
  migrateContent: 'Migrate content and models from a CMS space',
  setupNetlify: 'Setup a Netlify Site'
};

const determineActions = async (config: LastRevConfig): Promise<void> => {
  await config.askAndUpdate(VAL_SELECTED_ACTIONS, {
    type: 'checkbox',
    name: VAL_SELECTED_ACTIONS,
    message: 'Which actions would you like to perform?',
    choices: map(possibleActions, (action) => ({
      name: action,
      value: action,
      checked: true
    }))
  });
};

export default determineActions;
