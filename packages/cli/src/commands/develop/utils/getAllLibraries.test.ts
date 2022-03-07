import getAllLibraries from './getAllLibraries';
import mockfs from 'mock-fs';

const mockPackageJson = (name: string, version: string) => {
  return JSON.stringify({
    name,
    version
  });
};

describe('getAllLibraries()', () => {
  afterEach(() => {
    mockfs.restore();
  });

  it('returns all valid libraries', async () => {
    const librariesLocation = '/dev/lastrev-libraries';
    mockfs({
      [librariesLocation]: {
        packages: {
          'non-existing-package': {},
          '.DS_Store': 'some file',
          'lib1': {
            'package.json': mockPackageJson('lib1', '0.1.2')
          },
          'lib2': {
            'package.json': mockPackageJson('lib2', '2.3.2')
          }
        }
      }
    });

    await expect(getAllLibraries(librariesLocation)).resolves.toEqual([
      { name: 'lib1', location: `${librariesLocation}/packages/lib1`, version: '0.1.2' },
      { name: 'lib2', location: `${librariesLocation}/packages/lib2`, version: '2.3.2' }
    ]);
  });
});
