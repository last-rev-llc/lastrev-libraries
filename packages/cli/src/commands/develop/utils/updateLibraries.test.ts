import updateLibraries from './updateLibraries';
import mockfs from 'mock-fs';
import { readFileSync } from 'fs-extra';

const cwd = '/dev/myproject';
const librariesLocation = '/dev/lastrev-libraries';

const mockConsoleLog = jest.spyOn(global.console, 'log').mockImplementation(() => {});

const mockPackageJson = (workspaces: string[] | { packages: string[] }) => {
  return JSON.stringify({
    workspaces
  });
};

const mockFileSystem = (workspaces: string[] | { packages: string[] }) => {
  mockfs({
    [cwd]: {
      'package.json': mockPackageJson(workspaces)
    },
    [librariesLocation]: {}
  });
};

describe('updateLibraries()', () => {
  beforeEach(() => {
    mockConsoleLog.mockReset();
  });
  afterEach(() => {
    mockfs.restore();
  });

  it('correctly adds a library with standard workspaces', async () => {
    mockFileSystem(['packages/*']);

    const libs = [{ name: 'lib1', location: `${librariesLocation}/packages/lib1`, version: '0.1.0' }];

    await updateLibraries(libs, cwd, librariesLocation);

    const packageJson = JSON.parse(readFileSync(`${cwd}/package.json`).toString());

    expect(packageJson.workspaces).toEqual(['packages/*', '../lastrev-libraries/packages/lib1']);
  });

  it('correctly removes a library with standard workspaces', async () => {
    mockFileSystem(['packages/*', '../lastrev-libraries/packages/lib1', '../lastrev-libraries/packages/lib2']);

    const libs = [{ name: 'lib2', location: `${librariesLocation}/packages/lib2`, version: '0.1.0' }];

    await updateLibraries(libs, cwd, librariesLocation);

    const packageJson = JSON.parse(readFileSync(`${cwd}/package.json`).toString());

    expect(packageJson.workspaces).toEqual(['packages/*', '../lastrev-libraries/packages/lib2']);
  });

  it('correctly adds a library with workspaces object', async () => {
    mockFileSystem({ packages: ['packages/*'] });

    const libs = [{ name: 'lib1', location: `${librariesLocation}/packages/lib1`, version: '0.1.0' }];

    await updateLibraries(libs, cwd, librariesLocation);

    const packageJson = JSON.parse(readFileSync(`${cwd}/package.json`).toString());

    expect(packageJson.workspaces.packages).toEqual(['packages/*', '../lastrev-libraries/packages/lib1']);
  });

  it('correctly removes a library with workspaces object', async () => {
    mockFileSystem({
      packages: ['packages/*', '../lastrev-libraries/packages/lib1', '../lastrev-libraries/packages/lib2']
    });

    const libs = [{ name: 'lib2', location: `${librariesLocation}/packages/lib2`, version: '0.1.0' }];

    await updateLibraries(libs, cwd, librariesLocation);

    const packageJson = JSON.parse(readFileSync(`${cwd}/package.json`).toString());

    expect(packageJson.workspaces.packages).toEqual(['packages/*', '../lastrev-libraries/packages/lib2']);
  });
});
