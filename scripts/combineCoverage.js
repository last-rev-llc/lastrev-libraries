const path = require('path');
const fs = require('fs');
const START_PATH = './packages';
const REPORTS_PATH = path.join('./reports');
const { exec } = require('child_process');

const execPromise = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      if (stderr) {
        return reject(error);
      }
      return resolve(stdout);
    });
  });

(async function () {
  if (!fs.existsSync(REPORTS_PATH)) {
    fs.mkdirSync(REPORTS_PATH);
  }

  const packagesFolder = fs.readdirSync(START_PATH);
  const reports = [];

  packagesFolder.forEach((folder) => {
    try {
      var filename = path.join(START_PATH, folder, 'coverage', 'coverage-final.json');
      fs.copyFileSync(filename, path.join(REPORTS_PATH, `${folder}.json`));
      reports.push(filename);
    } catch (err) {}
  });

  if (!fs.existsSync('.nyc_output')) {
    fs.mkdirSync('.nyc_output');
  }

  await execPromise('npx nyc merge reports');
  await execPromise('mv coverage.json .nyc_output/out.json');
  await execPromise('npx nyc -t ./.nyc_output report --reporter=html');
})();
