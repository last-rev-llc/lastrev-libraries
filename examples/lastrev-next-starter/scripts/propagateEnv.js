/* eslint-disable no-console */
const { readdir, copyFile } = require('fs-extra');
const { resolve, join } = require('path');

const run = async () => {
  const envFile = resolve(__dirname, '../.env');
  const packagesDir = resolve(__dirname, '../packages');
  const packages = await readdir(packagesDir);

  await Promise.all(
    packages.map(async (packageName) => {
      const newEnv = join(packagesDir, packageName, '.env');
      await copyFile(envFile, newEnv);
    })
  );
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
