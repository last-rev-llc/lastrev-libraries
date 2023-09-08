import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';
import fs from 'fs';
import path from 'path';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
};

function loadFiles() {
  const dirPath = __dirname;
  const modules: any[] = [];
  const extensionFiles = fs.readdirSync(dirPath).filter((file) => /\.extension\.js$/.test(file));

  console.log('Loading extension:', extensionFiles);
  extensionFiles.forEach((file) => {
    const modulePath = path.join(dirPath, file);
    try {
      const module = require(modulePath);
      modules.push(module);
    } catch (error) {
      console.error(`Failed to load module: ${modulePath}`, error);
    }
  });

  return modules;
}

const extensions: GraphQlExtension[] = loadFiles();

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers'))) as Record<string, any>;
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
