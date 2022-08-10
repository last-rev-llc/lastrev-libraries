/* eslint-disable no-console */
const { readdir, copyFile, existsSync } = require('fs-extra');
const { resolve, join } = require('path');

const run = async () => {
  const envFile = resolve(__dirname, '../.env');

  if (!existsSync(envFile)) {
    console.log('No .env file found. skipping.');
    return;
  }

  const packagesDir = resolve(__dirname, '../packages');
  const packages = await readdir(packagesDir);

  try {
    await Promise.all(
      packages.map(async (packageName) => {
        if (packageName !== '.DS_Store') {
          const newEnv = join(packagesDir, packageName, '.env');
          await copyFile(envFile, newEnv);
        }
      })
    );
  } catch (err) {
    console.log('PropagateEnv Error', err);
  }
};

run()
  .then(() => {
    console.log('successfully propagated .env file to packages');
    process.exit(0);
  })
  .catch((e) => {
    console.error(`Problem propagating .env file: ${e.message}`);
    process.exit(1);
  });
