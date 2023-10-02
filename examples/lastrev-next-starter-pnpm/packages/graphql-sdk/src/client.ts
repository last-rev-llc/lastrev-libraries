import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/sdk';
import { graphqlEndpoint } from './graphqlEndpoint';
export const client = getSdk(new GraphQLClient(graphqlEndpoint));

export default client;
