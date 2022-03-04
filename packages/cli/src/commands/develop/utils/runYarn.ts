import { spawn } from 'child_process';
import { resolve } from 'path';

const runYarn = (cwd: string) => {
  return new Promise(function (ro, reject) {
    console.log('running script', resolve(__dirname, '../runYarn.sh'));
    const process = spawn(resolve(__dirname, '../runYarn.sh'), { cwd, stdio: 'inherit' });
    process.on('exit', ro);
    process.on('error', reject);
  });
};

export default runYarn;
