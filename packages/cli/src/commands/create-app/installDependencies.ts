import spawn from 'cross-spawn';
import LastRevConfig, { CREATE_APP_ACTION } from './LastRevConfig';

const installDependencies = async (config: LastRevConfig): Promise<void> => {
  await config.askAndUpdate(CREATE_APP_ACTION, 'installDependencies', {
    type: 'confirm',
    name: 'proceed',
    message: 'Would you like to install dependencies? (This will take a while...)',
    default: true
  });

  if (!config.getStateValue(CREATE_APP_ACTION, 'installDependencies')) {
    return;
  }

  return new Promise((resolve, reject) => {
    const args = ['install', '--cwd', config.getStateValue(CREATE_APP_ACTION, 'appRoot')];
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
