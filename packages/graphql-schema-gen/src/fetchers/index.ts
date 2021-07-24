import { Source, ConnectionParams } from '../types';
import { DocumentNode } from 'graphql';
import { gql } from 'apollo-server';
import contentfulFetcher, { generateContentfulSchema } from './contentful';
import { ContentType } from 'contentful';
import Timer from '@last-rev/timer';
import logger from 'loglevel';

export default async (
  _source: Source,
  typeMappings: Record<string, string>,
  params?: ConnectionParams,
  contentTypes?: ContentType[]
): Promise<DocumentNode> => {
  const timer = new Timer('Schema Generated');
  // in the future, switch statement to get correct fetcher for source
  if (contentTypes) {
    const generated = generateContentfulSchema(typeMappings, contentTypes);
    logger.debug(timer.end());
    return gql`
      ${generated}
    `;
  }
  if (params) {
    const fetched = await contentfulFetcher(typeMappings, params);
    logger.debug(timer.end());
    return gql`
      ${fetched}
    `;
  }
  throw Error('Must pass one of params or contentTypes to generate schema');
};
