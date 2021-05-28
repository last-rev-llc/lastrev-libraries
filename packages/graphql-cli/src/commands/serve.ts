#! /usr/bin/env node
import dotenv from 'dotenv';

dotenv.config();

import intParser from '../helpers/intParser';
import program from 'commander';
import { getServer } from '@last-rev/graphql-core';

const loadFromFile = (filename?: string) => {
  if (!filename) return;

  try {
    return require(filename);
  } catch (err) {
    throw Error(`Unable to load ${filename}: ${err.message}`);
  }
};

const run = async ({
  port,
  host,
  typeDefinitionsFile,
  resolversFile,
  mappersFile
}: {
  port: number;
  host: string;
  typeDefinitionsFile?: string;
  resolversFile?: string;
  mappersFile?: string;
}) => {
  const server = await getServer({
    typeDefs: loadFromFile(typeDefinitionsFile),
    resolvers: loadFromFile(resolversFile),
    mappers: loadFromFile(mappersFile)
  });
  const url = await server.listen({ port, host });
  console.log(`Server ready at ${url}. `);
};

program
  .option('-p, --port <port>', 'Which port to run the server on', intParser, 5000)
  .option('-n, --hostname <hostname>', 'Which host to run the server on')
  .option('-t --typeDefinitionsFile <typeDefinitionsFile>', 'Path to a file of Type Definitions')
  .option('-r --resolversFile <resolversFile>', 'Path to a file of Resolvers')
  .option('-m --mappersFile <mappersFile>', 'Path to a file of Mappers')
  // TODO
  // .option('-w, --watch', 'Whether to run in "watch" mode, which will reload the server when the files in the config directory change')
  .parse(process.argv);

const { port, hostname, typeDefinitionsFile, resolversFile, mappersFile /* , watch */ } = program.opts();

run({ port, host: hostname, typeDefinitionsFile, resolversFile, mappersFile }).catch((err) => {
  console.log(err);
  process.exit();
});
