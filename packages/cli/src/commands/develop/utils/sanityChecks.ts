import checkIsInClientMonorepo from './checkIsInClientMonoRepo';
import output from './output';
import chalk from 'chalk';
import readJsonFileInDir from './readJsonFileInDir';

const sanityChecks = async (cwd: string, librariesLocation?: string) => {
  checkIsInClientMonorepo(cwd);

  if (!librariesLocation) {
    output.nl();
    output.error('You have not configured a lastrev-libraries project location.');
    output.info(`Todo so, run ${chalk.italic.yellow('last-rev develop configure')}`);
    output.nl();
    process.exit(1);
  }

  const packageJson = await readJsonFileInDir(cwd, 'package.json');

  if (!packageJson) {
    output.nl();
    output.error(`Unable to find package.json in ${cwd}`);
    output.nl();
    process.exit(0);
  }
};

export default sanityChecks;
