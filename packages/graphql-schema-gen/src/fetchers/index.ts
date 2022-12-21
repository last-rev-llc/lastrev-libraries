import { Source, ConnectionParams } from '../types';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import contentfulFetcher, { generateContentfulSchema } from './contentful';
import { ContentType } from 'contentful';
import Timer from '@last-rev/timer';
import logger from 'loglevel';

export default async (
  _source: Source,
  typeMappings: Record<string, string>,
  skipReferenceFields: boolean,
  params?: ConnectionParams,
  contentTypes?: ContentType[]
): Promise<DocumentNode> => {
  const timer = new Timer('Schema Generated');
  // in the future, switch statement to get correct fetcher for source
  if (contentTypes) {
    const generated = generateContentfulSchema(typeMappings, contentTypes, skipReferenceFields);
    logger.trace(timer.end());
    return gql`
      ${generated}
    `;
  }
  if (params) {
    const fetched = await contentfulFetcher(typeMappings, params, skipReferenceFields);
    logger.trace(timer.end());
    return gql`
      ${fetched}
    `;
  }
  throw Error('Must pass one of params or contentTypes to generate schema');
};
