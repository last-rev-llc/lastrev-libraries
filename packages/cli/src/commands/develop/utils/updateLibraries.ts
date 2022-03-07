import chalk from 'chalk';
import { relative } from 'path';
import output from './output';
import { Lib } from '../types';
import readJsonFileInDir from './readJsonFileInDir';
import saveJsonFileInDir from './saveJsonFileInDir';

const updatePackageJson = async (libs: Lib[], projectDir: string, libsDir: string, relLibsDir: string) => {
  const packageJson = await readJsonFileInDir(projectDir, 'package.json');
  const workspaces = Array.isArray(packageJson.workspaces) ? packageJson.workspaces : packageJson.workspaces?.packages;

  const cleanedWorkspaces = workspaces.filter((pac: string) => {
    return !pac.startsWith(libsDir) && !pac.startsWith(relLibsDir);
  });

  const updatedWorkspaces = [...cleanedWorkspaces, ...libs.map((lib) => relative(projectDir, lib.location))];

  packageJson.workspaces = Array.isArray(packageJson.workspaces) ? updatedWorkspaces : { packages: updatedWorkspaces };

  await saveJsonFileInDir(projectDir, 'package.json', packageJson);
  output.nl();
  output.info(`Updated ${chalk.cyan('package.json')} workspaces.`);
  output.nl();
};

const updateLibraries = async (libs: Lib[], projectDir: string, libsDir: string) => {
  const relLibsDir = relative(projectDir, libsDir);
  await updatePackageJson(libs, projectDir, libsDir, relLibsDir);
};

export default updateLibraries;
