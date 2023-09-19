import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/sdk';
import { graphqlEndpoint } from './graphqlEndpoint';
export const client = getSdk(new GraphQLClient(graphqlEndpoint));
// console.log('client: ', graphqlEndpoint, client);

export default client;
