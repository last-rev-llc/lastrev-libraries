import { LibraryError } from '../types';
import determineLibraryStatus from './determineLibraryStatus';
import mockfs from 'mock-fs';

const mockPackageJson = (workspaces: string[] | { packages: string[] }) => {
  return {
    workspaces
  };
};

describe('determineLibraryStatus()', () => {
  afterEach(() => {
    mockfs.restore();
  });

  it('should have error NOT_FOUND_IN_LIBS if lib is not in libs', async () => {
    const libName = 'not-in-libs';
    const libs = [
      { name: 'lib1', location: 'some/location', version: '0.1.0' },
      { name: 'lib2', location: 'some/other/location', version: '0.2.0' }
    ];
    const cwd = '/cwd';
    await expect(
      determineLibraryStatus(libName, libs, cwd, mockPackageJson(libs.map((l) => l.location)))
    ).resolves.toEqual({
      library: {
        name: libName,
        location: '',
        version: ''
      },
      errors: [LibraryError.NOT_FOUND_IN_LIBS]
    });
  });

  it('should have error NOT_LINKED if lib is in node_modules, but not linked to library', async () => {
    const librariesLocation = '/dev/lastrev-libraries';
    const libs = [
      { name: 'lib1', location: `${librariesLocation}/lib1`, version: '0.1.2' },
      { name: 'lib2', location: `${librariesLocation}/lib2`, version: '0.2.3' }
    ];
    const cwd = '/cwd';
    mockfs({
      [librariesLocation]: {
        lib1: {
          'package.json': '{}'
        },
        lib2: {
          'package.json': '{}'
        }
      },
      [cwd]: {
        node_modules: {
          lib1: {
            'package.json': '{}',
            'dist': {}
          }
        }
      }
    });
    await expect(
      determineLibraryStatus(libs[0].name, libs, cwd, mockPackageJson(libs.map((l) => l.location)))
    ).resolves.toEqual({
      library: libs[0],
      errors: [LibraryError.NOT_LINKED]
    });
  });

  it('should have error NOT_FOUND_IN_NODE_MODULES if lib is not in node_modules', async () => {
    const librariesLocation = '/dev/lastrev-libraries';
    const libs = [
      { name: 'lib1', location: `${librariesLocation}/lib1`, version: '0.1.2' },
      { name: 'lib2', location: `${librariesLocation}/lib2`, version: '0.2.3' }
    ];
    const cwd = '/cwd';
    mockfs({
      [librariesLocation]: {
        lib1: {
          'package.json': '{}'
        },
        lib2: {
          'package.json': '{}'
        }
      },
      [cwd]: {
        node_modules: {
          lib2: {
            'package.json': '{}',
            'dist': {}
          }
        }
      }
    });
    await expect(
      determineLibraryStatus(libs[0].name, libs, cwd, mockPackageJson(libs.map((l) => l.location)))
    ).resolves.toEqual({
      library: libs[0],
      errors: [LibraryError.NOT_FOUND_IN_NODE_MODULES]
    });
  });

  it('should have error NOT_FOUND_IN_NODE_MODULES if lib is not in node_modules', async () => {
    const librariesLocation = '/dev/lastrev-libraries';
    const libs = [
      { name: 'lib1', location: `${librariesLocation}/lib1`, version: '0.1.2' },
      { name: 'lib2', location: `${librariesLocation}/lib2`, version: '0.2.3' }
    ];
    const cwd = '/cwd';
    mockfs({
      [librariesLocation]: {
        lib1: {
          'package.json': '{}'
        },
        lib2: {
          'package.json': '{}'
        }
      },
      [cwd]: {
        node_modules: {
          lib2: {
            'package.json': '{}',
            'dist': {}
          }
        }
      }
    });
    await expect(
      determineLibraryStatus(libs[0].name, libs, cwd, mockPackageJson(libs.map((l) => l.location)))
    ).resolves.toEqual({
      library: libs[0],
      errors: [LibraryError.NOT_FOUND_IN_NODE_MODULES]
    });
  });

  it('should have error if lib is in node_modules and is linked to library, but missing from standard workspaces', async () => {
    const librariesLocation = '/dev/lastrev-libraries';
    const libs = [
      { name: 'lib1', location: `${librariesLocation}/lib1`, version: '0.1.2' },
      { name: 'lib2', location: `${librariesLocation}/lib2`, version: '0.2.3' }
    ];
    const cwd = '/cwd';
    mockfs({
      [librariesLocation]: {
        lib1: {
          'package.json': '{}',
          'dist': {}
        },
        lib2: {
          'package.json': '{}'
        }
      },
      [cwd]: {
        node_modules: {
          lib1: mockfs.symlink({
            path: `../..${libs[0].location}`
          })
        }
      }
    });
    await expect(determineLibraryStatus(libs[0].name, libs, cwd, mockPackageJson([]))).resolves.toEqual({
      library: libs[0],
      errors: [LibraryError.NOT_IN_WORKSPACES]
    });
  });

  it('should have no errors if lib is in node_modules and is linked to library', async () => {
    const librariesLocation = '/dev/lastrev-libraries';
    const libs = [
      { name: 'lib1', location: `${librariesLocation}/lib1`, version: '0.1.2' },
      { name: 'lib2', location: `${librariesLocation}/lib2`, version: '0.2.3' }
    ];
    const cwd = '/cwd';
    mockfs({
      [librariesLocation]: {
        lib1: {
          'package.json': '{}',
          'dist': {}
        },
        lib2: {
          'package.json': '{}'
        }
      },
      [cwd]: {
        node_modules: {
          lib1: mockfs.symlink({
            path: `../..${libs[0].location}`
          })
        }
      }
    });
    await expect(
      determineLibraryStatus(libs[0].name, libs, cwd, mockPackageJson(libs.map((l) => l.location)))
    ).resolves.toEqual({
      library: libs[0],
      errors: []
    });
  });
});
