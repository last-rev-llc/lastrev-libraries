import { prompt } from 'inquirer';
import { resolve } from 'path';
import { Lib } from '../types';
import readJsonFileInDir from './readJsonFileInDir';
import chalk from 'chalk';
import output from './output';

export const inquireProjectLibs = async (allLibs: Lib[], selectedLibs: string[]): Promise<Lib[]> => {
  output.nl();
  const { libs } = (await prompt({
    name: 'libs',
    type: 'checkbox',
    message: 'Which libraries would you like to enable for local development?',
    filter: (libs) => allLibs.filter((lib) => libs.includes(lib.name)),
    choices: allLibs.map((lib) => ({
      name: lib.name,
      checked: selectedLibs.includes(lib.name)
    }))
  })) as { libs: Lib[] };

  return libs;
};

export const inquireLibrariesLocation = async (cwd: string): Promise<string> => {
  output.nl();
  const { location } = (await prompt({
    type: 'input',
    name: 'location',
    message: `Please enter the reltive or absolute path to your ${chalk.cyan('lastrev-libraries')} monorepo.`,
    filter: async (input: string) => resolve(cwd, input),
    validate: async (input: string) => {
      if (input.length === 0) {
        return 'Please enter a valid path';
      }
      const resolved = resolve(cwd, input);

      try {
        const packageJson = await readJsonFileInDir(resolved, 'package.json');
        if (packageJson.name !== 'lastrev-libraries') {
          throw Error();
        }
      } catch {
        return `${input} is not a valid lastrev-libraries monorepo`;
      }
      return true;
    }
  })) as { location: string };

  return location;
};
