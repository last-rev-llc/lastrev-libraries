import { GenerateSchemaParams } from './types';
import fetch from './fetchers';
import { DocumentNode } from 'graphql';

export default async ({ source, connectionParams }: GenerateSchemaParams): Promise<DocumentNode> => {
  console.log(`generating schema from ${source}...`);
  return await fetch(source, connectionParams);
};
