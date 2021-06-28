import e from 'express';
import ora from 'ora';
import { join } from 'path';
import { replaceInFile } from 'replace-in-file';

const renamePackages = async (root: string, name: string): Promise<void> => {
  const spinner = ora('Renaming packages').start();
  try {
    await replaceInFile({
      files: [
        join(root, 'package.json'),
        join(root, 'packages/*/package.json'),
        join(root, 'packages/**/*.ts'),
        join(root, 'packages/**/*.tsx'),
        join(root, 'packages/**/*.js')
      ],
      from: /lrns\-/g,
      to: `${name}-`
    });
  } catch (err) {
    spinner.fail();
    throw e;
  }
  spinner.succeed();
};

export default renamePackages;
