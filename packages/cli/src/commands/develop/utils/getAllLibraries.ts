import { join } from 'path';
import { readdir } from 'fs-extra';
import readJsonFileInDir from './readJsonFileInDir';
import { Lib } from '../types';

const getAllLibraries = async (rootDir: string): Promise<Lib[]> => {
  const packagesDir = join(rootDir, 'packages');
  const packageDirNames = (await readdir(packagesDir)).filter(
    (name) => name !== '.' && name !== '..' && name !== '.DS_Store'
  );
  return (
    await Promise.all(
      packageDirNames.map(async (name) => {
        const packageDir = join(packagesDir, name);
        try {
          const packageJson = await readJsonFileInDir(packageDir, 'package.json');
          return { name: packageJson.name, location: packageDir, version: packageJson.version };
        } catch {
          // may have old directories from other git branches with no content in them.
          return null;
        }
      })
    )
  ).filter((lib) => lib !== null) as Lib[];
};

export default getAllLibraries;
