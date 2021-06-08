#! /usr/bin/env node
import dotenv from 'dotenv';

dotenv.config();

import intParser from '../helpers/intParser';
import program from 'commander';
import { getServer } from '@last-rev/graphql-contentful-core';
import generateSchema from '@last-rev/graphql-schema-gen';
import { mergeTypeDefs } from '@graphql-tools/merge';

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
  mappersFile,
  cms
}: {
  port: number;
  host?: string;
  typeDefinitionsFile?: string;
  resolversFile?: string;
  mappersFile?: string;
  cms: 'Contentful';
}) => {
  const baseTypeDefs = await generateSchema({
    source: cms,
    connectionParams: {
      accessToken: process.env.CONTENTFUL_ACCESSTOKEN || '',
      space: process.env.CONTENTFUL_SPACE_ID || '',
      host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
      environment: process.env.CONTENTFUL_ENV || 'master'
    }
  });

  const extendedTypeDefs = loadFromFile(typeDefinitionsFile);

  const typeDefs = mergeTypeDefs([baseTypeDefs, extendedTypeDefs]);

  const server = await getServer({
    typeDefs,
    resolvers: loadFromFile(resolversFile),
    mappers: loadFromFile(mappersFile)
  });
  const url = await server.listen({ port, host });
  console.log(`Server ready at ${url}. `);
};

program
  .option('-p, --port <port>', 'Port to run the server on', intParser, 5000)
  .option('-c, --cms <string>', 'CMS to use for schema generation', 'Contentful')
  .option('-n, --hostname <hostname>', 'Host to run the server on')
  .option('-t --typeDefinitionsFile <typeDefinitionsFile>', 'Path to a file of Type Definitions')
  .option('-r --resolversFile <resolversFile>', 'Path to a file of Resolvers')
  .option('-m --mappersFile <mappersFile>', 'Path to a file of Mappers')
  // TODO
  // .option('-w, --watch', 'Whether to run in "watch" mode, which will reload the server when the files in the config directory change')
  .parse(process.argv);

const { port, hostname, typeDefinitionsFile, resolversFile, mappersFile, cms /* , watch */ } = program.opts();

run({ port, host: hostname, typeDefinitionsFile, resolversFile, mappersFile, cms }).catch((err) => {
  console.log(err);
  process.exit();
});
