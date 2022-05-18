import program from 'commander';
import updateScript from './updateFramework';

program
  .requiredOption('-s, --source <source>', 'commit hash, or branch name, of the current version of the project being updated')
  .requiredOption('-t, --target <target>', 'commit hash, or branch name, of the target version being updated to')
  .requiredOption('-d, --directory <directory>', 'directory of the project being updated')
  .parse(process.argv);

const { source, target, directory } = program.opts();

console.log('Starting process for => ', { source, target, directory });

updateScript(directory, source, target);
