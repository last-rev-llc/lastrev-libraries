import { Octokit } from '@octokit/rest';
import getAccessToken from './getAccessToken';
import downloadAndExtractArchive from './downloadAndExtractArchive';
import { mkdir } from 'fs-extra';
import { resolve } from 'path';
import checkExampleExists from './checkExampleExists';
import chalk from 'chalk';
import { prompt } from 'inquirer';
import { existsSync } from 'fs-extra';
import renamePackages from './renamePackages';
import installDependencies from './installDependencies';
import { CreateAppProps } from './types';

const createApp = async ({ example, directory, name }: CreateAppProps) => {
  const root = resolve(process.cwd(), directory, name);

  console.log(`Creating a new Next.js app in ${chalk.green(root)}.`);

  await mkdir(root);
  const token = await getAccessToken();
  const octokit = new Octokit({
    auth: token
  });
  await checkExampleExists(octokit, example);
  await downloadAndExtractArchive({
    octokit,
    example,
    root
  });

  await renamePackages(root, name);

  await installDependencies(root);
};

const performAppCreateFunctions = async () => {
  const { example, directory, name } = await prompt([
    {
      name: 'example',
      message: 'Which starter do you want to use?',
      type: 'list',
      choices: ['lastrev-next-starter']
    },
    {
      name: 'directory',
      message: 'Where do you want to create the project?',
      type: 'input',
      default: '.'
    },
    {
      name: 'name',
      message: 'What is the name of the new project to create?',
      type: 'input',
      validate: async (input, answers): Promise<string | boolean> => {
        if (!input) return 'Please enter a name for your project';
        const fullPath = resolve(answers.directory, input);
        const pathExists = existsSync(fullPath);

        if (pathExists) return `A directory called ${input} already exists in ${directory}`;
        return true;
      }
    }
  ]);
  await createApp({ example, directory, name });
};

export default performAppCreateFunctions;
