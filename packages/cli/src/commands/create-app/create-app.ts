import program from 'commander';
import chalk from 'chalk';
import determineActions from './determineActions';
import performCmsFunctions from './performCmsFunctions';
import performAppCreateFunctions from './performAppCreateFunctions';

const run = async () => {
  try {
    const actions = await determineActions();

    if (actions.migrateContent) {
      await performCmsFunctions();
    }

    if (actions.createApp) {
      await performAppCreateFunctions();
    }
  } catch (err: any) {
    console.error(`create-app failed with error: ${chalk.red(err.message)}`);
    process.exit(1);
  }
  process.exit();
};

program.parse(process.argv);

run().catch((err) => {
  console.log(err);
  process.exit();
});
