import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/sdk';
import { graphqlEndpoint } from './graphqlEndpoint';
export const client = getSdk(new GraphQLClient(graphqlEndpoint));
export const getClient = ({ environment }: any) => {
  if (!environment) return client;
  return getSdk(new GraphQLClient(`${graphqlEndpoint}?env=${environment}`));
};

export default client;
