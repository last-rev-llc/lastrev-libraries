import { getSdk } from '@lrns/graphql-sdk';
import { GraphQLClient } from 'graphql-request';

const URL = process.env.NETLIFY
  ? 'http://localhost:5000/graphql'
  : process.env.GRAPHQL_SERVER_URL ?? 'http://localhost:5000/graphql';
const sdk = getSdk(new GraphQLClient(URL));

export default sdk;
