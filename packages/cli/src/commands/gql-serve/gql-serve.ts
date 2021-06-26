#! /usr/bin/env node
import dotenv from 'dotenv';

dotenv.config();

import { getServer, Extensions, Mappers, TypeMappings } from '@last-rev/graphql-contentful-core';
import { resolve, join, dirname } from 'path';
import { pathExists, pathExistsSync, readdir } from 'fs-extra';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { merge } from 'lodash';

import program from 'commander';

const loadExtensions = async (extensionsPath: string) => {
  const out: {
    typeDefs: Extensions['typeDefs'][];
    resolvers: Extensions['resolvers'][];
    mappers: Extensions['mappers'][];
    typeMappings: Extensions['typeMappings'][];
    pathsConfigs: Extensions['pathsConfigs'][];
  } = {
    typeDefs: [],
    resolvers: [],
    mappers: [],
    typeMappings: [],
    pathsConfigs: []
  };

  if (!extensionsPath) return out;

  console.log('Attempting to load extensions from', extensionsPath);

  const exists = await pathExists(extensionsPath);

  if (!exists) {
    console.error(`Directory does not exist: ${extensionsPath}`);
    return out;
  }

  const contents = await readdir(extensionsPath);
  contents.forEach((filename) => {
    try {
      const { typeDefs, resolvers, mappers, typeMappings, pathsConfigs } = require(join(extensionsPath, filename));
      typeDefs && out.typeDefs.push(typeDefs);
      resolvers && out.resolvers.push(resolvers);
      mappers && out.mappers.push(mappers);
      typeMappings && out.typeMappings.push(typeMappings);
      pathsConfigs && out.pathsConfigs.push(pathsConfigs);
    } catch (e) {
      console.error(`Error loading extensions from ${filename}: ${e.message}`);
      process.exit();
    }
  });
  return out;
};

const loadFromFile = async (extensionsDir: string): Promise<Extensions> => {
  const { typeDefs, resolvers, mappers, typeMappings, pathsConfigs } = await loadExtensions(extensionsDir);

  return {
    typeDefs: mergeTypeDefs([...typeDefs]),
    resolvers: mergeResolvers([...resolvers]),
    mappers: merge({} as Mappers, ...mappers),
    typeMappings: merge({} as TypeMappings, ...typeMappings),
    pathsConfigs: merge({}, ...pathsConfigs)
  };
};

const run = async ({ configFile }: { configFile: string }) => {
  let cms;
  let contentDir;
  let extensions;
  let extensionsDir;
  let port = 5000;
  let host;
  try {
    ({ cms, contentDir, extensions, extensionsDir, port = 5000, host } = require(configFile));
  } catch (e) {
    console.error(`unable to load config: ${configFile}: ${e.message}`);
    process.exit();
  }

  if (!contentDir) {
    console.error(`No contentDir found in config file`);
    process.exit();
  }

  const configDir = dirname(configFile);

  contentDir = resolve(configDir, contentDir);

  if (!contentDir || !pathExistsSync(contentDir)) {
    console.error(`Unable to find contentDir: ${contentDir}`);
    process.exit();
  }

  if (!extensions && extensionsDir) {
    extensions = await loadFromFile(resolve(configDir, extensionsDir));
  }

  const server = await getServer({
    extensions,
    contentDir,
    cms
  });
  const { url } = await server.listen({ port, host });
  console.log(`Server ready at ${url}. `);
};

program.requiredOption('-c --config <config file>', 'Path to a config js or json file').parse(process.argv);

const { config } = program.opts();

run({ configFile: resolve(process.cwd(), config) }).catch((err) => {
  console.log(err);
  process.exit();
});
