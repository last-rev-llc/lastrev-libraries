import dotenv from 'dotenv';

dotenv.config();

import sync from '@last-rev/cms-sync-to-fs';
import { resolve } from 'path';
import LastRevAppConfig from '@last-rev/app-config';

import program from 'commander';

const run = async (configFile: string) => {
  let config;

  try {
    config = require(resolve(process.cwd(), configFile)) as LastRevAppConfig;
  } catch (e: any) {
    console.error(`unable to load config: ${configFile}: ${e.message}`);
    process.exit();
  }
  await sync(config);
};

program.requiredOption('-c --config <config file>', 'Path to a js file').parse(process.argv);

const { config } = program.opts();

run(config).catch((err) => {
  console.error(err);
  process.exit();
});
