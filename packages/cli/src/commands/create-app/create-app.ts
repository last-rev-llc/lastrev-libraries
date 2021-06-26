import program from 'commander';
import { Octokit } from '@octokit/rest';
import getAccessToken from './getAccessToken';
import downloadAndExtractArchive from './downloadAndExtractArchive';
import { mkdir } from 'fs-extra';
import { resolve } from 'path';
import checkExampleExists from './checkExampleExists';
import chalk from 'chalk';
import getProjectName from './getProjectName';
import renamePackages from './renamePackages';
import installDependencies from './installDependencies';

type RunProps = {
  example: string;
  directory: string;
};

type CreateAppProps = {
  example: string;
  directory: string;
  name: string;
};

const run = async ({ example, directory }: RunProps) => {
  try {
    const name = await getProjectName(directory);
    await createApp({ example, directory, name });
  } catch (err) {
    console.error(`create-app failed with error: ${chalk.red(err.message)}`);
    process.exit(1);
  }
  process.exit();
};

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

program
  .option('-e --example <example>', 'Name of the last-rev example to use', 'lastrev-next-starter')
  .option('-d --directory <directory>', 'Directory in which to extract the project', '.')
  .parse(process.argv);

const { example, directory } = program.opts();

run({ example, directory: resolve(directory) }).catch((err) => {
  console.log(err);
  process.exit();
});
