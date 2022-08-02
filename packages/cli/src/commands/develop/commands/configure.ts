import getLastRevConfig from '../../../helpers/getLastRevConfig';
import readJsonFileInDir from '../utils/readJsonFileInDir';
import { resolve } from 'path';
import getAllLibraries from '../utils/getAllLibraries';
import { inquireProjectLibs, inquireLibrariesLocation } from '../utils/prompts';
import updateLibraries from '../utils/updateLibraries';
import output from '../utils/output';
import { CONFIG_LIBRARIES_LOCATION, CONFIG_PROJECTS } from '../utils/constants';
import chalk from 'chalk';
import { Lib } from '../types';
import arraysHaveSameElements from '../utils/arraysHaveSameElements';
import runYarn from '../utils/runYarn';
import checkIsInClientMonorepo from '../utils/checkIsInClientMonoRepo';
import { performDisplayInfo } from './displayInfo';

const configure = async ({ location, clear }: any) => {
  const config = getLastRevConfig();
  const cwd = process.cwd();

  if (clear) {
    config.set(CONFIG_PROJECTS, {});
    config.set(CONFIG_LIBRARIES_LOCATION, '');
    output.nl();
    output.info('All your configuration settings have been cleared.');
    output.nl();

    process.exit(0);
  }

  checkIsInClientMonorepo(cwd);

  if (location) {
    const resolvedLocation = resolve(cwd, location);
    const libsPackageJson = await readJsonFileInDir(resolvedLocation, 'package.json');
    if (libsPackageJson.name !== 'lastrev-libraries') {
      output.nl();
      output.error(`${chalk.cyan(resolvedLocation)} is not a lastrev-libraries monorepo`);
      output.nl();
      process.exit(1);
    }
    config.set(CONFIG_LIBRARIES_LOCATION, resolvedLocation);
  }

  let librariesLocation = config.get(CONFIG_LIBRARIES_LOCATION);

  if (!librariesLocation) {
    librariesLocation = await inquireLibrariesLocation(cwd);
    config.set(CONFIG_LIBRARIES_LOCATION, librariesLocation);
    output.nl();
    output.info(`Saved libraries location: ${chalk.cyan(librariesLocation)}.`);
    output.nl();
  }

  const allLibs = await getAllLibraries(librariesLocation);
  const existingLibs = (config.get(`${CONFIG_PROJECTS}.${cwd}.libraries`) || []) as string[];

  let selectedLibs: Lib[] = [];

  selectedLibs = await inquireProjectLibs(allLibs, existingLibs);

  config.set(
    `${CONFIG_PROJECTS}.${cwd}.libraries`,
    selectedLibs.map((lib) => lib.name)
  );

  const previousLibs = allLibs.filter((lib) => existingLibs.includes(lib.name));

  if (!arraysHaveSameElements(selectedLibs, previousLibs)) {
    await updateLibraries(selectedLibs, cwd, librariesLocation);

    output.nl();
    output.info('Package.json workspaces changed. Running yarn install...');
    output.nl();
    await runYarn(cwd);
  }

  await performDisplayInfo(
    config.get(`${CONFIG_PROJECTS}.${cwd}.libraries`) as string[],
    allLibs,
    cwd,
    await readJsonFileInDir(cwd, 'package.json')
  );
  process.exit(0);
};

export default configure;
