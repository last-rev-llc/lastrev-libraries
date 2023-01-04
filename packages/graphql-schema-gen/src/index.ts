import { GenerateSchemaParams } from './types';
import fetch from './fetchers';
import { DocumentNode } from 'graphql';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-schema-gen',
  module: 'index'
});

const generateSchema = async ({
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

export default generateSchema;
