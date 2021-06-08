import { DocumentNode } from 'graphql';
import { readdir, pathExists } from 'fs-extra';
import { join } from 'path';
import { ResolversDefinition } from '@graphql-tools/merge';
import { fieldResolver, Mappers } from '@last-rev/graphql-contentful-core';

export type Extensions = {
  typeDefs: DocumentNode[];
  resolvers: ResolversDefinition<unknown>[];
  mappers: Mappers[];
  typeMappings: { [contentfulType: string]: string }[];
};

const loadExtensions = async (extensionsPath?: string): Promise<Extensions> => {
  const out: Extensions = {
    typeDefs: [],
    resolvers: [],
    mappers: [],
    typeMappings: []
  };

  if (!extensionsPath) return out;

  const exists = await pathExists(extensionsPath);

  if (!exists) return out;

  const contents = await readdir(extensionsPath);
  contents.forEach((filename) => {
    try {
      const { typeDefs, resolvers, mappers, typeMappings } = require(join(extensionsPath, filename))({ fieldResolver });
      typeDefs && out.typeDefs.push(typeDefs);
      resolvers && out.resolvers.push(resolvers);
      mappers && out.mappers.push(mappers);
      typeMappings && out.typeMappings.push(typeMappings);
    } catch (e) {
      console.log(`Error loading extensions from ${filename}: ${e.message}`);
      process.exit();
    }
  });
  return out;
};

export default loadExtensions;
