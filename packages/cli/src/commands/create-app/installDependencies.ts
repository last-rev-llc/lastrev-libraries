import spawn from 'cross-spawn';
import LastRevConfig, { VAL_SHOULD_INSTALL_DEPENDENCIES, VAL_RESOLVED_APP_ROOT } from './LastRevConfig';

const installDependencies = async (config: LastRevConfig): Promise<void> => {
  await config.askAndUpdate(VAL_SHOULD_INSTALL_DEPENDENCIES, {
    type: 'confirm',
    name: VAL_SHOULD_INSTALL_DEPENDENCIES,
    message: 'Would you like to install dependencies? (This will take a while...)',
    default: true
  });

  if (!config.getStateValue(VAL_SHOULD_INSTALL_DEPENDENCIES)) {
    return;
  }

  return new Promise((resolve, reject) => {
    const args = ['install', '--cwd', config.getStateValue(VAL_RESOLVED_APP_ROOT)];
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
