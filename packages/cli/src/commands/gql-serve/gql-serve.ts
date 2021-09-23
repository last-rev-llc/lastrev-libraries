import { getServer } from '@last-rev/graphql-contentful-core';
import { resolve } from 'path';

import program from 'commander';
import LastRevAppConfig from '@last-rev/app-config';

const run = async (configFile: string) => {
  let config;

  try {
    config = require(resolve(process.cwd(), configFile)) as LastRevAppConfig;
  } catch (e: any) {
    console.error(`unable to load config: ${configFile}: ${e.message}`);
    process.exit();
  }

  const server = await getServer(config);
  const { url } = await server.listen(config.graphql);
  console.log(`Server ready at ${url}. `);
};

program.requiredOption('-c --config <config file>', 'Path to a js file').parse(process.argv);

const { config } = program.opts();

run(config).catch((err) => {
  console.log(err);
  process.exit();
});
