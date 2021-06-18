import { GenerateSchemaParams } from './types';
import fetch from './fetchers';
import { DocumentNode } from 'graphql';

export default async ({
  source,
  typeMappings,
  connectionParams,
  contentTypes
}: GenerateSchemaParams): Promise<DocumentNode> => {
  console.log(`generating schema from ${source}...`);
  return await fetch(source, typeMappings, connectionParams, contentTypes);
};
