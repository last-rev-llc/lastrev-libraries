import { Source, ConnectionParams } from '../types';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { contentfulFetcher, generateContentfulSchema } from './contentful';
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
  skipReferenceFields: boolean,
  params?: ConnectionParams,
  contentTypes?: ContentType[]
): Promise<DocumentNode> => {
  if (!contentTypes && !params) {
    throw Error('Must pass one of params or contentTypes to generate schema');
  }
  const timer = new Timer();
  // in the future, switch statement to get correct fetcher for source
  let gqlStatements = contentTypes
    ? generateContentfulSchema(typeMappings, contentTypes, skipReferenceFields)
    : await contentfulFetcher(typeMappings, params!, skipReferenceFields);

  logger.debug('Schema Generated', {
    caller: 'fetchers',
    elapsedMs: timer.end().millis
  });

  return gql`
    ${gqlStatements}
  `;
};
