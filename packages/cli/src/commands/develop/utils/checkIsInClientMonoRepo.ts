import chalk from 'chalk';
import { existsSync } from 'fs';
import { join } from 'path';
import output from './output';

const checkIsInClientMonorepo = (cwd: string) => {
  const lastRevJson = join(cwd, 'lastrev.json');
  if (!existsSync(lastRevJson)) {
    output.nl();
    output.error('This does not appear to be a client monorepo');
    output.info(
      `Please make sure you are at the root of a client monorepo containing a ${chalk.yellow('lastrev.json')} file`
    );
    output.nl();
    process.exit(1);
  }
};

export default checkIsInClientMonorepo;
