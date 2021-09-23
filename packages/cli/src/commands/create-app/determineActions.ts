import { prompt } from 'inquirer';
import { SelectedActions } from './types';
import { map } from 'lodash';

const possibleActions = ['Create an app from a starter template', 'Migrate content and models from a CMS space'];

const determineActions = async (): Promise<SelectedActions> => {
  const { actions } = await prompt([
    {
      type: 'checkbox',
      name: 'actions',
      message: 'Which actions would you like to perform?',
      choices: map(possibleActions, (action) => ({
        name: action,
        value: action,
        checked: true
      }))
    }
  ]);

  return {
    createApp: actions.includes('Create an app from a starter template'),
    migrateContent: actions.includes('Migrate content and models from a CMS space')
  };
};

export default determineActions;
