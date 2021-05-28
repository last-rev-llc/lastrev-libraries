import { Source, ConnectionParams, GeneratorInput } from '../types';
import contentfulFetcher from './contentful';

export default async (_source: Source, params: ConnectionParams): Promise<GeneratorInput> => {
  // in the future, switch statement to get correct fetcher for source
  return contentfulFetcher(params);
};
