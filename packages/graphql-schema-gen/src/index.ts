import { GenerateSchemaParams } from './types';
import { fetchers as fetch } from './fetchers';
import { DocumentNode } from 'graphql';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-schema-gen',
  module: 'index'
});

export const generateSchema = async ({
  source = 'Contentful',
  typeMappings,
  connectionParams,
  contentTypes,
  skipReferenceFields
}: GenerateSchemaParams): Promise<DocumentNode> => {
  logger.info(`generating schema from ${source}...`, {
    caller: 'generateSchema'
  });
  return await fetch(source, typeMappings, skipReferenceFields, connectionParams, contentTypes);
};
