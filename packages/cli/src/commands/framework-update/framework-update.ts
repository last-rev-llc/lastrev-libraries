import program from 'commander';
import updateScript from './updateFramework';

program
  .requiredOption(
    '-s, --source <source>',
    'commit hash, or branch name, of the current version of the project being updated'
  )
  .requiredOption('-t, --target <target>', 'commit hash, or branch name, of the target version being updated to')
  .option('-d, --directory <directory>', 'directory of the project being updated', process.cwd())
  .parse(process.argv);

const { source, target, directory } = program.opts();

console.log(`Starting process for updating project at ${directory} from ${source} to ${target}`);

updateScript(directory, source, target);
