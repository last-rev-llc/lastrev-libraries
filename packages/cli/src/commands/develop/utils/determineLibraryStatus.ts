import { join, relative, dirname } from 'path';
import { EvaluatedLib, Lib, LibraryError } from '../types';
import { lstat, readlink, existsSync } from 'fs-extra';

const getLinkError = async (lib: Lib, cwd: string): Promise<LibraryError | null> => {
  const nodeModulesPackageDir = join(cwd, 'node_modules', lib.name);
  if (!existsSync(nodeModulesPackageDir)) {
    return LibraryError.NOT_FOUND_IN_NODE_MODULES;
  }
  const stat = await lstat(nodeModulesPackageDir);
  if (!stat.isSymbolicLink()) return LibraryError.NOT_LINKED;
  const link = await readlink(nodeModulesPackageDir);
  return link === relative(dirname(nodeModulesPackageDir), lib.location) ? null : LibraryError.NOT_LINKED;
};

const determineLibraryStatus = async (
  libName: string,
  allLibs: Lib[],
  cwd: string,
  packageJson: any
): Promise<EvaluatedLib> => {
  const currentLib = allLibs.find((lib) => lib.name === libName);
  if (!currentLib) {
    return {
      library: {
        name: libName,
        location: '',
        version: ''
      },
      errors: [LibraryError.NOT_FOUND_IN_LIBS]
    };
  }
  const errors: LibraryError[] = [];
  const linkError = await getLinkError(currentLib, cwd);
  if (linkError) {
    errors.push(linkError);
  }
  const workspace = Array.isArray(packageJson?.workspaces)
    ? packageJson.workspaces
    : packageJson?.workspaces?.packages || [];
  const relLoc = relative(cwd, currentLib.location);

  if (!workspace.includes(relLoc) && !workspace.includes(currentLib.location)) {
    errors.push(LibraryError.NOT_IN_WORKSPACES);
  }

  return {
    library: currentLib,
    errors
  };
};

export default determineLibraryStatus;
