import { Source } from '../types';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { generateContentfulSchema } from './contentful';
import { generateSanitySchema } from './sanity';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-schema-gen',
  module: 'fetchers'
});

export const fetchers = async (
  source: Source,
  typeMappings: Record<string, string>,
  contentTypes: any[], // ContentType[] for Contentful, SanitySchemaType[] for Sanity
  skipReferenceFields: boolean
): Promise<DocumentNode> => {
  const timer = new Timer();

  let gqlStatements: string;

  if (source === 'Sanity') {
    // Sanity schema generation (simpler - no field mapping)
    gqlStatements = generateSanitySchema(typeMappings, contentTypes);
  } else {
    // Contentful schema generation (existing)
    gqlStatements = generateContentfulSchema(typeMappings, contentTypes, !!skipReferenceFields);
  }

  logger.debug('Schema Generated', {
    caller: 'fetchers',
    source,
    elapsedMs: timer.end().millis
  });

  return gql`
    ${gqlStatements}
  `;
};
