import chalk from 'chalk';
import getLastRevConfig from '../../../helpers/getLastRevConfig';
import output from '../utils/output';
import updateLibraries from '../utils/updateLibraries';
import getAllLibraries from '../utils/getAllLibraries';
import runYarn from '../utils/runYarn';
import sanityChecks from '../utils/sanityChecks';
import { performDisplayInfo } from './displayInfo';
import readJsonFileInDir from '../utils/readJsonFileInDir';

const fix = async () => {
  const config = getLastRevConfig();
  const cwd = process.cwd();
  const librariesLocation = config.get('develop.librariesLocation');

  await sanityChecks(cwd, librariesLocation);

  const existingLibs = (config.get(`develop.projects.${cwd}.libraries`) || []) as string[];
  const allLibs = await getAllLibraries(config.get('develop.librariesLocation'));

  const selectedLibs = allLibs.filter((lib) => existingLibs.includes(lib.name));

  output.info('Attempting to fix your development environment...');
  output.nl();

  await updateLibraries(selectedLibs, cwd, librariesLocation);

  try {
    await runYarn(cwd);
  } catch (err) {
    output.nl();
    output.error(`Unable to fix your environment.`);
    output.nl();
    output.info(`Please try running ${chalk.italic.yellow('last-rev develop restore')} to restore your environment.`);
    output.info(
      `Once restored, run ${chalk.italic.yellow('last-rev develop configure')}. to re-configure your environment.`
    );
    output.nl();
    process.exit(1);
  }

  await performDisplayInfo(existingLibs, allLibs, cwd, await readJsonFileInDir(cwd, 'package.json'));
  process.exit(0);
};

export default fix;
