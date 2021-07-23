import { GenerateSchemaParams } from './types';
import fetch from './fetchers';
import { DocumentNode } from 'graphql';
import logger from 'loglevel';

export default async ({
  source = 'Contentful',
  typeMappings,
  connectionParams,
  contentTypes,
  logLevel = 'warn'
}: GenerateSchemaParams): Promise<DocumentNode> => {
  logger.setLevel(logLevel);
  logger.info(`generating schema from ${source}...`);
  return await fetch(source, typeMappings, connectionParams, contentTypes);
};
