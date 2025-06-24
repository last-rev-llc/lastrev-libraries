import chalk from 'chalk';
import { getLastRevConfig } from '../../../helpers/getLastRevConfig';
import output from '../utils/output';
import { EvaluatedLib, Lib } from '../types';
import determineLibraryStatus from '../utils/determineLibraryStatus';
import getAllLibraries from '../utils/getAllLibraries';
import readJsonFileInDir from '../utils/readJsonFileInDir';
import sanityChecks from '../utils/sanityChecks';

const getStatusCheck = (lib: EvaluatedLib): string => {
  return lib.errors.length ? chalk.red('X') : chalk.green('√');
};

const listErrors = (lib: EvaluatedLib): string => {
  if (!lib.errors.length) return '';
  return `(${lib.errors.map((err) => err.toString()).join(') (')})`;
};

export const displayInfo = async () => {
  const config = getLastRevConfig();
  const cwd = process.cwd();
  const librariesLocation = config.get('develop.librariesLocation');

  await sanityChecks(cwd, librariesLocation);

  const existingLibs = (config.get(`develop.projects.${cwd}.libraries`) || []) as string[];

  if (!existingLibs.length) {
    output.nl();
    output.info('You have not configured any libraries to run locally for this project.');
    output.nl();
    output.info(
      `To configure your local development environment, run ${chalk.italic.yellow('last-rev develop configure')}`
    );
    output.nl();
    process.exit(0);
  }

  const packageJson = await readJsonFileInDir(cwd, 'package.json');

  if (!packageJson) {
    output.nl();
    output.error('Unable to find package.json');
    output.nl();
    process.exit(0);
  }

  const allLibs = await getAllLibraries(config.get('develop.librariesLocation'));

  await performDisplayInfo(existingLibs, allLibs, cwd, packageJson);

  process.exit(0);
};

export const performDisplayInfo = async (existingLibs: string[], allLibs: Lib[], cwd: string, packageJson: any) => {
  const evaluatedLibs = await Promise.all(
    existingLibs.map(async (lib) => determineLibraryStatus(lib, allLibs, cwd, packageJson))
  );
  const hasErrors = evaluatedLibs.some((lib) => lib.errors.length);

  output.nl();
  output.info(`You are developing the following lastrev libraries on ${chalk.green(packageJson.name)}:`);
  output.nl();
  evaluatedLibs.forEach((lib) =>
    output.info(`[${getStatusCheck(lib)}] ${chalk.cyan(lib.library.name)} ${listErrors(lib)}`, 3)
  );
  output.nl();

  if (hasErrors) {
    output.info(`To fix your environment, run ${chalk.italic.yellow('last-rev develop fix')}`);
    output.info(
      `or to configure your environment to run a different set of projects locally, run ${chalk.italic.yellow(
        'last-rev develop configure'
      )}`
    );
    output.info(`or to restore your environment, run ${chalk.italic.yellow('last-rev develop restore')}`);
    output.nl();
  } else {
    output.info(`There are no problems with your environment.`);
    output.howToRunDev(existingLibs);
  }
};
