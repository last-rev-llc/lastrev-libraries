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
      // Only treat stderr as error if it contains actual error messages, not warnings
      if (stderr && !stderr.includes('npm warn') && !stderr.includes('deprecated')) {
        console.warn('Command stderr (non-fatal):', stderr);
      }
      return resolve(stdout);
    });
  });

(async function () {
  try {
    console.log('Starting coverage combination...');
    
    if (!fs.existsSync(REPORTS_PATH)) {
      fs.mkdirSync(REPORTS_PATH, { recursive: true });
    }

    const packagesFolder = fs.readdirSync(START_PATH);
    const reports = [];

    packagesFolder.forEach((folder) => {
      try {
        const filename = path.join(START_PATH, folder, 'coverage', 'coverage-final.json');
        if (fs.existsSync(filename)) {
          fs.copyFileSync(filename, path.join(REPORTS_PATH, `${folder}.json`));
          reports.push(filename);
          console.log(`Copied coverage report for: ${folder}`);
        } else {
          console.log(`No coverage report found for: ${folder}`);
        }
      } catch (err) {
        console.warn(`Failed to copy coverage for ${folder}:`, err.message);
      }
    });

    if (reports.length === 0) {
      console.log('No coverage reports found, skipping merge...');
      return;
    }

    if (!fs.existsSync('.nyc_output')) {
      fs.mkdirSync('.nyc_output', { recursive: true });
    }

    console.log('Merging coverage reports...');
    await execPromise('npx nyc merge reports');
    
    // Check if coverage.json was created before trying to move it
    if (!fs.existsSync('coverage.json')) {
      console.log('No coverage.json generated, skipping HTML report generation...');
      return;
    }
    
    console.log('Moving coverage.json...');
    await execPromise('mv coverage.json .nyc_output/out.json');
    
    console.log('Generating HTML report...');
    await execPromise('npx nyc -t ./.nyc_output report --reporter=html');
    
    console.log('Coverage combination complete!');
  } catch (error) {
    console.error('Error combining coverage reports:', error);
    process.exit(1);
  }
})();
