import checkIsInClientMonorepo from './checkIsInClientMonoRepo';
import mockfs from 'mock-fs';

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
let mockConsoleLog = jest.spyOn(global.console, 'log');

const cwd = '/dev/myproject';

describe('checkIsInClientMonorepo()', () => {
  beforeEach(() => {
    mockExit.mockReset();
    mockConsoleLog.mockReset();
  });

  afterEach(() => {
    mockfs.restore();
  });

  it('should not exit if cwd contains lastrev.json file', () => {
    mockfs({
      [cwd]: {
        'some-file.txt': 'hello world',
        'lastrev.json': '{}'
      }
    });

    checkIsInClientMonorepo(cwd);

    expect(mockExit).not.toHaveBeenCalled();
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  it('should exit and message if cwd does not contain lastrev.json file', () => {
    mockfs({
      [cwd]: {
        'some-file.txt': 'hello world'
      }
    });

    checkIsInClientMonorepo(cwd);

    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockConsoleLog).toHaveBeenCalled();
  });
});
