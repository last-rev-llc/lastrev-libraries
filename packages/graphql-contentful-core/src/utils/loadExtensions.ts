import { DocumentNode, GraphQLSchema, Source } from 'graphql';
import { readdir, pathExists } from 'fs-extra';
import { GraphQLResolverMap } from 'apollo-graphql';
import { join } from 'path';
import { ContentfulPathsConfigs, Mappers } from '../types';

export type Extensions = {
  typeDefs: (string | DocumentNode | Source | GraphQLSchema)[];
  resolvers: GraphQLResolverMap<any>[];
  mappers: Mappers[];
  typeMappings: { [contentfulType: string]: string }[];
  pathsConfigs: ContentfulPathsConfigs[];
};

const loadExtensions = async (extensionsPath?: string): Promise<Extensions> => {
  const out: Extensions = {
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

export default loadExtensions;
