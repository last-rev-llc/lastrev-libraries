import { Source, ConnectionParams } from '../types';
import { DocumentNode } from 'graphql';
import { gql } from 'apollo-server';
import contentfulFetcher from './contentful';

export default async (
  _source: Source,
  typeMappings: Record<string, string>,
  params: ConnectionParams
): Promise<DocumentNode> => {
  // in the future, switch statement to get correct fetcher for source
  const fetched = await contentfulFetcher(typeMappings, params);
  return gql`
    ${fetched}
  `;
};
