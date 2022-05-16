import program from 'commander';
import { resolve } from 'path';
import { spawn } from 'child_process';
import simpleGit from 'simple-git';

program
  .requiredOption('-s, --source <source>', 'commit hash, or branch name, of the current version of the project being updated')
  .requiredOption('-t, --target <target>', 'commit hash, or branch name, of the target version being updated to')
  .requiredOption('-d, --directory <directory>', 'directory of the project being updated')
  .parse(process.argv);

const { source, target, directory } = program.opts();

console.log('This is your directory in file => ', directory);
console.log('cwd', process.cwd());
console.log('dirname', __dirname);

// exec(`sh ${resolve(__dirname, '../../../scripts/update.sh')} ${directory}`, (error, stdout, stderr) => {
//   console.log('cwd', process.cwd());
//   console.log('stdout => ', stdout);
//   console.log('stderr => ', stderr);
//   if (error !== null) {
//       console.log(`exec error: ${error}`);
//   }
// });
const result = spawn(`sh`, [resolve(__dirname, '../../../scripts/update.sh'), directory], { stdio: 'inherit' });

result.on('end', () => console.log('Done!'));
