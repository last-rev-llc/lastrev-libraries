import spawn from 'cross-spawn';

const installDependencies = (root: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const args = ['install', '--cwd', root];
    const command = 'yarnpkg';

    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' }
    });
    child.on('close', (code: number) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` });
        return;
      }
      resolve();
    });
  });
};

export default installDependencies;
