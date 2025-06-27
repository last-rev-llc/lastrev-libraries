import { getLastRevConfig } from '../../../helpers/getLastRevConfig';
import output from '../utils/output';
import updateLibraries from '../utils/updateLibraries';
import { CONFIG_LIBRARIES_LOCATION, CONFIG_PROJECTS } from '../utils/constants';
import runYarn from '../utils/runYarn';
import sanityChecks from '../utils/sanityChecks';

const restore = async () => {
  const config = getLastRevConfig();
  const cwd = process.cwd();
  const librariesLocation = config.get(CONFIG_LIBRARIES_LOCATION);

  await sanityChecks(cwd, librariesLocation);

  config.set(`${CONFIG_PROJECTS}.${cwd}.libraries`, []);

  await updateLibraries([], cwd, config.get(CONFIG_LIBRARIES_LOCATION));

  await runYarn(cwd);

  output.nl();
  output.info('The current workspace has been restored to use downloaded last-rev libraries.');
  output.nl();

  process.exit(0);
};

export default restore;
