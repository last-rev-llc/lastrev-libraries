#! /usr/bin/env node
import dotenv from 'dotenv';
import intParser from '../helpers/intParser';

dotenv.config();

import program from 'commander';
import { getServer } from '@last-rev/graphql';

const run = async ({ port, host }: { port: number; host: string }) => {
  const server = await getServer();
  const url = await server.listen({ port, host });
  console.log(`Server ready at ${url}. `);
};

program
  .option('-p, --port <port>', 'Which port to run the server on', intParser, 5000)
  .option('-h, --host <host>', 'Which host to run the server on')
  // TODO once we extract some of this out of @last-rev/graphql package
  // .requiredOption('-c, --config <directory>', 'Path to the config directory containing your type mappings and mappers', )
  // TODO
  // .option('-w, --watch', 'Whether to run in "watch" mode, which will reload the server when the files in the config directory change')
  .parse(process.argv);

const { port, host /* ,config, watch */ } = program.opts();

run({ port, host }).catch((err) => {
  console.log(err);
  process.exit();
});
