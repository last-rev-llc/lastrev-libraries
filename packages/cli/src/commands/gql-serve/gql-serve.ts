import { createServer } from '@last-rev/graphql-contentful-core';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolve } from 'path';

import program from 'commander';
import LastRevAppConfig from '@last-rev/app-config';
import { contextFunction } from '@last-rev/graphql-contentful-helpers';

const run = async (configFile: string) => {
  let config: LastRevAppConfig;

  try {
    config = require(resolve(process.cwd(), configFile));
  } catch (e: any) {
    console.error(`unable to load config: ${configFile}: ${e.message}`);
    process.exit();
  }

  const server = await createServer(config);
  const { url } = await startStandaloneServer(server, {
    context: contextFunction({ config }),
    listen: config?.graphql
  });
  console.log(`🚀  Server ready at ${url}`);
};

program.requiredOption('-c --config <config file>', 'Path to a js file').parse(process.argv);

const { config } = program.opts();

run(config).catch((err) => {
  console.log(err);
  process.exit();
});
