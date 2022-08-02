import program, { Command } from 'commander';
import configure from './commands/configure';
import displayInfo from './commands/displayInfo';
import fix from './commands/fix';
import restore from './commands/restore';

const main = async () => {
  const configureCommand = new Command('configure')
    .storeOptionsAsProperties()
    .description('Configure the monorepo in the current directory to run with some local lastrev libraries')
    .option(
      '-l, --location [location]',
      'Location of the Last-rev Libraries monorepo. Use this argument to override a previously set location.'
    )
    .option('-c, --clear', 'Clear all configurations')
    .action(configure);

  program.addCommand(configureCommand);

  const infoCommand = new Command('info')
    .description('Show information about the current development environment')
    .action(displayInfo);

  program.addCommand(infoCommand);

  const restoreCommand = new Command('restore')
    .description('Restore the current project to use no local lastrev libraries')
    .action(restore);

  program.addCommand(restoreCommand);

  const fixCommand = new Command('fix').description('Fix the current development environment').action(fix);

  program.addCommand(fixCommand);

  await program.parseAsync(process.argv);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
