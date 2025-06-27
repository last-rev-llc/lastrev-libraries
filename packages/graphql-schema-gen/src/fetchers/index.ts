import { Source } from '../types';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { generateContentfulSchema } from './contentful';
import { ContentType } from '@last-rev/types';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-schema-gen',
  module: 'fetchers'
});

export const fetchers = async (
  _source: Source,
  typeMappings: Record<string, string>,
  contentTypes: ContentType[],
  skipReferenceFields: boolean
): Promise<DocumentNode> => {
  const timer = new Timer();

  let gqlStatements = generateContentfulSchema(typeMappings, contentTypes, !!skipReferenceFields);

  logger.debug('Schema Generated', {
    caller: 'fetchers',
    elapsedMs: timer.end().millis
  });

  return gql`
    ${gqlStatements}
  `;
};
