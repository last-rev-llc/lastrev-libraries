#! /usr/bin/env node
import dotenv from 'dotenv';

dotenv.config();

import intParser from '../helpers/intParser';
import program from 'commander';
import merge from 'lodash/merge';
import { getServer } from '@last-rev/graphql-contentful-core';
import generateSchema from '@last-rev/graphql-schema-gen';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { resolve } from 'path';
import loadExtensions from '../helpers/loadExtensions';

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
  const baseTypeDefs = await generateSchema({
    source: cms,
    connectionParams: {
      accessToken: process.env.CONTENTFUL_ACCESSTOKEN || '',
      space: process.env.CONTENTFUL_SPACE_ID || '',
      host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
      environment: process.env.CONTENTFUL_ENV || 'master'
    }
  });

  const { typeDefs, resolvers, mappers, typeMappings } = await loadExtensions(
    extensionsDir && resolve(process.cwd(), extensionsDir)
  );

  const mergedTypeDefs = mergeTypeDefs([baseTypeDefs, ...typeDefs]);
  const mergedResolvers = mergeResolvers(resolvers);
  const mergedMappers = merge({}, ...mappers);
  const mergedTypeMappings = merge({}, ...typeMappings);

  const server = await getServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    mappers: mergedMappers,
    typeMappings: mergedTypeMappings
  });
  const { url } = await server.listen({ port, host });
  console.log(`Server ready at ${url}. `);
};

program
  .option('-p, --port <port>', 'Port to run the server on', intParser, 5000)
  .option('-c, --cms <string>', 'CMS to use for schema generation', 'Contentful')
  .option('-n, --hostname <hostname>', 'Host to run the server on')
  .option('-e --extensions-dir <extensions directory>', 'Path to a directory containing extensions')
  // TODO
  // .option('-w, --watch', 'Whether to run in "watch" mode, which will reload the server when the files in the config directory change')
  .parse(process.argv);

const { port, hostname, extensionsDir, cms /* , watch */ } = program.opts();

run({ port, host: hostname, extensionsDir, cms }).catch((err) => {
  console.log(err);
  process.exit();
});
