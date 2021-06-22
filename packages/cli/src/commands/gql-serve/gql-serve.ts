#! /usr/bin/env node
import dotenv from 'dotenv';

dotenv.config();

import { getServer } from '@last-rev/graphql-contentful-core';

import intParser from '../../helpers/intParser';
import program from 'commander';

const run = async ({
  port,
  host,
  extensionsDir = '',
  cms
}: {
  port: number;
  host?: string;
  extensionsDir: string;
  cms: 'Contentful';
}) => {
  // const mergedTypeDefs = mergeTypeDefs([baseTypeDefs, ...typeDefs]);

  const server = await getServer({
    extensionsDir,
    cms
  });
  const { url } = await server.listen({ port, host });
  console.log(`Server ready at ${url}. `);
};

program
  .option('-p, --port <port>', 'Port to run the server on', intParser, 5000)
  .option('-c, --cms <string>', 'CMS to use for schema generation', 'Contentful')
  .option('-n, --hostname <hostname>', 'Host to run the server on')
  .option('-e --extensions-dir <extensions directory>', 'Path to a directory containing extensions')
  .parse(process.argv);

const { port, hostname, extensionsDir, cms } = program.opts();

run({ port, host: hostname, extensionsDir, cms }).catch((err) => {
  console.log(err);
  process.exit();
});
